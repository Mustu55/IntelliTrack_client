import React from "react";
import { Button } from "./Button";
import { cn } from "@/utils/cn";
const EmptyState = ({
  title = "NO CORRELATED RECORDS DETECTED WITHIN PARAMETERS",
  code = "DIAG-ERR-404-NULL-ENTITIES",
  description = "No intelligence dockets or cryptographic artifacts match the current query scope.",
  actionLabel,
  onAction,
  className,
  icon
}) => {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center p-8 text-center border border-dashed border-tactical-neutral-300 dark:border-tactical-neutral-800 rounded bg-tactical-neutral-100/50 dark:bg-tactical-neutral-900/30 my-4",
        className
      )
    },
    /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 rounded flex items-center justify-center text-tactical-neutral-500 mb-3 border border-tactical-neutral-300 dark:border-tactical-neutral-700 bg-tactical-neutral-50 dark:bg-tactical-neutral-800/80" }, icon || /* @__PURE__ */ React.createElement(
      "svg",
      {
        className: "w-6 h-6 stroke-[1.5] text-tactical-neutral-400",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor"
      },
      /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ React.createElement("line", { x1: "22", y1: "12", x2: "18", y2: "12" }),
      /* @__PURE__ */ React.createElement("line", { x1: "6", y1: "12", x2: "2", y2: "12" }),
      /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "6", x2: "12", y2: "2" }),
      /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "22", x2: "12", y2: "18" }),
      /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "4", strokeDasharray: "2 2" })
    )),
    /* @__PURE__ */ React.createElement("div", { className: "font-mono text-xs text-tactical-neutral-400 dark:text-tactical-neutral-500 mb-1 tracking-wider uppercase" }, "[", code, "]"),
    /* @__PURE__ */ React.createElement("h3", { className: "font-mono font-bold text-sm uppercase tracking-wide text-tactical-neutral-900 dark:text-tactical-neutral-100 mb-1" }, title),
    /* @__PURE__ */ React.createElement("p", { className: "text-xs text-tactical-neutral-600 dark:text-tactical-neutral-400 max-w-md mb-4" }, description),
    actionLabel && onAction && /* @__PURE__ */ React.createElement(Button, { variant: "secondary", size: "sm", onClick: onAction }, actionLabel)
  );
};
export {
  EmptyState
};
