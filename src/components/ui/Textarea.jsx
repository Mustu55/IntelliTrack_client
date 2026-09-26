import React from "react";
import { cn } from "../../utils/cn";
const Textarea = React.forwardRef(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : void 0);
    return /* @__PURE__ */ React.createElement("div", { className: "w-full space-y-1" }, label && /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement(
      "label",
      {
        htmlFor: textareaId,
        className: "block font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-semibold"
      },
      label
    ), hint && /* @__PURE__ */ React.createElement("span", { className: "font-code-sm text-code-sm text-outline" }, hint)), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        id: textareaId,
        ref,
        className: cn(
          "w-full p-2.5 bg-surface-container-lowest text-on-surface font-body-md text-body-md border border-outline-variant rounded transition-colors placeholder:text-outline",
          "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary",
          error && "border-error",
          className
        ),
        ...props
      }
    ), error && /* @__PURE__ */ React.createElement("p", { className: "font-body-sm text-body-sm text-error mt-0.5" }, error));
  }
);
Textarea.displayName = "Textarea";
export {
  Textarea
};
