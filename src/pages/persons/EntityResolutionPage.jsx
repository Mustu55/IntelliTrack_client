import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  GitMerge,
  Fingerprint,
  UserCheck,
  ShieldCheck,
  Split
} from "lucide-react";
const initialClusters = [
  {
    id: "CLUST-2026-089",
    clusterName: "Konstantin Valkov // Kostya Valkov Permutation",
    confidenceScore: 94.8,
    matchType: "PHONETIC_JARO_WINKLER",
    entityA: {
      name: "Konstantin Valkov",
      fbiNumber: "FBI-994012-NY",
      agency: "FBI SDNY Joint Task Force",
      alias: "Kostya / The Wolf",
      dob: "1982-05-14",
      docket: "FED-2026-0042",
      phone: "+1 (555) 019-2831"
    },
    entityB: {
      name: "Kostya A. Valkov",
      fbiNumber: "DEA-NJ-88210",
      agency: "DEA Newark Field Division",
      alias: "K. Valkov",
      dob: "1982-05-14",
      docket: "DEA-2025-0918",
      phone: "+1 (555) 019-2831 (Same IMEI)"
    },
    status: "PENDING_REVIEW"
  },
  {
    id: "CLUST-2026-092",
    clusterName: "Tariq Al-Mansoor // T. Mansoor Financial Alias",
    confidenceScore: 89.2,
    matchType: "DEVICE_TELEMETRY",
    entityA: {
      name: "Tariq Al-Mansoor",
      fbiNumber: "FINCEN-SAR-4102",
      agency: "FinCEN Transnational Hawala Unit",
      alias: "The Banker",
      dob: "1979-11-20",
      docket: "FED-2026-0042",
      phone: "+971 50 123 4567"
    },
    entityB: {
      name: "Tariq Mansour",
      fbiNumber: "PENDING",
      agency: "NYPD Financial Crimes",
      alias: "T. Mansour",
      dob: "1979-11-20",
      docket: "NYPD-2026-8812",
      phone: "+971 50 123 4567 (Shared SWIFT)"
    },
    status: "PENDING_REVIEW"
  }
];
const EntityResolutionPage = () => {
  const navigate = useNavigate();
  const [clusters, setClusters] = useState(initialClusters);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resolving, setResolving] = useState(false);
  const handleOpenCluster = (cluster) => {
    setSelectedCluster(cluster);
    setIsModalOpen(true);
  };
  const handleResolveMerge = () => {
    if (!selectedCluster) return;
    setResolving(true);
    setTimeout(() => {
      setClusters(clusters.map((c) => {
        if (c.id === selectedCluster.id) {
          return { ...c, status: "MERGED" };
        }
        return c;
      }));
      setResolving(false);
      setIsModalOpen(false);
    }, 800);
  };
  const handleResolveDismiss = () => {
    if (!selectedCluster) return;
    setClusters(clusters.map((c) => {
      if (c.id === selectedCluster.id) {
        return { ...c, status: "DISMISSED" };
      }
      return c;
    }));
    setIsModalOpen(false);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider mb-1" }, /* @__PURE__ */ React.createElement("span", null, "CROSS-JURISDICTIONAL DEDUPLICATION ENGINE"), /* @__PURE__ */ React.createElement("span", null, "/"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-primary-600 font-semibold" }, "JARO-WINKLER CLUSTERING")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold tracking-tight text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Entity Resolution & Identity Deduplication")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: () => navigate("/persons"),
      icon: /* @__PURE__ */ React.createElement(UserCheck, { className: "w-4 h-4" })
    },
    "POI Directory"
  ))), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-tactical-neutral-50 dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 font-bold uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100 mb-1" }, /* @__PURE__ */ React.createElement(Fingerprint, { className: "w-4 h-4 text-tactical-primary-600" }), /* @__PURE__ */ React.createElement("span", null, "Multi-Vector Identity Deduplication Active")), /* @__PURE__ */ React.createElement("p", { className: "text-tactical-neutral-600 dark:text-tactical-neutral-400 font-sans leading-relaxed" }, "The platform automatically evaluates phonetic spelling variations, shared IMEI burner identifiers, date of birth congruence, and financial transaction fingerprints to surface split criminal identities.")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 shrink-0" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-tactical-neutral-500 block uppercase" }, "Pending Clusters"), /* @__PURE__ */ React.createElement("span", { className: "text-xl font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, clusters.filter((c) => c.status === "PENDING_REVIEW").length)), /* @__PURE__ */ React.createElement("div", { className: "h-8 w-px bg-tactical-neutral-300 dark:bg-tactical-neutral-700" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-tactical-neutral-500 block uppercase" }, "Accuracy Benchmark"), /* @__PURE__ */ React.createElement("span", { className: "text-xl font-bold text-tactical-success-600" }, "94.8%")))), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, clusters.map((cluster) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: cluster.id,
      className: "p-5 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 space-y-4 hover:border-tactical-primary-500 transition-colors"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-xs text-tactical-primary-700 dark:text-tactical-primary-400" }, cluster.id), /* @__PURE__ */ React.createElement(
      Badge,
      {
        variant: cluster.confidenceScore >= 90 ? "danger" : "warning",
        size: "sm"
      },
      cluster.confidenceScore,
      "% Similarity"
    ), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] px-2 py-0.5 rounded bg-tactical-neutral-100 dark:bg-tactical-neutral-800 text-tactical-neutral-600 dark:text-tactical-neutral-300" }, cluster.matchType.replace(/_/g, " "))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
      Badge,
      {
        variant: cluster.status === "MERGED" ? "success" : cluster.status === "DISMISSED" ? "neutral" : "warning",
        size: "sm"
      },
      cluster.status.replace(/_/g, " ")
    ))),
    /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-base text-tactical-neutral-900 dark:text-tactical-neutral-100" }, cluster.clusterName),
    /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-tactical-neutral-50 dark:bg-tactical-neutral-800/60 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-700/80 space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "font-bold text-tactical-primary-700 dark:text-tactical-primary-300 text-[11px] uppercase border-b border-tactical-neutral-200 dark:border-tactical-neutral-700 pb-1" }, "Primary Registry Record (Record A)"), /* @__PURE__ */ React.createElement("div", null, "Name: ", /* @__PURE__ */ React.createElement("strong", { className: "text-tactical-neutral-900 dark:text-tactical-neutral-100" }, cluster.entityA.name)), /* @__PURE__ */ React.createElement("div", null, "FBI #: ", /* @__PURE__ */ React.createElement("strong", null, cluster.entityA.fbiNumber)), /* @__PURE__ */ React.createElement("div", null, "Agency: ", /* @__PURE__ */ React.createElement("span", null, cluster.entityA.agency)), /* @__PURE__ */ React.createElement("div", null, "DOB: ", /* @__PURE__ */ React.createElement("span", null, cluster.entityA.dob)), /* @__PURE__ */ React.createElement("div", null, "Docket: ", /* @__PURE__ */ React.createElement("strong", null, cluster.entityA.docket)), /* @__PURE__ */ React.createElement("div", null, "Identifier: ", /* @__PURE__ */ React.createElement("span", { className: "text-tactical-danger-600" }, cluster.entityA.phone))), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-tactical-neutral-50 dark:bg-tactical-neutral-800/60 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-700/80 space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "font-bold text-tactical-warning-700 dark:text-tactical-warning-400 text-[11px] uppercase border-b border-tactical-neutral-200 dark:border-tactical-neutral-700 pb-1" }, "Cross-Jurisdiction Match (Record B)"), /* @__PURE__ */ React.createElement("div", null, "Name: ", /* @__PURE__ */ React.createElement("strong", { className: "text-tactical-neutral-900 dark:text-tactical-neutral-100" }, cluster.entityB.name)), /* @__PURE__ */ React.createElement("div", null, "FBI #: ", /* @__PURE__ */ React.createElement("strong", null, cluster.entityB.fbiNumber)), /* @__PURE__ */ React.createElement("div", null, "Agency: ", /* @__PURE__ */ React.createElement("span", null, cluster.entityB.agency)), /* @__PURE__ */ React.createElement("div", null, "DOB: ", /* @__PURE__ */ React.createElement("span", null, cluster.entityB.dob)), /* @__PURE__ */ React.createElement("div", null, "Docket: ", /* @__PURE__ */ React.createElement("strong", null, cluster.entityB.docket)), /* @__PURE__ */ React.createElement("div", null, "Identifier: ", /* @__PURE__ */ React.createElement("span", { className: "text-tactical-danger-600" }, cluster.entityB.phone)))),
    /* @__PURE__ */ React.createElement("div", { className: "pt-2 flex items-center justify-end gap-2" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "secondary",
        size: "sm",
        onClick: () => handleOpenCluster(cluster),
        disabled: cluster.status !== "PENDING_REVIEW"
      },
      "Inspect & Compare"
    ), cluster.status === "PENDING_REVIEW" && /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "primary",
        size: "sm",
        onClick: () => {
          setSelectedCluster(cluster);
          handleResolveMerge();
        },
        icon: /* @__PURE__ */ React.createElement(GitMerge, { className: "w-4 h-4" })
      },
      "Merge into Master POI"
    ))
  ))), selectedCluster && /* @__PURE__ */ React.createElement(
    Modal,
    {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
      title: "IDENTITY DEDUPLICATION & MERGE AUTHORIZATION",
      subtitle: `Cluster ${selectedCluster.id} // Confidence: ${selectedCluster.confidenceScore}%`,
      size: "lg",
      footer: /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between w-full" }, /* @__PURE__ */ React.createElement(
        Button,
        {
          variant: "secondary",
          size: "sm",
          onClick: handleResolveDismiss,
          icon: /* @__PURE__ */ React.createElement(Split, { className: "w-3.5 h-3.5" })
        },
        "Mark Distinct (Dismiss Link)"
      ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Button, { variant: "secondary", size: "sm", onClick: () => setIsModalOpen(false) }, "Cancel"), /* @__PURE__ */ React.createElement(
        Button,
        {
          variant: "primary",
          size: "sm",
          onClick: handleResolveMerge,
          disabled: resolving,
          icon: /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-4 h-4" })
        },
        resolving ? "Merging Cryptographic Identities..." : "Confirm Sworn POI Consolidation"
      )))
    },
    /* @__PURE__ */ React.createElement("div", { className: "space-y-4 text-xs font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-tactical-primary-50 dark:bg-tactical-primary-950/60 rounded border border-tactical-primary-200 dark:border-tactical-primary-800 text-tactical-primary-800 dark:text-tactical-primary-200" }, /* @__PURE__ */ React.createElement("strong", { className: "block mb-1" }, "Entity Consolidation Impact:"), "Approving this merge binds all evidentiary records, burner phones, safehouses, and network edges from both jurisdictions into a single unified master entity."), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-white dark:bg-tactical-neutral-800 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700 space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "font-bold text-[11px] text-tactical-neutral-500 uppercase" }, "Docket SDNY"), /* @__PURE__ */ React.createElement("div", { className: "font-bold text-sm text-tactical-neutral-900 dark:text-tactical-neutral-100" }, selectedCluster.entityA.name), /* @__PURE__ */ React.createElement("div", null, "Alias: ", selectedCluster.entityA.alias), /* @__PURE__ */ React.createElement("div", null, "DOB: ", selectedCluster.entityA.dob), /* @__PURE__ */ React.createElement("div", null, "Phone: ", selectedCluster.entityA.phone)), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-white dark:bg-tactical-neutral-800 rounded border border-tactical-neutral-300 dark:border-tactical-neutral-700 space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "font-bold text-[11px] text-tactical-neutral-500 uppercase" }, "Docket DEA NJ"), /* @__PURE__ */ React.createElement("div", { className: "font-bold text-sm text-tactical-neutral-900 dark:text-tactical-neutral-100" }, selectedCluster.entityB.name), /* @__PURE__ */ React.createElement("div", null, "Alias: ", selectedCluster.entityB.alias), /* @__PURE__ */ React.createElement("div", null, "DOB: ", selectedCluster.entityB.dob), /* @__PURE__ */ React.createElement("div", null, "Phone: ", selectedCluster.entityB.phone))), /* @__PURE__ */ React.createElement("div", { className: "p-3 rounded bg-tactical-neutral-100 dark:bg-tactical-neutral-800 border border-tactical-neutral-200 dark:border-tactical-neutral-700 text-[11px] text-tactical-neutral-600 dark:text-tactical-neutral-400" }, "Action will be stamped onto the Merkle audit chain under Title 18 U.S.C. with current agent digital signature."))
  ));
};
export {
  EntityResolutionPage
};
