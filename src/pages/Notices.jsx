import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Footer } from "../components/layout/Footer";
import NoticeRow from "../components/ui/NoticeRow";
import FreelancerCard from "../components/ui/FreelancerCard";
import { Button } from "../components/ui/Common";
import { apiFetch } from "../services/api";
import { getUserId } from "../utils/helpers";
import { notifications, freelancers } from "../utils/constants";

const NOTICE_TABS = ["All", "Urgent", "Deadlines", "Schemes", "Regulatory"];
const FREELANCER_PILLS = ["ALL", "CA & ACCOUNTANT", "WEB DEVELOPER", "LEGAL ADVISOR", "GST EXPERT", "DESIGNER"];

export default function NoticesPage() {
  const userId = getUserId();
  const [noticeData, setNoticeData] = useState(notifications);
  const [freelancerData, setFreelancerData] = useState(freelancers);
  const [activeTab, setActiveTab] = useState("All");
  const [activePill, setActivePill] = useState("ALL");

  useEffect(() => {
    apiFetch(`/api/notifications/${userId}`).then(setNoticeData).catch(() => {});
    apiFetch("/api/freelancers/list").then(setFreelancerData).catch(() => {});
  }, [userId]);

  const urgencyMap = {
    urgent: "high",
    medium: "medium",
    scheme: "low",
    regulatory: "info",
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-5xl mx-auto">

        {/* Heading */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-cs-900 tracking-tight">Notices & Alerts</h1>
            <p className="text-cs-400 text-sm mt-1">Stay updated on deadlines and regulations</p>
          </div>

          {/* Tab filter */}
          <div className="flex items-center bg-cs-800 rounded-full p-0.5 gap-0.5">
            {NOTICE_TABS.map((tab) => (
              <motion.button
                key={tab}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeTab === tab
                    ? "bg-cs-50 text-cs-900"
                    : "text-cs-300 hover:text-cs-50"
                }`}
              >
                {tab}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Notice list */}
        <div className="flex flex-col gap-3 mb-16">
          {noticeData.map((notice) => (
            <NoticeRow
              key={notice.id}
              title={notice.title}
              description={notice.message}
              urgency={urgencyMap[notice.urgency] ?? "info"}
              source={notice.source}
              actionLabel={notice.action}
              isSentinel={notice.source === "SENTINEL"}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <span className="flex-1 h-px bg-cs-100" />
          <p className="text-cs-400 text-xs font-bold tracking-widest">NEED PROFESSIONAL HELP?</p>
          <span className="flex-1 h-px bg-cs-100" />
        </div>

        {/* Connect with Experts */}
        <div>
          <h2 className="text-2xl font-bold text-cs-900 tracking-tight">Connect with Experts</h2>
          <p className="text-cs-400 text-sm mt-1 mb-5">Vetted professionals for your business needs</p>

          {/* Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {FREELANCER_PILLS.map((pill) => (
              <motion.button
                key={pill}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActivePill(pill)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide border transition-colors ${
                  activePill === pill
                    ? "bg-cs-900 text-cs-50 border-cs-900"
                    : "bg-white text-cs-600 border-cs-200 hover:border-cs-400"
                }`}
              >
                {pill}
              </motion.button>
            ))}
          </div>

          {/* Freelancer grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {freelancerData.map((f) => (
              <FreelancerCard
                key={f.name}
                name={f.name}
                specialization={f.role}
                skills={f.tags}
                rating={parseFloat(f.rating)}
                projectsCompleted={f.meta}
                startingPrice={f.price?.replace("₹", "")}
                verified
              />
            ))}
          </div>
        </div>
      </div>

      <Footer dark />
    </DashboardLayout>
  );
}
