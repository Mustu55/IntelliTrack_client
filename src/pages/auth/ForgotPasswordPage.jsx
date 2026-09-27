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
          Passkey Recovery Challenge
        </h2>
        <p className="mt-1 text-xs text-[#9ca3af]">
          Cryptographic token and emergency credential challenge
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
                Challenge Dispatched
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                A one-time emergency reactivation link has been sent to your verified agency email terminal.
              </p>
              <Button
                variant="primary"
                size="md"
                className="w-full mt-4 bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c]"
                onClick={() => navigate("/reset-password")}
              >
                Proceed to Passkey Reset →
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Registered Badge #"
                value={badgeNumber}
                onChange={(e) => setBadgeNumber(e.target.value)}
                placeholder="e.g. FBI-89412"
                required
              />
              <Input
                label="Agency Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m.vance@intellitrack.gov"
                required
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full bg-[#9cae9b] text-[#0d130e] hover:bg-[#8da08c] font-medium text-xs py-2.5 rounded-md"
                size="md"
                icon={<KeyRound className="w-3.5 h-3.5" />}
              >
                Dispatch Recovery Challenge
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-[#606875] hover:text-[#9cae9b] transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Terminal Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ForgotPasswordPage };
export default ForgotPasswordPage;
