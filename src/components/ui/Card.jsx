import React from "react";
import { cn } from "../../utils/cn";
const Card = React.forwardRef(
  ({ className, hoverEffect = false, children, ...props }, ref) => {
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        ref,
        className: cn(
          "bg-surface-container-lowest border border-outline-variant/60 rounded shadow-sm overflow-hidden",
          hoverEffect && "hover:border-outline hover:shadow-md transition-all duration-150",
          className
        ),
        ...props
      },
      children
    );
  }
);
Card.displayName = "Card";
const CardHeader = ({
  className,
  children,
  ...props
}) => /* @__PURE__ */ React.createElement("div", { className: cn("p-4 border-b border-outline-variant/40 bg-surface-container-low/40", className), ...props }, children);
const CardTitle = ({
  className,
  children,
  ...props
}) => /* @__PURE__ */ React.createElement("h3", { className: cn("font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight", className), ...props }, children);
const CardDescription = ({
  className,
  children,
  ...props
}) => /* @__PURE__ */ React.createElement("p", { className: cn("font-body-sm text-body-sm text-on-surface-variant mt-0.5", className), ...props }, children);
const CardContent = ({
  className,
  children,
  ...props
}) => /* @__PURE__ */ React.createElement("div", { className: cn("p-4 space-y-3", className), ...props }, children);
const CardFooter = ({
  className,
  children,
  ...props
}) => /* @__PURE__ */ React.createElement("div", { className: cn("px-4 py-2.5 bg-surface-container-low/60 border-t border-outline-variant/30 flex items-center justify-between", className), ...props }, children);
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
};
