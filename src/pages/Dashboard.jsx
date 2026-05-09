import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import {
  FileText, Users, Landmark, PiggyBank, Folder,
  Sparkles, Bell, ChevronDown,
} from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { SentinelAlert } from "../components/agents/SENTINELAlert";
import MetricCard from "../components/ui/MetricCard";
import ProgressBar from "../components/ui/ProgressBar";
import { apiFetch } from "../services/api";
import { dashboardSummary } from "../utils/constants";

const container = { animate: { transition: { staggerChildren: 0.07 } } };

export default function Dashboard() {
  const [data, setData] = useState(dashboardSummary);

  useEffect(() => {
    apiFetch("/api/dashboard/summary").then(setData).catch(() => {});
  }, []);

  return (
    <DashboardLayout>
      <SentinelAlert />

      <div className="p-8">
        {/* Metric cards */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
          variants={container}
          initial="initial"
          animate="animate"
        >
          {data.metrics.map((m) => (
            <MetricCard
              key={m.label}
              title={m.label}
              value={m.value}
              subtitle={m.badge}
              icon={<Landmark size={18} />}
              trend={m.danger ? "down" : "up"}
              trendValue={m.badge}
            />
          ))}
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-6">

          {/* Chart */}
          <div className="bg-white border border-cs-100 rounded-2xl p-6 min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-cs-900 text-lg">Compliance Overview</h2>
              <button className="flex items-center gap-1.5 border border-cs-200 rounded-lg px-3 py-1.5 text-sm text-cs-600">
                Last 6 Months <ChevronDown size={14} />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data.chart}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#89a0a9", fontSize: 11 }} />
                <Tooltip cursor={{ fill: "rgba(107,136,148,0.08)" }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#6b8894" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tools */}
          <div className="bg-white border border-cs-100 rounded-2xl p-6">
            <h2 className="font-bold text-cs-900 text-lg mb-5">Tools</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                [FileText, "GST"], [Users, "Labour"],
                [Landmark, "Schemes"], [PiggyBank, "Loans"],
                [Folder, "Docs"], [Users, "CA"],
                [Sparkles, "Register"], [Bell, "Alerts"],
              ].map(([Icon, label]) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.06 }}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-cs-100 flex items-center justify-center text-cs-600">
                    <Icon size={20} />
                  </div>
                  <span className="text-cs-600 text-xs font-semibold">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Savings */}
          <div className="bg-white border border-cs-100 rounded-2xl p-6">
            <h2 className="font-bold text-cs-900 text-lg mb-5">Savings Tracker</h2>
            <div className="flex flex-col gap-4">
              {[["MSME Subsidies", 75], ["Tax Credits", 42], ["Export Incentives", 90], ["Tech Grants", 15]].map(([label, val]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-cs-600 font-medium">{label}</span>
                    <span className="text-cs-700 font-bold">{val}%</span>
                  </div>
                  <ProgressBar value={val} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Notices */}
          <div className="bg-white border border-cs-100 rounded-2xl p-6">
            <h2 className="font-bold text-cs-900 text-lg mb-4">Notice Board</h2>
            {[
              ["GST R1 Filing Period", "Due in 2 days", "URGENT"],
              ["Audit Documentation", "Pending CA approval", "PENDING"],
              ["Policy Update: Labour", "Review required by EOM", "NEW"],
            ].map(([title, desc, tag]) => (
              <div key={title} className="border-l-4 border-cs-500 pl-4 py-3 border-b border-b-cs-100 last:border-b-0 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-cs-900 text-sm">{title}</p>
                  <p className="text-cs-400 text-xs">{desc}</p>
                </div>
                <span className="bg-cs-100 text-cs-600 text-xs font-bold px-2 py-0.5 rounded">{tag}</span>
              </div>
            ))}
          </div>

          {/* Events */}
          <div className="bg-white border border-cs-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-cs-900 text-lg">Upcoming Events</h2>
              <NavLink to="/calendar" className="text-cs-500 text-xs font-semibold hover:text-cs-700">
                View Calendar
              </NavLink>
            </div>
            {[
              ["09:30 AM", "Quarterly Tax Review", "Microsoft Teams"],
              ["14:00 PM", "Labour Compliance Sync", "Conference Room 4B"],
              ["16:30 PM", "Document Finalization", "Self-assigned"],
            ].map(([time, title, place]) => (
              <div key={title} className="grid grid-cols-[70px_1fr] gap-3 mb-3">
                <span className="text-cs-500 text-xs font-bold pt-0.5">{time}</span>
                <div className="bg-cs-50 border-l-2 border-cs-900 rounded-lg px-3 py-2">
                  <p className="font-semibold text-cs-900 text-xs">{title}</p>
                  <p className="text-cs-400 text-xs">{place}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CA mini */}
          <div className="bg-white border border-cs-100 rounded-2xl p-6 text-center flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-cs-200 flex items-center justify-center font-bold text-cs-800 text-xl">SJ</div>
            <div>
              <p className="font-bold text-cs-900">Sarah Jenkins, FCA</p>
              <p className="text-cs-500 text-xs">Principal Compliance Partner</p>
            </div>
            <motion.button whileTap={{ scale: 0.97 }} className="w-full bg-cs-800 text-cs-50 rounded-lg py-2 text-sm font-semibold">
              Book Consultation
            </motion.button>
            <motion.button whileTap={{ scale: 0.97 }} className="w-full border border-cs-200 text-cs-700 rounded-lg py-2 text-sm font-semibold">
              Send Message
            </motion.button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
