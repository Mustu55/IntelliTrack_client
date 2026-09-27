import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Search,
  ChevronRight,
  ShieldAlert,
  Phone,
  Car,
  Building,
  MapPin,
  GitBranch,
  Sparkles,
  Plus
} from "lucide-react";
import { useActiveCase } from "@/context/CaseContext";

const ENTITIES_MOCK_DATA = [
  {
    id: "poi-1",
    name: "Raj Mehta",
    primaryAlias: 'Alias: "The Courier" · Logistics Broker',
    type: "PERSON",
    linkedIdentitiesCount: 4,
    confidenceScore: 94,
    lastSeen: "14:32 UTC (Pier 42 Maritime Dock)",
    threatTier: "CRITICAL",
    activeWarrants: 2,
    associatedCases: "CASE #IT-2024-884"
  },
  {
    id: "poi-2",
    name: "Vikramaditya Singhania",
    primaryAlias: "Syndicate Beneficiary · Director",
    type: "PERSON",
    linkedIdentitiesCount: 3,
    confidenceScore: 89,
    lastSeen: "Yesterday 21:10 UTC (Safehouse B-4)",
    threatTier: "HIGH",
    activeWarrants: 1,
    associatedCases: "CASE #IT-2024-884"
  },
  {
    id: "phn-1",
    name: "+91 98201 44921",
    primaryAlias: "Burner SIM (VoLTE) · IMEI: 86129480112948",
    type: "PHONE",
    linkedIdentitiesCount: 2,
    confidenceScore: 92,
    lastSeen: "12 mins ago (Cell Tower JNPT-04)",
    threatTier: "CRITICAL",
    activeWarrants: 0,
    associatedCases: "CASE #IT-2024-884"
  },
  {
    id: "veh-1",
    name: "Black Audi A8 [MH-01-EA-9902]",
    primaryAlias: "Conveyance Sedan · ALPR Scanned",
    type: "VEHICLE",
    linkedIdentitiesCount: 2,
    confidenceScore: 87,
    lastSeen: "14:28 UTC (JNPT Port Toll)",
    threatTier: "HIGH",
    activeWarrants: 0,
    associatedCases: "CASE #IT-2024-884"
  },
  {
    id: "loc-1",
    name: "Pier 42 Maritime Facility",
    primaryAlias: "Container Yard Berth B-4 (Meeting Hotspot)",
    type: "LOCATION",
    linkedIdentitiesCount: 5,
    confidenceScore: 95,
    lastSeen: "Active Surveillance Hit",
    threatTier: "CRITICAL",
    activeWarrants: 1,
    associatedCases: "CASE #IT-2024-884"
  },
  {
    id: "org-1",
    name: "BlueStar Logistics Pvt. Ltd.",
    primaryAlias: "Shell Freight Forwarder · Hawala Routing",
    type: "ORGANIZATION",
    linkedIdentitiesCount: 3,
    confidenceScore: 78,
    lastSeen: "NEFT Wire $142,000 Transferred",
    threatTier: "MEDIUM",
    activeWarrants: 0,
    associatedCases: "CASE #IT-2024-884"
  },
  {
    id: "poi-3",
    name: "Tariq Mansoor",
    primaryAlias: "Hawala Account Escrow Operator",
    type: "PERSON",
    linkedIdentitiesCount: 2,
    confidenceScore: 83,
    lastSeen: "3 days ago (Dubai Remittance Link)",
    threatTier: "MEDIUM",
    activeWarrants: 0,
    associatedCases: "CASE #IT-2024-850"
  }
];

