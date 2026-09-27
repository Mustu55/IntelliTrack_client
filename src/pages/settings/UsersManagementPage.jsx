import React, { useState } from "react";
import { 
  Users2, 
  Plus, 
  Shield, 
  Key, 
  CheckCircle2, 
  XCircle,
  UserCheck,
  UserX
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const USERS_ROSTER = [
  { 
    id: "usr-1", 
    name: "SAIC Marcus Vance", 
    badgeNumber: "FED-0982", 
    role: "COMMANDER (ADMIN)", 
    clearance: "CJIS LEVEL 5 (FIPS-140-3)", 
    status: "ACTIVE", 
    keyFingerprint: "RSA-4096: 8F7E...412A",
    lastLogin: "Just now"
  },
  { 
    id: "usr-2", 
    name: "Special Agent Elena Rostova", 
    badgeNumber: "INV-4421", 
    role: "ANALYST / INVESTIGATOR", 
    clearance: "CJIS LEVEL 4 (FRE 902)", 
    status: "ACTIVE", 
    keyFingerprint: "RSA-4096: 310B...99FA",
    lastLogin: "14m ago"
  },
  { 
    id: "usr-3", 
    name: "Agent David Kovic", 
    badgeNumber: "FED-3120", 
    role: "ANALYST / INVESTIGATOR", 
    clearance: "CJIS LEVEL 4 (TITLE 18)", 
    status: "ACTIVE", 
    keyFingerprint: "RSA-4096: 778A...00B1",
    lastLogin: "2h ago"
  },
  { 
    id: "usr-4", 
    name: "Forensic Examiner Sarah Chen", 
    badgeNumber: "BIO-1109", 
    role: "SPECIALIST / AUDITOR", 
    clearance: "CJIS LEVEL 3 (BIO NIST)", 
    status: "ACTIVE", 
    keyFingerprint: "RSA-4096: CC12...4490",
    lastLogin: "1d ago"
  }
];

export const UsersManagementPage = () => {
  const [users, setUsers] = useState(USERS_ROSTER);
  const location = useLocation();

  const toggleUserStatus = (id, name) => {
    setUsers(
      (prev) => prev.map(
        (u) => u.id === id ? { ...u, status: u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" } : u
      )
    );
    toast.success(`Updated security clearance access status for ${name}`);
  };

  const navTabs = [
    { label: "General", path: "/settings" },
    { label: "Integrations", path: "/settings/integrations" },
    { label: "Schema & Ontology", path: "/settings/schema" },
    { label: "User Management", path: "/settings/users" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222731]">
        <div>
          <div className="flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider font-mono mb-1">
            <span>GOVERNANCE & CONFIGURATION</span>
            <span>/</span>
            <span className="text-tactical-sage-400 font-semibold">PERSONNEL ROSTER</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Personnel Clearance & Access Governance
          </h1>
          <p className="text-xs text-tactical-neutral-400 mt-0.5">
            Authorized federal investigator roster, role-based clearance tiering, and cryptographic token bindings
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="sage"
            size="sm"
            onClick={() => toast.success("Agent onboarding modal initiated")}
            icon={<Plus className="w-3.5 h-3.5" />}
            className="text-xs font-mono"
          >
            Provision Agent
          </Button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#14171c] border border-[#222731] rounded-lg text-xs font-mono w-fit">
        {navTabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-3.5 py-1.5 rounded-md font-medium transition-colors ${
                isActive
                  ? "bg-[#1c222b] text-white border border-[#2e3644] shadow-sm"
                  : "text-tactical-neutral-400 hover:text-white hover:bg-[#181c22]"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Roster Table */}
      <div className="bg-[#14171c] border border-[#222731] rounded-xl overflow-hidden font-mono text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#101317] text-tactical-neutral-500 text-[11px] uppercase tracking-wider border-b border-[#222731]">
              <tr>
                <th className="py-3 px-4">Personnel & Badge</th>
                <th className="py-3 px-4">Authorized Role</th>
                <th className="py-3 px-4">Clearance Tier</th>
                <th className="py-3 px-4">Hardware Token Binding</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222731]/60 text-tactical-neutral-300">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#181d24]/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-white font-sans text-sm">{u.name}</div>
                    <div className="text-[10px] text-tactical-neutral-500 mt-0.5">BADGE #{u.badgeNumber} · {u.lastLogin}</div>
                  </td>
                  <td className="py-4 px-4 font-bold text-tactical-neutral-300 text-[11px]">
                    {u.role}
                  </td>
                  <td className="py-4 px-4 text-tactical-neutral-400 text-[11px]">
                    {u.clearance}
                  </td>
                  <td className="py-4 px-4 text-tactical-sage-400 text-[10px] font-mono">
                    {u.keyFingerprint}
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      variant={u.status === "ACTIVE" ? "success" : "danger"}
                      size="sm"
                      className="text-[9px]"
                    >
                      ● {u.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => toggleUserStatus(u.id, u.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                        u.status === "ACTIVE"
                          ? "bg-[#101317] hover:bg-tactical-danger-500/10 border-[#222731] hover:border-tactical-danger-500/40 text-tactical-danger-400"
                          : "bg-[#101317] hover:bg-tactical-success-500/10 border-[#222731] hover:border-tactical-success-500/40 text-tactical-success-400"
                      }`}
                    >
                      {u.status === "ACTIVE" ? "Revoke Access" : "Reactivate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersManagementPage;
