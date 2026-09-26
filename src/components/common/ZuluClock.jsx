import React, { useState, useEffect } from "react";
import { formatZuluTime } from "@/utils/formatters";
import { cn } from "@/utils/cn";
const ZuluClock = ({
  className,
  prefix = "ZULU"
}) => {
  const [timeStr, setTimeStr] = useState(() => formatZuluTime(/* @__PURE__ */ new Date()));
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStr(formatZuluTime(/* @__PURE__ */ new Date()));
    }, 1e3);
    return () => clearInterval(timer);
  }, []);
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: cn(
        "inline-flex items-center gap-2 px-2.5 py-1 bg-tactical-neutral-100 dark:bg-tactical-neutral-800/90 border border-tactical-neutral-200 dark:border-tactical-neutral-700 rounded text-xs font-mono tabular-nums text-tactical-neutral-800 dark:text-tactical-neutral-200",
        className
      ),
      title: "UTC Ticking Standard - Real-time Network Synchronized"
    },
    /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-tactical-success-500 animate-pulse" }),
    prefix && /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-semibold text-tactical-neutral-500 dark:text-tactical-neutral-400" }, prefix, ":"),
    /* @__PURE__ */ React.createElement("span", { className: "font-medium tracking-tight" }, timeStr)
  );
};
export {
  ZuluClock
};
