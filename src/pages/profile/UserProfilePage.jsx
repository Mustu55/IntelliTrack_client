import React from "react";
import { useAuth } from "@/context/AuthContext";
import { ClearanceBadge } from "@/components/common/ClearanceBadge";
import { HashStamp } from "@/components/common/HashStamp";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Key,
  Laptop,
  LogOut,
  CheckCircle,
  RotateCw
} from "lucide-react";
const UserProfilePage = () => {
  const { user, role, switchRole, logout } = useAuth();
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-5xl mx-auto font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider mb-0.5" }, /* @__PURE__ */ React.createElement("span", null, "IDENTITY & CREDENTIAL GOVERNANCE"), /* @__PURE__ */ React.createElement("span", null, "/"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-success-600 font-semibold" }, "FIPS 201 PIV COMPLIANT")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold tracking-tight text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Personnel Profile & Cryptographic Token Security")), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "danger",
      size: "sm",
      onClick: logout,
      icon: /* @__PURE__ */ React.createElement(LogOut, { className: "w-4 h-4" })
    },
    "Terminate Session"
  )), /* @__PURE__ */ React.createElement("div", { className: "p-6 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 rounded bg-tactical-neutral-900 text-white flex items-center justify-center font-bold text-xl border border-tactical-neutral-700 shadow-sm" }, user?.fullName?.split(" ").map((n) => n[0]).join("") || "MV"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("h2", { className: "text-lg font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, user?.fullName || "Special Agent Marcus Vance"), /* @__PURE__ */ React.createElement(ClearanceBadge, { level: user?.clearanceLevel || "CJIS_LEVEL_4" })), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-tactical-neutral-500 font-sans mt-0.5" }, user?.agency || "Federal Bureau of Investigation (FBI)", " \u2022 Special Investigations"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-400 mt-1" }, "BADGE: ", /* @__PURE__ */ React.createElement("strong", { className: "text-tactical-neutral-700 dark:text-tactical-neutral-300" }, user?.badgeNumber || "FBI-89412"), " \u2022 ROLE: ", /* @__PURE__ */ React.createElement("strong", { className: "text-tactical-primary-600" }, role)))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: () => switchRole(role === "ADMIN" ? "AGENT" : "ADMIN"),
      icon: /* @__PURE__ */ React.createElement(RotateCw, { className: "w-3.5 h-3.5" })
    },
    "Toggle Role to ",
    role === "ADMIN" ? "Investigator (Agent)" : "Commander (Admin)"
  ))), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xs font-bold uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100 flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement(Key, { className: "w-4 h-4 text-tactical-primary-600" }), "Hardware Token Binding & Cryptographic Signature Key"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "p-3.5 bg-tactical-neutral-50 dark:bg-tactical-neutral-800/60 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-700 space-y-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-tactical-neutral-500 uppercase block" }, "FIPS 201 PIV Hardware Card"), /* @__PURE__ */ React.createElement("div", { className: "font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, user?.pivCardSerial || "PIV-9904-8172-FED"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-success-600 font-semibold flex items-center gap-1" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "w-3 h-3" }), " Physically Bound to Terminal Slot")), /* @__PURE__ */ React.createElement("div", { className: "p-3.5 bg-tactical-neutral-50 dark:bg-tactical-neutral-800/60 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-700 space-y-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-tactical-neutral-500 uppercase block" }, "RSA-4096 Public Key Fingerprint"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(HashStamp, { hash: user?.publicKeyFingerprint || "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", lead: 8, tail: 8 })), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-tactical-neutral-500" }, "Anchored to Hardware Security Module (HSM)")))), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 pt-4 border-t border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xs font-bold uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100 flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement(Laptop, { className: "w-4 h-4 text-tactical-primary-600" }), "Active Classified Terminal Sessions"), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: () => alert("All other remote terminal sessions revoked."),
      className: "text-[10px] py-1"
    },
    "Revoke Remote Terminals"
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 rounded bg-tactical-neutral-50 dark:bg-tactical-neutral-800/40 border border-tactical-neutral-200 dark:border-tactical-neutral-700 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100 flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", null, "Workstation WS-8831-B (Current Terminal)"), /* @__PURE__ */ React.createElement(Badge, { variant: "success", size: "sm" }, "ACTIVE NOW")), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500 font-sans" }, "Detroit Metro TOC-NTF Command Node \u2022 IP: 10.142.18.99")), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-tactical-neutral-400" }, "Authenticated via PIV")), /* @__PURE__ */ React.createElement("div", { className: "p-3 rounded bg-tactical-neutral-50 dark:bg-tactical-neutral-800/40 border border-tactical-neutral-200 dark:border-tactical-neutral-700 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Mobile Tactical Terminal TAC-AIR-02"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500 font-sans" }, "Field Vehicle Intercept Rig \u2022 Last active 2 hours ago")), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: () => alert("Session TAC-AIR-02 terminated."),
      className: "text-[10px] py-1"
    },
    "Revoke"
  ))))));
};
export {
  UserProfilePage
};
