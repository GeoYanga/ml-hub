import Link from "next/link";

export default function Home() {
  return (
    <div className="page">
      {/* Nav */}
      <nav className="nav fade">
        <div className="logo">
          <span className="logo-bracket">[</span>
          ML<span className="logo-cyan">Hub</span>
          <span className="logo-bracket">]</span>
        </div>
        <Link href="/login" className="btn btn-ghost">Sign In</Link>
      </nav>

      {/* Hero */}
      <div className="center">
        <div style={{ textAlign: "center", maxWidth: "600px" }}>

          <p className="fade" style={{
            fontFamily: "var(--mono)", fontSize: ".72rem",
            letterSpacing: ".15em", textTransform: "uppercase",
            color: "var(--muted)", marginBottom: "1.5rem",
            display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem"
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "var(--cyan)", boxShadow: "0 0 8px var(--cyan)",
              display: "inline-block"
            }} />
            System Integration &amp; Architecture — Lab 4
          </p>

          <h1 className="fade-1" style={{
            fontSize: "clamp(3rem, 10vw, 6rem)",
            fontWeight: 800, lineHeight: .92,
            letterSpacing: "-.04em", marginBottom: "1.5rem"
          }}>
            Machine<br />
            <span style={{ color: "var(--cyan)" }}>Learning</span> Hub
          </h1>

          <p className="fade-2" style={{
            fontFamily: "var(--mono)", fontSize: ".9rem",
            lineHeight: 1.8, color: "var(--muted)",
            marginBottom: "2.5rem"
          }}>
            A simple integrated platform for exploring machine learning concepts.
            Built with Next.js, secured by Supabase Authentication,
            and deployed on Vercel.
          </p>

          <div className="fade-3" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/login" style={{
              display: "inline-flex", alignItems: "center", gap: ".5rem",
              background: "var(--cyan)", color: "var(--bg)",
              fontFamily: "var(--mono)", fontSize: ".875rem",
              fontWeight: 600, padding: ".85rem 2.5rem",
              borderRadius: "4px", textDecoration: "none",
              transition: "all .2s"
            }}>
              Get Started →
            </Link>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid var(--border)",
        padding: "1.25rem 2.5rem",
        textAlign: "center",
        fontFamily: "var(--mono)",
        fontSize: ".68rem",
        color: "var(--muted)"
      }}>
        © 2025 Machine Learning Hub — Next.js · Supabase · Vercel
      </footer>
    </div>
  );
}
