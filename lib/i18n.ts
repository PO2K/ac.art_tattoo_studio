import type { Lang } from "./site";

export type Artist = {
  name: string;
  handle: string;
  image: string;
  alt: string;
  desc: string;
  tags: string[];
};

export type Work = { title: string; artist: string; image: string; alt: string };

export type Dictionary = {
  meta: { title: string; description: string };
  brand: { sub: string };
  nav: { artists: string; work: string; visit: string; gallery: string; book: string; language: string };
  hero: { eyebrow: string; title: [string, string]; lead: string };
  artists: { title: string; sub: string; list: Artist[] };
  work: { title: string; more: string; gallery: string; list: Work[] };
  gallery: { metaTitle: string; metaDescription: string; title: string; sub: string; all: string; artists: Record<"Pe" | "Earth" | "Boom" | "Studio", string>; open: string; count: string; more: string };
  visit: {
    title: string;
    address: string; addressVal: string;
    hours: string; hoursVal: string;
    contact: string; contactVal: string;
    payment: string; paymentVal: string;
    ig: string; maps: string; facebook: string; map: string;
    howTitle: string; howBody: string;
    careTitle: string; careBody: string;
  };
  footer: { text: string };
};

const en: Dictionary = {
  meta: {
    title: "AC Art Tattoo Studio · Nonthaburi",
    description:
      "Custom tattoos in Nonthaburi: realistic, black & gray, lettering and blackwork by Pe, Earth and Boom Scarmaker. Tiwanon 45, near Pak Kret. Book via Instagram DM.",
  },
  brand: { sub: "Tattoo Studio · Nonthaburi" },
  nav: { artists: "Artists", work: "Work", visit: "Visit", gallery: "Gallery", book: "Book via DM", language: "Language" },
  hero: {
    eyebrow: "Realistic · Black & Gray · Fine Detail",
    title: ["Custom work, designed", "for one person only."],
    lead: "Custom-designed tattoos — every piece starts from your own brief. A new needle every time, consultation included, credit cards accepted.",
  },
  artists: {
    title: "The artists",
    sub: "Three hands, three specialties",
    list: [
      {
        name: "Pe", handle: "[INSTAGRAM HANDLE]", image: "/images/pe-back-piece.jpg",
        alt: "Conceptual black and gray back piece by Pe",
        desc: "Large-scale and conceptual black & gray — leg and full sleeves, story-driven compositions.",
        tags: ["Sleeves", "Conceptual", "Snake & animal", "Floral", "Shibari rope-mark"],
      },
      {
        name: "Earth", handle: "[INSTAGRAM HANDLE]", image: "/images/earth-calligraphy.jpg",
        alt: "Calligraphy forearm piece by Earth",
        desc: "Lettering and calligraphy, Chicano and religious pieces, names and dates drawn to the client's brief.",
        tags: ["Lettering", "Calligraphy", "Chicano", "Religious", "Blackwork"],
      },
      {
        name: "Boom Scarmaker", handle: "[INSTAGRAM HANDLE]", image: "/images/boom-flash.jpg",
        alt: "Blackwork flash design by Boom Scarmaker",
        desc: "Original blackwork flash — one-off designs in A5 and A4 sizes. Ask for current availability and pricing.",
        tags: ["Blackwork", "Flash designs", "Dark illustrative"],
      },
    ],
  },
  work: {
    title: "Recent work",
    more: "See all on Instagram →",
    gallery: "View the full gallery →",
    list: [
      { title: "Leg sleeve", artist: "Pe", image: "/images/work-leg-sleeve-pe.jpg", alt: "Leg sleeve tattoo by Pe" },
      { title: "New Chicano", artist: "Earth", image: "/images/work-chicano-earth.jpg", alt: "New Chicano tattoo by Earth" },
      { title: "Snake & thunder", artist: "Pe", image: "/images/work-snake-thunder-pe.jpg", alt: "Snake and thunder tattoo by Pe" },
      { title: "“1999” lettering", artist: "Earth", image: "/images/work-1999-lettering-earth.jpg", alt: "1999 lettering tattoo by Earth" },
      { title: "Floral thigh piece", artist: "Pe", image: "/images/work-floral-thigh-pe.jpg", alt: "Floral thigh piece tattoo by Pe" },
      { title: "Life-story chest piece", artist: "Earth", image: "/images/work-chest-piece-earth.jpg", alt: "Life-story chest piece tattoo by Earth" },
      { title: "The Virgin Mary", artist: "Earth", image: "/images/work-virgin-mary-earth.jpg", alt: "Virgin Mary with rose forearm tattoo by Earth" },
      { title: "Hammerhead shark", artist: "Pe", image: "/images/work-hammerhead-shark-pe.jpg", alt: "Hammerhead shark blackwork shoulder tattoo by Pe" },
      { title: "Sagittarius", artist: "Earth", image: "/images/work-sagittarius-earth.jpg", alt: "Sagittarius archer forearm tattoo by Earth" },
    ],
  },
  visit: {
    title: "Visit & book",
    address: "Address", addressVal: "Tiwanon 45 (ติวานนท์ 45), near Pak Kret 5-way intersection, Nonthaburi",
    hours: "Hours", hoursVal: "[OPENING HOURS] · Booking only",
    contact: "Contact", contactVal: "Instagram DM for bookings and design consultations",
    payment: "Payment", paymentVal: "Credit cards accepted",
    ig: "Message on Instagram", maps: "Open in Google Maps", facebook: "Facebook [PAGE URL]", map: "[Map]",
    howTitle: "How to book", howBody: "[BOOKING STEPS — from the studio's highlight]",
    careTitle: "Aftercare", careBody: "[AFTERCARE STEPS — from the studio's highlight]",
  },
  gallery: {
    metaTitle: "Gallery · AC Art Tattoo Studio",
    metaDescription: "Browse recent tattoos from AC Art Tattoo Studio in Nonthaburi: realistic and black & gray by Pe, lettering and Chicano by Earth, blackwork flash by Boom Scarmaker.",
    title: "Gallery",
    sub: "Recent work from the studio's Instagram",
    all: "All",
    artists: { Pe: "Pe", Earth: "Earth", Boom: "Boom Scarmaker", Studio: "Studio" },
    open: "Open on Instagram",
    count: "pieces",
    more: "Show more",
  },
  footer: { text: "AC Art Tattoo Studio · Nonthaburi, Thailand" },
};

