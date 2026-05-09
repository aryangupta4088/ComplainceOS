import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, Shield, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Footer } from "../components/layout/Footer";
import SchemeCard from "../components/ui/SchemeCard";
import { Button, Modal } from "../components/ui/Common";
import { apiFetch } from "../services/api";
import { schemes as mockSchemes } from "../utils/constants";

const FILTERS = ["All", "Central", "State", "Women", "Loans", "Grants"];

export default function SchemesPage() {
  const [data, setData] = useState(mockSchemes);
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalScheme, setModalScheme] = useState(null);

  useEffect(() => {
    apiFetch("/api/schemes/recommended").then(setData).catch(() => {});
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">

        {/* Filter bar */}
        <div className="bg-white border border-cs-100 rounded-2xl px-5 py-4 flex items-center gap-3 mb-8 flex-wrap">
          {FILTERS.map((f) => (
            <motion.button
              key={f}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeFilter === f
                  ? "bg-cs-900 text-cs-50"
                  : "bg-cs-100 text-cs-600 hover:bg-cs-200"
              }`}
            >
              {f}
            </motion.button>
          ))}
          <button className="ml-auto flex items-center gap-2 text-cs-500 text-xs font-bold tracking-widest">
            <Filter size={14} /> Advanced Filter
          </button>
        </div>

        {/* Layout: status board + scheme grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

          {/* Status board */}
          <div className="self-start">
            <div className="bg-white border border-cs-100 rounded-2xl p-5">
              <h2 className="font-bold text-cs-900 text-xl mb-4">Status Board</h2>

              {[
                ["ENROLLED", "12", CheckCircle2],
                ["APPLIED",  "05", Shield],
                ["ELIGIBLE", "28", Shield],
              ].map(([label, value, Icon]) => (
                <div key={label} className="border border-cs-100 rounded-xl p-4 mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-cs-500 tracking-widest">{label}</p>
                    <p className="text-3xl font-bold text-cs-900 mt-1">{value}</p>
                  </div>
                  <Icon size={20} className="text-cs-400" />
                </div>
              ))}

              <div className="bg-cs-900 rounded-xl p-4 mt-2">
                <p className="text-cs-400 text-xs font-bold tracking-widest">Next Audit Deadline</p>
                <p className="text-cs-50 font-bold text-2xl mt-1 leading-tight">Oct 24, 2024</p>
                <Button variant="secondary" size="sm" className="mt-3 w-full !bg-white/10 !text-cs-50 hover:!bg-white/20">
                  View Compliance Roadmap
                </Button>
              </div>
            </div>
          </div>

          {/* Scheme grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {data.map((scheme) => (
              <SchemeCard
                key={scheme.scheme_name}
                schemeName={scheme.scheme_name}
                schemeType={scheme.scheme_type}
                maxBenefit={scheme.max_benefit}
                matchScore={scheme.eligibility_match_score}
                whyEligible={scheme.why_eligible}
                isWomenSpecific={scheme.scheme_name?.toLowerCase().includes("women") || scheme.scheme_name?.toLowerCase().includes("mahila")}
                status="eligible"
                onApply={() => setModalScheme(scheme)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Apply modal */}
      <Modal isOpen={!!modalScheme} onClose={() => setModalScheme(null)} title="Pre-filled Application">
        <p className="text-cs-500 text-sm mb-4">{modalScheme?.scheme_name}</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[["Business Name", "Kumar Textiles"], ["GSTIN", "27ABCDE1234F1Z5"], ["State", "Maharashtra"], ["Requested Benefit", modalScheme?.max_benefit ?? ""]].map(([lbl, val]) => (
            <label key={lbl} className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-cs-600">{lbl}</span>
              <input defaultValue={val} className="border border-cs-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-cs-500" />
            </label>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-cs-50 rounded-lg p-3 mb-4 text-cs-700 text-sm font-medium">
          <CheckCircle2 size={16} className="text-cs-500" />
          CA verification required before final submission.
        </div>
        <Button variant="primary" size="md" className="w-full" onClick={() => setModalScheme(null)}>
          Send to CA for Verification
        </Button>
      </Modal>

      <Footer dark />
    </DashboardLayout>
  );
}
