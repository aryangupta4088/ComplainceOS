import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Button } from "../components/ui/Common";
import { apiFetch } from "../services/api";

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);

  async function save(e) {
    e.preventDefault();
    try {
      await apiFetch("/api/business/profile", {
        method: "PATCH",
        body: JSON.stringify({ business_name: "Kumar Textiles", state: "Maharashtra" }),
      });
    } catch { /* fallback */ }
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-5xl mx-auto">
        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              className="fixed top-20 right-6 z-50 bg-cs-900 text-cs-50 rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg"
            >
              Profile saved successfully
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="bg-white border border-cs-100 rounded-2xl p-6 self-start">
            <div className="w-20 h-20 rounded-full bg-cs-800 text-cs-50 flex items-center justify-center font-bold text-2xl mb-4">
              KT
            </div>
            <h2 className="font-bold text-cs-900 text-lg">Kumar Textiles</h2>
            <p className="text-cs-500 text-sm">MSME Manufacturer</p>
            <span className="inline-block mt-3 bg-cs-100 text-cs-700 text-xs font-semibold px-3 py-1 rounded-full">Growth Tier</span>
            <span className="inline-block mt-2 bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">Women Entrepreneur Benefits Active</span>
            <hr className="border-cs-100 my-4" />
            <div className="flex flex-col gap-2 text-sm">
              {[["GSTIN","27ABCDE1234F1Z5"],["Udyam","UDYAM-MH-12-0000001"],["State","Maharashtra"]].map(([label, val]) => (
                <div key={label}>
                  <p className="text-cs-400 text-xs">{label}</p>
                  <p className="font-semibold text-cs-900">{val}</p>
                </div>
              ))}
            </div>
          </aside>

          {/* Form */}
          <form onSubmit={save} className="flex flex-col gap-5">
            <div className="bg-white border border-cs-100 rounded-2xl p-6">
              <h2 className="font-bold text-cs-900 text-lg mb-5">Business Settings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[["Business Name","Kumar Textiles"],["Business Type","Manufacturing"],["Sector","Textiles"],["State","Maharashtra"],["District","Mumbai"],["Turnover Range","₹50L - ₹1Cr"]].map(([label, val]) => (
                  <label key={label} className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-cs-600">{label}</span>
                    <input defaultValue={val} className="border border-cs-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-cs-500 transition-colors" />
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white border border-cs-100 rounded-2xl p-6">
              <h2 className="font-bold text-cs-900 text-lg mb-5">Compliance Identifiers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[["GSTIN","27ABCDE1234F1Z5"],["PAN","ABCDE1234F"],["Udyam Number","UDYAM-MH-12-0000001"]].map(([label, val]) => (
                  <label key={label} className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-cs-600">{label}</span>
                    <input defaultValue={val} className="border border-cs-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-cs-500 transition-colors" />
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white border border-cs-100 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-cs-900 text-lg">Billing</h2>
                <p className="text-cs-500 text-sm">Current tier: Growth</p>
              </div>
              <Button variant="primary" size="md" type="button">Upgrade to Pro</Button>
            </div>

            <Button variant="primary" size="lg" type="submit" className="self-start">
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
