import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  ShieldCheck,
  Lock,
  Key,
  Eye,
  EyeOff,
  Gavel,
  CheckCircle2,
  Building2,
  BadgeAlert,
  Loader2,
  Radio,
  LifeBuoy,
  Flag,
  UserCheck,
} from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const [currentRole, setCurrentRole] = useState("admin");
  const [agencyId, setAgencyId] = useState("METRO-CID-09");
  const [email, setEmail] = useState("admin@intellitrack.gov");
  const [password, setPassword] = useState("Admin@123456");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberWorkstation, setRememberWorkstation] = useState(true);
  const [authState, setAuthState] = useState("idle");

  const switchRole = (role) => {
    setCurrentRole(role);
    if (role === "admin") {
      setEmail("admin@intellitrack.gov");
      setPassword("Admin@123456");
    } else if (role === "agent") {
      setEmail("agent@intellitrack.gov");
      setPassword("Agent@123456");
    } else {
      setEmail("analyst@intellitrack.gov");
      setPassword("Agent@123456");
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (authState !== "idle") return;

    setAuthState("handshake");
    try {
      await login(email, password);
      setAuthState("authorized");
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 600);
    } catch (err) {
      setAuthState("idle");
    }
  };

  return (
    <div className="min-h-screen w-full bg-navy-950 font-sans text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 antialiased selection:bg-steel-600 selection:text-white">
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="flex flex-col w-full items-center justify-center py-6 z-10">
        <div className="w-full max-w-2xl bg-navy-900 border border-navy-700/80 rounded-xl shadow-2xl overflow-hidden relative backdrop-blur-sm">
          {/* Top Bar */}
          <div className="bg-navy-950 px-5 py-2.5 flex items-center justify-between border-b border-navy-800">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-threat-low animate-pulse" />
              <span className="font-mono text-[11px] text-steel-400 font-semibold tracking-wider uppercase">
                SEC-LEVEL: RESTRICTED ACCESS
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-threat-low" />
              <span>CJIS STANDARD LEVEL 4</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-12 h-12 mb-2 rounded-lg bg-navy-800 border border-steel-500/30 flex items-center justify-center shadow-md">
                <ShieldCheck className="w-8 h-8 text-steel-400" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-white tracking-tight">IntelliTrack</h1>
                <span className="bg-navy-800 border border-navy-700 px-2 py-0.5 rounded text-steel-400 font-mono text-[11px] font-semibold">
                  v4.8.2-FED
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md font-sans leading-relaxed">
                Criminal Intelligence, Cross-Jurisdictional Fusion & Tactical Operations Engine
              </p>
              <div className="mt-3.5 w-full bg-navy-950/70 border border-steel-900/60 p-2.5 rounded flex items-center justify-center gap-2">
                <Gavel className="w-4 h-4 text-steel-400 shrink-0" />
                <span className="font-mono text-[10px] sm:text-[11px] text-steel-300 font-semibold tracking-wider uppercase">
                  Official Use Only — CJIS Level 4 Authorized Personnel
                </span>
              </div>
            </div>

            {/* Quick-Fill Profiles */}
            <div className="flex items-center justify-between p-2 rounded bg-navy-950 border border-navy-800 text-[11px] font-mono">
              <span className="text-slate-400 uppercase tracking-wider">Quick Fill:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchRole("admin")}
                  className="px-2 py-0.5 rounded bg-steel-900/60 hover:bg-steel-800 border border-steel-700 text-steel-300 text-[10px] font-semibold transition-colors"
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => switchRole("agent")}
                  className="px-2 py-0.5 rounded bg-navy-800 hover:bg-navy-700 border border-navy-600 text-slate-300 text-[10px] font-semibold transition-colors"
                >
                  Investigator
                </button>
                <button
                  type="button"
                  onClick={() => switchRole("analyst")}
                  className="px-2 py-0.5 rounded bg-navy-800 hover:bg-navy-700 border border-navy-600 text-slate-300 text-[10px] font-semibold transition-colors"
                >
                  Analyst
                </button>
              </div>
            </div>

            {/* Clearance Roles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => switchRole("admin")}
                className={`text-left p-4 rounded-lg transition-all duration-150 relative cursor-pointer flex flex-col justify-between border ${
                  currentRole === "admin"
                    ? "bg-navy-800/90 border-steel-500 shadow-md ring-1 ring-steel-500/50"
                    : "bg-navy-950/60 border-navy-800 hover:border-navy-700 opacity-75 hover:opacity-100"
                }`}
              >
                <div className="flex items-start justify-between w-full mb-2">
                  <div
                    className={`w-8 h-8 rounded flex items-center justify-center ${
                      currentRole === "admin"
                        ? "bg-steel-600/30 text-steel-400 border border-steel-500/40"
                        : "bg-navy-800 text-slate-400"
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                  </div>
                  {currentRole === "admin" && (
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-steel-600 text-white font-bold uppercase tracking-wider">
                      ACTIVE
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm text-white font-semibold mb-0.5">Admin Clearance</p>
                  <p className="text-[11px] text-steel-400 font-medium mb-1">Command Oversight</p>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    User management, case jurisdiction, system audit logs, and compliance governance.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => switchRole("agent")}
                className={`text-left p-4 rounded-lg transition-all duration-150 relative cursor-pointer flex flex-col justify-between border ${
                  currentRole === "agent"
                    ? "bg-navy-800/90 border-steel-500 shadow-md ring-1 ring-steel-500/50"
                    : "bg-navy-950/60 border-navy-800 hover:border-navy-700 opacity-75 hover:opacity-100"
                }`}
              >
                <div className="flex items-start justify-between w-full mb-2">
                  <div
                    className={`w-8 h-8 rounded flex items-center justify-center ${
                      currentRole === "agent"
                        ? "bg-steel-600/30 text-steel-400 border border-steel-500/40"
                        : "bg-navy-800 text-slate-400"
                    }`}
                  >
                    <Radio className="w-4 h-4" />
                  </div>
                  {currentRole === "agent" && (
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-steel-600 text-white font-bold uppercase tracking-wider">
                      ACTIVE
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm text-white font-semibold mb-0.5">Investigator Clearance</p>
                  <p className="text-[11px] text-steel-400 font-medium mb-1">Field Operations</p>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Case dossiers, suspect registry, link charts, leads review, and evidence chain.
                  </p>
                </div>
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4 font-mono">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-slate-300 font-semibold uppercase tracking-wider flex items-center justify-between">
                  <span>Agency Identification Code</span>
                  <span className="text-[10px] text-slate-500">FORMAT: [AGENCY-DIV-UNIT]</span>
                </label>
                <div className="relative flex items-center">
                  <Building2 className="w-4 h-4 absolute left-3 text-slate-500" />
                  <input
                    type="text"
                    value={agencyId}
                    onChange={(e) => setAgencyId(e.target.value)}
                    required
                    className="w-full h-10 pl-9 pr-9 bg-navy-950 border border-navy-700 rounded text-slate-200 text-xs placeholder:text-slate-600 focus:outline-none focus:border-steel-500 transition-colors shadow-inner font-mono"
                    placeholder="e.g., METRO-CID-09"
                  />
                  <span title="Agency verified" className="absolute right-3 flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-threat-low" />
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-slate-300 font-semibold uppercase tracking-wider flex items-center justify-between">
                  <span>Officer / Agent Email Credentials</span>
                  <span className="text-[10px] text-slate-500">AUTH ID REQUIRED</span>
                </label>
                <div className="relative flex items-center">
                  <BadgeAlert className="w-4 h-4 absolute left-3 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-10 pl-9 pr-3 bg-navy-950 border border-navy-700 rounded text-slate-200 text-xs placeholder:text-slate-600 focus:outline-none focus:border-steel-500 transition-colors shadow-inner font-mono"
                    placeholder="e.g., admin@intellitrack.gov"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] text-slate-300 font-semibold uppercase tracking-wider">
                    Cryptographic Passkey
                  </label>
                  <span className="text-[10px] text-steel-400 font-semibold">FIPS-140-3 LEVEL 2</span>
                </div>
                <div className="relative flex items-center">
                  <Key className="w-4 h-4 absolute left-3 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-10 pl-9 pr-10 bg-navy-950 border border-navy-700 rounded text-slate-200 text-xs placeholder:text-slate-600 focus:outline-none focus:border-steel-500 transition-colors shadow-inner font-mono"
                    placeholder="Enter secure session passkey"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-500 hover:text-slate-300 p-1"
                    title={showPassword ? "Hide passkey" : "Show passkey"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberWorkstation}
                    onChange={(e) => setRememberWorkstation(e.target.checked)}
                    className="w-4 h-4 rounded text-steel-600 bg-navy-950 border-navy-700 focus:ring-0 cursor-pointer"
                  />
                  <span className="text-slate-400 text-[11px]">Register CJIS-Hardened Workstation</span>
                </label>
                <Link to="/forgot-password" className="text-[11px] text-steel-400 hover:underline font-mono">
                  Forgot Passkey?
                </Link>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={authState !== "idle"}
                  className={`w-full h-11 rounded font-mono text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-2 shadow-lg transition-all duration-150 cursor-pointer ${
                    authState === "handshake"
                      ? "bg-steel-700 text-white cursor-wait opacity-90"
                      : authState === "authorized"
                      ? "bg-threat-low text-white font-bold"
                      : "bg-steel-600 hover:bg-steel-500 text-white active:scale-[0.99]"
                  }`}
                >
                  {authState === "handshake" && (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-steel-200" />
                      <span>Verifying Cryptographic Credentials...</span>
                    </>
                  )}
                  {authState === "authorized" && (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Handshake Authorized — Initializing Terminal...</span>
                    </>
                  )}
                  {authState === "idle" && (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Authenticate & Enter Secure Terminal</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-1">
                <span>Need to register new officer clearance?</span>
                <Link to="/signup" className="text-steel-400 hover:underline font-semibold font-mono">
                  Sign Up
                </Link>
              </div>

              <div className="p-2.5 bg-navy-950 border border-navy-800 rounded flex items-center justify-between text-slate-400 text-[10px]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-threat-low" />
                  <span>Session protected by 256-bit AES-GCM encryption</span>
                </div>
                <span className="text-steel-400 font-semibold">TLS 1.3 SECURED</span>
              </div>
            </form>

            {/* Legal Notice */}
            <div className="bg-navy-950/80 border border-navy-800 p-3 rounded text-left">
              <p className="font-mono text-[10px] text-slate-400 leading-relaxed">
                <strong className="text-white font-semibold">LEGAL WARNING:</strong> Authorized personnel only. All access, cross-queries, dossier views, and analytical exports are continuously logged, cryptographically hashed, and audited in direct compliance with Federal CJIS Standards. Unauthorized access attempts or misuse is tracked via IP/MAC mapping and is subject to immediate disciplinary suspension and federal criminal prosecution under 18 U.S.C. § 1030.
              </p>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="bg-navy-950 px-6 py-2.5 flex flex-wrap items-center justify-between gap-y-2 border-t border-navy-800 text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-threat-low opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-threat-low" />
              </span>
              <span className="text-slate-300 font-medium">Node 04: Active & Operational</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1 hover:text-steel-300 transition-colors cursor-pointer">
                <LifeBuoy className="w-3 h-3 text-steel-400" />
                <span>Dispatch: ext. 4401</span>
              </span>
              <span className="text-navy-700">|</span>
              <span className="flex items-center gap-1 hover:text-threat-critical transition-colors cursor-pointer">
                <Flag className="w-3 h-3 text-threat-critical" />
                <span>Report Security Issue</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 text-slate-500 font-mono text-[11px]">
          <span>SYSTEM NODE: DC-FED-EAST-01</span>
          <span>•</span>
          <span>HASH: 8F7E412A</span>
          <span>•</span>
          <span className="text-steel-400">DISPATCH READY</span>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
export default LoginPage;
