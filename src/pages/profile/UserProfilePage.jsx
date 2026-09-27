import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ClearanceBadge } from "@/components/common/ClearanceBadge";
import { HashStamp } from "@/components/common/HashStamp";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  Key,
  Laptop,
  LogOut,
  CheckCircle,
  RotateCw,
  User,
  Shield,
  Mail,
  Phone,
  Building2,
  Lock,
  Clock,
  Briefcase,
  Award,
  FileText,
  Share2,
  HardDrive
} from "lucide-react";

export const UserProfilePage = () => {
  const { user, role, switchRole, logout } = useAuth();
  const [sessions, setSessions] = useState([
    {
      id: "sess-1",
      device: "Workstation WS-8831-B (Current)",
      location: "Federal Field Office · TOC Command Node",
      ip: "10.142.18.99",
      active: true,
      authMethod: "FIPS 201 PIV Card"
    },
    {
      id: "sess-2",
      device: "Mobile Tactical Terminal TAC-AIR-02",
      location: "Field Vehicle Intercept Rig",
      ip: "10.142.22.14",
      active: false,
      lastActive: "2 hours ago",
      authMethod: "Hardware Key + 2FA"
    }
  ]);

  const handleRevokeSession = (id) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222731]">
        <div>
          <div className="flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider font-mono mb-1">
            <span>IDENTITY & ACCESS GOVERNANCE</span>
            <span>/</span>
            <span className="text-tactical-sage-400 font-semibold">ANALYST PROFILE</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Analyst Profile & Security Clearance
          </h1>
          <p className="text-xs text-tactical-neutral-400 mt-0.5">
            Cryptographic token credentials, active terminal sessions, and case ownership
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => switchRole(role === "ADMIN" ? "AGENT" : "ADMIN")}
            icon={<RotateCw className="w-3.5 h-3.5" />}
            className="border-[#222731] hover:border-tactical-neutral-700 text-xs font-mono"
          >
            Role: {role === "ADMIN" ? "Supervisor" : "Analyst"}
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={logout}
            icon={<LogOut className="w-3.5 h-3.5" />}
            className="text-xs font-mono"
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* User Hero Card */}
      <div className="p-6 bg-[#14171c] border border-[#222731] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#1c222b] to-[#12161c] border border-[#2e3644] text-tactical-sage-400 font-mono font-bold text-2xl flex items-center justify-center shadow-inner">
              {user?.fullName ? user.fullName.split(" ").map(n => n[0]).join("") : "MK"}
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-tactical-success-400 border-2 border-[#14171c]" />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-lg font-bold text-white tracking-tight">
                {user?.fullName || "M. Kessler"}
              </h2>
              <Badge variant="sage" size="sm" className="font-mono text-[10px] uppercase">
                {role === "ADMIN" ? "Lead Supervisor" : "Senior Analyst · L4"}
              </Badge>
              <ClearanceBadge level={user?.clearanceLevel || "CJIS_LEVEL_4"} />
            </div>

            <p className="text-xs text-tactical-neutral-400 flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-tactical-neutral-500" />
              {user?.agency || "Federal Bureau of Investigation"} · Special Investigative Division
            </p>

            <div className="flex items-center gap-4 text-[11px] font-mono text-tactical-neutral-500 pt-1">
              <span>BADGE: <strong className="text-tactical-neutral-300">{user?.badgeNumber || "FED-89412-K"}</strong></span>
              <span>•</span>
              <span>ID: <strong className="text-tactical-neutral-300">ANL-0921-US</strong></span>
            </div>
          </div>
        </div>

        <div className="flex md:flex-col items-end justify-between gap-2 shrink-0 border-t md:border-t-0 border-[#222731] pt-4 md:pt-0">
          <Button
            variant="secondary"
            size="sm"
            className="border-[#222731] text-xs"
            onClick={() => alert("Profile edit request forwarded to administrator.")}
          >
            Edit Profile
          </Button>
          <span className="text-[10px] font-mono text-tactical-neutral-500">
            Audit stamp: 2026-09-26 22:15 UTC
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details & Security */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="p-5 bg-[#14171c] border border-[#222731] rounded-xl space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-tactical-neutral-300 flex items-center gap-2">
              <User className="w-4 h-4 text-tactical-sage-400" />
              Analyst Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-[#101317] border border-[#222731]/70 rounded-lg">
                <span className="text-[10px] uppercase text-tactical-neutral-500 block mb-1">Full Legal Name</span>
                <span className="font-sans font-medium text-white">{user?.fullName || "Marcus Kessler"}</span>
              </div>

              <div className="p-3 bg-[#101317] border border-[#222731]/70 rounded-lg">
                <span className="text-[10px] uppercase text-tactical-neutral-500 block mb-1">Official Agency Email</span>
                <span className="text-tactical-neutral-200">{user?.email || "m.kessler@investigations.gov"}</span>
              </div>

              <div className="p-3 bg-[#101317] border border-[#222731]/70 rounded-lg">
                <span className="text-[10px] uppercase text-tactical-neutral-500 block mb-1">Assigned Division</span>
                <span className="font-sans font-medium text-white">Organized Crime & Financial Intelligence Taskforce</span>
              </div>

              <div className="p-3 bg-[#101317] border border-[#222731]/70 rounded-lg">
                <span className="text-[10px] uppercase text-tactical-neutral-500 block mb-1">Jurisdiction / Duty Station</span>
                <span className="font-sans font-medium text-white">Washington D.C. HQ (Sector 4)</span>
              </div>
            </div>
          </div>

          {/* Cryptographic Keys & Hardware Security */}
          <div className="p-5 bg-[#14171c] border border-[#222731] rounded-xl space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-tactical-neutral-300 flex items-center gap-2">
              <Key className="w-4 h-4 text-tactical-sage-400" />
              Cryptographic Token Binding & Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 bg-[#101317] border border-[#222731]/70 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase text-tactical-neutral-500">FIPS 201 PIV Card Serial</span>
                  <Badge variant="success" size="sm" className="text-[9px]">BOUND</Badge>
                </div>
                <div className="font-bold text-white">
                  {user?.pivCardSerial || "PIV-9904-8172-FED-L4"}
                </div>
                <div className="text-[11px] text-tactical-neutral-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-tactical-success-400" />
                  Hardware Security Module Validated
                </div>
              </div>

              <div className="p-3.5 bg-[#101317] border border-[#222731]/70 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase text-tactical-neutral-500">RSA-4096 Signature Fingerprint</span>
                  <Badge variant="neutral" size="sm" className="text-[9px]">ACTIVE</Badge>
                </div>
                <div>
                  <HashStamp hash={user?.publicKeyFingerprint || "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"} lead={8} tail={8} />
                </div>
                <div className="text-[10px] text-tactical-neutral-500">
                  Used for digital evidence chain-of-custody signing
                </div>
              </div>
            </div>
          </div>

          {/* Active Classified Terminal Sessions */}
          <div className="p-5 bg-[#14171c] border border-[#222731] rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-tactical-neutral-300 flex items-center gap-2">
                <Laptop className="w-4 h-4 text-tactical-sage-400" />
                Active Terminal Sessions
              </h3>
              <Button
                variant="secondary"
                size="sm"
                className="text-[10px] py-1 border-[#222731]"
                onClick={() => setSessions(sessions.filter(s => s.active))}
              >
                Revoke All Others
              </Button>
            </div>

            <div className="space-y-2">
              {sessions.map((sess) => (
                <div
                  key={sess.id}
                  className="p-3 bg-[#101317] border border-[#222731]/70 rounded-lg flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-white">{sess.device}</span>
                      {sess.active ? (
                        <Badge variant="success" size="sm" className="text-[9px]">ACTIVE NOW</Badge>
                      ) : (
                        <Badge variant="neutral" size="sm" className="text-[9px]">INACTIVE</Badge>
                      )}
                    </div>
                    <div className="text-[11px] text-tactical-neutral-400 font-mono">
                      {sess.location} · IP: {sess.ip} · {sess.authMethod}
                    </div>
                  </div>

                  {!sess.active && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleRevokeSession(sess.id)}
                      className="text-[10px] py-1 text-tactical-danger-400 hover:text-tactical-danger-300 border-[#222731]"
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Activity Stats & Certs */}
        <div className="space-y-6">
          {/* Investigation Summary */}
          <div className="p-5 bg-[#14171c] border border-[#222731] rounded-xl space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-tactical-neutral-300 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-tactical-sage-400" />
              Investigation Activity
            </h3>

            <div className="space-y-2.5 font-mono">
              <div className="p-3 bg-[#101317] border border-[#222731]/70 rounded-lg flex items-center justify-between">
                <span className="text-xs text-tactical-neutral-400">Cases Owned</span>
                <span className="text-sm font-bold text-white">14 Active</span>
              </div>

              <div className="p-3 bg-[#101317] border border-[#222731]/70 rounded-lg flex items-center justify-between">
                <span className="text-xs text-tactical-neutral-400">Entities Linked</span>
                <span className="text-sm font-bold text-tactical-sage-400">248 Nodes</span>
              </div>

              <div className="p-3 bg-[#101317] border border-[#222731]/70 rounded-lg flex items-center justify-between">
                <span className="text-xs text-tactical-neutral-400">Evidence Verified</span>
                <span className="text-sm font-bold text-white">89 Artifacts</span>
              </div>

              <div className="p-3 bg-[#101317] border border-[#222731]/70 rounded-lg flex items-center justify-between">
                <span className="text-xs text-tactical-neutral-400">Reports Filed</span>
                <span className="text-sm font-bold text-white">19 Briefings</span>
              </div>
            </div>
          </div>

          {/* Compliance & Audit Attestation */}
          <div className="p-5 bg-[#14171c] border border-[#222731] rounded-xl space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-tactical-sage-400 font-bold">
              <Shield className="w-4 h-4" />
              CJIS / FIPS Compliance
            </div>
            <p className="text-[11px] text-tactical-neutral-400 font-sans leading-relaxed">
              Account governed by Federal Criminal Justice Information Services (CJIS) policy standards. All analytical operations are cryptographically audited.
            </p>
            <div className="pt-2 border-t border-[#222731] flex items-center justify-between text-[10px] text-tactical-neutral-500">
              <span>Audited by Inspector General</span>
              <span className="text-tactical-success-400 font-semibold">PASS (100%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
