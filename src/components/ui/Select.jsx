import React from "react";
import { cn } from "../../utils/cn";
const Select = React.forwardRef(
  ({ className, label, error, options, leftIcon, children, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : void 0);
    return /* @__PURE__ */ React.createElement("div", { className: "w-full space-y-1" }, label && /* @__PURE__ */ React.createElement(
      "label",
      {
        htmlFor: selectId,
        className: "block font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-semibold"
      },
      label
    ), /* @__PURE__ */ React.createElement("div", { className: "relative flex items-center" }, leftIcon && /* @__PURE__ */ React.createElement("div", { className: "absolute left-3 flex items-center pointer-events-none text-outline" }, leftIcon), /* @__PURE__ */ React.createElement(
      "select",
      {
        id: selectId,
        ref,
        className: cn(
          "w-full h-9 pl-3 pr-8 bg-surface-container-lowest text-on-surface font-body-md text-body-md border border-outline-variant rounded transition-colors appearance-none cursor-pointer",
          "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary",
          leftIcon && "pl-9",
          error && "border-error",
          className
        ),
        ...props
      },
      options ? options.map((opt) => /* @__PURE__ */ React.createElement("option", { key: opt.value, value: opt.value, disabled: opt.disabled }, opt.label)) : children
    ), /* @__PURE__ */ React.createElement("div", { className: "absolute right-2.5 pointer-events-none text-outline flex items-center" }, /* @__PURE__ */ React.createElement("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" })))), error && /* @__PURE__ */ React.createElement("p", { className: "font-body-sm text-body-sm text-error mt-0.5" }, error));
  }
);
Select.displayName = "Select";
export {
  Select
};
