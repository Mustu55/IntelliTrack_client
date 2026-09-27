import React, { useState } from "react";
import { 
  Bell, 
  CheckCheck, 
  ArrowRight, 
  ShieldAlert, 
  FileText, 
  Users, 
  Share2, 
  Activity, 
  Clock, 
  Sparkles,
  CheckCircle2,
  Trash2,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Link } from "react-router-dom";

const mockSignals = [
  {
    id: "notif-1",
    type: "LEAD_FLAG",
    severity: "CRITICAL",
    title: "New high-priority investigative lead generated",
    message: "AI correlation engine detected a shell company match connecting Operation Ghost Freight to overseas wire accounts (Risk score: 94).",
    timestamp: "12m ago",
    read: false,
    link: "/leads/lead-001",
    linkText: "Review Lead",
    category: "leads"
  },
  {
    id: "notif-2",
    type: "NETWORK_CHANGE",
    severity: "WARNING",
    title: "Entity link bridge identified",
    message: "Elena Vance was linked to warehouse location LOC-7741 via shared burner phone number +1 (555) 019-2834.",
    timestamp: "1h ago",
    read: false,
    link: "/network",
    linkText: "View Network Graph",
    category: "network"
  },
  {
    id: "notif-3",
    type: "EVIDENCE_VERIFIED",
    severity: "SUCCESS",
    title: "Evidence SHA-256 integrity verified",
    message: "CCTV surveillance clip (EVD-9902) tamper check passed with 100% cryptographic match across custody records.",
    timestamp: "3h ago",
    read: true,
    link: "/evidence",
    linkText: "View Evidence",
    category: "evidence"
  },
  {
    id: "notif-4",
    type: "CASE_ASSIGNMENT",
    severity: "INFO",
    title: "Assigned as Co-Investigator",
    message: "Lead Investigator Sarah Lin added your credentials to Case #CASE-2024-089 (Project Nightfall).",
    timestamp: "5h ago",
    read: true,
    link: "/cases/CASE-2024-089",
    linkText: "Open Case Cockpit",
    category: "cases"
  },
  {
    id: "notif-5",
    type: "SYSTEM_SECURITY",
    severity: "INFO",
    title: "Periodic CJIS security clearance renewed",
    message: "Your Level 4 forensic access token has been validated for an additional 30 days.",
    timestamp: "1d ago",
    read: true,
    link: "/profile",
    linkText: "Security Details",
    category: "security"
  }
];

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockSignals);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleToggleRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const handleDismiss = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filtered = notifications.filter(n => {
    if (activeFilter === "unread") return !n.read;
    if (activeFilter === "critical") return n.severity === "CRITICAL";
    if (activeFilter === "leads") return n.category === "leads";
    if (activeFilter === "network") return n.category === "network";
    return true;
  });

  const getIcon = (type, severity) => {
    switch (type) {
      case "LEAD_FLAG":
        return <Sparkles className="w-4 h-4 text-tactical-danger-400" />;
      case "NETWORK_CHANGE":
        return <Share2 className="w-4 h-4 text-tactical-warning-400" />;
      case "EVIDENCE_VERIFIED":
        return <FileText className="w-4 h-4 text-tactical-success-400" />;
      case "CASE_ASSIGNMENT":
        return <Users className="w-4 h-4 text-tactical-neutral-300" />;
      default:
        return <Bell className="w-4 h-4 text-tactical-sage-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222731]">
        <div>
          <div className="flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider font-mono mb-1">
            <span>AUDIT LOGS & DISPATCH</span>
            <span>/</span>
            <span className="text-tactical-sage-400 font-semibold">SIGNAL INBOX</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Notifications & System Signals
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-[#dc7869]/20 text-[#dc7869] border border-[#dc7869]/40">
                {notifications.filter(n => !n.read).length} new
              </span>
            )}
          </h1>
          <p className="text-xs text-tactical-neutral-400 mt-0.5">
            Automated entity alerts, lead triggers, and case synchronization logs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleMarkAllRead}
            icon={<CheckCheck className="w-4 h-4" />}
            className="border-[#222731] hover:border-tactical-neutral-700 text-xs"
          >
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 p-1 bg-[#14171c] border border-[#222731] rounded-lg text-xs font-mono">
          {[
            { key: "all", label: `All Signals (${notifications.length})` },
            { key: "unread", label: `Unread (${notifications.filter(n => !n.read).length})` },
            { key: "critical", label: `Critical (${notifications.filter(n => n.severity === "CRITICAL").length})` },
            { key: "leads", label: "Leads" },
            { key: "network", label: "Network" }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeFilter === tab.key
                  ? "bg-[#1c222b] text-white border border-[#2e3644] shadow-sm"
                  : "text-tactical-neutral-400 hover:text-white hover:bg-[#181c22]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-[#14171c] border border-[#222731] rounded-xl">
            <CheckCircle2 className="w-10 h-10 text-tactical-sage-400/60 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-white">All caught up</h3>
            <p className="text-xs text-tactical-neutral-400 mt-1 max-w-sm mx-auto">
              No unacknowledged notifications in this category. New intelligence feeds will appear in real time.
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all duration-200 flex items-start justify-between gap-4 ${
                !item.read
                  ? "bg-[#151921] border-[#2e3644] shadow-sm"
                  : "bg-[#101317] border-[#222731]/70 hover:border-[#222731]"
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div className={`p-2 rounded-lg shrink-0 ${
                  !item.read ? "bg-[#1a212b] border border-[#2a3443]" : "bg-[#14171c] border border-[#222731]"
                }`}>
                  {getIcon(item.type, item.severity)}
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-tactical-sage-400 ring-2 ring-tactical-sage-400/20" />
                    )}
                    <h3 className={`text-xs font-semibold ${!item.read ? "text-white" : "text-tactical-neutral-300"}`}>
                      {item.title}
                    </h3>
                    <Badge
                      variant={
                        item.severity === "CRITICAL" ? "danger" :
                        item.severity === "WARNING" ? "warning" :
                        item.severity === "SUCCESS" ? "success" : "neutral"
                      }
                      size="sm"
                      className="font-mono text-[10px] uppercase"
                    >
                      {item.severity}
                    </Badge>
                    <span className="text-[11px] font-mono text-tactical-neutral-500 ml-auto flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-tactical-neutral-400 leading-relaxed font-sans">
                    {item.message}
                  </p>

                  {item.link && (
                    <div className="pt-1.5 flex items-center gap-3">
                      <Link
                        to={item.link}
                        className="text-[11px] font-mono font-medium text-tactical-sage-400 hover:text-tactical-sage-300 hover:underline inline-flex items-center gap-1"
                      >
                        {item.linkText} <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 shrink-0 self-center">
                <button
                  onClick={() => handleToggleRead(item.id)}
                  title={item.read ? "Mark as unread" : "Mark as read"}
                  className="px-2.5 py-1.5 rounded-lg border border-[#222731] hover:border-[#2e3644] text-[11px] font-mono text-tactical-neutral-400 hover:text-white bg-[#14171c] hover:bg-[#1a1f26] transition-colors"
                >
                  {item.read ? "Mark unread" : "Acknowledge"}
                </button>
                <button
                  onClick={() => handleDismiss(item.id)}
                  title="Dismiss notification"
                  className="p-1.5 rounded-lg text-tactical-neutral-500 hover:text-tactical-danger-400 hover:bg-[#1a1f26] transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer System Status */}
      <div className="p-3 bg-[#14171c]/50 border border-[#222731] rounded-xl flex items-center justify-between text-xs text-tactical-neutral-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-tactical-success-400 animate-pulse" />
          <span>Real-time WebSocket dispatcher active · Low latency</span>
        </div>
        <span>Retention policy: 90 days</span>
      </div>
    </div>
  );
};
