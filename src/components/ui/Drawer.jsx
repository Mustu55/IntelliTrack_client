import React, { useEffect } from "react";
import { cn } from "../../utils/cn";
const Drawer = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = "md"
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  const widths = {
    sm: "w-80",
    md: "w-96",
    lg: "w-[440px]"
  };
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 overflow-hidden flex justify-end" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "fixed inset-0 bg-[#1A202C]/40 backdrop-blur-xs transition-opacity duration-200",
      onClick: onClose
    }
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: cn(
        "relative max-w-full bg-surface-container-lowest border-l border-outline-variant shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-200",
        widths[width]
      )
    },
    /* @__PURE__ */ React.createElement("div", { className: "p-4 border-b border-outline-variant/40 bg-surface-container-low/60 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, title && /* @__PURE__ */ React.createElement("h3", { className: "font-headline-sm text-headline-sm text-on-surface uppercase tracking-wide font-semibold" }, title), subtitle && /* @__PURE__ */ React.createElement("p", { className: "font-code-sm text-code-sm text-outline mt-0.5" }, subtitle)), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onClose,
        className: "text-outline hover:text-on-surface p-1 rounded hover:bg-surface-container transition-colors",
        "aria-label": "Close drawer"
      },
      /* @__PURE__ */ React.createElement("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }))
    )),
    /* @__PURE__ */ React.createElement("div", { className: "p-4 overflow-y-auto flex-1 space-y-4" }, children)
  ));
};
export {
  Drawer
};
