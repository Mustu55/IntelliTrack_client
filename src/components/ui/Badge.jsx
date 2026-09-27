import React from "react";
import { cn } from "../../utils/cn";

const Badge = ({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}) => {
  const base = "inline-flex items-center justify-center font-mono text-[10px] font-medium tracking-wide rounded-md px-2 py-0.5 select-none";
  const normalized = variant === "danger" ? "critical" : variant === "info" ? "agent" : variant === "neutral" ? "default" : variant;
  
  const variants = {
    default: "bg-[#161a20] text-[#9ca3af] border border-[#232832]",
    primary: "bg-[#18261c] text-[#8fa38d] border border-[#25392b]",
    secondary: "bg-[#1b2028] text-[#cbd5e1] border border-[#28313e]",
    critical: "bg-[#2b1719] text-[#dc7869] border border-[#442327]",
    warning: "bg-[#282215] text-[#c9a667] border border-[#3e3420]",
    success: "bg-[#18261c] text-[#8fa38d] border border-[#25392b]",
    outline: "bg-transparent text-[#9ca3af] border border-[#232832]",
    admin: "bg-[#14181f] text-[#cbd5e1] border border-[#2b3340]",
    agent: "bg-[#18261c] text-[#8fa38d] border border-[#25392b]",
    forensic: "bg-[#181c24] text-[#a0aec0] border border-[#27303d]"
  };
  
  const sizes = {
    sm: "px-1.5 py-0.2 text-[9px]",
    md: "px-2 py-0.5 text-[10px]",
    lg: "px-2.5 py-1 text-xs"
  };

  return (
    <span className={cn(base, variants[normalized] || variants.default, sizes[size], className)} {...props}>
      {children}
    </span>
  );
};

export { Badge };
export default Badge;

