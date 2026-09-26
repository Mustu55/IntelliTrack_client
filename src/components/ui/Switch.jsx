import React from "react";
import { cn } from "../../utils/cn";
const Switch = ({
  checked,
  onChange,
  onCheckedChange,
  label,
  disabled = false,
  className
}) => {
  const handleChange = () => {
    if (disabled) return;
    const next = !checked;
    if (onChange) onChange(next);
    if (onCheckedChange) onCheckedChange(next);
  };
  return /* @__PURE__ */ React.createElement("label", { className: cn("inline-flex items-center gap-2.5 cursor-pointer select-none", disabled && "opacity-50 cursor-not-allowed", className) }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": checked,
      disabled,
      onClick: handleChange,
      className: cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-tactical-primary-500 focus:ring-offset-1",
        checked ? "bg-tactical-primary-600" : "bg-tactical-neutral-300 dark:bg-tactical-neutral-700"
      )
    },
    /* @__PURE__ */ React.createElement(
      "span",
      {
        className: cn(
          "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5",
          checked ? "translate-x-4" : "translate-x-0"
        )
      }
    )
  ), label && /* @__PURE__ */ React.createElement("span", { className: "text-xs text-tactical-neutral-700 dark:text-tactical-neutral-300 font-medium" }, label));
};
export {
  Switch
};
