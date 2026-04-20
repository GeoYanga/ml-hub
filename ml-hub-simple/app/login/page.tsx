"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Mode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);
  const [loading, setLoading] = useState(false);

  const switchMode = (m: Mode) => { setMode(m); setMessage(null); };

  const handleSubmit = async () => {
    setMessage(null);
    if (!email || !password) {
      setMessage({ text: "Please enter your email and password.", type: "error" });
      return;
    }
    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setMessage({ text: error.message, type: "error" });
      } else {
        setMessage({ text: "Account created! You can now log in.", type: "success" });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage({ text: error.message, type: "error" });
      } else {
        router.push("/dashboard");
      }
    }
    setLoading(false);
  };

  return (
    <div className="page">
      {/* Nav */}
      <nav className="nav fade">
        <div className="logo">
          <span className="logo-bracket">[</span>
          ML<span className="logo-cyan">Hub</span>
          <span className="logo-bracket">]</span>
        </div>
        <Link href="/" className="btn btn-ghost">← Back</Link>
      </nav>

      {/* Card */}
      <div className="center">
        <div className="card fade-1">

          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab ${mode === "login" ? "tab-active" : ""}`}
              onClick={() => switchMode("login")}
            >
              Login
            </button>
            <button
              className={`tab ${mode === "signup" ? "tab-active" : ""}`}
              onClick={() => switchMode("signup")}
            >
              Sign Up
            </button>
          </div>

          <div className="card-body">
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-.03em", marginBottom: ".4rem" }}>
              {mode === "login" ? "Welcome back" : "Create account"}
            </h1>
            <p style={{ fontFamily: "var(--mono)", fontSize: ".78rem", color: "var(--muted)", marginBottom: "1.75rem" }}>
              {mode === "login"
                ? "Sign in to your Machine Learning Hub account."
                : "Join Machine Learning Hub for free."}
            </p>

            {/* Email */}
            <div className="field">
              <label>Email Address</label>
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>

            {/* Password */}
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>

            {/* Message */}
            {message && (
              <div className={`msg ${message.type === "error" ? "msg-error" : "msg-success"}`}>
                <span>{message.type === "error" ? "✕" : "✓"}</span>
                {message.text}
              </div>
            )}

            {/* Sign Up button */}
            {mode === "signup" && (
              <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? "Please wait…" : "Sign Up"}
              </button>
            )}

            {/* Login button */}
            {mode === "login" && (
              <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? "Please wait…" : "Login"}
              </button>
            )}

            {mode === "login" && (
              <button className="btn btn-outline" onClick={() => switchMode("signup")}>
                No account? Sign Up
              </button>
            )}
          </div>

          <div className="foot-note">
            Secured by <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">Supabase Auth</a>
          </div>
        </div>
      </div>
    </div>
  );
}
