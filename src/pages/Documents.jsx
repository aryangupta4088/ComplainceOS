import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UploadCloud, Sparkles, FileText, CalendarDays, BadgeCheck, FileCheck2, Wand2, Landmark, LayoutGrid, List, MoreVertical } from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Footer } from "../components/layout/Footer";
import DocumentCard from "../components/ui/DocumentCard";
import { Button } from "../components/ui/Common";
import { uploadDocument } from "../services/api";
import { documents as mockDocuments } from "../utils/constants";

const CATEGORIES = [
  ["All Documents", 24, FileText],
  ["GST", 4, CalendarDays],
  ["Udyam", 1, BadgeCheck],
  ["Invoices", 12, FileCheck2],
  ["Licenses", 2, Wand2],
  ["Bank", 5, Landmark],
];

export default function DocumentsPage() {
  const [docs, setDocs] = useState(mockDocuments);
  const [processing, setProcessing] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Documents");
  const [panel, setPanel] = useState(null);
  const fileRef = useRef(null);

  async function handleFile(file) {
    if (!file) return;
    setProcessing(true);
    try {
      const result = await uploadDocument(file);
      setPanel(result.extracted_info ?? result);
      setDocs((prev) => [{ name: file.name, date: "Uploaded just now", status: "PROCESSING", type: "All Documents" }, ...prev]);
    } catch {
      setPanel({ document_type: "GST Certificate", summary: "VEDA extracted key dates and registration numbers." });
    } finally {
      setProcessing(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6">

        {/* Upload zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
          className="border-2 border-dashed border-cs-300 rounded-2xl flex flex-col items-center justify-center py-16 px-6 text-center mb-10 bg-white/50 cursor-pointer hover:border-cs-500 transition-colors"
          onClick={() => fileRef.current.click()}
        >
          <motion.div
            animate={processing ? { rotate: 360 } : { rotate: 0 }}
            transition={processing ? { duration: 1.1, repeat: Infinity, ease: "linear" } : {}}
            className="w-16 h-16 rounded-full bg-cs-100 text-cs-400 flex items-center justify-center mb-4"
          >
            {processing ? <Sparkles size={28} /> : <UploadCloud size={28} />}
          </motion.div>
          <h2 className="text-xl font-bold text-cs-900 mb-1">
            {processing ? "VEDA is scanning..." : "Drop documents here"}
          </h2>
          <p className="text-cs-400 text-sm mb-5">PDF, JPG, PNG supported (Max 10MB)</p>
          <Button variant="primary" size="md" onClick={(e) => { e.stopPropagation(); fileRef.current.click(); }}>
            Select Files
          </Button>
          <input ref={fileRef} hidden type="file" onChange={(e) => handleFile(e.target.files[0])} />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

          {/* Categories */}
          <aside>
            <p className="text-xs font-bold text-cs-500 tracking-widest uppercase mb-3">Document Categories</p>
            <div className="flex flex-col gap-1">
              {CATEGORIES.map(([name, count, Icon]) => (
                <button
                  key={name}
                  onClick={() => setActiveCategory(name)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    activeCategory === name
                      ? "bg-white border border-cs-100 text-cs-900"
                      : "text-cs-500 hover:bg-cs-100 hover:text-cs-700"
                  }`}
                >
                  <Icon size={18} />
                  <span className="flex-1 text-left">{name}</span>
                  <span className="bg-cs-100 text-cs-600 text-xs px-1.5 py-0.5 rounded font-bold">{count}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Doc grid */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-2xl font-bold text-cs-900">Recent Uploads</h1>
              <div className="flex gap-2">
                <button className="p-2 border border-cs-100 rounded-lg text-cs-500 hover:bg-cs-100"><LayoutGrid size={18} /></button>
                <button className="p-2 border border-cs-100 rounded-lg text-cs-500 hover:bg-cs-100"><List size={18} /></button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {docs.map((doc, idx) => (
                <DocumentCard
                  key={`${doc.name}-${idx}`}
                  filename={doc.name}
                  documentType={doc.type}
                  status={doc.status?.toLowerCase()}
                  uploadedAt={doc.date}
                  onView={() => setPanel({ filename: doc.name, status: doc.status })}
                />
              ))}
            </div>
          </section>
        </div>

        {/* VEDA panel */}
        <AnimatePresence>
          {panel && (
            <motion.aside
              initial={{ x: 440, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 440, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="fixed right-5 top-16 bottom-5 w-96 bg-white border border-cs-100 rounded-2xl shadow-xl p-6 z-40 overflow-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-cs-900 text-lg">VEDA Extraction</h2>
                <button onClick={() => setPanel(null)} className="text-cs-400 hover:text-cs-700 text-xl">×</button>
              </div>
              <pre className="bg-cs-50 rounded-xl p-4 text-xs text-cs-700 whitespace-pre-wrap overflow-auto">
                {JSON.stringify(panel, null, 2)}
              </pre>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </DashboardLayout>
  );
}
