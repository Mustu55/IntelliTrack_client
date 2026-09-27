import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const ROUTE_LABELS = {
  dashboard: "Overview",
  data: "Data Integration",
  sources: "Connected Feeds",
  "extraction-jobs": "Extraction Jobs",
  schema: "Investigation Schema",
  entities: "Entities",
  "entity-resolution": "Entity Resolution",
  network: "Network Analysis",
  geo: "Geo-Temporal Intelligence",
  timeline: "Event Timeline",
  patterns: "Spatio-Temporal Patterns",
  leads: "Investigative Leads",
  intelligence: "Intelligence Synthesis",
  summary: "Intelligence Summary",
  cases: "Case Management",
  evidence: "Evidence Repository",
  reports: "Intelligence Reports",
  settings: "Settings",
  general: "General Settings",
  integrations: "Integrations",
  users: "User Management",
  profile: "Analyst Profile",
  notifications: "Notifications"
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center text-[10px] font-mono tracking-wider text-[#606875] py-1.5 px-6 bg-[#0d0f11] border-b border-[#1e232a] select-none">
      <Link
        to="/dashboard"
        className="flex items-center gap-1 text-[#8fa38d] hover:text-white transition-colors"
      >
        <Home className="w-3 h-3" />
        <span className="uppercase font-semibold">INTELLITRACK</span>
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const label = ROUTE_LABELS[value] || value.toUpperCase();
        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-3 h-3 text-[#323a48] mx-1 shrink-0" />
            {isLast ? (
              <span className="text-[#d1d5db] font-semibold uppercase">{label}</span>
            ) : (
              <Link to={to} className="text-[#606875] hover:text-[#9ca3af] uppercase transition-colors">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export { Breadcrumbs };
export default Breadcrumbs;
