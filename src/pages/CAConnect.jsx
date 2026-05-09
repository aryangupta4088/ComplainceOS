import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, ShieldCheck, ChevronDown, Star } from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Footer } from "../components/layout/Footer";
import CACard from "../components/ui/CACard";
import { Button, Modal } from "../components/ui/Common";
import { apiFetch } from "../services/api";
import { caList as mockCAList } from "../utils/constants";

export default function CAConnectPage() {
  const [data, setData] = useState(mockCAList);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    apiFetch("/api/ca/list").then(setData).catch(() => {});
  }, []);

  return (
    <DashboardLayout topbarDark>
      <div className="p-6 max-w-6xl mx-auto">

        {/* Assigned CA banner */}
        <div className="bg-white border border-cs-100 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8">
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-xl bg-cs-800 text-cs-50 flex items-center justify-center font-bold text-2xl">
              DR
            </div>
            <span className="absolute -top-2 -left-2 bg-cs-800 text-cs-50 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-widest">
              YOUR CA
            </span>
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-bold text-cs-900">David S. Richardson, FCA</h1>
            <p className="text-cs-500 text-sm mt-0.5">Enterprise Compliance Lead • 12 Years Experience</p>
            <div className="flex flex-wrap gap-4 mt-3 text-cs-500 text-xs font-medium">
              <span className="flex items-center gap-1.5"><Mail size={13} /> david.r@complianceos.pro</span>
              <span className="flex items-center gap-1.5"><Phone size={13} /> +1 (555) 092-4412</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={13} /> Licensed Practitioner</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:items-end flex-shrink-0">
            <Button variant="primary" size="md" onClick={() => setBooking({ name: "David S. Richardson, FCA" })}>
              Book Consultation
            </Button>
            <Button variant="outline" size="md">View Audit History</Button>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

          {/* Filter panel */}
          <div className="bg-white border border-cs-100 rounded-2xl p-6 self-start">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-cs-900 text-lg">Filters</h2>
              <button className="text-cs-500 text-xs font-semibold hover:text-cs-700">Reset All</button>
            </div>

            <label className="block text-xs font-semibold text-cs-600 tracking-wide mb-1.5">Location</label>
            <div className="flex items-center justify-between border border-cs-200 rounded-lg px-3 py-2.5 text-cs-700 text-sm mb-5">
              Global (All Regions) <ChevronDown size={16} className="text-cs-400" />
            </div>

            <p className="text-xs font-semibold text-cs-600 tracking-wide mb-2">Specialization</p>
            {["Corporate Taxation", "Statutory Audit", "Risk Management", "Mergers & Acquisitions"].map((item, idx) => (
              <label key={item} className="flex items-center gap-2.5 mb-2.5 text-sm text-cs-700 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={idx === 0 || idx === 2}
                  className="accent-cs-800 w-4 h-4"
                />
                {item}
              </label>
            ))}

            <p className="text-xs font-semibold text-cs-600 tracking-wide mt-4 mb-2">Price Range ($/hr)</p>
            <input type="range" min="50" max="1000" defaultValue="500" className="w-full accent-cs-800 mb-1" />
            <div className="flex justify-between text-xs text-cs-400">
              <span>$50</span><span>$1000+</span>
            </div>

            <Button variant="primary" size="md" className="w-full mt-6">Apply Search</Button>
          </div>

          {/* CA grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {data.map((ca) => (
              <CACard
                key={ca.id}
                name={ca.name}
                specializations={ca.tags}
                rating={parseFloat(ca.rating)}
                clientCount={ca.clients}
                pricePerConsultation={ca.price}
                verified
                onBook={() => setBooking(ca)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Booking modal */}
      <Modal isOpen={!!booking} onClose={() => setBooking(null)} title="Book Consultation">
        <p className="text-cs-500 text-sm mb-4">{booking?.name}</p>
        <label className="block text-xs font-semibold text-cs-600 mb-1">Preferred Date</label>
        <input type="date" className="w-full border border-cs-200 rounded-lg px-3 py-2 text-sm mb-3 outline-none focus:border-cs-500" />
        <label className="block text-xs font-semibold text-cs-600 mb-1">Topic</label>
        <input defaultValue="GST and MSME compliance review" className="w-full border border-cs-200 rounded-lg px-3 py-2 text-sm mb-5 outline-none focus:border-cs-500" />
        <Button variant="primary" size="md" className="w-full" onClick={() => setBooking(null)}>
          Confirm Booking
        </Button>
      </Modal>

      <Footer dark />
    </DashboardLayout>
  );
}
