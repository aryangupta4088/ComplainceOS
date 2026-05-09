import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Gauge, FileCheck2, Wand2, Users, Bell } from "lucide-react";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/Common";
import { setToken, setRole, setUserId } from "../utils/helpers";

const features = [
  { icon: Gauge,      title: "Real-time Monitoring",  desc: "Continuous oversight of your entire regulatory landscape." },
  { icon: FileCheck2, title: "Audit Readiness",        desc: "100% prepared with automated document gathering and history logs." },
  { icon: Wand2,      title: "Multi-scheme Support",   desc: "GST, MSME, Udyam, labour, credit and subsidy workflows in one place." },
  { icon: Users,      title: "Expert Connect",          desc: "On-demand CA and compliance experts to guide your next action." },
  { icon: Bell,       title: "Automated Alerts",        desc: "Smart notifications highlighting only the critical compliance risks." },
];

export default function Landing() {
  const navigate = useNavigate();

  function loginDemo() {
    setToken("demo-business-token");
    setRole("business_owner");
    setUserId("demo-user");
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-cs-50">
      {/* Nav */}
      <nav className="h-14 bg-white border-b border-cs-100 flex items-center justify-between px-8">
        <span className="font-extrabold text-cs-900 text-lg tracking-tight">ComplianceOS</span>
        <div className="hidden md:flex items-center gap-8 text-cs-500 text-sm font-medium">
          <a className="hover:text-cs-900 cursor-pointer">Features</a>
          <a className="hover:text-cs-900 cursor-pointer">How it Works</a>
          <a className="hover:text-cs-900 cursor-pointer">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loginDemo} className="text-cs-600 text-sm font-semibold hover:text-cs-900 transition-colors">Log In</button>
          <Button variant="primary" size="sm" onClick={() => navigate("/onboarding")}>Get Started</Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-cs-900 text-cs-50 text-center px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none mx-auto max-w-5xl mb-6"
        >
          Automate your compliance roadmap.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-cs-300 text-lg max-w-xl mx-auto mb-10"
        >
          Precision in regulation. Effortless for teams. Centralize governance, compliance, schemes, and audit readiness.
        </motion.p>
        <div className="flex gap-4 justify-center">
          <Button variant="secondary" size="lg" onClick={() => navigate("/onboarding")}>Get Started</Button>
          <Button variant="outline" size="lg" className="!border-cs-600 !text-cs-200 hover:!bg-cs-800">Watch Demo</Button>
        </div>

        {/* Mock browser */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 max-w-3xl mx-auto bg-cs-50 rounded-t-xl overflow-hidden"
        >
          <div className="flex gap-1.5 p-3 bg-cs-100">
            <span className="w-2.5 h-2.5 rounded-full bg-cs-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-cs-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-cs-300" />
          </div>
          <div className="h-48 bg-gradient-to-br from-cs-700 to-cs-400 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-3 w-72 rotate-[-6deg]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`bg-white rounded-lg h-16 opacity-80 ${i === 0 || i === 3 ? "col-span-2" : ""}`} />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16 flex justify-center gap-24 flex-wrap">
        {[["128+","Compliances Covered"],["31+","Schemes Matched"],["₹4.2M+","Saved in Audits"]].map(([n,l]) => (
          <div key={n} className="text-center">
            <p className="text-4xl font-extrabold text-cs-900 tracking-tight">{n}</p>
            <p className="text-cs-500 text-sm mt-1">{l}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-cs-50 text-center">
        <p className="text-xs font-bold tracking-widest text-cs-500 uppercase mb-2">Capabilities</p>
        <h2 className="text-3xl font-bold text-cs-900 mb-12">Engineered for precision.</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {features.map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-cs-100 rounded-2xl p-6"
            >
              <div className="w-9 h-9 rounded-full bg-cs-100 flex items-center justify-center text-cs-600 mb-4">
                <f.icon size={18} />
              </div>
              <h3 className="font-bold text-cs-900 text-base mb-1">{f.title}</h3>
              <p className="text-cs-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-cs-900 mb-3">The Implementation Path</h2>
        <p className="text-cs-400 text-sm mb-14">Three steps to operational mastery.</p>
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-10 justify-center">
          {[["1","CONNECT","Link your GST, MSME and document sources."],["2","AUTOMATE","Agents map your systems to regulations."],["3","REPORT","Generate audit-ready reports instantly."]].map(([num,title,desc]) => (
            <div key={num} className="flex-1 flex flex-col items-center">
              <div className="w-9 h-9 rounded-lg bg-cs-900 text-cs-50 flex items-center justify-center font-bold text-sm mb-4">{num}</div>
              <p className="font-bold text-cs-900 text-xs tracking-widest mb-2">{title}</p>
              <p className="text-cs-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-cs-50">
        <h2 className="text-3xl font-bold text-cs-900 text-center mb-12">Predictable scale.</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[["FREE","$0",["1 Scheme","Up to 5 integrations","Standard Support"],false],
            ["GROWTH","$49",["All Schemes","Unlimited Integrations","Real-time Monitoring","Priority Support"],true],
            ["PRO","Custom",["Multiple Entities","White-glove Onboarding","Dedicated Success Manager"],false]
          ].map(([name,price,items,featured]) => (
            <motion.div
              key={name}
              whileHover={{ scale: 1.02 }}
              className={`bg-white border rounded-2xl p-6 relative ${featured ? "border-cs-800 shadow-lg" : "border-cs-100"}`}
            >
              {featured && <span className="absolute top-0 right-0 bg-cs-800 text-cs-50 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">MOST POPULAR</span>}
              <p className="text-xs font-bold text-cs-500 tracking-widest mb-1">{name}</p>
              <p className="text-4xl font-extrabold text-cs-900 tracking-tight mb-5">{price}<span className="text-base font-normal text-cs-500">{name==="GROWTH" ? "/mo" : ""}</span></p>
              <ul className="text-cs-600 text-sm space-y-2 mb-6">
                {items.map((i) => <li key={i}>✓ {i}</li>)}
              </ul>
              <Button variant={featured ? "primary" : "outline"} size="md" className="w-full">
                {name === "PRO" ? "Contact Sales" : name === "GROWTH" ? "Upgrade Now" : "Start Free"}
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer dark />
    </div>
  );
}
