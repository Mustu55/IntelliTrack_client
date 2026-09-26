import React from "react";
import { cn } from "../../utils/cn";
const Input = React.forwardRef(
  ({ className, label, error, leftIcon, rightBadge, hint, type, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : void 0);
    return /* @__PURE__ */ React.createElement("div", { className: "w-full space-y-1" }, label && /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement(
      "label",
      {
        htmlFor: inputId,
        className: "block font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-semibold"
      },
      label
    ), hint && /* @__PURE__ */ React.createElement("span", { className: "font-code-sm text-code-sm text-outline" }, hint)), /* @__PURE__ */ React.createElement("div", { className: "relative flex items-center" }, leftIcon && /* @__PURE__ */ React.createElement("div", { className: "absolute left-3 flex items-center pointer-events-none text-outline" }, leftIcon), /* @__PURE__ */ React.createElement(
      "input",
      {
        id: inputId,
        type,
        ref,
        className: cn(
          "w-full h-9 px-3 bg-surface-container-lowest text-on-surface font-body-md text-body-md border border-outline-variant rounded transition-colors placeholder:text-outline",
          "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary",
          leftIcon && "pl-9",
          rightBadge && "pr-12",
          error && "border-error focus:border-error focus:ring-error",
          className
        ),
        ...props
      }
    ), rightBadge && /* @__PURE__ */ React.createElement("div", { className: "absolute right-2.5 flex items-center" }, rightBadge)), error && /* @__PURE__ */ React.createElement("p", { className: "font-body-sm text-body-sm text-error mt-0.5" }, error));
  }
);
Input.displayName = "Input";
export {
  Input
};
