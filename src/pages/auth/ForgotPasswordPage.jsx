import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Shield, KeyRound, CheckCircle, ArrowLeft } from "lucide-react";
const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [badgeNumber, setBadgeNumber] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-mono select-none" }, /* @__PURE__ */ React.createElement("div", { className: "sm:mx-auto sm:w-full sm:max-w-md text-center" }, /* @__PURE__ */ React.createElement(Link, { to: "/", className: "inline-flex items-center gap-2 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 rounded bg-navy-800 flex items-center justify-center text-white shadow-sm border border-steel-600" }, /* @__PURE__ */ React.createElement(Shield, { className: "w-6 h-6 fill-steel-600/30 stroke-steel-400" })), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-lg tracking-wider text-slate-100" }, "INTELLITRACK")), /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold uppercase tracking-tight text-white" }, "Hardware Key Recovery"), /* @__PURE__ */ React.createElement("p", { className: "mt-1 text-xs text-slate-400" }, "Cryptographic Passkey & PIV Emergency Challenge")), /* @__PURE__ */ React.createElement("div", { className: "mt-6 sm:mx-auto sm:w-full sm:max-w-md" }, /* @__PURE__ */ React.createElement("div", { className: "bg-navy-900 py-8 px-6 sm:px-10 border border-navy-800 rounded shadow-xl" }, submitted ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-4 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 rounded-full bg-threat-low/20 border border-threat-low/40 flex items-center justify-center text-threat-low mx-auto" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "w-6 h-6" })), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-sm uppercase text-white" }, "CHALLENGE ISSUED TO SECURE COMDAT"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-300" }, "A one-time emergency PIV reactivation token has been transmitted to your verified agency SOC terminal."), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "primary",
      size: "sm",
      className: "w-full mt-4 bg-steel-600 hover:bg-steel-500 text-white font-mono uppercase text-xs",
      onClick: () => navigate("/reset-password")
    },
    "Proceed to Passkey Reset"
  )) : /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" }, /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Registered Agent Badge #",
      value: badgeNumber,
      onChange: (e) => setBadgeNumber(e.target.value),
      placeholder: "e.g. FBI-89412",
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Government SIPR/NIPR Email",
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      placeholder: "agent@fbi.gov",
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      type: "submit",
      variant: "primary",
      className: "w-full bg-steel-600 hover:bg-steel-500 text-white font-mono uppercase tracking-wide text-xs py-2.5",
      size: "lg",
      icon: /* @__PURE__ */ React.createElement(KeyRound, { className: "w-4 h-4" })
    },
    "Dispatch SOC Challenge"
  )), /* @__PURE__ */ React.createElement("div", { className: "mt-6 text-center" }, /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/login",
      className: "inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-steel-400 transition-colors"
    },
    /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-3 h-3" }),
    /* @__PURE__ */ React.createElement("span", null, "Back to Terminal Login")
  )))));
};
export {
  ForgotPasswordPage
};
