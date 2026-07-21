"use client";
import axios from "axios";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardClient = ({ ownerId }: { ownerId: string }) => {
  const [businessName, setBusinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSettings = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/settings", {
        ownerId,
        businessName,
        supportEmail,
        knowledge,
      });
      console.log("Settings saved:", result.data);

      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Save settings error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ownerId) {
      const handleGetDetails = async () => {
        try {
          const result = await axios.post("/api/settings/get", {
            ownerId,
          });
          setBusinessName(result.data.businessName);
          setSupportEmail(result.data.supportEmail);
          setKnowledge(result.data.knowledge);
        } catch (error) {
          console.error("get settings error:", error);
        }
      };
      handleGetDetails();
    }
  }, [ownerId]);

  const navigate = useRouter();
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-sm border-b border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            onClick={() => navigate.push("/")}
            className="text-lg font-semibold tracking-tight"
          >
            Support <span className="text-zinc-500">AI</span>
          </div>
          <button
            onClick={() => navigate.push("/embed")}
            className="px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition font-medium"
          >
            Embed ChatBot
          </button>
        </div>
      </motion.div>

      <div className="flex justify-center px-4 py-14 mt-20">
        <motion.div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10">
          <div className="mb-10">
            <h1 className="text-2xl font-semibold">ChatBot Settings</h1>
            <p className="text-zinc-500 mt-1">
              Manage your AI knowledge and business details
            </p>
          </div>
          <div className="mb-10">
            <h1 className="text-lg font-medium mb-4">Business Details</h1>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80 transition-all duration-400"
              />
              <input
                type="text"
                placeholder="Support Email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80 transition-all duration-400"
              />
            </div>
          </div>
          <div className="mb-10">
            <h1 className="text-lg font-medium mb-4">Knowledge base</h1>
            <p className="text-sm text-zinc-500 mb-4">
              Add FAQs, policies, delivery, info, refunds, etc.
            </p>
            <div className="space-y-4">
              <textarea
                className="w-full h-40 rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80 transition-all duration-400"
                onChange={(e) => setKnowledge(e.target.value)}
                value={knowledge}
                placeholder={`Example:
• Refund policy: 7 days return available
• Delivery time: 3-5 working days
• Cash on Delivery available
• Support hours`}
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60"
              onClick={handleSettings}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </motion.button>
            {saved && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-medium text-emerald-600"
              >
                ✅ Settings saved
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardClient;
