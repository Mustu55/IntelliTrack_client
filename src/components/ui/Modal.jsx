import React, { useEffect } from "react";
import { cn } from "../../utils/cn";
const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  description,
  children,
  footer,
  size,
  maxWidth = "md"
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  const resolvedWidth = size || maxWidth;
  const maxWidths = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl"
  };
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "fixed inset-0 bg-[#1A202C]/60 backdrop-blur-xs transition-opacity duration-200",
      onClick: onClose
    }
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      className: cn(
        "relative w-full bg-white dark:bg-tactical-neutral-900 border border-tactical-neutral-300 dark:border-tactical-neutral-700 rounded shadow-2xl overflow-hidden z-10 transition-all duration-200 max-h-[90vh] flex flex-col font-mono",
        maxWidths[resolvedWidth]
      )
    },
    (title || subtitle || description) && /* @__PURE__ */ React.createElement("div", { className: "px-5 py-4 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800 bg-tactical-neutral-50 dark:bg-tactical-neutral-900/80 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, title && /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-xs uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100" }, title), subtitle && /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-tactical-neutral-500 mt-0.5" }, subtitle), description && /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-tactical-neutral-500 mt-0.5" }, description)), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onClose,
        className: "text-tactical-neutral-400 hover:text-tactical-neutral-700 dark:hover:text-tactical-neutral-200 p-1 rounded hover:bg-tactical-neutral-100 dark:hover:bg-tactical-neutral-800 transition-colors",
        "aria-label": "Close"
      },
      /* @__PURE__ */ React.createElement("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }))
    )),
    /* @__PURE__ */ React.createElement("div", { className: "p-5 overflow-y-auto flex-1" }, children),
    footer && /* @__PURE__ */ React.createElement("div", { className: "px-5 py-3 border-t border-tactical-neutral-200 dark:border-tactical-neutral-800 bg-tactical-neutral-50 dark:bg-tactical-neutral-950 flex items-center justify-between" }, footer)
  ));
};
export {
  Modal
};
