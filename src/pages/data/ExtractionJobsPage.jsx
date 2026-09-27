import React, { useState } from "react";
import {
  RefreshCw,
  Clock,
  Terminal,
  X,
  Play,
  Cpu,
  Layers,
  Sparkles,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import toast from "react-hot-toast";

const INITIAL_JOBS = [
  {
    id: "JOB-901",
    sourceName: "Manhattan Cell Tower Dumps (AT&T Sector 4)",
    model: "IntelliTrack-NLP-v4.8 + NER Fast-Extract",
    status: "PROCESSING",
    progress: 68,
    entitiesFound: 38,
    relationshipsFound: 92,
    errorCount: 0,
    duration: "2m 14s",
    startedAt: "14:38:10 UTC"
  },
  {
    id: "JOB-900",
    sourceName: "FinCEN SAR Transaction Matrix",
    model: "Financial Entity Extractor v3.1",
    status: "COMPLETED",
    progress: 100,
    entitiesFound: 142,
    relationshipsFound: 310,
    errorCount: 2,
    duration: "4m 02s",
    startedAt: "13:50:00 UTC"
  },
  {
    id: "JOB-899",
    sourceName: "Port Authority ALPR Optical Image Stream",
    model: "YOLOv10-Tactical-ALPR + OCR-License",
    status: "COMPLETED",
    progress: 100,
    entitiesFound: 512,
    relationshipsFound: 840,
    errorCount: 0,
    duration: "8m 45s",
    startedAt: "12:15:30 UTC"
  },
  {
    id: "JOB-898",
    sourceName: "Encrypted Wiretap VoLTE Audio Transcripts",
    model: "Whisper-LawEnforcement-FineTune + Diarization",
    status: "COMPLETED",
    progress: 100,
    entitiesFound: 64,
    relationshipsFound: 148,
    errorCount: 1,
    duration: "11m 20s",
    startedAt: "10:04:12 UTC"
  }
];

export const ExtractionJobsPage = () => {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [selectedLogsJob, setSelectedLogsJob] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const handleRerun = (id, name) => {
    toast.success(`Triggered extraction re-run for ${name}`);
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: "PROCESSING", progress: 12 } : j))
    );
  };

  const filteredJobs = jobs.filter((j) => {
    const matchesStatus = statusFilter === "ALL" || j.status === statusFilter;
    const matchesSearch =
      j.sourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-4 border-b border-[#222731]">
        <div>
          <div className="flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider font-mono mb-1">
            <span>AI INFERENCE & NER</span>
            <span>/</span>
            <span className="text-tactical-sage-400 font-semibold">EXTRACTION JOBS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Intelligence Entity Extraction Jobs
          </h1>
          <p className="text-xs sm:text-sm text-tactical-neutral-400 mt-1 max-w-2xl leading-relaxed">
            Automated named-entity recognition (NER), speaker diarization, ALPR OCR inference passes, and relationship discovery runs
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="sage"
            size="sm"
            onClick={() => toast.success("Scheduled batch extraction job for all active feeds")}
            icon={<Play className="w-3.5 h-3.5" />}
            className="text-xs font-mono"
          >
            Execute Batch Run
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-[#14171c] border border-[#222731] rounded-xl p-4">
          <div className="flex items-center justify-between text-[11px] text-tactical-neutral-400 font-semibold mb-1">
            <span>PIPELINES RUNNING</span>
            <Cpu className="w-3.5 h-3.5 text-tactical-sage-400 animate-pulse" />
          </div>
          <div className="text-xl font-bold text-white tracking-tight">
            {jobs.filter((j) => j.status === "PROCESSING").length} Active
          </div>
          <div className="text-[10px] text-tactical-neutral-500 mt-1">{jobs.length} total batch jobs queued</div>
        </div>

        <div className="bg-[#14171c] border border-[#222731] rounded-xl p-4">
          <div className="flex items-center justify-between text-[11px] text-tactical-neutral-400 font-semibold mb-1">
            <span>ENTITIES EXTRACTED</span>
            <Layers className="w-3.5 h-3.5 text-tactical-neutral-400" />
          </div>
          <div className="text-xl font-bold text-white tracking-tight">
            {jobs.reduce((acc, j) => acc + j.entitiesFound, 0)} Total
          </div>
          <div className="text-[10px] text-tactical-neutral-500 mt-1">99.4% confidence rating</div>
        </div>

        <div className="bg-[#14171c] border border-[#222731] rounded-xl p-4">
          <div className="flex items-center justify-between text-[11px] text-tactical-neutral-400 font-semibold mb-1">
            <span>RELATIONSHIPS RESOLVED</span>
            <Sparkles className="w-3.5 h-3.5 text-tactical-sage-400" />
          </div>
          <div className="text-xl font-bold text-tactical-sage-400 tracking-tight">
            {jobs.reduce((acc, j) => acc + j.relationshipsFound, 0)} Edges
          </div>
          <div className="text-[10px] text-tactical-neutral-500 mt-1">Graph linkages resolved</div>
        </div>

        <div className="bg-[#14171c] border border-[#222731] rounded-xl p-4">
          <div className="flex items-center justify-between text-[11px] text-tactical-neutral-400 font-semibold mb-1">
            <span>AVG INFERENCE TIME</span>
            <Clock className="w-3.5 h-3.5 text-tactical-neutral-400" />
          </div>
          <div className="text-xl font-bold text-white tracking-tight">6m 30s</div>
          <div className="text-[10px] text-tactical-neutral-500 mt-1">p95 parallel worker runtime</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#14171c] border border-[#222731] rounded-xl p-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 font-mono text-xs">
          {["ALL", "PROCESSING", "COMPLETED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                statusFilter === st
                  ? "bg-[#1c222b] text-white border border-[#2e3644] shadow-sm"
                  : "bg-[#101317] text-tactical-neutral-400 hover:text-white border border-[#222731]"
              }`}
            >
              {st} ({st === "ALL" ? jobs.length : jobs.filter((j) => j.status === st).length})
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-tactical-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search extraction jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#101317] border border-[#222731] focus:border-tactical-sage-400/50 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-tactical-neutral-600 focus:outline-none transition-colors font-mono"
          />
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-[#14171c] border border-[#222731] rounded-xl overflow-hidden font-mono text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#101317] text-tactical-neutral-500 text-[11px] uppercase tracking-wider border-b border-[#222731]">
              <tr>
                <th className="py-3 px-4">Job ID & Source</th>
                <th className="py-3 px-4">AI Model Pipeline</th>
                <th className="py-3 px-4">Status & Progress</th>
                <th className="py-3 px-4 text-center">Entities</th>
                <th className="py-3 px-4 text-center">Relationships</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222731]/60 text-tactical-neutral-300">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-[#181d24]/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-tactical-sage-400">{job.id}</div>
                    <div className="text-white font-sans font-semibold mt-0.5 max-w-xs truncate">{job.sourceName}</div>
                  </td>
                  <td className="py-4 px-4 text-tactical-neutral-400 text-[11px]">
                    <div className="font-medium text-white">{job.model}</div>
                  </td>
                  <td className="py-4 px-4 min-w-[180px]">
                    <div className="flex items-center justify-between text-[10px] mb-1.5">
                      <span className={`font-bold uppercase ${job.status === "COMPLETED" ? "text-tactical-success-400" : "text-tactical-warning-400 animate-pulse"}`}>
                        ● {job.status}
                      </span>
                      <span className="text-white font-bold">{job.progress}%</span>
                    </div>
                    <div className="w-full bg-[#101317] rounded-full h-1.5 overflow-hidden border border-[#222731]">
                      <div
                        className={`h-full transition-all duration-300 ${
                          job.status === "COMPLETED" ? "bg-tactical-sage-400" : "bg-tactical-warning-400 animate-pulse"
                        }`}
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-white text-sm">{job.entitiesFound}</td>
                  <td className="py-4 px-4 text-center font-bold text-tactical-sage-400 text-sm">{job.relationshipsFound}</td>
                  <td className="py-4 px-4 text-tactical-neutral-400 text-[11px]">
                    <div className="font-semibold text-white">{job.duration}</div>
                    <div className="text-[10px] text-tactical-neutral-500">{job.startedAt}</div>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedLogsJob(job)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#101317] hover:bg-[#181d24] border border-[#222731] hover:border-[#2e3644] text-tactical-neutral-300 text-[11px] inline-flex items-center gap-1 transition-colors"
                      title="Inspect Job Logs"
                    >
                      <Terminal className="w-3 h-3 text-tactical-sage-400" />
                      <span>Logs</span>
                    </button>
                    <button
                      onClick={() => handleRerun(job.id, job.sourceName)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#101317] hover:bg-[#181d24] border border-[#222731] hover:border-[#2e3644] text-tactical-sage-400 text-[11px] inline-flex items-center gap-1 transition-colors"
                      title="Re-run extraction"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Re-run</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Execution Logs Modal */}
      {selectedLogsJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none font-mono">
          <div className="w-full max-w-2xl bg-[#14171c] border border-[#222731] rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-[#101317] px-5 py-3.5 border-b border-[#222731] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-tactical-sage-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Parser Logs — {selectedLogsJob.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedLogsJob(null)}
                className="p-1 rounded text-tactical-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-[#0d0f11] text-[11px] text-tactical-neutral-300 space-y-2 h-72 overflow-y-auto font-mono leading-relaxed">
              <div className="text-tactical-neutral-500">[14:38:10 UTC] INFO: Initializing model weights {selectedLogsJob.model}</div>
              <div className="text-tactical-neutral-500">[14:38:11 UTC] INFO: Reading binary telemetry stream for {selectedLogsJob.sourceName}</div>
              <div className="text-tactical-sage-400">[14:38:14 UTC] DEBUG: Extracted 12 E164 Phone numbers, matching carrier registry</div>
              <div className="text-tactical-sage-400">[14:38:19 UTC] DEBUG: Audio diarization resolved 2 dominant speakers (Confidence 98.2%)</div>
              <div className="text-tactical-success-400 font-semibold">[14:38:22 UTC] SUCCESS: Entity 'Viktor Sokolov' linked to 3 phone IDs via co-occurrence</div>
              <div className="text-tactical-neutral-400">[14:38:25 UTC] AUDIT: FRE 902(14) Cryptographic SHA-256 fingerprint anchored</div>
              <div className="text-tactical-sage-400 font-bold bg-[#14171c] p-1.5 rounded border border-[#222731]">
                [14:38:30 UTC] PROGRESS: Batch parsing reached {selectedLogsJob.progress}% completion
              </div>
            </div>

            <div className="bg-[#101317] px-5 py-3 border-t border-[#222731] flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedLogsJob(null)}
                className="border-[#222731] text-xs"
              >
                Close Log
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtractionJobsPage;
