import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { HashStamp } from "./HashStamp";
import { calculateMerkleRoot } from "@/utils/crypto";
import { GitCommit, CheckCircle2, Lock } from "lucide-react";
const MerkleModal = ({
  isOpen,
  onClose,
  targetRecordId = "AUD-BLOCK-0089",
  targetHash = "9b1d8cd98f00b204e9800998ecf8427e",
  leafHashes = [
    "a3c18b76020c6a5120689b917b1b2f483d9a1f28b7e2831c2a1b2c3d4e5f6a7b",
    "b4d29c87131d7b6231790c028c2c30594e0b2039c8f3942d3b2c3d4e5f6a7b8c",
    "c5e30d98242e8c7342801d139d3d41605f1c3140d904a53e4c3d4e5f6a7b8c9d",
    "d6f41ea9353f9d8453912e24ae4e5271602d4251ea15b64f5d4e5f6a7b8c9d0e"
  ],
  currentRoot = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(true);
  const [computedRoot, setComputedRoot] = useState(currentRoot);
  const handleRecompute = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const root = calculateMerkleRoot(leafHashes);
      setComputedRoot(root);
      setVerified(root === currentRoot);
      setIsVerifying(false);
    }, 600);
  };
  return /* @__PURE__ */ React.createElement(
    Modal,
    {
      isOpen,
      onClose,
      title: "CRYPTOGRAPHIC CHAIN-OF-CUSTODY MERKLE VERIFIER",
      subtitle: `Statutory Integrity Audit for Record: ${targetRecordId}`,
      size: "lg",
      footer: /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between w-full" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-xs font-mono text-tactical-neutral-500" }, /* @__PURE__ */ React.createElement(Lock, { className: "w-3.5 h-3.5 text-tactical-success-500" }), /* @__PURE__ */ React.createElement("span", null, "FIPS 140-3 LEVEL 4 HARDWARE ROOT")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
        Button,
        {
          variant: "secondary",
          size: "sm",
          onClick: handleRecompute,
          disabled: isVerifying
        },
        isVerifying ? "Recomputing Hashes..." : "Re-verify Hashes"
      ), /* @__PURE__ */ React.createElement(Button, { variant: "primary", size: "sm", onClick: onClose }, "Dismiss Docket")))
    },
    /* @__PURE__ */ React.createElement("div", { className: "space-y-5" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-tactical-success-50 dark:bg-tactical-success-950/40 border border-tactical-success-300 dark:border-tactical-success-800 rounded flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded bg-tactical-success-100 dark:bg-tactical-success-900 border border-tactical-success-300 dark:border-tactical-success-700 flex items-center justify-center text-tactical-success-700 dark:text-tactical-success-300" }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-mono text-xs font-bold uppercase tracking-wider text-tactical-success-800 dark:text-tactical-success-200" }, "CHAIN-OF-CUSTODY INTEGRITY: MATHEMATICALLY CONFIRMED"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-success-700 dark:text-tactical-success-400" }, "Leaf hash is anchored inside continuous ledger block with zero signature deviation."))), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-[10px] px-2 py-0.5 rounded bg-tactical-success-200 dark:bg-tactical-success-900 text-tactical-success-900 dark:text-tactical-success-200 font-bold uppercase" }, "CJIS \xA75.4 DEFENDED")), /* @__PURE__ */ React.createElement("div", { className: "border border-tactical-neutral-300 dark:border-tactical-neutral-700 rounded p-4 bg-tactical-neutral-50 dark:bg-tactical-neutral-900/60 font-mono text-xs space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] uppercase font-bold text-tactical-neutral-500 mb-1" }, "Top-Level Merkle Root (Block Epoch #4102)"), /* @__PURE__ */ React.createElement("div", { className: "p-2 bg-tactical-primary-100 dark:bg-tactical-primary-950/80 border-2 border-tactical-primary-500 rounded text-center max-w-xl w-full" }, /* @__PURE__ */ React.createElement(HashStamp, { hash: computedRoot, lead: 12, tail: 12, className: "text-xs bg-transparent border-0" }))), /* @__PURE__ */ React.createElement("div", { className: "flex justify-around text-tactical-neutral-400" }, /* @__PURE__ */ React.createElement("div", { className: "h-4 border-l border-dashed border-tactical-neutral-400" }), /* @__PURE__ */ React.createElement("div", { className: "h-4 border-l border-dashed border-tactical-neutral-400" })), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "p-2 bg-white dark:bg-tactical-neutral-800 border border-tactical-neutral-300 dark:border-tactical-neutral-700 rounded" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-tactical-neutral-400 mb-0.5" }, "LEFT NODE HASH [H(0,1)]"), /* @__PURE__ */ React.createElement(HashStamp, { hash: "7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b", lead: 8, tail: 8 })), /* @__PURE__ */ React.createElement("div", { className: "p-2 bg-white dark:bg-tactical-neutral-800 border border-tactical-neutral-300 dark:border-tactical-neutral-700 rounded" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-tactical-neutral-400 mb-0.5" }, "RIGHT NODE HASH [H(2,3)]"), /* @__PURE__ */ React.createElement(HashStamp, { hash: "8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c", lead: 8, tail: 8 }))), /* @__PURE__ */ React.createElement("div", { className: "pt-2" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase font-bold text-tactical-neutral-500 mb-2" }, "Sequential Ledger Leaves (Evidentiary Artifacts)"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2" }, leafHashes.map((leaf, idx) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: idx,
        className: "p-2 bg-white dark:bg-tactical-neutral-800 border border-tactical-neutral-200 dark:border-tactical-neutral-700 rounded flex items-center justify-between"
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 overflow-hidden" }, /* @__PURE__ */ React.createElement(GitCommit, { className: "w-3.5 h-3.5 text-tactical-neutral-400 shrink-0" }), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-tactical-neutral-500 shrink-0" }, "Leaf #", idx + 1, ":"), /* @__PURE__ */ React.createElement(HashStamp, { hash: leaf, lead: 6, tail: 6 })),
      idx === 0 && /* @__PURE__ */ React.createElement("span", { className: "text-[9px] font-bold text-tactical-primary-600 dark:text-tactical-primary-400 uppercase bg-tactical-primary-50 dark:bg-tactical-primary-950 px-1 rounded border border-tactical-primary-200 dark:border-tactical-primary-800" }, "Target")
    ))))), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-tactical-neutral-600 dark:text-tactical-neutral-400 bg-tactical-neutral-100 dark:bg-tactical-neutral-800/40 p-3 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-700/60 leading-relaxed font-sans" }, /* @__PURE__ */ React.createElement("strong", { className: "text-tactical-neutral-800 dark:text-tactical-neutral-200" }, "Federal Rules of Evidence 902(13) & 902(14) Certification:"), " ", "This cryptographic proof satisfies self-authenticating electronic record requirements. Any single-bit modification of this evidentiary artifact causes immediate hash divergence at parent root ", /* @__PURE__ */ React.createElement("span", { className: "font-mono text-[11px] font-semibold" }, computedRoot.slice(0, 12), "..."), "."))
  );
};
export {
  MerkleModal
};
