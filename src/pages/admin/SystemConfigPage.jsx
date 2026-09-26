import React, { useState } from "react";
import { mockDataFeeds } from "@/constants/mockData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Modal } from "@/components/ui/Modal";
import {
  Plus,
  Radio,
  RefreshCw,
  ShieldCheck,
  Zap,
  Sliders
} from "lucide-react";
const SystemConfigPage = () => {
  const [feeds, setFeeds] = useState(mockDataFeeds);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTesting, setIsTesting] = useState(null);
  const [feedName, setFeedName] = useState("");
  const [feedType, setFeedType] = useState("CDR");
  const [endpoint, setEndpoint] = useState("kafka://feed-broker.fed.internal:9092");
  const [sessionTimeout, setSessionTimeout] = useState("15");
  const [merkleEpoch, setMerkleEpoch] = useState("60");
  const [requireHardwareMfa, setRequireHardwareMfa] = useState(true);
  const [autoRevokeSuspicious, setAutoRevokeSuspicious] = useState(true);
  const handleToggleFeed = (id) => {
    setFeeds(feeds.map((f) => {
      if (f.id === id) {
        return {
          ...f,
          status: f.status === "HEALTHY" ? "OFFLINE" : "HEALTHY"
        };
      }
      return f;
    }));
  };
  const handleTestFeed = (id) => {
    setIsTesting(id);
    setTimeout(() => {
      setIsTesting(null);
    }, 1e3);
  };
  const handleAddFeed = (e) => {
    e.preventDefault();
    const newF = {
      id: `FEED-SYS-${Date.now()}`,
      name: feedName,
      type: feedType,
      status: "HEALTHY",
      recordsIngested: 0,
      throughput: "120 events/sec",
      errorRate: 0,
      lastSync: (/* @__PURE__ */ new Date()).toISOString(),
      endpoint
    };
    setFeeds([...feeds, newF]);
    setIsAddModalOpen(false);
    setFeedName("");
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-7xl mx-auto font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-tactical-neutral-500 text-[11px] uppercase tracking-wider mb-1" }, /* @__PURE__ */ React.createElement("span", null, "INGESTION PIPELINE & PROTOCOL ENGINE"), /* @__PURE__ */ React.createElement("span", null, "/"), /* @__PURE__ */ React.createElement("span", { className: "text-tactical-success-600 font-semibold" }, "ALL STREAMS NOMINAL")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold tracking-tight text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "System Ingestion Feeds & CJIS Policies")), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "primary",
      size: "sm",
      onClick: () => setIsAddModalOpen(true),
      icon: /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4" })
    },
    "Connect Ingestion Stream"
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Aggregate Bandwidth"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black text-tactical-neutral-900 dark:text-tactical-neutral-100 my-1" }, "4.82 GB/s"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-success-600 font-semibold flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Zap, { className: "w-3.5 h-3.5" }), " High-Density Fibre Channel")), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Total Ingested Records"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black text-tactical-primary-600 my-1" }, "4.91M"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500" }, "Indexed for Sub-sec Search")), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Packet Drop Rate"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black text-tactical-neutral-900 dark:text-tactical-neutral-100 my-1" }, "0.002%"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-success-600 font-semibold" }, "Under Statutory SLA")), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase text-tactical-neutral-500" }, "Active Pipelines"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black text-tactical-neutral-900 dark:text-tactical-neutral-100 my-1" }, feeds.filter((f) => f.status === "HEALTHY").length, " / ", feeds.length), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500" }, "Continuous Polling"))), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xs font-bold uppercase tracking-wider text-tactical-neutral-700 dark:text-tactical-neutral-300" }, "Operational Ingestion Streams & Telemetry"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, feeds.map((feed) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: feed.id,
      className: "p-4 bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 flex flex-col justify-between space-y-4 hover:border-tactical-primary-500 transition-colors"
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded bg-tactical-neutral-100 dark:bg-tactical-neutral-800 flex items-center justify-center text-tactical-primary-600 border border-tactical-neutral-300 dark:border-tactical-neutral-700" }, /* @__PURE__ */ React.createElement(Radio, { className: "w-4 h-4" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-xs uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100" }, feed.name), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-tactical-neutral-500 block" }, "TYPE: ", feed.type, " \u2022 ID: ", feed.id))), /* @__PURE__ */ React.createElement(Badge, { variant: feed.status === "HEALTHY" ? "success" : "danger", size: "sm" }, feed.status)), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 bg-tactical-neutral-50 dark:bg-tactical-neutral-800/60 rounded text-[11px] space-y-1 border border-tactical-neutral-200 dark:border-tactical-neutral-700/60" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-500" }, "Broker Endpoint:"), /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-tactical-neutral-800 dark:text-tactical-neutral-200 truncate max-w-[200px]" }, feed.endpoint)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-500" }, "Throughput:"), /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-tactical-primary-600" }, feed.throughput)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-500" }, "Records Ingested:"), /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-tactical-neutral-800 dark:text-tactical-neutral-200" }, feed.recordsIngested.toLocaleString())), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-tactical-neutral-500" }, "Error Rate:"), /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-tactical-success-600" }, feed.errorRate, "%")))),
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pt-2 border-t border-tactical-neutral-100 dark:border-tactical-neutral-800 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-tactical-neutral-500" }, "Live Worker:"), /* @__PURE__ */ React.createElement(
      Switch,
      {
        checked: feed.status === "HEALTHY",
        onChange: () => handleToggleFeed(feed.id)
      }
    )), /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "secondary",
        size: "sm",
        onClick: () => handleTestFeed(feed.id),
        disabled: isTesting === feed.id,
        icon: /* @__PURE__ */ React.createElement(RefreshCw, { className: `w-3.5 h-3.5 ${isTesting === feed.id ? "animate-spin" : ""}` }),
        className: "text-[11px]"
      },
      isTesting === feed.id ? "Pinging Kafka..." : "Test Connection"
    ))
  )))), /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-tactical-neutral-900 rounded border border-tactical-neutral-200 dark:border-tactical-neutral-800 p-6 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 pb-3 border-b border-tactical-neutral-200 dark:border-tactical-neutral-800" }, /* @__PURE__ */ React.createElement(Sliders, { className: "w-5 h-5 text-tactical-primary-600" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-sm uppercase text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "CJIS 5.4 Mandatory System Governance Policies"), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-tactical-neutral-500" }, "Department-wide statutory enforcement parameters"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "block font-bold text-tactical-neutral-800 dark:text-tactical-neutral-200 uppercase" }, "Terminal Inactivity Lockout (Minutes)"), /* @__PURE__ */ React.createElement(
    Input,
    {
      value: sessionTimeout,
      onChange: (e) => setSessionTimeout(e.target.value),
      placeholder: "15",
      hint: "CJIS \xA7 5.5 requires screen lockout after <= 15 minutes of inactivity."
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "block font-bold text-tactical-neutral-800 dark:text-tactical-neutral-200 uppercase" }, "Merkle Tree Root Recalculation Epoch (Seconds)"), /* @__PURE__ */ React.createElement(
    Input,
    {
      value: merkleEpoch,
      onChange: (e) => setMerkleEpoch(e.target.value),
      placeholder: "60",
      hint: "Continuous cryptographic block hashing interval."
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between p-3 rounded bg-tactical-neutral-50 dark:bg-tactical-neutral-800/50 border border-tactical-neutral-200 dark:border-tactical-neutral-700" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Mandatory FIPS 140-3 Hardware Token"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500" }, "Deny access to software-only authenticators")), /* @__PURE__ */ React.createElement(Switch, { checked: requireHardwareMfa, onChange: setRequireHardwareMfa })), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between p-3 rounded bg-tactical-neutral-50 dark:bg-tactical-neutral-800/50 border border-tactical-neutral-200 dark:border-tactical-neutral-700" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-bold text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "Auto-Revoke on Cryptographic Anomaly"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-tactical-neutral-500" }, "Instantly revoke agent PIV upon Merkle divergence")), /* @__PURE__ */ React.createElement(Switch, { checked: autoRevokeSuspicious, onChange: setAutoRevokeSuspicious }))), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end pt-2" }, /* @__PURE__ */ React.createElement(Button, { variant: "primary", size: "sm", icon: /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-4 h-4" }) }, "Save Statutory Policies"))), /* @__PURE__ */ React.createElement(
    Modal,
    {
      isOpen: isAddModalOpen,
      onClose: () => setIsAddModalOpen(false),
      title: "CONNECT INGESTION DATA SOURCE",
      subtitle: "Establish Real-time Pipeline to Classified Fusion Node",
      size: "md"
    },
    /* @__PURE__ */ React.createElement("form", { onSubmit: handleAddFeed, className: "space-y-4" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Feed Identifier Name",
        value: feedName,
        onChange: (e) => setFeedName(e.target.value),
        placeholder: "e.g. State Police ALPR Ingestion - East",
        required: true
      }
    ), /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Feed Protocol & Schema",
        value: feedType,
        onChange: (e) => setFeedType(e.target.value),
        options: [
          { value: "CDR", label: "Call Detail Records (CDR / 3GPP Telemetry)" },
          { value: "RMS", label: "Records Management System (NIBRS / Incident)" },
          { value: "ALPR", label: "License Plate Recognition (LPR Camera Mesh)" },
          { value: "FINCEN", label: "FinCEN BSA / Transnational Wire Transfers" },
          { value: "SIGINT", label: "Title III Intercept Audio Transcripts" }
        ]
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Broker Endpoint / Connection URI",
        value: endpoint,
        onChange: (e) => setEndpoint(e.target.value),
        placeholder: "kafka://stream.secure.fed:9092",
        required: true
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end gap-2 pt-2 border-t border-tactical-neutral-200 dark:border-tactical-neutral-700" }, /* @__PURE__ */ React.createElement(Button, { variant: "secondary", size: "sm", onClick: () => setIsAddModalOpen(false) }, "Cancel"), /* @__PURE__ */ React.createElement(Button, { variant: "primary", size: "sm", type: "submit" }, "Mount Stream to Fusion Node")))
  ));
};
export {
  SystemConfigPage
};
