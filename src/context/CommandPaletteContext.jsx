import React, { createContext, useContext, useState, useEffect } from "react";
const CommandPaletteContext = createContext(void 0);
const CommandPaletteProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openPalette = () => setIsOpen(true);
  const closePalette = () => setIsOpen(false);
  const togglePalette = () => setIsOpen((prev) => !prev);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        togglePalette();
      } else if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        e.preventDefault();
        openPalette();
      } else if (e.key === "Escape") {
        closePalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return /* @__PURE__ */ React.createElement(
    CommandPaletteContext.Provider,
    {
      value: {
        isOpen,
        setIsOpen,
        openPalette,
        closePalette,
        togglePalette
      }
    },
    children
  );
};
const useCommandPalette = () => {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error("useCommandPalette must be used within a CommandPaletteProvider");
  }
  return context;
};
export {
  CommandPaletteProvider,
  useCommandPalette
};
