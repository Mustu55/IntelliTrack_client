const ADMIN_NAV_SECTION = {
  title: "Executive Command",
  items: [
    { name: "Command Overview", path: "/admin/dashboard", iconName: "LayoutDashboard", roles: ["admin"], description: "High-level departmental metrics" },
    { name: "Personnel & Clearance", path: "/admin/agents", iconName: "Users", roles: ["admin"], description: "Agent roster & cryptographic keys" },
    { name: "Data Feeds & Ingestion", path: "/admin/system-config", iconName: "Cpu", roles: ["admin"], description: "RMS, CDR, ALPR & FinCEN streams" },
    { name: "Department Analytics", path: "/admin/analytics", iconName: "BarChart3", roles: ["admin"], description: "Clearance rate & crime typology charts" },
    { name: "Chain-of-Custody Ledger", path: "/admin/audit-ledger", iconName: "ShieldCheck", roles: ["admin"], description: "Sequential SHA-256 Merkle blocks" }
  ]
};
const INVESTIGATION_NAV_SECTION = {
  title: "Investigative Operations",
  items: [
    { name: "Investigator Console", path: "/agent/workspace", iconName: "Compass", description: "Active dockets & field intake" },
    { name: "Investigative Dockets", path: "/cases", iconName: "Briefcase", description: "Cross-jurisdiction case files" },
    { name: "Criminal Persons", path: "/persons", iconName: "UserCheck", description: "POI registry & biometric records" },
    { name: "Entity Resolution", path: "/entity-resolution", iconName: "GitMerge", badge: "3 NEW", description: "Cross-file identity deduplication" },
    { name: "Syndicate Link Chart", path: "/network-graph", iconName: "Network", description: "ForceAtlas2 network graph" },
    { name: "Geo-Temporal Pattern Map", path: "/geo-temporal", iconName: "MapPin", description: "Cell tower radiometry & trajectories" },
    { name: "Explainable Lead Triage", path: "/leads", iconName: "AlertTriangle", badge: "CRITICAL", description: "FRE 902 evidentiary lead scoring" },
    { name: "Intelligence Dossier Builder", path: "/reports", iconName: "FileText", description: "Court briefing compiler & redactions" }
  ]
};
const UTILITIES_NAV_SECTION = {
  title: "System & Security",
  items: [
    { name: "Operational Signals", path: "/notifications", iconName: "Bell", badge: "4" },
    { name: "Identity & PIV Security", path: "/profile", iconName: "Key" }
  ]
};
export {
  ADMIN_NAV_SECTION,
  INVESTIGATION_NAV_SECTION,
  UTILITIES_NAV_SECTION
};