const th: Dictionary = {
  meta: {
    title: "AC Art Tattoo Studio · ร้านสัก นนทบุรี",
    description:
      "ร้านสักออกแบบเฉพาะบุคคล นนทบุรี งานเรียลลิสติก แบล็คแอนด์เกรย์ ตัวอักษร และแบล็คเวิร์ค โดย Pe, Earth และ Boom Scarmaker ติวานนท์ 45 ใกล้ปากเกร็ด จองคิวทาง Instagram DM",
  },
  brand: { sub: "สตูดิโอสัก · นนทบุรี" },
  nav: { artists: "ศิลปิน", work: "ผลงาน", visit: "ติดต่อ", gallery: "แกลเลอรี", book: "จองคิวทาง DM", language: "ภาษา" },
  hero: {
    eyebrow: "เรียลลิสติก · แบล็คแอนด์เกรย์ · งานละเอียด",
    title: ["งานสักออกแบบเฉพาะ", "สำหรับคุณคนเดียว"],
    lead: "ลายสักออกแบบเฉพาะบุคคล — ทุกชิ้นงานเริ่มจากไอเดียของคุณ ใช้เข็มใหม่ทุกครั้ง มีบริการให้คำปรึกษาเรื่องแบบ รับบัตรเครดิต",
  },
  artists: {
    title: "ศิลปินของเรา",
    sub: "สามช่าง สามความถนัด",
    list: [
      {
        name: "Pe", handle: "[INSTAGRAM HANDLE]", image: "/images/pe-back-piece.jpg",
        alt: "งานแบล็คแอนด์เกรย์คอนเซ็ปต์เต็มหลัง โดย Pe",
        desc: "งานแบล็คแอนด์เกรย์ชิ้นใหญ่และงานคอนเซ็ปต์ — สลีฟขาและแขนเต็ม องค์ประกอบที่เล่าเรื่องราว",
        tags: ["สลีฟ", "คอนเซ็ปต์", "งูและสัตว์", "ดอกไม้", "รอยเชือกชิบาริ"],
      },
      {
        name: "Earth", handle: "[INSTAGRAM HANDLE]", image: "/images/earth-calligraphy.jpg",
        alt: "งานคัลลิกราฟีบนท่อนแขน โดย Earth",
        desc: "ตัวอักษรและคัลลิกราฟี งานชิคาโนและงานศาสนา ชื่อและวันที่ออกแบบตามบรีฟของลูกค้า",
        tags: ["ตัวอักษร", "คัลลิกราฟี", "ชิคาโน", "งานศาสนา", "แบล็คเวิร์ค"],
      },
      {
        name: "Boom Scarmaker", handle: "[INSTAGRAM HANDLE]", image: "/images/boom-flash.jpg",
        alt: "ลายแฟลชแบล็คเวิร์ค โดย Boom Scarmaker",
        desc: "แฟลชแบล็คเวิร์คออริจินัล — ลายชิ้นเดียว ขนาด A5 และ A4 สอบถามคิวว่างและราคาได้เลย",
        tags: ["แบล็คเวิร์ค", "ลายแฟลช", "ดาร์คอิลลัสเตรทีฟ"],
      },
    ],
  },
  work: {
    title: "ผลงานล่าสุด",
    more: "ดูทั้งหมดบน Instagram →",
    gallery: "ดูแกลเลอรีทั้งหมด →",
    list: [
      { title: "สลีฟขา", artist: "Pe", image: "/images/work-leg-sleeve-pe.jpg", alt: "รอยสักสลีฟขา โดย Pe" },
      { title: "ชิคาโนชิ้นใหม่", artist: "Earth", image: "/images/work-chicano-earth.jpg", alt: "รอยสักชิคาโน โดย Earth" },
      { title: "งูและสายฟ้า", artist: "Pe", image: "/images/work-snake-thunder-pe.jpg", alt: "รอยสักงูและสายฟ้า โดย Pe" },
      { title: "ตัวอักษร “1999”", artist: "Earth", image: "/images/work-1999-lettering-earth.jpg", alt: "รอยสักตัวอักษร 1999 โดย Earth" },
      { title: "ลายดอกไม้ต้นขา", artist: "Pe", image: "/images/work-floral-thigh-pe.jpg", alt: "รอยสักดอกไม้บนต้นขา โดย Pe" },
      { title: "งานหน้าอกเล่าเรื่องชีวิต", artist: "Earth", image: "/images/work-chest-piece-earth.jpg", alt: "รอยสักหน้าอกเล่าเรื่องชีวิต โดย Earth" },
      { title: "พระแม่มารี", artist: "Earth", image: "/images/work-virgin-mary-earth.jpg", alt: "รอยสักพระแม่มารีกับดอกกุหลาบบนท่อนแขน โดย Earth" },
      { title: "ฉลามหัวค้อน", artist: "Pe", image: "/images/work-hammerhead-shark-pe.jpg", alt: "รอยสักฉลามหัวค้อนแบล็คเวิร์คบนไหล่ โดย Pe" },
      { title: "ราศีธนู", artist: "Earth", image: "/images/work-sagittarius-earth.jpg", alt: "รอยสักราศีธนูบนท่อนแขน โดย Earth" },
    ],
  },
  visit: {
    title: "ที่ตั้งและการจอง",
    address: "ที่อยู่", addressVal: "ติวานนท์ 45 ใกล้ห้าแยกปากเกร็ด นนทบุรี",
    hours: "เวลาทำการ", hoursVal: "[เวลาทำการ] · รับเฉพาะจองคิวล่วงหน้า",
    contact: "ติดต่อ", contactVal: "ทัก DM ทาง Instagram เพื่อจองคิวและปรึกษาการออกแบบ",
    payment: "การชำระเงิน", paymentVal: "รับบัตรเครดิต",
    ig: "ทักทาง Instagram", maps: "เปิดใน Google Maps", facebook: "Facebook [PAGE URL]", map: "[แผนที่]",
    howTitle: "ขั้นตอนการจองคิว", howBody: "[ขั้นตอนการจอง — จากไฮไลต์ของร้าน]",
    careTitle: "วิธีดูแลรอยสัก", careBody: "[วิธีดูแลรอยสัก — จากไฮไลต์ของร้าน]",
  },
  gallery: {
    metaTitle: "แกลเลอรี · AC Art Tattoo Studio",
    metaDescription: "ชมผลงานรอยสักล่าสุดจาก AC Art Tattoo Studio นนทบุรี งานเรียลลิสติกและแบล็คแอนด์เกรย์โดย Pe ตัวอักษรและชิคาโนโดย Earth แฟลชแบล็คเวิร์คโดย Boom Scarmaker",
    title: "แกลเลอรี",
    sub: "ผลงานล่าสุดจาก Instagram ของร้าน",
    all: "ทั้งหมด",
    artists: { Pe: "Pe", Earth: "Earth", Boom: "Boom Scarmaker", Studio: "ร้าน" },
    open: "เปิดบน Instagram",
    count: "ชิ้น",
    more: "ดูเพิ่มเติม",
  },
  footer: { text: "AC Art Tattoo Studio · นนทบุรี ประเทศไทย" },
};

const dictionaries: Record<Lang, Dictionary> = { en, th };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
