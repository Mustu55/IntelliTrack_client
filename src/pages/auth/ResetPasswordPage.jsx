import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Shield, Key, CheckCircle, ArrowLeft } from "lucide-react";
const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("CHAL-SEC-8921-X9");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      navigate("/login");
    }, 2e3);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-mono select-none" }, /* @__PURE__ */ React.createElement("div", { className: "sm:mx-auto sm:w-full sm:max-w-md text-center" }, /* @__PURE__ */ React.createElement(Link, { to: "/", className: "inline-flex items-center gap-2 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 rounded bg-navy-800 flex items-center justify-center text-white shadow-sm border border-steel-600" }, /* @__PURE__ */ React.createElement(Shield, { className: "w-6 h-6 fill-steel-600/30 stroke-steel-400" })), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-lg tracking-wider text-slate-100" }, "INTELLITRACK")), /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold uppercase tracking-tight text-white" }, "Reset Hardware Token Key"), /* @__PURE__ */ React.createElement("p", { className: "mt-1 text-xs text-slate-400" }, "Enroll New RSA-4096 Hardware Token Passkey")), /* @__PURE__ */ React.createElement("div", { className: "mt-6 sm:mx-auto sm:w-full sm:max-w-md" }, /* @__PURE__ */ React.createElement("div", { className: "bg-navy-900 py-8 px-6 sm:px-10 border border-navy-800 rounded shadow-xl" }, success ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-4 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 rounded-full bg-threat-low/20 border border-threat-low/40 flex items-center justify-center text-threat-low mx-auto" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "w-6 h-6" })), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-sm uppercase text-white" }, "PASSKEY RE-ENROLLED SUCCESSFULLY"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-300" }, "New master cryptographic hash anchored in FIPS HSM. Transferring to login terminal...")) : /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" }, /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "SOC Authorization Challenge Token",
      value: token,
      onChange: (e) => setToken(e.target.value),
      placeholder: "e.g. CHAL-XXXX-XXXX",
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "New Hardware Token Passkey",
      type: "password",
      value: newPassword,
      onChange: (e) => setNewPassword(e.target.value),
      placeholder: "Enter minimum 16-character passkey",
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Confirm Passkey",
      type: "password",
      value: confirmPassword,
      onChange: (e) => setConfirmPassword(e.target.value),
      placeholder: "Confirm passkey",
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      type: "submit",
      variant: "primary",
      className: "w-full bg-steel-600 hover:bg-steel-500 text-white font-mono uppercase tracking-wide text-xs py-2.5",
      size: "lg",
      icon: /* @__PURE__ */ React.createElement(Key, { className: "w-4 h-4" })
    },
    "Sign & Bind New Key"
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
  ResetPasswordPage
};
