import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Shield,
  Lock,
  Key,
  Eye,
  EyeOff,
  CheckCircle2,
  Building2,
  BadgeAlert,
  Loader2,
  Radio,
  Activity,
  ArrowRight,
  Fingerprint
} from "lucide-react";
import NetworkHeroCanvas from "@/components/common/NetworkHeroCanvas";

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
  const [errorMessage, setErrorMessage] = useState("");

  const switchRole = (role) => {
    setCurrentRole(role);
    setErrorMessage("");
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

    setErrorMessage("");
    setAuthState("handshake");
    try {
      await login(email, password);
      setAuthState("authorized");
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
    } catch (err) {
      setErrorMessage(err.message || "Authentication failed. Invalid clearance credentials.");
      setAuthState("idle");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d0f11] font-sans text-[#f3f4f6] flex items-center justify-center p-4 sm:p-6 antialiased selection:bg-[#9cae9b] selection:text-[#0d130e]">
      {/* Background ambient pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#9cae9b_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="w-full max-w-4xl bg-[#14171c] border border-[#222731] rounded-2xl shadow-2xl overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Hero Column */}
        <div className="lg:col-span-5 bg-[#101317] p-8 border-b lg:border-b-0 lg:border-r border-[#222731] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0">
            <NetworkHeroCanvas className="opacity-40" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#181c22] border border-[#2e3745] flex items-center justify-center text-[#9cae9b] shadow-xs">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-sm tracking-wider uppercase text-white font-sans">
                  IntelliTrack
                </span>
                <span className="block text-[9px] font-mono text-[#606875] tracking-widest uppercase">
                  Intelligence Suite
                </span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-tight">
              Investigative Intelligence & Criminal Network Fusion.
            </h2>

            <p className="mt-3 text-xs text-[#9ca3af] leading-relaxed">
              Connect fragmented signals, telephone records, ALPR surveillance, and transaction graphs into explainable intelligence dossiers.
            </p>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-[#1e232a] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#606875]">Tracked Entities:</span>
              <span className="text-white font-semibold">1,482</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#606875]">Network Links:</span>
              <span className="text-white font-semibold">5,839</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#606875]">System Status:</span>
              <span className="text-[#8fa38d] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8fa38d] animate-pulse" />
                OPERATIONAL
              </span>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between bg-[#14171c]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-lg font-semibold text-white">Sign In</h1>
                <p className="text-xs text-[#9ca3af] mt-0.5">
                  Enter authorized officer credentials to initialize workspace session.
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#18261c] text-[#8fa38d] border border-[#25392b]">
                CJIS SEC-4
              </span>
            </div>

            {/* Role Switcher Demo Buttons */}
            <div className="mb-6 p-1 bg-[#101317] rounded-lg border border-[#222731] flex items-center gap-1">
              <button
                type="button"
                onClick={() => switchRole("admin")}
                className={`flex-1 py-1.5 px-2 rounded text-xs font-medium transition-all ${
                  currentRole === "admin"
                    ? "bg-[#181c22] text-[#f3f4f6] shadow-xs border border-[#28303e]"
                    : "text-[#606875] hover:text-[#9ca3af]"
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => switchRole("agent")}
                className={`flex-1 py-1.5 px-2 rounded text-xs font-medium transition-all ${
                  currentRole === "agent"
                    ? "bg-[#181c22] text-[#f3f4f6] shadow-xs border border-[#28303e]"
                    : "text-[#606875] hover:text-[#9ca3af]"
                }`}
              >
                Investigator
              </button>
              <button
                type="button"
                onClick={() => switchRole("analyst")}
                className={`flex-1 py-1.5 px-2 rounded text-xs font-medium transition-all ${
                  currentRole === "analyst"
                    ? "bg-[#181c22] text-[#f3f4f6] shadow-xs border border-[#28303e]"
                    : "text-[#606875] hover:text-[#9ca3af]"
                }`}
              >
                Analyst
              </button>
            </div>

            {/* Inline Error Notice */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
                <BadgeAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9ca3af] font-medium mb-1.5">
                  Officer / Analyst Email or Badge ID
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    required
                    placeholder="officer@intellitrack.gov or BADGE-0001"
                    className="w-full h-9.5 px-3 bg-[#101317] border border-[#222731] rounded-md text-xs text-white placeholder-[#606875] focus:outline-none focus:border-[#9cae9b] transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9ca3af] font-medium">
                    Session Passkey
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-[11px] text-[#9cae9b] hover:underline font-mono"
                  >
                    Forgot passkey?
                  </Link>
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter passkey"
                    className="w-full h-9.5 pl-3 pr-9 bg-[#101317] border border-[#222731] rounded-md text-xs text-white placeholder-[#606875] focus:outline-none focus:border-[#9cae9b] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-[#606875] hover:text-white p-0.5"
                    title={showPassword ? "Hide" : "Show"}
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-[#9ca3af]">
                  <input
                    type="checkbox"
                    checked={rememberWorkstation}
                    onChange={(e) => setRememberWorkstation(e.target.checked)}
                    className="w-3.5 h-3.5 rounded bg-[#101317] border-[#222731] text-[#9cae9b] focus:ring-0"
                  />
                  <span>Remember secure workstation</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={authState !== "idle"}
                  className="w-full h-10 rounded-md bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c] active:bg-[#7f917e] text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer font-sans"
                >
                  {authState === "handshake" ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Authenticating Credentials...</span>
                    </>
                  ) : authState === "authorized" ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Access Granted</span>
                    </>
                  ) : (
                    <>
                      <span>Enter Investigation Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="pt-6 border-t border-[#1e232a] flex items-center justify-between text-xs text-[#606875]">
            <span>Need new agent clearance?</span>
            <Link to="/signup" className="text-[#9cae9b] hover:underline font-medium font-sans">
              Register Credentials →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
export default LoginPage;
