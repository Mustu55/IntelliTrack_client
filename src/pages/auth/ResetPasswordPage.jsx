import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Shield, Lock, CheckCircle, ArrowLeft } from "lucide-react";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0d0f11] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans select-none antialiased">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-md bg-[#181c22] flex items-center justify-center text-[#9cae9b] border border-[#2a313d] shadow-xs">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-wider uppercase text-white font-sans">
            INTELLITRACK
          </span>
        </Link>
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Reset Session Passkey
        </h2>
        <p className="mt-1 text-xs text-[#9ca3af]">
          Establish new FIPS-140-3 cryptographic access credentials
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#14171c] py-8 px-6 sm:px-8 border border-[#222731] rounded-xl shadow-2xl">
          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#18261c] border border-[#25392b] flex items-center justify-center text-[#8fa38d] mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-sm uppercase font-mono text-white">
                Passkey Re-Encrypted
              </h3>
              <p className="text-xs text-[#9ca3af]">
                New passkey active. Redirecting to terminal authentication...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Recovery Authorization Code"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="REC-XXXX-XXXX"
                required
              />
              <Input
                label="New Cryptographic Passkey"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                required
              />
              <Input
                label="Confirm New Passkey"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new passkey"
                required
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c] font-medium text-xs py-2.5 rounded-md"
                size="md"
                icon={<Lock className="w-3.5 h-3.5" />}
              >
                Update Access Passkey
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-[#606875] hover:text-[#9cae9b] transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Cancel and Return</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ResetPasswordPage };
export default ResetPasswordPage;
