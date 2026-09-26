import React from "react";
import { cn } from "../../utils/cn";
const Badge = ({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}) => {
  const base = "inline-flex items-center justify-center font-mono font-semibold uppercase tracking-wider rounded select-none";
  const normalized = variant === "danger" ? "critical" : variant === "info" ? "agent" : variant === "neutral" ? "default" : variant;
  const variants = {
    default: "bg-tactical-neutral-100 dark:bg-tactical-neutral-800 text-tactical-neutral-700 dark:text-tactical-neutral-300 border border-tactical-neutral-300 dark:border-tactical-neutral-700",
    primary: "bg-tactical-primary-100 dark:bg-tactical-primary-950 text-tactical-primary-700 dark:text-tactical-primary-300 border border-tactical-primary-300 dark:border-tactical-primary-800",
    secondary: "bg-tactical-neutral-200 dark:bg-tactical-neutral-700 text-tactical-neutral-800 dark:text-tactical-neutral-200 border border-tactical-neutral-300",
    critical: "bg-tactical-danger-50 dark:bg-tactical-danger-950 text-tactical-danger-700 dark:text-tactical-danger-300 border border-tactical-danger-300 dark:border-tactical-danger-800 font-bold",
    warning: "bg-tactical-warning-50 dark:bg-tactical-warning-950 text-tactical-warning-700 dark:text-tactical-warning-300 border border-tactical-warning-300 dark:border-tactical-warning-800 font-bold",
    success: "bg-tactical-success-50 dark:bg-tactical-success-950 text-tactical-success-700 dark:text-tactical-success-300 border border-tactical-success-300 dark:border-tactical-success-800 font-bold",
    outline: "bg-transparent text-tactical-neutral-800 dark:text-tactical-neutral-200 border border-tactical-neutral-300 dark:border-tactical-neutral-700",
    admin: "bg-tactical-neutral-900 text-white dark:bg-tactical-neutral-100 dark:text-tactical-neutral-900 border border-tactical-neutral-700 font-mono",
    agent: "bg-tactical-primary-50 dark:bg-tactical-primary-950 text-tactical-primary-700 dark:text-tactical-primary-300 border border-tactical-primary-300 dark:border-tactical-primary-800 font-mono",
    forensic: "bg-tactical-neutral-100 dark:bg-tactical-neutral-800 text-tactical-neutral-600 dark:text-tactical-neutral-400 border border-tactical-neutral-300 font-mono"
  };
  const sizes = {
    sm: "px-1.5 py-0.5 text-[0.625rem] leading-none",
    md: "px-2 py-0.5 text-[0.6875rem] leading-tight"
  };
  return /* @__PURE__ */ React.createElement("span", { className: cn(base, variants[normalized] || variants.default, sizes[size], className), ...props }, children);
};
export {
  Badge
};
