"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
        setLoading(false);
      }
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "1rem",
        background: "var(--bg)"
      }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "50%",
          border: "2px solid var(--border)", borderTopColor: "var(--cyan)",
          animation: "spin .7s linear infinite"
        }} />
        <p style={{ fontFamily: "var(--mono)", fontSize: ".8rem", color: "var(--muted)" }}>
          Verifying session…
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      {/* Nav */}
      <nav className="nav fade">
        <div className="logo">
          <span className="logo-bracket">[</span>
          ML<span className="logo-cyan">Hub</span>
          <span className="logo-bracket">]</span>
        </div>
        <button className="btn btn-ghost" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Welcome */}
      <div className="center">
        <div style={{ textAlign: "center", maxWidth: "500px" }}>

          {/* Verified badge */}
          <div className="fade" style={{
            display: "inline-flex", alignItems: "center", gap: ".5rem",
            background: "rgba(0,255,170,.07)", border: "1px solid rgba(0,255,170,.2)",
            borderRadius: "20px", padding: ".35rem 1rem",
            fontFamily: "var(--mono)", fontSize: ".7rem", color: "#00d48a",
            marginBottom: "1.75rem"
          }}>
            <span>✓</span> Logged in via Supabase Auth
          </div>

          {/* Welcome message */}
          <h1 className="fade-1" style={{
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: "-.03em", marginBottom: "1rem"
          }}>
            Welcome to<br />
            <span style={{ color: "var(--cyan)" }}>ML Hub!</span>
          </h1>

          {/* User email */}
          <div className="fade-2" style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: "6px", padding: "1rem 1.5rem",
            marginBottom: "2rem"
          }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: ".7rem", color: "var(--muted)", marginBottom: ".3rem", letterSpacing: ".1em", textTransform: "uppercase" }}>
              Logged in as
            </p>
            <p style={{ fontFamily: "var(--mono)", fontSize: ".95rem", color: "var(--cyan)" }}>
              {user?.email}
            </p>
          </div>

          {/* Logout button */}
          <div className="fade-3">
            <button
              onClick={handleLogout}
              style={{
                display: "inline-flex", alignItems: "center", gap: ".5rem",
                background: "transparent", color: "var(--muted)",
                border: "1px solid var(--border)", borderRadius: "4px",
                padding: ".75rem 2rem", fontFamily: "var(--mono)",
                fontSize: ".875rem", cursor: "pointer", transition: "all .2s"
              }}
              onMouseEnter={e => {
                (e.target as HTMLButtonElement).style.color = "var(--text)";
                (e.target as HTMLButtonElement).style.borderColor = "var(--muted)";
              }}
              onMouseLeave={e => {
                (e.target as HTMLButtonElement).style.color = "var(--muted)";
                (e.target as HTMLButtonElement).style.borderColor = "var(--border)";
              }}
            >
              Logout ↗
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
