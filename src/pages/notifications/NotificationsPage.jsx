import React, { useState } from "react";
import { mockNotifications } from "@/constants/mockData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  CheckCheck,
  ArrowRight
} from "lucide-react";
const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState("ALL");
  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };
  const handleToggleRead = (id) => {
    setNotifications(notifications.map((n) => {
      if (n.id === id) {
        return { ...n, read: !n.read };
      }
      return n;
    }));
  };
  const filtered = notifications.filter((n) => {
    if (filter === "CRITICAL") return n.severity === "CRITICAL";
    if (filter === "UNREAD") return !n.read;
    return true;
  });
  const getBorderColor = (sev) => {
    switch (sev) {
      case "CRITICAL":
        return "border-l-4 border-l-tactical-danger-600";
      case "WARNING":
        return "border-l-4 border-l-tactical-warning-500";
      case "SUCCESS":
        return "border-l-4 border-l-tactical-success-500";
      default:
        return "border-l-4 border-l-tactical-primary-600";
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider mb-0.5" }, /* @__PURE__ */ React.createElement("span", null, "OPERATIONAL ALERTS & REAL-TIME SIGNALS"), /* @__PURE__ */ React.createElement("span", null, "/"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-danger-600 font-semibold" }, "CJIS PRIORITY BUS")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold tracking-tight text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Operational Signals & Alert Notifications")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      size: "sm",
      onClick: handleMarkAllRead,
      icon: /* @__PURE__ */ React.createElement(CheckCheck, { className: "w-4 h-4" })
    },
    "Acknowledge All Signals"
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-xs" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setFilter("ALL"),
      className: `px-3 py-1.5 rounded font-bold uppercase transition-all ${filter === "ALL" ? "bg-tactical-neutral-900 text-white dark:bg-tactical-neutral-100 dark:text-tactical-neutral-900" : "text-tactical-neutral-500 hover:text-tactical-neutral-900"}`
    },
    "All Signals (",
    notifications.length,
    ")"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setFilter("CRITICAL"),
      className: `px-3 py-1.5 rounded font-bold uppercase transition-all ${filter === "CRITICAL" ? "bg-tactical-danger-600 text-white" : "text-tactical-neutral-500 hover:text-tactical-danger-600"}`
    },
    "Critical (",
    notifications.filter((n) => n.severity === "CRITICAL").length,
    ")"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setFilter("UNREAD"),
      className: `px-3 py-1.5 rounded font-bold uppercase transition-all ${filter === "UNREAD" ? "bg-tactical-primary-700 text-white" : "text-tactical-neutral-500 hover:text-tactical-primary-600"}`
    },
    "Unacknowledged (",
    notifications.filter((n) => !n.read).length,
    ")"
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, filtered.map((item) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: item.id,
      className: `p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 flex items-start justify-between gap-4 transition-colors ${getBorderColor(
        item.severity
      )} ${!item.read ? "bg-tactical-neutral-50/70 dark:bg-tactical-neutral-850" : ""}`
    },
    /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
      Badge,
      {
        variant: item.severity === "CRITICAL" ? "danger" : item.severity === "WARNING" ? "warning" : "info",
        size: "sm"
      },
      item.severity
    ), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, item.title), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-tactical-neutral-400" }, new Date(item.timestamp).toISOString().replace("T", " ").slice(0, 19), "Z")), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-tactical-neutral-600 dark:text-tactical-neutral-400 font-sans leading-relaxed" }, item.message), item.link && /* @__PURE__ */ React.createElement("div", { className: "pt-1" }, /* @__PURE__ */ React.createElement(
      "a",
      {
        href: item.link,
        className: "text-[11px] text-tactical-primary-600 hover:underline font-bold inline-flex items-center gap-1"
      },
      "Investigate Context ",
      /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-3 h-3" })
    ))),
    /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "secondary",
        size: "sm",
        onClick: () => handleToggleRead(item.id),
        className: "text-[10px] py-1 shrink-0"
      },
      item.read ? "Mark Unread" : "Acknowledge"
    )
  ))));
};
export {
  NotificationsPage
};
