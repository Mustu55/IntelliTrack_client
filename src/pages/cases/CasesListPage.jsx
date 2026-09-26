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
  const [newInvestigator, setNewInvestigator] = useState("Special Agent Elena Rostova");
  const [newPriority, setNewPriority] = useState("HIGH");
  const [newClassification, setNewClassification] = useState("LAW ENFORCEMENT SENSITIVE // TITLE 18");

  const { data: casesResponse, isLoading, error } = useGetCasesQuery({
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
    <div className="space-y-5 max-w-7xl mx-auto font-sans pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1c140d] via-[#23180f] to-[#150f0a] border border-amber-900/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-[11px] uppercase tracking-wider mb-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span>FEDERAL INVESTIGATIVE DOCKET VAULT // FRE 902(13)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Case Dockets & Evidentiary Vaults</h1>
            <p className="text-xs text-amber-200/70 mt-1 max-w-2xl">
              Cross-jurisdictional syndicate investigations, grand jury Rule 6(e) sealed dockets, and immutable evidentiary chain-of-custody files.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-semibold flex items-center gap-2 shadow-lg shadow-amber-600/30 transition-all self-start sm:self-auto shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Case Docket</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 font-mono">
        <div className="p-4 rounded-xl bg-[#1c140d]/90 border border-amber-900/30 shadow-md">
          <div className="text-[10px] uppercase text-amber-400/80">Active Dockets</div>
          <div className="text-2xl font-bold text-amber-100 mt-1">{casesList.length}</div>
          <div className="text-[10px] text-amber-400/70 mt-0.5">● Federal Operations</div>
        </div>
        <div className="p-4 rounded-xl bg-[#1c140d]/90 border border-amber-900/30 shadow-md">
          <div className="text-[10px] uppercase text-amber-400/80">Grand Jury Sealed</div>
          <div className="text-2xl font-bold text-amber-300 mt-1">
            {casesList.filter((c) => c.grandJuryProtected || c.classification?.includes("RULE 6(E)")).length || 2}
          </div>
          <div className="text-[10px] text-amber-400/70 mt-0.5">Rule 6(e) Secrecy</div>
        </div>
        <div className="p-4 rounded-xl bg-[#1c140d]/90 border border-amber-900/30 shadow-md">
          <div className="text-[10px] uppercase text-amber-400/80">Tracked Entities</div>
          <div className="text-2xl font-bold text-amber-100 mt-1">
            {casesList.reduce((acc, c) => acc + (c.entitiesCount || (c.entityReferences?.length || 4)), 0)}
          </div>
          <div className="text-[10px] text-amber-400/70 mt-0.5">Resolved Biometrics</div>
        </div>
        <div className="p-4 rounded-xl bg-[#1c140d]/90 border border-amber-900/30 shadow-md">
          <div className="text-[10px] uppercase text-amber-400/80">Actionable Leads</div>
          <div className="text-2xl font-bold text-rose-400 mt-1">
            {casesList.reduce((acc, c) => acc + (c.activeLeadsCount || 3), 0)}
          </div>
          <div className="text-[10px] text-rose-400/80 mt-0.5">High Priority Triage</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-3.5 bg-[#18110b] border border-amber-900/30 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono shadow-sm">
        <div className="flex items-center gap-2.5 w-full sm:w-96">
          <Search className="w-4 h-4 text-amber-400/70 shrink-0" />
          <input
            type="text"
            placeholder="Filter docket number, operation name, agent..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#120d08] border border-amber-900/40 rounded-lg px-3 py-1.5 text-amber-100 placeholder:text-amber-800/80 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#120d08] border border-amber-900/40 rounded-lg px-3 py-1.5 text-amber-200 focus:outline-none focus:border-amber-500 text-xs"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Operations</option>
            <option value="PENDING">Pending Approval</option>
            <option value="EVIDENTIARY_HOLD">Evidentiary Hold</option>
            <option value="CLOSED">Closed Dockets</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-[#120d08] border border-amber-900/40 rounded-lg px-3 py-1.5 text-amber-200 focus:outline-none focus:border-amber-500 text-xs"
          >
            <option value="ALL">All Threat Tiers</option>
            <option value="CRITICAL">Critical Tier</option>
            <option value="HIGH">High Tier</option>
            <option value="MEDIUM">Medium Tier</option>
          </select>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-[#1c140d] border border-amber-900/30 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#140e09] text-amber-400/80 font-mono text-[11px] uppercase tracking-wider border-b border-amber-900/40">
              <tr>
                <th className="py-3.5 px-4">Docket & Operation</th>
                <th className="py-3.5 px-4">Status & Threat</th>
                <th className="py-3.5 px-4">Lead Investigator</th>
                <th className="py-3.5 px-4 text-center">Entities</th>
                <th className="py-3.5 px-4 text-center">Relationships</th>
                <th className="py-3.5 px-4 text-center">Active Leads</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/20 text-slate-300">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-amber-400/70 font-mono">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Loading secure case dockets...
                  </td>
                </tr>
              ) : filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-amber-400/70 font-mono">
                    <AlertCircle className="w-6 h-6 mx-auto mb-2 opacity-50" />
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
                      className={`hover:bg-amber-950/30 transition-colors cursor-pointer ${
                        isActive ? "bg-amber-950/40 border-l-2 border-amber-500" : ""
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-400 text-xs">
                            {c.caseId || c.caseNumber}
                          </span>
                          {(c.grandJuryProtected || c.classification?.includes("RULE 6(E)")) && (
                            <span
                              className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-600/50 text-amber-300 font-mono text-[9px] font-semibold flex items-center gap-1"
                              title="Rule 6(e) Grand Jury Sealed"
                            >
                              <Lock className="w-2.5 h-2.5 text-amber-400" />
                              SEALED
                            </span>
                          )}
                        </div>
                        <div className="text-white font-semibold mt-0.5">{c.title}</div>
                        <div className="text-[11px] text-amber-200/60 font-mono">
                          {c.classification || "LAW ENFORCEMENT SENSITIVE"}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2 font-mono text-[10px]">
                          <span
                            className={`px-2 py-0.5 rounded font-bold uppercase ${
                              c.status === "ACTIVE"
                                ? "bg-emerald-950 border border-emerald-500/40 text-emerald-400"
                                : c.status === "PENDING"
                                ? "bg-amber-950 border border-amber-500/40 text-amber-400"
                                : "bg-navy-950 border border-slate-700 text-slate-400"
                            }`}
                          >
                            {c.status}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded font-bold uppercase ${
                              c.priority === "CRITICAL"
                                ? "bg-red-950 border border-red-500/40 text-red-400"
                                : c.priority === "HIGH"
                                ? "bg-amber-950 border border-amber-500/40 text-amber-400"
                                : "bg-blue-950 border border-blue-500/40 text-blue-400"
                            }`}
                          >
                            {c.priority}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <div className="text-amber-100 font-medium">
                          {c.assignedInvestigators?.[0] || c.leadInvestigator || "Agent In-Charge"}
                        </div>
                        <div className="text-[10px] text-amber-400/60">
                          {c.badgeNumber ? `Badge: ${c.badgeNumber}` : "Special Investigations"}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-200">
                        {c.entitiesCount || (c.entityReferences?.length || 4)}
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-200">
                        {c.relationshipsCount || 8}
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-bold text-rose-400">
                        {c.activeLeadsCount || 3}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => handleDeleteCase(c.caseId || c.id, e)}
                            className="p-1.5 rounded hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition-colors"
                            title="Delete Docket"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="p-1.5 rounded hover:bg-amber-900/40 text-amber-400 transition-colors">
                            <ChevronRight className="w-4 h-4" />
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1c140d] border border-amber-900/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 font-mono text-xs text-amber-100">
            <div className="flex items-center justify-between border-b border-amber-900/30 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold uppercase">
                <Briefcase className="w-4 h-4" />
                <span>Register New Investigative Docket</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-amber-400/60 hover:text-amber-200 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCase} className="space-y-3.5">
              <div>
                <label className="block text-[11px] text-amber-400/80 uppercase font-semibold mb-1">
                  Operation / Case Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Operation Nightshade // Hawala Network"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#120d08] border border-amber-900/40 rounded-lg px-3 py-2 text-amber-100 placeholder:text-amber-800/80 focus:outline-none focus:border-amber-500 font-sans text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-amber-400/80 uppercase font-semibold mb-1">
                  Dossier Summary / Scope
                </label>
                <textarea
                  rows={3}
                  placeholder="Overview of syndicate targets, jurisdictions, and operational scope..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-[#120d08] border border-amber-900/40 rounded-lg px-3 py-2 text-amber-100 placeholder:text-amber-800/80 focus:outline-none focus:border-amber-500 font-sans text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-amber-400/80 uppercase font-semibold mb-1">
                    Threat Tier
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full bg-[#120d08] border border-amber-900/40 rounded-lg px-3 py-2 text-amber-100 focus:outline-none focus:border-amber-500 text-xs"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-amber-400/80 uppercase font-semibold mb-1">
                    Assigned Agent In-Charge
                  </label>
                  <input
                    type="text"
                    required
                    value={newInvestigator}
                    onChange={(e) => setNewInvestigator(e.target.value)}
                    className="w-full bg-[#120d08] border border-amber-900/40 rounded-lg px-3 py-2 text-amber-100 focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-amber-400/80 uppercase font-semibold mb-1">
                  Security Classification
                </label>
                <input
                  type="text"
                  value={newClassification}
                  onChange={(e) => setNewClassification(e.target.value)}
                  className="w-full bg-[#120d08] border border-amber-900/40 rounded-lg px-3 py-2 text-amber-100 focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#120d08] hover:bg-[#18110b] border border-amber-900/40 text-amber-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-amber-600/30 cursor-pointer"
                >
                  {isCreating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>{isCreating ? "Registering..." : "Register Docket"}</span>
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
