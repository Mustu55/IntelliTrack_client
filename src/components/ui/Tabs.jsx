import React, { createContext, useContext, useState } from "react";
import { cn } from "../../utils/cn";

const TabsContext = createContext(undefined);

const Tabs = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className
}) => {
  const [tab, setTab] = useState(defaultValue);
  const activeTab = value !== undefined ? value : tab;
  const setActiveTab = (val) => {
    if (value === undefined) setTab(val);
    onValueChange?.(val);
  };
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      "inline-flex items-center gap-1.5 bg-[#101317] p-1 rounded-lg border border-[#222731] select-none",
      className
    )}
    {...props}
  >
    {children}
  </div>
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
  return (
    <button
      type="button"
      onClick={() => context.setActiveTab(value)}
      className={cn(
        "px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider rounded-md transition-all duration-150 cursor-pointer",
        isActive
          ? "bg-[#181c22] text-[#9cae9b] border border-[#28303e] shadow-xs font-semibold"
          : "text-[#9ca3af] hover:text-[#f3f4f6] hover:bg-[#14171c]",
        className
      )}
      {...props}
    >
      {children}
    </button>
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
  return <div className={cn("mt-4 outline-none", className)} {...props}>{children}</div>;
};

export { Tabs, TabsContent, TabsList, TabsTrigger };
export default Tabs;

