import React from "react";
import { cn } from "../../utils/cn";
const Button = React.forwardRef(
  ({ className, variant = "primary", size = "md", isLoading, disabled, icon, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-mono text-xs tracking-wider uppercase font-semibold transition-all duration-150 select-none cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
    const normalizedVariant = variant === "danger" ? "destructive" : variant;
    const variants = {
      primary: "bg-tactical-primary-700 text-white shadow-xs hover:bg-tactical-primary-800 active:scale-[0.99] border border-tactical-primary-600",
      secondary: "bg-white dark:bg-tactical-neutral-900 text-tactical-neutral-800 dark:text-tactical-neutral-200 border border-tactical-neutral-300 dark:border-tactical-neutral-700 hover:bg-tactical-neutral-100 dark:hover:bg-tactical-neutral-800",
      destructive: "bg-tactical-danger-50 dark:bg-tactical-danger-950/80 text-tactical-danger-700 dark:text-tactical-danger-300 border border-tactical-danger-300 dark:border-tactical-danger-800 hover:bg-tactical-danger-600 hover:text-white",
      outline: "border border-tactical-neutral-300 dark:border-tactical-neutral-700 text-tactical-neutral-800 dark:text-tactical-neutral-200 bg-transparent hover:bg-tactical-neutral-100 dark:hover:bg-tactical-neutral-800",
      ghost: "text-tactical-neutral-600 dark:text-tactical-neutral-400 hover:text-tactical-neutral-900 hover:bg-tactical-neutral-100 dark:hover:bg-tactical-neutral-800",
      link: "text-tactical-primary-600 underline-offset-4 hover:underline p-0 h-auto font-normal lowercase"
    };
    const sizes = {
      sm: "h-8 px-2.5 rounded text-xs gap-1.5",
      md: "h-9 px-4 rounded text-xs gap-2",
      lg: "h-11 px-6 rounded text-sm gap-2.5",
      icon: "h-9 w-9 p-0 rounded"
    };
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        ref,
        disabled: disabled || isLoading,
        className: cn(baseStyles, variants[normalizedVariant], sizes[size], className),
        ...props
      },
      isLoading && /* @__PURE__ */ React.createElement("span", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" }),
      !isLoading && icon && /* @__PURE__ */ React.createElement("span", { className: "shrink-0" }, icon),
      children
    );
  }
);
Button.displayName = "Button";
export {
  Button
};
