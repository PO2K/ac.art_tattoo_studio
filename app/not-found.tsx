import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container" style={{ padding: "120px 24px", textAlign: "center" }}>
      <h1 className="serif" style={{ fontSize: 44, margin: 0 }}>Page not found</h1>
      <p style={{ color: "var(--body)" }}>
        <Link href="/">Back to AC Art Tattoo Studio</Link>
      </p>
    </main>
  );
}
