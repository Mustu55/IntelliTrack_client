import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Shield, Smartphone, Key, CheckCircle, ArrowLeft } from "lucide-react";
const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1200);
    }, 800);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-mono select-none" }, /* @__PURE__ */ React.createElement("div", { className: "sm:mx-auto sm:w-full sm:max-w-md text-center" }, /* @__PURE__ */ React.createElement(Link, { to: "/", className: "inline-flex items-center gap-2 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 rounded bg-navy-800 flex items-center justify-center text-white shadow-sm border border-steel-600" }, /* @__PURE__ */ React.createElement(Shield, { className: "w-6 h-6 fill-steel-600/30 stroke-steel-400" })), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-lg tracking-wider text-slate-100" }, "INTELLITRACK")), /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold uppercase tracking-tight text-white" }, "PIV / YubiKey Challenge"), /* @__PURE__ */ React.createElement("p", { className: "mt-1 text-xs text-slate-400" }, "CJIS Level 4 Multi-Factor Cryptographic Authentication")), /* @__PURE__ */ React.createElement("div", { className: "mt-6 sm:mx-auto sm:w-full sm:max-w-md" }, /* @__PURE__ */ React.createElement("div", { className: "bg-navy-900 py-8 px-6 sm:px-10 border border-navy-800 rounded shadow-xl" }, success ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-4 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 rounded-full bg-threat-low/20 border border-threat-low/40 flex items-center justify-center text-threat-low mx-auto" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "w-6 h-6" })), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-sm uppercase text-white" }, "HARDWARE TOKEN VERIFIED"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-300" }, "Session cryptographically bound to hardware terminal. Initializing operational workspace...")) : /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-navy-950 rounded border border-navy-800 flex items-center gap-3" }, /* @__PURE__ */ React.createElement(Smartphone, { className: "w-5 h-5 text-steel-400 shrink-0" }), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-300" }, "Touch your YubiKey FIPS or enter the 6-digit TOTP challenge from your agency authenticator.")), /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "6-Digit Verification Token",
      value: otp,
      onChange: (e) => setOtp(e.target.value),
      placeholder: "000 000",
      maxLength: 6,
      autoFocus: true,
      className: "text-center tracking-widest text-lg font-bold",
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      type: "submit",
      variant: "primary",
      className: "w-full bg-steel-600 hover:bg-steel-500 text-white font-mono uppercase tracking-wide text-xs py-2.5",
      size: "lg",
      disabled: verifying || otp.length < 6,
      icon: /* @__PURE__ */ React.createElement(Key, { className: "w-4 h-4" })
    },
    verifying ? "Validating Token Signature..." : "Verify Cryptographic Pin"
  )), /* @__PURE__ */ React.createElement("div", { className: "mt-6 text-center" }, /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/login",
      className: "inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-steel-400 transition-colors"
    },
    /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-3 h-3" }),
    /* @__PURE__ */ React.createElement("span", null, "Back to Credentials")
  )))));
};
export {
  OtpVerificationPage
};
