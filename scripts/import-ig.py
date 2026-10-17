#!/usr/bin/env python3
"""Turn the Instagram harvest in ig-export/ into gallery data and web-sized images.

Inputs:  ig-export/ig-all.json      (grid listing: href, caption as alt, isReel)
         ig-export/ig-slides.jsonl  (one line per post: href, slides[{src,w,h,alt}])
Outputs: public/images/gallery/<postId>-<n>.jpg  (max 1200px, q74, at most MAX_SLIDES per post)
         lib/gallery.json
Idempotent: existing downloads and resized files are reused.
"""
import json, os, re, subprocess, sys
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXP = os.path.join(ROOT, "ig-export")
RAW = os.path.join(EXP, "raw")
OUT = os.path.join(ROOT, "public", "images", "gallery")
os.makedirs(RAW, exist_ok=True); os.makedirs(OUT, exist_ok=True)

grid = {p["href"]: p for p in json.load(open(os.path.join(EXP, "ig-all.json"), encoding="utf-8"))}
order = [p["href"] for p in json.load(open(os.path.join(EXP, "ig-all.json"), encoding="utf-8"))]
posts = {}
for line in open(os.path.join(EXP, "ig-slides.jsonl"), encoding="utf-8"):
    line = line.strip()
    if not line: continue
    p = json.loads(line)
    if p.get("slides"): posts[p["href"]] = p

MAX_SLIDES = 4
SKIP = re.compile(r"open booking|เปิดจอง|promotion|โปรโมชั่น", re.I)

def artist_of(caption):
    c = caption.lower()
    if "boom" in c and "scarmaker" in c: return "Boom"
    if re.search(r"by\s+earth", c): return "Earth"
    if re.search(r"by\s+pe\b", c): return "Pe"
    return "Studio"

def first_line(caption):
    for ln in caption.splitlines():
        ln = re.sub(r"#\S+", "", ln)
        ln = re.sub(r"[\U0001F000-\U0001FAFF☀-➿⬀-⯿️‍❌✍🏻🙏🖤❤️🔥✨📌]+", "", ln)
        ln = re.sub(r"\b(thank you.*|design by.*|by (pe|earth).*)$", "", ln, flags=re.I).strip(" .·-—")
        if ln: return ln[:80]
    return ""

TH_NAME = {"Pe": "Pe", "Earth": "Earth", "Boom": "Boom Scarmaker", "Studio": "AC Art"}

def dims(path):
    r = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", path], capture_output=True, text=True).stdout
    w = h = 0
    for ln in r.splitlines():
        if "pixelWidth" in ln: w = int(ln.split()[-1])
        if "pixelHeight" in ln: h = int(ln.split()[-1])
    return w, h

def process(job):
    href, n, slide = job
    pid = href.rstrip("/").split("/")[-1]
    raw = os.path.join(RAW, f"{pid}-{n}.jpg")
    out = os.path.join(OUT, f"{pid}-{n}.jpg")
    if not os.path.exists(raw) or os.path.getsize(raw) < 1000:
        subprocess.run(["curl", "-sL", "-A", "Mozilla/5.0", "-o", raw, slide["src"]], check=False)
    if not os.path.exists(raw) or os.path.getsize(raw) < 1000: return None
    if not os.path.exists(out):
        subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "74", "-Z", "1200", raw, "--out", out], capture_output=True)
    w, h = dims(out)
    if w < 300: return None
    return (href, n, f"/images/gallery/{pid}-{n}.jpg", w, h)

jobs = []
for href in order:
    p = posts.get(href)
    if not p: continue
    caption = grid.get(href, {}).get("alt", "")
    if SKIP.search(caption): continue
    kept = [sl for sl in p["slides"] if sl.get("w", 0) >= 600][:MAX_SLIDES]
    for n, slide in enumerate(kept, 1):
        jobs.append((href, n, slide))

with ThreadPoolExecutor(max_workers=6) as ex:
    results = [r for r in ex.map(process, jobs) if r]

items = []
for href, n, src, w, h in results:
    caption = grid.get(href, {}).get("alt", "")
    artist = artist_of(caption)
    if artist == "Studio": continue  # unattributed posts are promos or personal, not tattoo work
    title = first_line(caption)
    en = f"{title} — tattoo by {TH_NAME[artist]}, AC Art Tattoo Studio" if title else f"Tattoo by {TH_NAME[artist]}, AC Art Tattoo Studio"
    th = f"{title} — รอยสักโดย {TH_NAME[artist]} AC Art Tattoo Studio" if title else f"รอยสักโดย {TH_NAME[artist]} AC Art Tattoo Studio"
    items.append({"src": src, "width": w, "height": h, "artist": artist, "alt": {"en": en, "th": th}, "post": href})

json.dump(items, open(os.path.join(ROOT, "lib", "gallery.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
from collections import Counter
print(f"posts with slides: {len(posts)} | images: {len(items)} | by artist: {dict(Counter(i['artist'] for i in items))}")
print("gallery folder:", subprocess.run(["du", "-sh", OUT], capture_output=True, text=True).stdout.split()[0])
