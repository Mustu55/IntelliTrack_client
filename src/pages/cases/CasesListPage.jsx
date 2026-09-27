import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Search,
  Plus,
  ChevronRight,
  Lock,
  Trash2,
  Loader2,
  AlertCircle,
  TrendingUp,
  Shield,
  FileText
} from "lucide-react";
import { useActiveCase, ACTIVE_CASES_ROSTER } from "@/context/CaseContext";
import { useGetCasesQuery, useCreateCaseMutation, useDeleteCaseMutation } from "@/store/api/apiSlice";
import toast from "react-hot-toast";

const CasesListPage = () => {
  const navigate = useNavigate();
  const { setActiveCaseId, activeCase } = useActiveCase();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newInvestigator, setNewInvestigator] = useState("M. Kessler");
  const [newPriority, setNewPriority] = useState("HIGH");
  const [newClassification, setNewClassification] = useState("RESTRICTED // LAW ENFORCEMENT SENSITIVE");

  const { data: casesResponse, isLoading } = useGetCasesQuery({
    search: search || undefined,
    status: statusFilter !== "ALL" ? statusFilter : undefined,
    priority: priorityFilter !== "ALL" ? priorityFilter : undefined,
  });

  const [createCaseMutation, { isLoading: isCreating }] = useCreateCaseMutation();
  const [deleteCaseMutation] = useDeleteCaseMutation();

  const rawCases = casesResponse?.data;
  const casesList = rawCases && rawCases.length > 0 ? rawCases : ACTIVE_CASES_ROSTER;

  const filteredCases = casesList.filter((c) => {
    const title = c.title || "";
    const caseNum = c.caseId || c.caseNumber || "";
    const inv = (c.assignedInvestigators && c.assignedInvestigators.join(", ")) || c.leadInvestigator || "";
    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      caseNum.toLowerCase().includes(search.toLowerCase()) ||
      inv.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    const matchesPriority = priorityFilter === "ALL" || c.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateCase = async (e) => {
    e.preventDefault();
    try {
      const response = await createCaseMutation({
        title: newTitle,
        description: newDescription || "Cross-jurisdictional investigation dossier.",
        priority: newPriority,
        classification: newClassification,
        assignedInvestigators: [newInvestigator],
      }).unwrap();

      toast.success(`Dossier ${response.data?.caseId || "Created"} Registered.`);
      setIsModalOpen(false);
      setNewTitle("");
      setNewDescription("");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to register case dossier.");
    }
  };

  const handleDeleteCase = async (id, e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this case docket?")) {
      try {
        await deleteCaseMutation(id).unwrap();
        toast.success("Case dossier removed from active docket.");
      } catch (err) {
        toast.error("Failed to delete case.");
      }
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans antialiased text-[#f3f4f6]">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1e232a]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-white tracking-tight">
              Case Management
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#18261c] text-[#8fa38d] border border-[#25392b]">
              28 DOCKETS
            </span>
          </div>
          <p className="text-xs text-[#9ca3af] mt-0.5">
            Cross-jurisdictional syndicate investigations, sealed grand jury dockets, and evidentiary files.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="h-8.5 px-3.5 rounded-md bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Case Docket</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-4 shadow-xs">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#9ca3af]">
            Total Cases
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {casesList.length}
          </div>
          <div className="text-[10px] text-[#8fa38d] font-mono mt-0.5">
            Active Multi-Agency Operations
          </div>
        </div>

        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-4 shadow-xs">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#9ca3af]">
            Grand Jury Sealed
          </div>
          <div className="text-2xl font-bold font-mono text-[#c4a265] mt-1">
            {casesList.filter((c) => c.grandJuryProtected || c.classification?.includes("RULE 6(E)")).length || 2}
          </div>
          <div className="text-[10px] text-[#9ca3af] font-mono mt-0.5">
            Rule 6(e) Secrecy Protocols
          </div>
        </div>

        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-4 shadow-xs">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#9ca3af]">
            Tracked Entities
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {casesList.reduce((acc, c) => acc + (c.entitiesCount || (c.entityReferences?.length || 4)), 0)}
          </div>
          <div className="text-[10px] text-[#9ca3af] font-mono mt-0.5">
            Resolved Biometrics & Orgs
          </div>
        </div>

        <div className="bg-[#14171c] border border-[#222731] rounded-lg p-4 shadow-xs">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#9ca3af]">
            Actionable Leads
          </div>
          <div className="text-2xl font-bold font-mono text-[#dc7869] mt-1">
            {casesList.reduce((acc, c) => acc + (c.activeLeadsCount || 3), 0)}
          </div>
          <div className="text-[10px] text-[#c4a265] font-mono mt-0.5">
            High Priority Triage
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-3 bg-[#14171c] border border-[#222731] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2.5 w-full sm:w-96">
          <Search className="w-3.5 h-3.5 text-[#606875] shrink-0" />
          <input
            type="text"
            placeholder="Filter by docket number, case name, investigator..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#101317] border border-[#222731] rounded-md px-3 py-1.5 text-white placeholder-[#606875] focus:outline-none focus:border-[#9cae9b] text-xs font-sans"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#101317] border border-[#222731] rounded-md px-3 py-1.5 text-[#d1d5db] focus:outline-none focus:border-[#9cae9b] text-xs"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Operations</option>
            <option value="PENDING">Under Review</option>
            <option value="EVIDENTIARY_HOLD">Evidentiary Hold</option>
            <option value="CLOSED">Closed Dockets</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-[#101317] border border-[#222731] rounded-md px-3 py-1.5 text-[#d1d5db] focus:outline-none focus:border-[#9cae9b] text-xs"
          >
            <option value="ALL">All Threat Tiers</option>
            <option value="CRITICAL">Critical Severity</option>
            <option value="HIGH">High Severity</option>
            <option value="MEDIUM">Medium Severity</option>
            <option value="LOW">Low Severity</option>
          </select>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-[#14171c] border border-[#222731] rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#101317] text-[#9ca3af] font-mono text-[10px] uppercase tracking-wider border-b border-[#222731]">
              <tr>
                <th className="py-3 px-4 font-semibold">Docket & Case Name</th>
                <th className="py-3 px-4 font-semibold">Status & Severity</th>
                <th className="py-3 px-4 font-semibold">Lead Investigator</th>
                <th className="py-3 px-4 font-semibold text-center">Entities</th>
                <th className="py-3 px-4 font-semibold text-center">Relationships</th>
                <th className="py-3 px-4 font-semibold text-center">Active Leads</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e232a] text-[#d1d5db]">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#9ca3af] font-mono">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-[#9cae9b]" />
                    Loading secure case dockets...
                  </td>
                </tr>
              ) : filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#9ca3af]">
                    <AlertCircle className="w-5 h-5 mx-auto mb-2 text-[#606875]" />
                    No investigation cases found matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredCases.map((c) => {
                  const caseId = c.caseId || c.id || c.caseNumber;
                  const isActive = caseId === activeCase?.id || caseId === activeCase?.caseId;
                  return (
                    <tr
                      key={caseId}
                      onClick={() => {
                        setActiveCaseId(caseId);
                        navigate(`/cases/${caseId}`);
                      }}
                      className={`hover:bg-[#181c22] transition-colors cursor-pointer group ${
                        isActive ? "bg-[#181c22]/80 border-l-2 border-[#9cae9b]" : ""
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold text-[#9cae9b] text-xs">
                            {c.caseId || c.caseNumber}
                          </span>
                          {(c.grandJuryProtected || c.classification?.includes("RULE 6(E)")) && (
                            <span
                              className="px-1.5 py-0.2 rounded bg-[#181c22] border border-[#2a313d] text-[#c4a265] font-mono text-[9px] font-medium flex items-center gap-1"
                              title="Rule 6(e) Grand Jury Sealed"
                            >
                              <Lock className="w-2.5 h-2.5" />
                              SEALED
                            </span>
                          )}
                        </div>
                        <div className="text-white font-medium mt-0.5 group-hover:text-[#9cae9b] transition-colors">
                          {c.title}
                        </div>
                        <div className="text-[10px] text-[#606875] font-mono">
                          {c.classification || "RESTRICTED // LAW ENFORCEMENT"}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 font-mono text-[10px]">
                          <span
                            className={`px-1.5 py-0.2 rounded font-medium uppercase ${
                              c.status === "ACTIVE"
                                ? "bg-[#18261c] border border-[#25392b] text-[#8fa38d]"
                                : c.status === "PENDING"
                                ? "bg-[#282215] border border-[#3e3420] text-[#c4a265]"
                                : "bg-[#161a20] border border-[#232832] text-[#9ca3af]"
                            }`}
                          >
                            {c.status}
                          </span>
                          <span
                            className={`px-1.5 py-0.2 rounded font-medium uppercase ${
                              c.priority === "CRITICAL"
                                ? "bg-[#2b1719] border border-[#442327] text-[#dc7869]"
                                : c.priority === "HIGH"
                                ? "bg-[#282215] border border-[#3e3420] text-[#c4a265]"
                                : "bg-[#161a20] border border-[#232832] text-[#9ca3af]"
                            }`}
                          >
                            {c.priority}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-sans">
                        <div className="text-[#f3f4f6] font-medium">
                          {c.assignedInvestigators?.[0] || c.leadInvestigator || "M. Kessler"}
                        </div>
                        <div className="text-[10px] text-[#606875] font-mono">
                          Senior Analyst
                        </div>
                      </td>

                      <td className="py-3 px-4 text-center font-mono text-white font-medium">
                        {c.entitiesCount || (c.entityReferences?.length || 4)}
                      </td>

                      <td className="py-3 px-4 text-center font-mono text-white font-medium">
                        {c.relationshipsCount || 8}
                      </td>

                      <td className="py-3 px-4 text-center font-mono font-medium text-[#dc7869]">
                        {c.activeLeadsCount || 3}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => handleDeleteCase(c.caseId || c.id, e)}
                            className="p-1 rounded hover:bg-[#2b1719] text-[#606875] hover:text-[#dc7869] transition-colors"
                            title="Delete Docket"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="p-1 rounded text-[#606875] group-hover:text-white transition-colors">
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Case Docket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0d0f11]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#14171c] border border-[#222731] rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4 font-sans text-xs text-[#d1d5db]">
            <div className="flex items-center justify-between border-b border-[#222731] pb-3">
              <div className="flex items-center gap-2 text-white font-semibold uppercase font-mono">
                <Briefcase className="w-4 h-4 text-[#9cae9b]" />
                <span>Register New Investigation Case</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#606875] hover:text-white text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCase} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono text-[#9ca3af] uppercase font-semibold mb-1">
                  Case Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Hawala Network Syndicate Alpha"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#101317] border border-[#222731] rounded-md px-3 py-2 text-white placeholder-[#606875] focus:outline-none focus:border-[#9cae9b] text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#9ca3af] uppercase font-semibold mb-1">
                  Investigation Summary
                </label>
                <textarea
                  rows={3}
                  placeholder="Overview of targets, connected phone numbers, and operational scope..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-[#101317] border border-[#222731] rounded-md px-3 py-2 text-white placeholder-[#606875] focus:outline-none focus:border-[#9cae9b] text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#9ca3af] uppercase font-semibold mb-1">
                    Severity Tier
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full bg-[#101317] border border-[#222731] rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#9cae9b] text-xs"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#9ca3af] uppercase font-semibold mb-1">
                    Lead Investigator
                  </label>
                  <input
                    type="text"
                    required
                    value={newInvestigator}
                    onChange={(e) => setNewInvestigator(e.target.value)}
                    className="w-full bg-[#101317] border border-[#222731] rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#9cae9b] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#9ca3af] uppercase font-semibold mb-1">
                  Security Clearance
                </label>
                <input
                  type="text"
                  value={newClassification}
                  onChange={(e) => setNewClassification(e.target.value)}
                  className="w-full bg-[#101317] border border-[#222731] rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#9cae9b] text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-2 rounded-md bg-[#101317] hover:bg-[#181c22] border border-[#222731] text-[#9ca3af] hover:text-white font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-4 py-2 rounded-md bg-[#9cae9b] hover:bg-[#8da08c] text-[#0d130e] font-semibold flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  {isCreating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>{isCreating ? "Registering..." : "Create Case"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export { CasesListPage };
export default CasesListPage;
