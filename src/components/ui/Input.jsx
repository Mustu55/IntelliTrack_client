import React from "react";
import { cn } from "../../utils/cn";

const Input = React.forwardRef(
  ({ className, label, error, leftIcon, rightBadge, hint, type, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : void 0);
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={inputId}
              className="block font-mono text-[11px] text-[#9ca3af] uppercase tracking-wider font-semibold"
            >
              {label}
            </label>
            {hint && <span className="font-mono text-[10px] text-[#64748b]">{hint}</span>}
          </div>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-[#64748b]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              "w-full h-9 px-3 bg-[#101317] text-[#f3f4f6] text-xs border border-[#222731] rounded-md transition-colors placeholder:text-[#64748b]",
              "focus:outline-none focus:border-[#9cae9b] focus:ring-1 focus:ring-[#9cae9b]/30",
              leftIcon && "pl-9",
              rightBadge && "pr-12",
              error && "border-[#d97768] focus:border-[#d97768] focus:ring-[#d97768]/20",
              className
            )}
            {...props}
          />
          {rightBadge && <div className="absolute right-2.5 flex items-center">{rightBadge}</div>}
        </div>
        {error && <p className="text-[11px] text-[#d97768] mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
export default Input;

