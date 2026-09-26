import React, { useState } from "react";
import { truncateHash } from "@/utils/formatters";
import { Copy, Check, ShieldCheck } from "lucide-react";
import { cn } from "@/utils/cn";
const HashStamp = ({
  hash,
  lead = 6,
  tail = 6,
  showIcon = true,
  className,
  verified = true
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: handleCopy,
      title: `Click to copy SHA-256: ${hash}`,
      className: cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-xs rounded transition-colors",
        "bg-tactical-neutral-100 dark:bg-tactical-neutral-800/80 border border-tactical-neutral-300 dark:border-tactical-neutral-700 text-tactical-neutral-700 dark:text-tactical-neutral-300 hover:border-tactical-primary-500 hover:text-tactical-primary-600 dark:hover:text-tactical-primary-400",
        className
      )
    },
    showIcon && (verified ? /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-3.5 h-3.5 text-tactical-success-600 dark:text-tactical-success-400 shrink-0" }) : /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-tactical-warning-500 shrink-0" })),
    /* @__PURE__ */ React.createElement("span", { className: "tracking-tight" }, truncateHash(hash, lead, tail)),
    copied ? /* @__PURE__ */ React.createElement(Check, { className: "w-3 h-3 text-tactical-success-500 ml-0.5 shrink-0" }) : /* @__PURE__ */ React.createElement(Copy, { className: "w-3 h-3 text-tactical-neutral-400 group-hover:text-tactical-primary-500 ml-0.5 shrink-0" })
  );
};
export {
  HashStamp
};
