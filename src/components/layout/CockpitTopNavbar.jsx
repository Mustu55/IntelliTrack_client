import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  ChevronDown,
  Shield,
  Activity,
  LogOut,
  User,
  Settings,
  X,
  ArrowRight,
  Plus,
  Radio
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useActiveCase } from "@/context/CaseContext";
import { SystemStatusModal } from "@/components/common/SystemStatusModal";

const SEARCH_DATABASE = [
  {
    id: "poi-1",
    category: "PERSON",
    title: "Raj Mehta",
    subtitle: 'Alias: "The Courier" · Logistics Broker · 92% Confidence',
    route: "/entities/poi-1",
    tag: "Person of Interest"
  },
  {
    id: "poi-2",
    category: "PERSON",
    title: "Vikramaditya Singhania",
    subtitle: "Syndicate Beneficiary · 88% Confidence",
    route: "/entities/poi-2",
    tag: "Person of Interest"
  },
  {
    id: "phn-1",
    category: "PHONE",
    title: "+91 98201 44921",
    subtitle: "Burner SIM (VoLTE) · 14 calls to Raj Mehta",
    route: "/network",
    tag: "High-Frequency CDR"
  },
  {
    id: "veh-1",
    category: "VEHICLE",
    title: "Black Audi A8 [MH-01-EA-9902]",
    subtitle: "Conveyance Sedan · Scanned at JNPT Port Toll",
    route: "/geo",
    tag: "ALPR Alert"
  },
  {
    id: "loc-1",
    category: "LOCATION",
    title: "JNPT Port Container Yard B-4",
    subtitle: "Repeated Meeting Point & Drop Location",
    route: "/geo",
    tag: "Activity Hotspot"
  },
  {
    id: "org-1",
    category: "ORGANIZATION",
    title: "BlueStar Logistics Pvt. Ltd.",
    subtitle: "Shell Freight Forwarder · Direct link to Hawala fund route",
    route: "/network",
    tag: "Shell Entity"
  },
  {
    id: "case-1",
    category: "CASE",
    title: "CASE #IT-2024-884: Hawala Network Syndicate Alpha",
    subtitle: "28 Entities · 14 Leads · Lead: Agent Vance",
    route: "/cases",
    tag: "Active Docket"
  }
];

const CockpitTopNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { activeCase } = useActiveCase();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const filteredResults = searchQuery.trim()
    ? SEARCH_DATABASE.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SEARCH_DATABASE.slice(0, 5);

  const handleSelectResult = (route) => {
    navigate(route);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <header className="h-14 bg-[#0d0f11] border-b border-[#1e232a] px-4 flex items-center justify-between gap-4 z-40 select-none">
        {/* Left Search Bar Input */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full h-8.5 px-3 rounded-md bg-[#14171c] border border-[#222731] text-left text-xs text-[#9ca3af] hover:text-[#f3f4f6] hover:border-[#353c4a] transition-all flex items-center justify-between group shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-[#606875] group-hover:text-[#9cae9b] shrink-0 transition-colors" />
                <span className="truncate text-[11px]">
                  Search intelligence database, cases, entities, signals...
                </span>
              </div>
              <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#101317] border border-[#222731] text-[10px] font-mono text-[#9ca3af]">
                <span>⌘</span>K
              </kbd>
            </button>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* System status pill */}
          <button
            onClick={() => setIsStatusModalOpen(true)}
            className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#14171c] border border-[#222731] hover:border-[#2f3846] text-xs font-mono transition-colors cursor-pointer"
            title="System Operational Status"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8fa38d] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8fa38d]" />
            </span>
            <span className="text-white text-[11px] font-medium font-mono">Real-Time Sync</span>
          </button>

          {/* New Case / Quick Action Button */}
          <button
            onClick={() => navigate("/cases")}
            className="hidden sm:inline-flex items-center gap-1.5 h-8.5 px-3 rounded-md bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c] text-xs font-medium transition-all shadow-xs cursor-pointer font-sans"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Case</span>
          </button>

          {/* Operational Alerts Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-md bg-[#14171c] border border-[#222731] hover:border-[#353c4a] text-[#9ca3af] hover:text-white transition-colors relative cursor-pointer"
              title="Operational Alerts"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#dc7869]" />
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 top-11 w-80 sm:w-96 bg-[#14171c] border border-[#222731] rounded-lg shadow-2xl z-50 overflow-hidden font-sans">
                <div className="bg-[#101317] px-4 py-3 border-b border-[#222731] flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-white uppercase tracking-wider">
                    <Radio className="w-3.5 h-3.5 text-[#8fa38d] animate-pulse" />
                    <span>Real-Time Intelligence Feeds</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#2b1719] text-[#dc7869] border border-[#442327]">
                    3 ALERTS
                  </span>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-[#222731] custom-scrollbar text-xs">
                  <div
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      navigate("/leads");
                    }}
                    className="p-3 hover:bg-[#181c22] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[#9ca3af] text-[10px] font-mono mb-1">
                      <span className="text-[#dc7869] font-bold">HIGH RISK SIGNAL</span>
                      <span>2m ago</span>
                    </div>
                    <div className="text-white font-medium">SIM Rotation Detected for Raj Mehta</div>
                    <div className="text-[#9ca3af] text-[11px] mt-0.5">
                      IMEI #861294 switched to new prepaid IMSI in JNPT Sector.
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      navigate("/geo");
                    }}
                    className="p-3 hover:bg-[#181c22] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[#9ca3af] text-[10px] font-mono mb-1">
                      <span className="text-[#c9a667] font-bold">CO-LOCATION REVIEW</span>
                      <span>18m ago</span>
                    </div>
                    <div className="text-white font-medium">Pier 42 Hotspot Convergence</div>
                    <div className="text-[#9ca3af] text-[11px] mt-0.5">
                      Audi A8 [MH-01-EA-9902] scanned within 50m of burner phone.
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      navigate("/evidence");
                    }}
                    className="p-3 hover:bg-[#181c22] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[#9ca3af] text-[10px] font-mono mb-1">
                      <span className="text-[#8fa38d] font-bold">VERIFIED LINK</span>
                      <span>1h ago</span>
                    </div>
                    <div className="text-white font-medium">Bank Wire Authenticated</div>
                    <div className="text-[#9ca3af] text-[11px] mt-0.5">
                      $142,000 NEFT transferred from Astraea Trading to BlueStar Logistics.
                    </div>
                  </div>
                </div>

                <div className="bg-[#101317] p-2.5 border-t border-[#222731] text-center">
                  <button
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      navigate("/notifications");
                    }}
                    className="text-xs font-mono text-[#9cae9b] hover:underline"
                  >
                    View All Notifications →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-md hover:bg-[#14171c] transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-md bg-[#181c22] border border-[#2a313d] text-[#9cae9b] flex items-center justify-center font-bold font-mono text-xs shadow-xs">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : "MK"}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#606875] hidden sm:block" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 top-11 w-60 bg-[#14171c] border border-[#222731] rounded-lg shadow-2xl z-50 py-1.5 font-sans">
                <div className="px-3.5 py-2 border-b border-[#222731]">
                  <div className="text-xs font-semibold text-white">{user?.name || "M. Kessler"}</div>
                  <div className="text-[11px] text-[#9ca3af] font-mono truncate">
                    {user?.email || "m.kessler@intellitrack.gov"}
                  </div>
                  <div className="mt-1 px-1.5 py-0.2 rounded bg-[#18261c] text-[#8fa38d] text-[10px] font-mono inline-block border border-[#25392b]">
                    Senior Analyst · L4
                  </div>
                </div>

                <div className="py-1 text-xs">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full px-3.5 py-2 text-left text-[#d1d5db] hover:text-white hover:bg-[#181c22] flex items-center gap-2.5 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-[#9ca3af]" />
                    <span>Investigator Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate("/settings");
                    }}
                    className="w-full px-3.5 py-2 text-left text-[#d1d5db] hover:text-white hover:bg-[#181c22] flex items-center gap-2.5 transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-[#9ca3af]" />
                    <span>System Settings</span>
                  </button>
                </div>

                <div className="border-t border-[#222731] pt-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logout();
                      navigate("/login");
                    }}
                    className="w-full px-3.5 py-2 text-left text-[#dc7869] hover:bg-[#2b1719]/40 flex items-center gap-2.5 text-xs font-medium transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Terminate Session</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Command / Quick Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-[#0d0f11]/85 backdrop-blur-xs select-none">
          <div className="w-full max-w-2xl bg-[#14171c] border border-[#222731] rounded-xl shadow-2xl overflow-hidden font-sans">
            <div className="p-3 bg-[#101317] border-b border-[#222731] flex items-center gap-3">
              <Search className="w-4 h-4 text-[#8fa38d]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type a person, vehicle plate, phone number, location or case title..."
                className="w-full bg-transparent border-0 text-white placeholder-[#606875] text-xs focus:outline-none font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded text-[#9ca3af] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="px-2 py-0.5 rounded text-[10px] font-mono text-[#9ca3af] hover:text-white bg-[#181c22] border border-[#222731]"
              >
                ESC
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-2 divide-y divide-[#222731] custom-scrollbar text-xs font-mono">
              <div className="px-3 py-1.5 text-[10px] text-[#606875] uppercase tracking-wider font-semibold">
                {searchQuery ? `SEARCH RESULTS (${filteredResults.length})` : "RECENT INTELLIGENCE ENTITIES"}
              </div>

              {filteredResults.length === 0 ? (
                <div className="p-8 text-center text-[#9ca3af] font-sans text-xs">
                  No intelligence records found matching "{searchQuery}"
                </div>
              ) : (
                filteredResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectResult(item.route)}
                    className="p-2.5 rounded-md hover:bg-[#181c22] transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold text-xs group-hover:text-[#9cae9b] transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#101317] border border-[#222731] text-[#9ca3af]">
                          {item.tag}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#9ca3af] truncate mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#606875] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                ))
              )}
            </div>

            <div className="bg-[#101317] px-4 py-2 border-t border-[#222731] flex items-center justify-between text-[11px] font-mono text-[#606875]">
              <span>Search across 1,482 entities & 5,839 links</span>
              <span>Press ESC to dismiss</span>
            </div>
          </div>
        </div>
      )}

      <SystemStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
      />
    </>
  );
};

export { CockpitTopNavbar };
export default CockpitTopNavbar;
