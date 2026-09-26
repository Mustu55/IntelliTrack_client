import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Shield, Key, CheckCircle, FileText, Lock, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const { register, isRegistering } = useAuth();

  const [name, setName] = useState("");
  const [badgeNumber, setBadgeNumber] = useState("");
  const [agency, setAgency] = useState("FEDERAL_BUREAU_OF_INVESTIGATION");
  const [role, setRole] = useState("investigator");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pivSerial, setPivSerial] = useState("PIV-9904-8172-FED");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Cryptographic passwords do not match.");
      return;
    }

    try {
      await register({
        name,
        email,
        password,
        confirmPassword,
        role,
        badgeNumber,
        agency,
      });

      setSubmitted(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      // Error toast handled inside AuthContext
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-mono select-none">
      <div className="w-full max-w-xl mx-auto mb-4 flex items-center justify-between text-[10px] font-mono text-slate-400 bg-navy-900/80 px-3 py-1.5 rounded border border-navy-800">
        <span className="flex items-center gap-1.5 text-steel-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-steel-400 animate-pulse" />
          SEC-LEVEL: CJIS-4 RECEPTOR
        </span>
        <span className="text-slate-400">RESTRICTED TO SWORN LAW ENFORCEMENT</span>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded bg-navy-800 flex items-center justify-center text-white shadow-sm border border-steel-600">
            <Shield className="w-6 h-6 fill-steel-600/30 stroke-steel-400" />
          </div>
          <span className="font-bold text-lg tracking-wider text-slate-100">INTELLITRACK</span>
        </Link>
        <h2 className="text-xl font-bold uppercase tracking-tight text-white">FORM-SEC-89 Personnel Intake</h2>
        <p className="mt-1 text-xs text-slate-400">Official Law Enforcement Credentialing & Key Enrollment</p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-navy-900 py-8 px-6 sm:px-10 border border-navy-800 rounded shadow-xl">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-threat-low/20 border border-threat-low/40 flex items-center justify-center text-threat-low mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base uppercase text-white">APPLICATION SECURED & TRANSMITTED</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Dossier registered to immutable ledger. Initializing authenticated session...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name (Legal/Service)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Special Agent Jane Doe"
                  required
                />
                <Input
                  label="Official Badge / Shield #"
                  value={badgeNumber}
                  onChange={(e) => setBadgeNumber(e.target.value)}
                  placeholder="e.g. ATF-44910"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Parent Agency / Department"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  options={[
                    { value: "FEDERAL_BUREAU_OF_INVESTIGATION", label: "Federal Bureau of Investigation (FBI)" },
                    { value: "DRUG_ENFORCEMENT_ADMINISTRATION", label: "Drug Enforcement Administration (DEA)" },
                    { value: "HOMELAND_SECURITY_INVESTIGATIONS", label: "Homeland Security Investigations (HSI)" },
                    { value: "BUREAU_ALCOHOL_TOBACCO_FIREARMS", label: "Bureau of Alcohol, Tobacco & Firearms (ATF)" },
                    { value: "STATE_POLICE_INTELLIGENCE_FUSION", label: "State Police Fusion Center" },
                  ]}
                />
                <Select
                  label="Assigned Operational Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  options={[
                    { value: "investigator", label: "Field Investigator" },
                    { value: "analyst", label: "Intelligence Analyst" },
                    { value: "admin", label: "Command / Supervisor (Admin)" },
                    { value: "viewer", label: "Audit / Compliance Viewer" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Official Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="agent.name@agency.gov"
                  required
                />
                <Input
                  label="FIPS 201 PIV Token Serial"
                  value={pivSerial}
                  onChange={(e) => setPivSerial(e.target.value)}
                  placeholder="PIV-XXXX-XXXX-FED"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Cryptographic Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 chars (upper, lower, num, sym)"
                  required
                />
                <Input
                  label="Confirm Passkey"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter passkey"
                  required
                />
              </div>

              <div className="p-3 bg-navy-950 rounded border border-navy-800 text-xs text-slate-300">
                <FileText className="w-4 h-4 text-steel-400 inline mr-1" />
                By submitting this sworn record, you attest under penalty of perjury (28 U.S.C. § 1746) that all submitted identities are verified and backed by active jurisdictional commission.
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isRegistering}
                className="w-full bg-steel-600 hover:bg-steel-500 text-white font-mono uppercase tracking-wide text-xs py-2.5"
                size="lg"
                icon={isRegistering ? <Loader2 className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
              >
                {isRegistering ? "Registering Clearance..." : "Enroll Cryptographic Credentials"}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center text-xs text-slate-400">
            <span>Already have active clearance? </span>
            <Link to="/login" className="font-bold text-steel-400 hover:text-steel-300 hover:underline">
              Terminal Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignupPage };
export default SignupPage;
