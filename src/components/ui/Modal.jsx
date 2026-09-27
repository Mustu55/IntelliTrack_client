import React, { useEffect } from "react";
import { cn } from "../../utils/cn";
import { X } from "lucide-react";

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#0d0f11]/80 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative w-full bg-[#14171c] border border-[#222731] rounded-xl shadow-2xl overflow-hidden z-10 transition-all duration-200 max-h-[90vh] flex flex-col font-sans",
          maxWidths[resolvedWidth]
        )}
      >
        {(title || subtitle || description) && (
          <div className="px-5 py-4 border-b border-[#222731] bg-[#101317] flex items-center justify-between">
            <div>
              {title && <h3 className="font-semibold text-sm text-[#f3f4f6] font-mono uppercase tracking-wider">{title}</h3>}
              {subtitle && <p className="text-xs text-[#9ca3af] mt-0.5">{subtitle}</p>}
              {description && <p className="text-xs text-[#9ca3af] mt-0.5">{description}</p>}
            </div>
            <button
              onClick={onClose}
              className="text-[#9ca3af] hover:text-white p-1 rounded-md hover:bg-[#181c22] transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="p-5 overflow-y-auto flex-1 custom-scrollbar text-xs text-[#d1d5db]">{children}</div>
        {footer && (
          <div className="px-5 py-3 border-t border-[#222731] bg-[#101317] flex items-center justify-between">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export { Modal };
export default Modal;

