import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, CircleDot, FileText } from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Footer } from "../components/layout/Footer";
import ProgressBar from "../components/ui/ProgressBar";
import StatusBadge from "../components/ui/StatusBadge";
import { Button } from "../components/ui/Common";
import { apiFetch } from "../services/api";
import { registrations } from "../utils/constants";

const iconMap = {
  Complete:    BadgeCheck,
  Pending:     CircleDot,
  "Not Started": FileText,
};

export default function RegistrationPage() {
  const [toast, setToast] = useState(false);
  const [items] = useState(registrations);

  async function schedule(name) {
    try {
      await apiFetch("/api/registration/schedule", {
        method: "POST",
        body: JSON.stringify({ registration_name: name }),
      });
    } catch { /* fallback ok */ }
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  }

  const completed = items.filter((r) => r.status === "Complete").length;
  const pct = Math.round((completed / items.length) * 100);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              className="fixed top-20 right-6 z-50 bg-cs-900 text-cs-50 rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg"
            >
              Portal submission scheduled for 2:00 AM IST
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-cs-500 uppercase mb-2">
            Registration Status
          </p>
          <div className="flex items-end justify-between mb-4">
            <h1 className="text-4xl font-bold text-cs-900 tracking-tight">Compliance Hub</h1>
            <span className="text-cs-500 text-sm font-semibold">
              {completed} of {items.length} registrations complete
            </span>
          </div>
          <ProgressBar value={pct} size="md" animated />
        </div>

        {/* Registration list */}
        <div className="flex flex-col gap-3">
          {items.map((reg, idx) => {
            const Icon = iconMap[reg.status] ?? FileText;
            const borderColor =
              reg.status === "Complete"   ? "border-l-cs-500" :
              reg.status === "Pending"    ? "border-l-cs-700" :
                                           "border-l-cs-900";

            return (
              <motion.div
                key={reg.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.25 }}
                className={`bg-white border border-cs-100 border-l-4 ${borderColor} rounded-xl px-5 py-4 flex items-center gap-4`}
              >
                {/* Icon */}
                <div className="w-9 h-9 rounded-full bg-cs-100 flex items-center justify-center text-cs-500 flex-shrink-0">
                  <Icon size={16} />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-cs-900 text-sm">{reg.name}</p>
                  <p className="text-cs-400 text-xs mt-0.5">Portal: {reg.portal}</p>
                </div>

                {/* Status badge */}
                <StatusBadge status={reg.status} size="sm" />

                {/* Action */}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => schedule(reg.name)}
                  className="flex-shrink-0"
                >
                  {reg.status === "Not Started" ? "Complete Now" : "Visit Portal"}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Footer dark />
    </DashboardLayout>
  );
}
