import React, { createContext, useContext, useState } from "react";
import { cn } from "../../utils/cn";
const TabsContext = createContext(void 0);
const Tabs = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className
}) => {
  const [tab, setTab] = useState(defaultValue);
  const activeTab = value !== void 0 ? value : tab;
  const setActiveTab = (val) => {
    if (value === void 0) setTab(val);
    onValueChange?.(val);
  };
  return /* @__PURE__ */ React.createElement(TabsContext.Provider, { value: { activeTab, setActiveTab } }, /* @__PURE__ */ React.createElement("div", { className: cn("w-full", className) }, children));
};
const TabsList = ({
  className,
  children,
  ...props
}) => /* @__PURE__ */ React.createElement(
  "div",
  {
    className: cn(
      "inline-flex items-center gap-1 bg-surface-container-high/60 p-1 rounded border border-outline-variant/30 select-none",
      className
    ),
    ...props
  },
  children
);
const TabsTrigger = ({
  value,
  className,
  children,
  ...props
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");
  const isActive = context.activeTab === value;
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => context.setActiveTab(value),
      className: cn(
        "px-3 py-1 font-label-sm text-label-sm uppercase tracking-wider font-semibold rounded transition-all duration-150",
        isActive ? "bg-surface-container-lowest text-primary shadow-xs" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/50",
        className
      ),
      ...props
    },
    children
  );
};
const TabsContent = ({
  value,
  className,
  children,
  ...props
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");
  if (context.activeTab !== value) return null;
  return /* @__PURE__ */ React.createElement("div", { className: cn("mt-3 outline-none", className), ...props }, children);
};
export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
};
