import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Shield, Key, CheckCircle, FileText, Lock, Loader2, ArrowRight } from "lucide-react";
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
      toast.error("Passwords do not match.");
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
      }, 1200);
    } catch (err) {
      // Error toast handled in AuthContext
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f11] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans select-none antialiased">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-md bg-[#181c22] flex items-center justify-center text-[#9cae9b] border border-[#2a313d] shadow-xs">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-wider uppercase text-white font-sans">
            INTELLITRACK
          </span>
        </Link>
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Personnel Credential Registration
        </h2>
        <p className="mt-1 text-xs text-[#9ca3af]">
          Law enforcement officer intake and intelligence clearance enrollment
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-[#14171c] py-8 px-6 sm:px-8 border border-[#222731] rounded-xl shadow-2xl">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#18261c] border border-[#25392b] flex items-center justify-center text-[#8fa38d] mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-sm uppercase font-mono text-white">
                Credentials Enrolled & Verified
              </h3>
              <p className="text-xs text-[#9ca3af] max-w-sm mx-auto">
                Identity verified on audit ledger. Launching operational intelligence workspace...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Special Agent Marcus Vance"
                  required
                />
                <Input
                  label="Official Badge / Shield #"
                  value={badgeNumber}
                  onChange={(e) => setBadgeNumber(e.target.value)}
                  placeholder="e.g. FBI-89412"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Jurisdictional Agency"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  options={[
                    { value: "FEDERAL_BUREAU_OF_INVESTIGATION", label: "Federal Bureau of Investigation" },
                    { value: "DRUG_ENFORCEMENT_ADMINISTRATION", label: "Drug Enforcement Administration" },
                    { value: "HOMELAND_SECURITY_INVESTIGATIONS", label: "Homeland Security Investigations" },
                    { value: "BUREAU_ALCOHOL_TOBACCO_FIREARMS", label: "Bureau of Alcohol, Tobacco & Firearms" },
                    { value: "STATE_POLICE_INTELLIGENCE_FUSION", label: "State Police Fusion Center" },
                  ]}
                />
                <Select
                  label="Operational Role"
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
                  label="Agency Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m.vance@intellitrack.gov"
                  required
                />
                <Input
                  label="PIV / CAC Token Serial"
                  value={pivSerial}
                  onChange={(e) => setPivSerial(e.target.value)}
                  placeholder="PIV-9904-8172-FED"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                />
              </div>

              <div className="p-3 bg-[#101317] rounded-md border border-[#222731] text-[11px] text-[#9ca3af] leading-relaxed">
                <FileText className="w-3.5 h-3.5 text-[#8fa38d] inline mr-1.5" />
                By submitting this form, you verify authorization under CJIS Level 4 compliance protocols. All access is logged and audited.
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isRegistering}
                  className="w-full h-10 bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c] font-semibold text-xs py-2.5 rounded-md"
                  icon={isRegistering ? <Loader2 className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
                >
                  {isRegistering ? "Registering Clearance..." : "Enroll Officer Credentials"}
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center text-xs text-[#606875]">
            <span>Already have active clearance? </span>
            <Link to="/login" className="font-semibold text-[#9cae9b] hover:underline">
              Terminal Login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignupPage };
export default SignupPage;