const EntitiesListPage = () => {
  const navigate = useNavigate();
  const { activeCase } = useActiveCase();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [threatFilter, setThreatFilter] = useState("ALL");

  const filteredEntities = ENTITIES_MOCK_DATA.filter((ent) => {
    const matchesSearch =
      ent.name.toLowerCase().includes(search.toLowerCase()) ||
      ent.primaryAlias.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "ALL" || ent.type === typeFilter;
    const matchesThreat = threatFilter === "ALL" || ent.threatTier === threatFilter;
    return matchesSearch && matchesType && matchesThreat;
  });

  const getEntityIcon = (type) => {
    switch (type) {
      case "PERSON":
        return <Users className="w-4 h-4 text-[#9cae9b]" />;
      case "PHONE":
        return <Phone className="w-4 h-4 text-[#7a8ba8]" />;
      case "VEHICLE":
        return <Car className="w-4 h-4 text-[#c4a265]" />;
      case "LOCATION":
        return <MapPin className="w-4 h-4 text-[#d97768]" />;
      case "ORGANIZATION":
        return <Building className="w-4 h-4 text-[#8fa38d]" />;
      default:
        return <Users className="w-4 h-4 text-[#9cae9b]" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans antialiased text-[#f3f4f6]">
      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1e232a]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-white tracking-tight">
              Entities Directory
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#18261c] text-[#8fa38d] border border-[#25392b]">
              1,482 TRACKED
            </span>
          </div>
          <p className="text-xs text-[#9ca3af] mt-0.5">
            Unified cross-jurisdiction directory of persons of interest, burner telephony, vehicles, and shell syndicates.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate("/entity-resolution")}
            className="h-8.5 px-3 rounded-md bg-[#14171c] border border-[#222731] hover:bg-[#181c22] text-[#d1d5db] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#9cae9b]" />
            <span>Resolution Workbench</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-4 shadow-xs">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#9ca3af]">
            Total Entities
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-1">1,482</div>
          <div className="text-[10px] text-[#8fa38d] font-mono mt-0.5">
            482 POIs · 390 Telephony
          </div>
        </div>

        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-4 shadow-xs">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#9ca3af]">
            High / Critical Risk
          </div>
          <div className="text-2xl font-bold font-mono text-[#dc7869] mt-1">86 Targets</div>
          <div className="text-[10px] text-[#dc7869] font-mono mt-0.5">
            28 active arrest warrants
          </div>
        </div>

        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-4 shadow-xs">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#9ca3af]">
            Resolution Confidence
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-1">94.2%</div>
          <div className="text-[10px] text-[#8fa38d] font-mono mt-0.5">
            Soundex & Biometric Matched
          </div>
        </div>

        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-4 shadow-xs">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#9ca3af]">
            Candidate Matches
          </div>
          <div className="text-2xl font-bold font-mono text-[#c4a265] mt-1">4 Pending</div>
          <div className="text-[10px] text-[#c4a265] font-mono mt-0.5">
            Ready for Human Review
          </div>
        </div>
      </div>

      {/* Filter and Category Pills */}
      <div className="p-3.5 bg-[#14171c] border border-[#222731] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2.5 w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-[#606875] shrink-0" />
          <input
            type="text"
            placeholder="Search entity name, alias, phone, plate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#101317] border border-[#222731] rounded-md px-3 py-1.5 text-white placeholder-[#606875] focus:outline-none focus:border-[#9cae9b] text-xs font-sans"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#101317] border border-[#222731] rounded-md px-3 py-1.5 text-[#d1d5db] focus:outline-none focus:border-[#9cae9b] text-xs"
          >
            <option value="ALL">All Entity Types</option>
            <option value="PERSON">Persons of Interest</option>
            <option value="PHONE">Burner Telephony</option>
            <option value="VEHICLE">Vehicles</option>
            <option value="LOCATION">Locations / Safehouses</option>
            <option value="ORGANIZATION">Organizations</option>
          </select>

          <select
            value={threatFilter}
            onChange={(e) => setThreatFilter(e.target.value)}
            className="bg-[#101317] border border-[#222731] rounded-md px-3 py-1.5 text-[#d1d5db] focus:outline-none focus:border-[#9cae9b] text-xs"
          >
            <option value="ALL">All Severity Tiers</option>
            <option value="CRITICAL">Critical Severity</option>
            <option value="HIGH">High Severity</option>
            <option value="MEDIUM">Medium Severity</option>
            <option value="LOW">Low Severity</option>
          </select>
        </div>
      </div>

      {/* Entities Table */}
      <div className="bg-[#14171c] border border-[#222731] rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#101317] text-[#9ca3af] font-mono text-[10px] uppercase tracking-wider border-b border-[#222731]">
              <tr>
                <th className="py-3 px-4 font-semibold">Entity Identifier</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Threat Level</th>
                <th className="py-3 px-4 font-semibold text-center">Linked Records</th>
                <th className="py-3 px-4 font-semibold text-center">Confidence</th>
                <th className="py-3 px-4 font-semibold">Last Telemetry Hit</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e232a] text-[#d1d5db]">
              {filteredEntities.map((ent) => (
                <tr
                  key={ent.id}
                  onClick={() => navigate(`/entities/${ent.id}`)}
                  className="hover:bg-[#181c22] transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-md bg-[#101317] border border-[#222731] flex items-center justify-center shrink-0">
                        {getEntityIcon(ent.type)}
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-[#9cae9b] transition-colors">
                          {ent.name}
                        </div>
                        <div className="text-[10px] text-[#606875] font-mono mt-0.5">
                          {ent.primaryAlias}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-[10px] text-[#9ca3af]">
                    {ent.type}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.2 rounded font-mono text-[10px] font-semibold uppercase ${
                        ent.threatTier === "CRITICAL"
                          ? "bg-[#2b1719] text-[#dc7869] border border-[#442327]"
                          : ent.threatTier === "HIGH"
                          ? "bg-[#282215] text-[#c4a265] border border-[#3e3420]"
                          : "bg-[#161a20] text-[#9ca3af] border border-[#232832]"
                      }`}
                    >
                      {ent.threatTier}
                    </span>
                    {ent.activeWarrants > 0 && (
                      <span className="ml-1.5 text-[9px] text-[#dc7869] font-mono font-semibold">
                        ({ent.activeWarrants} WARRANTS)
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-center font-mono font-medium text-white">
                    {ent.linkedIdentitiesCount} Records
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span className="px-1.5 py-0.2 rounded bg-[#101317] border border-[#222731] font-mono font-semibold text-[#8fa38d] text-[10px]">
                      {ent.confidenceScore}%
                    </span>
                  </td>

                  <td className="py-3 px-4 text-[11px] text-[#9ca3af] font-mono truncate max-w-xs">
                    {ent.lastSeen}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/entities/${ent.id}`);
                      }}
                      className="px-2.5 py-1 rounded-md bg-[#101317] hover:bg-[#181c22] border border-[#222731] text-[#9ca3af] hover:text-white font-medium text-xs transition-all inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Profile</span>
                      <ChevronRight className="w-3.5 h-3.5" />
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

export { EntitiesListPage };
export default EntitiesListPage;
