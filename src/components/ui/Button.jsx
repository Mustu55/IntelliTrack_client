import React from "react";
import { cn } from "../../utils/cn";

const Button = React.forwardRef(
  ({ className, variant = "primary", size = "md", isLoading, disabled, icon, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center text-xs font-medium transition-all duration-150 select-none cursor-pointer focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed rounded-md";
    const normalizedVariant = variant === "danger" ? "destructive" : variant;
    
    const variants = {
      primary: "bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c] active:bg-[#7f917e] border border-[#9cae9b] font-medium shadow-xs",
      secondary: "bg-[#181c22] text-[#d1d5db] border border-[#232832] hover:bg-[#20252e] hover:text-white active:bg-[#15191f]",
      destructive: "bg-[#2b1719] text-[#dc7869] border border-[#442327] hover:bg-[#381e20] hover:text-[#f87171]",
      outline: "border border-[#262b35] text-[#9ca3af] bg-transparent hover:bg-[#161a20] hover:text-[#f3f4f6] hover:border-[#353c4a]",
      ghost: "text-[#9ca3af] hover:text-white hover:bg-[#181c22]",
      link: "text-[#9cae9b] underline-offset-4 hover:underline p-0 h-auto font-normal"
    };
    
    const sizes = {
      sm: "h-7 px-2.5 text-xs gap-1.5",
      md: "h-8.5 px-3.5 text-xs gap-2",
      lg: "h-10 px-5 text-sm gap-2.5",
      icon: "h-8 w-8 p-0"
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[normalizedVariant] || variants.primary, sizes[size], className)}
        {...props}
      >
        {isLoading && <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />}
        {!isLoading && icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
export default Button;

