import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Share2,
  Users2,
  MapPin,
  Clock,
  Flame,
  FileCheck,
  FileText,
  Settings,
  Bell,
  PanelLeftClose,
  PanelLeft,
  Activity,
  Shield,
  LogOut
} from "lucide-react";
import { useActiveCase } from "@/context/CaseContext";
import { useAuth } from "@/context/AuthContext";
import { SystemStatusModal } from "@/components/common/SystemStatusModal";

const workspaceNav = [
  {
    to: "/dashboard",
    icon: LayoutDashboard,
    label: "Overview",
    badge: null
  },
  {
    to: "/cases",
    icon: Briefcase,
    label: "Cases",
    badge: "28"
  },
  {
    to: "/entities",
    icon: Users2,
    label: "Entities",
    badge: "1,482"
  },
  {
    to: "/network",
    icon: Share2,
    label: "Network Analysis",
    badge: null
  },
  {
    to: "/geo",
    icon: MapPin,
    label: "Geo-Temporal",
    badge: "GIS"
  },
  {
    to: "/timeline",
    icon: Clock,
    label: "Timeline",
    badge: null
  },
  {
    to: "/leads",
    icon: Flame,
    label: "Investigative Leads",
    badge: "14",
    badgeAmber: true
  },
  {
    to: "/evidence",
    icon: FileCheck,
    label: "Evidence Repository",
    badge: null
  },
  {
    to: "/reports",
    icon: FileText,
    label: "Reports",
    badge: null
  }
];

const systemNav = [
  {
    to: "/notifications",
    icon: Bell,
    label: "Notifications",
    badge: "4"
  },
  {
    to: "/settings",
    icon: Settings,
    label: "Settings",
    badge: null
  }
];

const CockpitSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const { activeCase } = useActiveCase();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <aside
        className={`bg-[#101317] border-r border-[#1e232a] transition-all duration-200 flex flex-col z-30 select-none ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        {/* Brand Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-[#1e232a] bg-[#0d0f11]">
          {!collapsed ? (
            <div
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2.5 overflow-hidden cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-md bg-[#181c22] border border-[#2a313d] flex items-center justify-center shrink-0 text-[#9cae9b] group-hover:border-[#9cae9b] transition-colors">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <div className="font-semibold text-xs tracking-wider text-white font-sans uppercase">
                  IntelliTrack
                </div>
                <div className="text-[9px] text-[#606875] font-mono tracking-widest uppercase">
                  Intelligence Suite
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => navigate("/dashboard")}
              className="w-7 h-7 mx-auto rounded-md bg-[#181c22] border border-[#2a313d] flex items-center justify-center cursor-pointer text-[#9cae9b]"
            >
              <Shield className="w-3.5 h-3.5" />
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded text-[#606875] hover:text-white hover:bg-[#181c22] transition-colors"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <PanelLeft className="w-3.5 h-3.5" /> : <PanelLeftClose className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Active Investigation Pill / Widget */}
        {!collapsed && (
          <div className="px-3.5 py-2.5 bg-[#14171c]/70 border-b border-[#1e232a]">
            <div className="text-[9px] uppercase font-mono tracking-widest text-[#606875] flex items-center justify-between">
              <span>Active Investigation</span>
              <span className="flex items-center gap-1 text-[#8fa38d] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8fa38d] animate-pulse" />
                ACTIVE
              </span>
            </div>
            <div className="text-xs font-medium text-white truncate mt-1" title={activeCase?.title}>
              {activeCase?.title || "Syndicate Alpha Investigation"}
            </div>
            <div className="text-[10px] font-mono text-[#9cae9b] truncate">
              {activeCase?.caseNumber || "CASE #IT-2024-884"}
            </div>
          </div>
        )}

        {/* Navigation links */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 custom-scrollbar">
          {/* Workspace Section */}
          <div>
            {!collapsed && (
              <div className="px-2.5 pb-1.5 text-[9px] font-mono uppercase tracking-widest text-[#606875] font-semibold">
                Workspace
              </div>
            )}
            <div className="space-y-0.5">
              {workspaceNav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium transition-all duration-150 group ${
                        isActive
                          ? "bg-[#181c22] text-[#f3f4f6] font-semibold border border-[#232832] shadow-xs"
                          : "text-[#9ca3af] hover:text-[#f3f4f6] hover:bg-[#14171c]"
                      }`
                    }
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-[#8fa38d] group-hover:text-white transition-colors" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span
                        className={`ml-auto text-[10px] font-mono px-1.5 py-0.2 rounded font-medium ${
                          item.badgeAmber
                            ? "bg-[#282215] text-[#c9a667] border border-[#3e3420]"
                            : "bg-[#14171c] text-[#9ca3af] border border-[#222731]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* System Section */}
          <div>
            {!collapsed && (
              <div className="px-2.5 pb-1.5 text-[9px] font-mono uppercase tracking-widest text-[#606875] font-semibold">
                System
              </div>
            )}
            <div className="space-y-0.5">
              {systemNav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium transition-all duration-150 group ${
                        isActive
                          ? "bg-[#181c22] text-[#f3f4f6] font-semibold border border-[#232832] shadow-xs"
                          : "text-[#9ca3af] hover:text-[#f3f4f6] hover:bg-[#14171c]"
                      }`
                    }
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-[#8fa38d] group-hover:text-white transition-colors" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className="ml-auto text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#18261c] text-[#8fa38d] border border-[#25392b] font-medium">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer / Profile */}
        <div className="p-2 border-t border-[#1e232a] bg-[#0d0f11] space-y-1">
          <button
            onClick={() => setIsStatusModalOpen(true)}
            className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs text-[#9ca3af] hover:text-white hover:bg-[#14171c] transition-colors"
            title={collapsed ? "System Operational" : undefined}
          >
            <div className="shrink-0 relative">
              <Activity className="w-3.5 h-3.5 text-[#8fa38d]" />
            </div>
            {!collapsed && (
              <div className="flex-1 text-left flex items-center justify-between font-mono text-[10px]">
                <span className="text-white font-medium">Engine Node 04</span>
                <span className="text-[#8fa38d]">OPERATIONAL</span>
              </div>
            )}
          </button>

          {/* Analyst profile bar */}
          <div className="flex items-center justify-between p-1.5 rounded-md bg-[#14171c] border border-[#1e232a]">
            <NavLink
              to="/profile"
              className="flex items-center gap-2 overflow-hidden flex-1 group"
              title={user?.name || "Analyst Profile"}
            >
              <div className="w-6 h-6 rounded-md bg-[#1c222c] border border-[#2a3342] text-[#9cae9b] flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : "MK"}
              </div>
              {!collapsed && (
                <div className="truncate text-left leading-tight">
                  <div className="text-xs font-medium text-white group-hover:text-[#9cae9b] transition-colors truncate">
                    {user?.name || "M. Kessler"}
                  </div>
                  <div className="text-[9px] font-mono text-[#606875] truncate">
                    Senior Analyst · L4
                  </div>
                </div>
              )}
            </NavLink>

            {!collapsed && (
              <button
                onClick={handleLogout}
                className="p-1 text-[#606875] hover:text-[#dc7869] transition-colors"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </aside>

      <SystemStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
      />
    </>
  );
};

export { CockpitSidebar };
export default CockpitSidebar;
