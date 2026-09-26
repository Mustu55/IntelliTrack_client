import React, { useState } from "react";
import { Users2, Plus } from "lucide-react";
import toast from "react-hot-toast";
const USERS_ROSTER = [
  { id: "usr-1", name: "SAIC Marcus Vance", badgeNumber: "FED-0982", role: "ADMIN / COMMANDER", clearance: "SEC CLEARANCE 5 (FIPS-140-3)", status: "ACTIVE", keyFingerprint: "RSA-4096: 8F7E...412A" },
  { id: "usr-2", name: "Special Agent Elena Rostova", badgeNumber: "INV-4421", role: "ANALYST / INVESTIGATOR", clearance: "SEC CLEARANCE 4 (FRE 902)", status: "ACTIVE", keyFingerprint: "RSA-4096: 310B...99FA" },
  { id: "usr-3", name: "Agent David Kovic", badgeNumber: "FED-3120", role: "ANALYST / INVESTIGATOR", clearance: "SEC CLEARANCE 4 (TITLE 18)", status: "ACTIVE", keyFingerprint: "RSA-4096: 778A...00B1" },
  { id: "usr-4", name: "Forensic Examiner Sarah Chen", badgeNumber: "BIO-1109", role: "SPECIALIST / VIEWER", clearance: "SEC CLEARANCE 3 (BIO NIST)", status: "ACTIVE", keyFingerprint: "RSA-4096: CC12...4490" }
];
const UsersManagementPage = () => {
  const [users, setUsers] = useState(USERS_ROSTER);
  const toggleUserStatus = (id, name) => {
    setUsers(
      (prev) => prev.map(
        (u) => u.id === id ? { ...u, status: u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" } : u
      )
    );
    toast.success(`Updated security clearance access status for ${name}`);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-5xl mx-auto font-sans pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-xl shadow-black/40 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-96 h-48 bg-slate-500/5 rounded-full blur-3xl pointer-events-none" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#1e293b] border border-[#30363d] text-slate-300 font-mono text-[11px] uppercase tracking-wider mb-2" }, /* @__PURE__ */ React.createElement(Users2, { className: "w-3.5 h-3.5 text-slate-400" }), /* @__PURE__ */ React.createElement("span", null, "IDENTITY & ACCESS GOVERNANCE \u2022 ROSTER")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl sm:text-3xl font-bold text-white tracking-tight" }, "Personnel Clearance & Access Controls"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed" }, "Authorized federal personnel roster, role-based clearance tiering, and cryptographic hardware tokens.")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => toast.success("Personnel provisioning modal opened"),
      className: "px-4 py-2.5 rounded-lg bg-slate-200 hover:bg-white text-black font-mono text-xs font-bold flex items-center gap-2 shadow-lg transition-all self-start sm:self-auto transform active:scale-95"
    },
    /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Provision New Agent")
  ))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-xl font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-[#0d1117] text-slate-400 text-[11px] uppercase tracking-wider border-b border-[#30363d]" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4" }, "Personnel & Badge"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4" }, "Authorized Role"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4" }, "Clearance Tier"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4" }, "Hardware Token"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4" }, "Status"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4 text-right" }, "Action"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-[#30363d] text-slate-200" }, users.map((u) => /* @__PURE__ */ React.createElement("tr", { key: u.id, className: "hover:bg-[#1f242c]/60 transition-colors" }, /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "font-bold text-white font-sans text-sm" }, u.name), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-400 mt-0.5" }, "BADGE #", u.badgeNumber)), /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4 font-bold text-slate-300 text-[11px]" }, u.role), /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4 text-slate-400 text-[10px]" }, u.clearance), /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4 text-slate-400 text-[10px] font-mono" }, u.keyFingerprint), /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4" }, /* @__PURE__ */ React.createElement(
    "span",
    {
      className: `px-2.5 py-0.5 rounded-full font-bold text-[9px] uppercase border ${u.status === "ACTIVE" ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40" : "bg-rose-950/80 text-rose-300 border-rose-500/40"}`
    },
    "\u25CF ",
    u.status
  )), /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4 text-right" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => toggleUserStatus(u.id, u.name),
      className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${u.status === "ACTIVE" ? "bg-[#0d1117] hover:bg-rose-950/50 border-rose-500/40 text-rose-400" : "bg-[#0d1117] hover:bg-emerald-950/50 border-emerald-500/40 text-emerald-300"}`
    },
    u.status === "ACTIVE" ? "Revoke / Suspend" : "Reactivate Access"
  )))))))));
};
var stdin_default = UsersManagementPage;
export {
  UsersManagementPage,
  stdin_default as default
};
