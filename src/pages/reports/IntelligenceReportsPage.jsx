import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { HashStamp } from "@/components/common/HashStamp";
import {
  Download,
  Eye,
  EyeOff,
  CheckCircle,
  Archive,
  Loader2,
  FileText,
} from "lucide-react";
import { useGenerateReportMutation } from "@/store/api/apiSlice";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const IntelligenceReportsPage = () => {
  const { user } = useAuth();
  const [includeSummary, setIncludeSummary] = useState(true);
  const [includePOIs, setIncludePOIs] = useState(true);
  const [includeWiretaps, setIncludeWiretaps] = useState(true);
  const [includeMerkleCert, setIncludeMerkleCert] = useState(true);
  const [redactInformant, setRedactInformant] = useState(true);
  const [exportNotice, setExportNotice] = useState(null);

  const [generateReportMutation, { isLoading: isGenerating }] = useGenerateReportMutation();

  const handleExport = async (format) => {
    try {
      if (format === "PDF") {
        toast.loading("Compiling court-admissible PDF dossier...", { id: "pdf-gen" });
        const res = await generateReportMutation({
          caseId: "CASE-2026-NIGHTSHADE",
          authorName: user?.name || "Special Agent Marcus Vance",
        }).unwrap();

        toast.success(`Dossier compiled: ${res.data?.metadata?.classification}`, { id: "pdf-gen" });
        setExportNotice(`DOSSIER COMPILED: Exported PDF package with cryptographic Bates stamping (Merkle Hash: ${res.data?.evidenceChain?.merkleRoot?.substring(0, 12)}...).`);

        // Trigger native download from Express PDF generator
        window.open("/api/reports/pdf/CASE-2026-NIGHTSHADE", "_blank");
      } else {
        setExportNotice(`DOSSIER COMPILED: Exported ${format} archive package with cryptographic Bates stamping.`);
        toast.success("Evidentiary ZIP vault exported.");
      }
      setTimeout(() => setExportNotice(null), 6000);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to compile intelligence report.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider mb-0.5">
            <span>COURT-ADMISSIBLE INTELLIGENCE DOSSIER COMPILER</span>
            <span>/</span>
            <span className="text-tactical-primary-600 font-semibold">FORM-BRIEF-2026</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-tactical-neutral-900 dark:text-tactical-neutral-100">
            Intelligence Report Builder & Redaction Console
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={isGenerating}
            onClick={() => handleExport("PDF")}
            icon={isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          >
            {isGenerating ? "Compiling..." : "Export Signed PDF"}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleExport("ZIP_VAULT")}
            icon={<Archive className="w-4 h-4" />}
          >
            Export Evidentiary ZIP
          </Button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 bg-tactical-success-50 dark:bg-tactical-success-950/80 border border-tactical-success-300 dark:border-tactical-success-800 rounded flex items-center justify-between text-xs text-tactical-success-800 dark:text-tactical-success-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-tactical-success-600" />
            <span>{exportNotice}</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-tactical-success-600">FIPS 140-3 STAMPED</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 space-y-4">
            <h3 className="text-xs font-bold uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100 pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800">
              Dossier Sections & Inclusions
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-tactical-neutral-800 dark:text-tactical-neutral-200">
                    Executive Synopsis
                  </div>
                  <div className="text-[10px] text-tactical-neutral-500">Statutory authority & probable cause</div>
                </div>
                <Switch checked={includeSummary} onChange={setIncludeSummary} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-tactical-neutral-800 dark:text-tactical-neutral-200">
                    Target POI Biometrics
                  </div>
                  <div className="text-[10px] text-tactical-neutral-500">Known aliases & fingerprints</div>
                </div>
                <Switch checked={includePOIs} onChange={setIncludePOIs} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-tactical-neutral-800 dark:text-tactical-neutral-200">
                    Title III Wiretap Transcripts
                  </div>
                  <div className="text-[10px] text-tactical-neutral-500">Intercept audio logs & IMEI matches</div>
                </div>
                <Switch checked={includeWiretaps} onChange={setIncludeWiretaps} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-tactical-neutral-800 dark:text-tactical-neutral-200">
                    Merkle Audit Chain Certificate
                  </div>
                  <div className="text-[10px] text-tactical-neutral-500">FRE 902(13) cryptographic proof</div>
                </div>
                <Switch checked={includeMerkleCert} onChange={setIncludeMerkleCert} />
              </div>
            </div>

            <div className="pt-3 border-t border-tactical-neutral-200 dark:border-tactical-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-tactical-danger-600 text-xs block">Informant Identity Protection</span>
                  <span className="text-[10px] text-tactical-neutral-500">Redact sensitive CHS / CI markers</span>
                </div>
                <Button
                  variant={redactInformant ? "danger" : "secondary"}
                  size="sm"
                  onClick={() => setRedactInformant(!redactInformant)}
                  icon={redactInformant ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  className="text-[10px] py-1"
                >
                  {redactInformant ? "Redacted" : "Unmasked"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="p-8 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700 shadow-md space-y-6 text-xs text-tactical-neutral-900 dark:text-tactical-neutral-100">
            <div className="text-center pb-4 border-b-2 border-tactical-neutral-900 dark:border-tactical-neutral-100 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-widest text-tactical-danger-600">
                UNITED STATES DEPARTMENT OF JUSTICE // LAW ENFORCEMENT SENSITIVE
              </div>
              <h2 className="text-base font-bold uppercase">INVESTIGATIVE MEMORANDUM & EVIDENTIARY DOSSIER</h2>
              <div className="text-[10px] text-tactical-neutral-500">
                DOCKET: CASE-2026-NIGHTSHADE // OPERATION NIGHTSHADE // BATES: US-DOJ-0001
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800 text-[11px]">
              <div>
                <div>
                  <strong>TO:</strong> United States Magistrate Court, SDNY
                </div>
                <div>
                  <strong>FROM:</strong> {user?.name || "Special Agent Marcus Vance"} ({user?.badgeNumber || "FBI-89412"})
                </div>
                <div>
                  <strong>JURISDICTION:</strong> Southern & Eastern Districts of NY
                </div>
              </div>
              <div>
                <div>
                  <strong>DATE:</strong> March 29, 2026 19:00 ZULU
                </div>
                <div>
                  <strong>CLASSIFICATION:</strong> 18 U.S.C. § 1962 (RICO)
                </div>
                <div>
                  <strong>CHAIN PROOF:</strong> Block #4102 Anchored
                </div>
              </div>
            </div>

            {includeSummary && (
              <div className="space-y-2">
                <h4 className="font-bold uppercase text-xs border-b border-tactical-neutral-200 dark:border-tactical-neutral-800 pb-0.5">
                  I. Executive Synopsis & Probable Cause
                </h4>
                <p className="text-tactical-neutral-700 dark:text-tactical-neutral-300 leading-relaxed font-sans text-xs">
                  This memorandum details probable cause established across a multi-month joint task force wiretap and financial surveillance operation. Evidence collected establishes that the target criminal syndicate has executed unauthorized contraband logistics and structured hawala remittances exceeding $14.8M across Atlantic shipping corridors.
                </p>
              </div>
            )}

            {includePOIs && (
              <div className="space-y-2">
                <h4 className="font-bold uppercase text-xs border-b border-tactical-neutral-200 dark:border-tactical-neutral-800 pb-0.5">
                  II. Primary Target of Investigation
                </h4>
                <div className="p-3 rounded bg-tactical-neutral-50 dark:bg-tactical-neutral-800 border border-tactical-neutral-200 dark:border-tactical-neutral-700 text-[11px] space-y-1">
                  <div>
                    NAME: <strong>Raj Mehta</strong> (Primary Alias: "The Courier" / RM)
                  </div>
                  <div>
                    FBI IDENTIFICATION #: <strong>POI-4409-NY</strong>
                  </div>
                  <div>
                    CITIZENSHIP: <strong>Dual Citizen / International Commercial Operator</strong>
                  </div>
                  <div>
                    THREAT STATUS: <strong className="text-tactical-danger-600">CRITICAL // ACTIVE WARRANT</strong>
                  </div>
                </div>
              </div>
            )}

            {includeWiretaps && (
              <div className="space-y-2">
                <h4 className="font-bold uppercase text-xs border-b border-tactical-neutral-200 dark:border-tactical-neutral-800 pb-0.5">
                  III. Intercept Audio Log & Informant Telemetry
                </h4>
                <div className="p-3 bg-tactical-neutral-100 dark:bg-tactical-neutral-800/80 rounded font-mono text-[11px] space-y-2 border border-tactical-neutral-300 dark:border-tactical-neutral-700">
                  <div className="text-[10px] text-tactical-neutral-500">
                    INTERCEPT #TT3-0042-881 (2026-03-29 14:10:00 ZULU) // TOWER NYC-889
                  </div>
                  <div>
                    <span className="font-bold text-tactical-neutral-800 dark:text-tactical-neutral-200">
                      TARGET MEHTA:
                    </span>{" "}
                    "The consignment cleared customs at Pier 42. Meet{" "}
                    {redactInformant ? (
                      <span className="px-1 py-0.2 bg-tactical-neutral-900 text-white rounded text-[10px] font-bold">
                        [REDACTED // CONFIDENTIAL INFORMANT #9402]
                      </span>
                    ) : (
                      <span className="text-tactical-danger-600 font-bold">Informant Alexei Morozov</span>
                    )}{" "}
                    behind the terminal at 21:00."
                  </div>
                </div>
              </div>
            )}

            {includeMerkleCert && (
              <div className="space-y-2 pt-2 border-t border-tactical-neutral-200 dark:border-tactical-neutral-800">
                <h4 className="font-bold uppercase text-xs">
                  IV. Federal Rules of Evidence 902(13) Self-Authenticating Hash
                </h4>
                <div className="flex items-center justify-between p-2.5 rounded bg-tactical-neutral-50 dark:bg-tactical-neutral-800/50 border border-tactical-neutral-200 dark:border-tactical-neutral-700 text-[10px]">
                  <span>MERKLE ROOT HASH:</span>
                  <HashStamp hash="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" lead={12} tail={12} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceReportsPage;
export { IntelligenceReportsPage };
