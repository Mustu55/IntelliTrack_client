import React from "react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";
const ClearanceBadge = ({
  level,
  className,
  size = "sm"
}) => {
  const getVariant = (lvl) => {
    switch (lvl) {
      case "TOP_SECRET":
        return "danger";
      case "SECRET":
        return "warning";
      case "CONFIDENTIAL":
        return "primary";
      case "LAW_ENFORCEMENT_SENSITIVE":
        return "info";
      case "CJIS_LEVEL_4":
        return "outline";
      case "UNCLASSIFIED":
      default:
        return "neutral";
    }
  };
  const getLabel = (lvl) => {
    switch (lvl) {
      case "LAW_ENFORCEMENT_SENSITIVE":
        return "LES // NOFORN";
      case "TOP_SECRET":
        return "TOP SECRET // SCI";
      case "CJIS_LEVEL_4":
        return "CJIS LEVEL 4";
      default:
        return lvl.replace("_", " ");
    }
  };
  return /* @__PURE__ */ React.createElement(
    Badge,
    {
      variant: getVariant(level),
      size,
      className: cn("font-mono font-bold tracking-wider uppercase", className)
    },
    /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70" }),
    getLabel(level)
  );
};
export {
  ClearanceBadge
};
