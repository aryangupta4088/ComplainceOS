import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/Common";
import MetricCard from "../../components/ui/MetricCard";
import StatusBadge from "../../components/ui/StatusBadge";
import { deadlines, documents as mockDocuments } from "../../utils/constants";
import { FileText, Landmark, Users, PiggyBank } from "lucide-react";

const CLIENTS = [
  { name: "Kumar Textiles", urgency: "high" },
  { name: "Raj Foods",      urgency: "medium" },
  { name: "Mehta Traders",  urgency: "low" },
];

const urgencyDot = { high: "bg-red-500", medium: "bg-amber-400", low: "bg-green-500" };

export default function CADashboard() {
  const [selected, setSelected] = useState(CLIENTS[0]);

  return (
    <div className="flex min-h-screen bg-cs-50">
      {/* Dark sidebar */}
      <aside className="w-52 bg-cs-900 text-cs-50 flex flex-col px-5 py-7 flex-shrink-0">
        <h1 className="font-bold text-base tracking-tight mb-0.5">ComplianceOS CA</h1>
        <p className="text-cs-500 text-xs mb-8">Client Control Room</p>

        <div className="flex flex-col gap-1.5 flex-1">
          {CLIENTS.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelected(c)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                selected.name === c.name ? "bg-cs-800" : "hover:bg-cs-800/50"
              }`}
            >
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${urgencyDot[c.urgency]}`} />
              {c.name}
            </button>
          ))}
        </div>

        <Button variant="secondary" size="sm" className="w-full mt-8">New Review</Button>
      </aside>

      {/* Main workspace */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="text-3xl font-bold text-cs-900 tracking-tight">{selected.name}</h1>
            <p className="text-cs-400 text-sm mt-0.5">Compliance workspace and approvals</p>
          </div>
          <Button variant="primary" size="md">Generate Report</Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
          {[
            ["OPEN DEADLINES","04",FileText],
            ["DOCS PENDING","09",FileText],
            ["SCHEMES","06",Landmark],
            ["RISK SCORE","LOW",Users],
          ].map(([title, value, Icon]) => (
            <MetricCard key={title} title={title} value={value} icon={<Icon size={16} />} />
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div className="bg-white border border-cs-100 rounded-2xl p-5">
            <h2 className="font-bold text-cs-900 text-base mb-4">Compliance Calendar</h2>
            {deadlines.slice(0, 4).map((d) => (
              <div key={d.id} className="flex items-center justify-between py-3 border-b border-cs-100 last:border-0">
                <div>
                  <p className="font-semibold text-cs-900 text-sm">{d.title}</p>
                  <p className="text-cs-400 text-xs">{d.deadline_date}</p>
                </div>
                <StatusBadge status={d.urgency === "high" ? "overdue" : "pending"} size="sm" />
              </div>
            ))}
          </div>

          <div className="bg-white border border-cs-100 rounded-2xl p-5">
            <h2 className="font-bold text-cs-900 text-base mb-4">Document List</h2>
            {mockDocuments.slice(0, 4).map((doc) => (
              <div key={doc.name} className="flex items-center justify-between py-3 border-b border-cs-100 last:border-0">
                <div>
                  <p className="font-semibold text-cs-900 text-sm truncate max-w-[180px]">{doc.name}</p>
                  <StatusBadge status={doc.status?.toLowerCase()} size="sm" />
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm">Approve</Button>
                  <Button variant="outline" size="sm">Flag</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Approval queue */}
        <div className="bg-white border border-cs-100 rounded-2xl p-5">
          <h2 className="font-bold text-cs-900 text-base mb-4">Pending Approvals Queue</h2>
          {["Scheme application review","GST filing approval","Loan documentation review"].map((item) => (
            <div key={item} className="flex items-center justify-between py-3 border-b border-cs-100 last:border-0">
              <p className="font-semibold text-cs-900 text-sm">{item}</p>
              <Button variant="primary" size="sm">Review</Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
