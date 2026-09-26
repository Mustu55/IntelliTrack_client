import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ZuluClock } from "@/components/common/ZuluClock";
import { HashStamp } from "@/components/common/HashStamp";
import { Button } from "@/components/ui/Button";
import {
  Shield,
  Search,
  Share2,
  MapPin,
  Flame,
  FileCheck,
  Key,
  ArrowRight,
  CheckCircle2,
  Activity,
  Cpu,
  Database,
  Layers,
  Sparkles,
  Lock,
  Eye,
  FileText,
  Phone,
  CreditCard,
  Building,
  Users,
  Compass,
  AlertTriangle
} from "lucide-react";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [activeSandboxTab, setActiveSandboxTab] = useState("network");
  const canvasRef = useRef(null);

  // Subtle dynamic network particle animation in hero background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const nodes = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 2,
      color: ["#2563EB", "#06B6D4", "#10B981", "#8B5CF6"][Math.floor(Math.random() * 4)]
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.18 * (1 - dist / 140)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = node.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#07111F] text-[#F8FAFC] selection:bg-[#2563EB] selection:text-white flex flex-col">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 border-b border-[#263B55] bg-gradient-to-b from-[#0D1B2A] via-[#07111F] to-[#07111F]">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="flex flex-col items-center text-center space-y-6">
            
            {/* Top Operational Pill */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-3 py-1.5 bg-[#101F33]/90 border border-[#263B55] rounded-full shadow-lg font-mono text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-[#2563EB]/20 text-[#38BDF8] border border-[#2563EB]/40 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                INTELLITRACK AI COMMAND PLATFORM
              </span>
              <ZuluClock />
              <span className="hidden md:inline text-[#263B55]">|</span>
              <span className="hidden md:inline text-[#94A3B8] font-mono text-[11px]">
                FIPS 140-3 LEVEL 4 // CJIS COMPLIANT
              </span>
            </div>

            {/* Emblem / Badge Icon */}
            <div className="relative my-2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#101F33] border-2 border-[#2563EB] shadow-2xl shadow-[#2563EB]/20 flex items-center justify-center mx-auto relative group transition-transform hover:scale-105 duration-300">
                <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-[#06B6D4]" />
                <div className="absolute inset-0 rounded-2xl border border-[#06B6D4]/30 pointer-events-none animate-pulse" />
              </div>
            </div>

            {/* Hero Title & Subtitle */}
            <div className="max-w-4xl space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-sans">
                Turn Fragmented Intelligence Into{" "}
                <span className="bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#10B981] bg-clip-text text-transparent">
                  Connected Investigations
                </span>
              </h1>
              <p className="text-base sm:text-xl text-[#94A3B8] leading-relaxed max-w-3xl mx-auto font-normal">
                IntelliTrack connects people, organizations, communications, transactions, locations and events into one explainable investigation intelligence platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/dashboard")}
                icon={<ArrowRight className="w-4 h-4 text-white" />}
                className="w-full sm:w-auto font-sans font-bold uppercase tracking-wide text-xs px-8 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-lg shadow-[#2563EB]/40 transition-all cursor-pointer"
              >
                Explore Investigation
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/network")}
                icon={<Share2 className="w-4 h-4 text-[#06B6D4]" />}
                className="w-full sm:w-auto font-sans font-semibold uppercase tracking-wide text-xs px-8 py-3.5 bg-[#101F33] hover:bg-[#12243A] text-white border border-[#263B55] hover:border-[#06B6D4]/50 shadow-md transition-all cursor-pointer"
              >
                View Network Graph
              </Button>
            </div>

            {/* Realistic Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-4xl w-full text-left font-mono">
              <div className="p-3.5 bg-[#101F33]/80 rounded-xl border border-[#263B55] shadow-sm hover:border-[#2563EB]/50 transition-colors">
                <div className="text-[10px] uppercase text-[#94A3B8] font-semibold">Active Investigations</div>
                <div className="text-2xl font-bold text-white mt-1">18 Cases</div>
                <div className="text-[10px] text-[#10B981] font-semibold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> 100% Traceable
                </div>
              </div>

              <div className="p-3.5 bg-[#101F33]/80 rounded-xl border border-[#263B55] shadow-sm hover:border-[#06B6D4]/50 transition-colors">
                <div className="text-[10px] uppercase text-[#94A3B8] font-semibold">Entities Resolved</div>
                <div className="text-2xl font-bold text-white mt-1">1,429</div>
                <div className="text-[10px] text-[#06B6D4] font-semibold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" /> 94.2% Confidence
                </div>
              </div>

              <div className="p-3.5 bg-[#101F33]/80 rounded-xl border border-[#263B55] shadow-sm hover:border-[#10B981]/50 transition-colors">
                <div className="text-[10px] uppercase text-[#94A3B8] font-semibold">Relationships Mapped</div>
                <div className="text-2xl font-bold text-white mt-1">3,892</div>
                <div className="text-[10px] text-[#10B981] font-semibold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Multi-Hop Correlated
                </div>
              </div>

              <div className="p-3.5 bg-[#101F33]/80 rounded-xl border border-[#263B55] shadow-sm hover:border-[#EF4444]/50 transition-colors">
                <div className="text-[10px] uppercase text-[#94A3B8] font-semibold">High-Priority Leads</div>
                <div className="text-2xl font-bold text-white mt-1">24 Active</div>
                <div className="text-[10px] text-[#F59E0B] font-semibold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" /> Explainable AI
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE VALUE PROPOSITION SECTION */}
      <section className="py-20 border-b border-[#263B55] bg-[#0D1B2A]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#06B6D4] mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
              CORE ARCHITECTURAL PIPELINE
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              FROM FRAGMENTED DATA → TO INVESTIGATIVE INTELLIGENCE
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] mt-3">
              IntelliTrack ingests heterogeneous law-enforcement data streams, resolves entity identities, and constructs defensible, court-admissible leads.
            </p>
          </div>

          {/* 8-Stage Pipeline Flow */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              {
                step: "01",
                label: "Multiple Sources",
                desc: "FIRs, CDRs, Bank Wires, Surveillance & OSINT",
                icon: Database,
                color: "text-[#38BDF8]",
                bg: "bg-[#2563EB]/10",
                border: "border-[#2563EB]/30"
              },
              {
                step: "02",
                label: "AI / NLP Processing",
                desc: "Named Entity Recognition & Semantic Parsing",
                icon: Cpu,
                color: "text-[#8B5CF6]",
                bg: "bg-[#8B5CF6]/10",
                border: "border-[#8B5CF6]/30"
              },
              {
                step: "03",
                label: "Entity Resolution",
                desc: "Fuzzy Matching, Alias Deduplication & Jaro-Winkler",
                icon: Users,
                color: "text-[#06B6D4]",
                bg: "bg-[#06B6D4]/10",
                border: "border-[#06B6D4]/30"
              },
              {
                step: "04",
                label: "Relationship Graph",
                desc: "Multi-Hop Syndicate Links & Centrality Indexing",
                icon: Share2,
                color: "text-[#2563EB]",
                bg: "bg-[#2563EB]/10",
                border: "border-[#2563EB]/30"
              },
              {
                step: "05",
                label: "Geo-Temporal Analysis",
                desc: "Tower Azimuths, ALPR Cameras & Time Convergence",
                icon: MapPin,
                color: "text-[#10B981]",
                bg: "bg-[#10B981]/10",
                border: "border-[#10B981]/30"
              },
              {
                step: "06",
                label: "Explainable Leads",
                desc: "Defensible Heuristics & 'Why this lead?' Audit",
                icon: Flame,
                color: "text-[#F59E0B]",
                bg: "bg-[#F59E0B]/10",
                border: "border-[#F59E0B]/30"
              },
              {
                step: "07",
                label: "Investigator Cockpit",
                desc: "Human-in-the-Loop Triage & Dossier Compilation",
                icon: Shield,
                color: "text-[#38BDF8]",
                bg: "bg-[#38BDF8]/10",
                border: "border-[#38BDF8]/30"
              }
            ].map((stage, idx) => (
              <div
                key={stage.step}
                className={`p-4 rounded-xl ${stage.bg} border ${stage.border} flex flex-col justify-between hover:scale-102 hover:shadow-lg transition-all duration-200 group relative`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] font-bold text-[#94A3B8]">STAGE {stage.step}</span>
                    <stage.icon className={`w-5 h-5 ${stage.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <div className="font-bold text-sm text-white mb-1.5 font-sans leading-tight">
                    {stage.label}
                  </div>
                  <div className="text-[11px] text-[#94A3B8] leading-normal font-sans">
                    {stage.desc}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-[#263B55]/40 flex items-center justify-between text-[10px] font-mono text-[#06B6D4]">
                  <span>AI VERIFIED</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE ANALYTICAL SANDBOX */}
      <section id="sandbox" className="py-20 border-b border-[#263B55] bg-[#07111F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#06B6D4] mb-1 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#06B6D4]" />
                FORENSIC CAPABILITIES SIMULATION
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
                Interactive Analytical Sandbox
              </h2>
            </div>
            <div className="flex items-center gap-1 p-1 bg-[#101F33] rounded-lg border border-[#263B55] font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveSandboxTab("network")}
                className={`px-3.5 py-1.5 rounded-md transition-all font-semibold cursor-pointer ${
                  activeSandboxTab === "network"
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                Syndicate Link Chart
              </button>
              <button
                type="button"
                onClick={() => setActiveSandboxTab("geo")}
                className={`px-3.5 py-1.5 rounded-md transition-all font-semibold cursor-pointer ${
                  activeSandboxTab === "geo"
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                Tower Radiometry
              </button>
              <button
                type="button"
                onClick={() => setActiveSandboxTab("merkle")}
                className={`px-3.5 py-1.5 rounded-md transition-all font-semibold cursor-pointer ${
                  activeSandboxTab === "merkle"
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                Chain-of-Custody Root
              </button>
            </div>
          </div>

          <div className="border border-[#263B55] rounded-xl p-6 bg-[#0D1B2A] font-sans min-h-[400px] flex flex-col justify-between shadow-2xl">
            {activeSandboxTab === "network" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-[#263B55]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-pulse" />
                    <span className="font-bold text-white font-mono">TARGET: RAJ MEHTA & VALKOV NETWORK TOPOLOGY</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#94A3B8]">
                    PHYSICS: FORCEATLAS-2 • 12 NODES CORRELATED
                  </span>
                </div>

                <div className="relative h-72 bg-[#101F33] rounded-lg border border-[#263B55] p-4 overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 600 240">
                    <line x1="300" y1="120" x2="160" y2="70" stroke="#263B55" strokeWidth="2" strokeDasharray="3 3" />
                    <line x1="300" y1="120" x2="440" y2="60" stroke="#EF4444" strokeWidth="2" />
                    <line x1="300" y1="120" x2="220" y2="190" stroke="#2563EB" strokeWidth="2" />
                    <line x1="300" y1="120" x2="390" y2="190" stroke="#F59E0B" strokeWidth="1.5" />
                    <line x1="440" y1="60" x2="520" y2="110" stroke="#263B55" strokeWidth="1.5" />
                    <line x1="160" y1="70" x2="90" y2="130" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="2 2" />

                    <circle cx="300" cy="120" r="26" fill="#07111F" stroke="#EF4444" strokeWidth="3" />
                    <text x="300" y="124" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
                      RAJ MEHTA
                    </text>

                    <g transform="translate(160, 70)">
                      <circle r="18" fill="#07111F" stroke="#06B6D4" strokeWidth="2" />
                      <text y="3" fill="#06B6D4" fontSize="8" fontWeight="bold" textAnchor="middle">
                        BURNER
                      </text>
                    </g>

                    <g transform="translate(440, 60)">
                      <circle r="20" fill="#07111F" stroke="#EF4444" strokeWidth="2" />
                      <text y="4" fill="#EF4444" fontSize="8" fontWeight="bold" textAnchor="middle">
                        HAWALA
                      </text>
                    </g>

                    <g transform="translate(220, 190)">
                      <circle r="18" fill="#07111F" stroke="#10B981" strokeWidth="2" />
                      <text y="3" fill="#10B981" fontSize="8" fontWeight="bold" textAnchor="middle">
                        BLUESTAR
                      </text>
                    </g>

                    <g transform="translate(390, 190)">
                      <circle r="18" fill="#07111F" stroke="#F59E0B" strokeWidth="2" />
                      <text y="3" fill="#F59E0B" fontSize="8" fontWeight="bold" textAnchor="middle">
                        PIER 42
                      </text>
                    </g>

                    <g transform="translate(520, 110)">
                      <circle r="16" fill="#07111F" stroke="#94A3B8" strokeWidth="1.5" />
                      <text y="3" fill="#94A3B8" fontSize="8" fontWeight="bold" textAnchor="middle">
                        ACCOUNT
                      </text>
                    </g>

                    <g transform="translate(90, 130)">
                      <circle r="16" fill="#07111F" stroke="#8B5CF6" strokeWidth="1.5" />
                      <text y="3" fill="#8B5CF6" fontSize="8" fontWeight="bold" textAnchor="middle">
                        IMEI #48
                      </text>
                    </g>
                  </svg>
                </div>

                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <span className="font-mono">Louvain Community Centrality Score: 0.892</span>
                  <button
                    onClick={() => navigate("/network")}
                    className="text-[#06B6D4] hover:text-[#38BDF8] flex items-center gap-1 font-bold font-mono transition-colors cursor-pointer"
                  >
                    Open Live Network Graph <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {activeSandboxTab === "geo" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-[#263B55]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]" />
                    <span className="font-bold text-white font-mono">SECTOR SCAN: JNPT PORT MARITIME TOWER AZIMUTH 120°</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#94A3B8]">
                    CDR PING CO-LOCATION DETECTED (T-14:22 UTC)
                  </span>
                </div>

                <div className="relative h-72 bg-[#101F33] rounded-lg border border-[#263B55] p-4 overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 600 240">
                    <line x1="50" y1="120" x2="550" y2="120" stroke="#263B55" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="300" y1="20" x2="300" y2="220" stroke="#263B55" strokeWidth="1" strokeDasharray="4 4" />
                    <path d="M 240 120 L 380 50 A 160 160 0 0 1 380 190 Z" fill="rgba(6, 182, 212, 0.15)" stroke="#06B6D4" strokeWidth="1.5" />
                    <circle cx="240" cy="120" r="8" fill="#2563EB" stroke="#06B6D4" strokeWidth="2" />
                    <text x="240" y="145" fill="#94A3B8" fontSize="9" textAnchor="middle">
                      TOWER-JNPT-09
                    </text>
                    <circle cx="340" cy="100" r="5" fill="#EF4444" className="animate-ping" opacity="0.75" />
                    <circle cx="340" cy="100" r="6" fill="#EF4444" stroke="#FCA5A5" strokeWidth="2" />
                    <text x="340" y="90" fill="#FCA5A5" fontSize="9" fontWeight="bold" textAnchor="middle">
                      POI-TARGET (RAJ MEHTA)
                    </text>
                  </svg>
                </div>

                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <span className="font-mono">Spatial Accuracy: ±15 meters azimuth</span>
                  <button
                    onClick={() => navigate("/geo")}
                    className="text-[#06B6D4] hover:text-[#38BDF8] flex items-center gap-1 font-bold font-mono transition-colors cursor-pointer"
                  >
                    Open Live Geo-Temporal Map <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {activeSandboxTab === "merkle" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-[#263B55]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    <span className="font-bold text-white font-mono">MERKLE STATE: BLOCK #4102 PROVEN</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#10B981] font-bold">
                    CJIS 5.4 CERTIFIED
                  </span>
                </div>

                <div className="p-4 bg-[#101F33] rounded-lg border border-[#263B55] space-y-3 font-mono">
                  <div>
                    <span className="text-[10px] text-[#94A3B8] block mb-1">CURRENT EPOCH ROOT HASH:</span>
                    <HashStamp
                      hash="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                      lead={16}
                      tail={16}
                      className="text-xs"
                    />
                  </div>
                  <div className="text-xs text-[#94A3B8] leading-relaxed font-sans">
                    Every evidentiary ingestion, warrant request, and lead triage decision is sequentially hashed into an immutable append-only tree. Tamper-evident down to the single byte under Federal Rules of Evidence 902(13).
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <span className="font-mono">Zero-Knowledge Verification Latency: 1.4ms</span>
                  <button
                    onClick={() => navigate("/evidence")}
                    className="text-[#06B6D4] hover:text-[#38BDF8] flex items-center gap-1 font-bold font-mono transition-colors cursor-pointer"
                  >
                    Open Evidence Chain of Custody <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CORE PRODUCT PRINCIPLES SECTION */}
      <section className="py-20 bg-[#0D1B2A]/40 border-b border-[#263B55]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#10B981] mb-2">
              FOUNDATIONAL STANDARDS
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Built for Serious Criminal Intelligence Analysis
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] mt-2">
              Engineered with explainable AI principles where human investigators maintain complete evidentiary sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#101F33] border border-[#263B55] hover:border-[#2563EB]/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/30 flex items-center justify-center text-[#38BDF8] mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Explainable AI Reasoning</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                No black-box scores. Every recommendation breaks down into explicit graph signals, overlapping cellular pings, and matched financial transfers with source record links.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#101F33] border border-[#263B55] hover:border-[#06B6D4]/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/30 flex items-center justify-center text-[#06B6D4] mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Human-in-the-Loop Verification</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                AI surfaces prioritized leads, but never replaces the investigator. All actions require sworn detective review before dossier submission or warrant drafting.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#101F33] border border-[#263B55] hover:border-[#10B981]/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Cryptographic Chain of Custody</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Every record ingestion and audit touchpoint is sealed in SHA-256 Merkle proofs, guaranteeing court admissibility under Federal Rules of Evidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default LandingPage;
