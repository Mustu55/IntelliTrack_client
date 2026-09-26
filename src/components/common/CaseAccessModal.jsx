import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert, Key, CheckCircle, FileCheck } from "lucide-react";
const CaseAccessModal = ({
  isOpen,
  onClose,
  caseId = "CASE-FED-2026-0042",
  caseNumber = "FED-2026-0042",
  onAccessGranted
}) => {
  const { user } = useAuth();
  const [authority, setAuthority] = useState("TITLE_18_2703_D");
  const [warrantNumber, setWarrantNumber] = useState("USDC-SDNY-2026-W0084");
  const [judgeName, setJudgeName] = useState("Hon. E. Vance, US Magistrate");
  const [justification, setJustification] = useState(
    "Probable cause established correlating target burner communications with active transnational hawala transactions."
  );
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        if (onAccessGranted) onAccessGranted();
      }, 1200);
    }, 800);
  };
  return /* @__PURE__ */ React.createElement(
    Modal,
    {
      isOpen,
      onClose,
      title: "TITLE 18 RESTRICTED ACCESS AUTHORIZATION PROTOCOL",
      subtitle: `Statutory Clearance Request for Docket: ${caseNumber}`,
      size: "md",
      footer: /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between w-full" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono text-[10px] text-tactical-neutral-500 uppercase" }, "AUDIT LOGGED \u2022 18 U.S.C. \xA7 1030 APPLIES"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Button, { variant: "secondary", size: "sm", onClick: onClose, disabled: submitting }, "Abort"), /* @__PURE__ */ React.createElement(
        Button,
        {
          variant: "primary",
          size: "sm",
          onClick: handleSubmit,
          disabled: submitting || success,
          icon: success ? /* @__PURE__ */ React.createElement(CheckCircle, { className: "w-4 h-4" }) : /* @__PURE__ */ React.createElement(Key, { className: "w-4 h-4" })
        },
        submitting ? "Authenticating PIV..." : success ? "Access Authorized" : "Submit Warrant Request"
      )))
    },
    success ? /* @__PURE__ */ React.createElement("div", { className: "p-6 text-center space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 rounded-full bg-tactical-success-100 dark:bg-tactical-success-900 border border-tactical-success-300 dark:border-tactical-success-700 flex items-center justify-center text-tactical-success-600 dark:text-tactical-success-300 mx-auto" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "w-6 h-6" })), /* @__PURE__ */ React.createElement("h4", { className: "font-mono font-bold text-sm uppercase tracking-wide text-tactical-neutral-900 dark:text-tactical-neutral-100" }, "EMERGENCY DECLASSIFICATION APPROVED"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-tactical-neutral-600 dark:text-tactical-neutral-400" }, "Authorization ticket generated: ", /* @__PURE__ */ React.createElement("span", { className: "font-mono text-tactical-primary-600 font-semibold" }, "AUTH-WARR-8921-X"), ". Full docket payload unsealed.")) : /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-tactical-warning-50 dark:bg-tactical-warning-950/40 border border-tactical-warning-300 dark:border-tactical-warning-800 rounded flex items-start gap-3" }, /* @__PURE__ */ React.createElement(ShieldAlert, { className: "w-5 h-5 text-tactical-warning-600 dark:text-tactical-warning-400 shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-tactical-warning-800 dark:text-tactical-warning-300" }, /* @__PURE__ */ React.createElement("strong", { className: "block font-semibold" }, "Strict Need-To-Know Compartment:"), "Viewing sealed grand jury or Title III intercepted records without judicial authorization carries statutory penalties under 18 U.S.C. \xA7 2511.")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Requesting Agent",
        value: user?.fullName || "Agent Marcus Vance",
        disabled: true,
        hint: `Badge: ${user?.badgeNumber || "FBI-89412"}`
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Issuing Magistrate / Judge",
        value: judgeName,
        onChange: (e) => setJudgeName(e.target.value),
        placeholder: "Honorable Judge Name",
        required: true
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Statutory Authority",
        value: authority,
        onChange: (e) => setAuthority(e.target.value),
        options: [
          { value: "TITLE_18_2703_D", label: "18 U.S.C. \xA7 2703(d) Court Order" },
          { value: "TITLE_18_2518_WIRETAP", label: "18 U.S.C. \xA7 2518 Title III Wiretap" },
          { value: "RULE_41_SEARCH_WARRANT", label: "Fed. R. Crim. P. 41 Search Warrant" },
          { value: "EXIGENT_CIRCUMSTANCES", label: "Exigent Circumstances (Imminent Threat)" },
          { value: "GRAND_JURY_SUBPOENA", label: "Federal Grand Jury Subpoena" }
        ]
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Warrant Docket / Case File #",
        value: warrantNumber,
        onChange: (e) => setWarrantNumber(e.target.value),
        placeholder: "e.g. USDC-2026-W0084",
        required: true
      }
    )), /* @__PURE__ */ React.createElement(
      Textarea,
      {
        label: "Affidavit Summary / Probable Cause Justification",
        value: justification,
        onChange: (e) => setJustification(e.target.value),
        rows: 3,
        hint: "Summarize specific evidentiary articulable facts warranting compartmental access.",
        required: true
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded bg-tactical-neutral-100 dark:bg-tactical-neutral-800/80 border border-tactical-neutral-200 dark:border-tactical-neutral-700 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(FileCheck, { className: "w-4 h-4 text-tactical-primary-600 shrink-0" }), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-mono text-tactical-neutral-700 dark:text-tactical-neutral-300" }, "Digital Signature: ", /* @__PURE__ */ React.createElement("span", { className: "font-semibold" }, user?.agency || "FEDERAL BUREAU OF INVESTIGATION", " \u2022 FIPS 201 PIV VALID"))))
  );
};
export {
  CaseAccessModal
};
