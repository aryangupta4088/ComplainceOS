import React, { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Footer } from "../components/layout/Footer";
import LoanCard from "../components/ui/LoanCard";
import ProgressBar from "../components/ui/ProgressBar";
import { Button } from "../components/ui/Common";
import { apiFetch } from "../services/api";
import { loans as mockLoans, banks as mockBanks } from "../utils/constants";

const eligibilityTypeMap = { high: "msme", medium: "women", low: "startup" };

export default function LoansPage() {
  const [loanData, setLoanData] = useState(mockLoans);
  const [bankData, setBankData] = useState(mockBanks);

  useEffect(() => {
    apiFetch("/api/loans/recommended")
      .then((json) => {
        if (Array.isArray(json)) setLoanData(json);
        else if (json.loans) { setLoanData(json.loans); if (json.banks) setBankData(json.banks); }
      })
      .catch(() => {});
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">

        {/* Credit health card */}
        <div className="bg-white border border-cs-100 rounded-2xl p-6 mb-8">
          <p className="text-xs font-bold tracking-widest text-cs-500 uppercase mb-2">Current Credit Health</p>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-cs-900 tracking-tight">
              Your Loan Eligibility Score: <span>82%</span>
            </h1>
            <span className="text-cs-500 text-sm font-semibold flex items-center gap-1">
              ↗ Excellent Standing
            </span>
          </div>
          <ProgressBar value={82} size="md" animated />
          <div className="flex justify-between mt-2 text-xs text-cs-400">
            <span>Threshold: 60%</span>
            <span>Max Potential: 100%</span>
          </div>
        </div>

        {/* Loan grid header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-cs-900">Recommended Credit Schemes</h2>
          <button className="flex items-center gap-2 text-cs-500 text-xs font-bold tracking-widest hover:text-cs-700 transition-colors">
            FILTER SCHEMES <SlidersHorizontal size={14} />
          </button>
        </div>

        {/* Loan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {loanData.map((loan) => (
            <LoanCard
              key={loan.title}
              schemeName={loan.title}
              maxAmount={loan.amount}
              eligibilityScore={
                loan.score?.includes("HIGH") ? 85 :
                loan.score?.includes("MEDIUM") ? 60 : 40
              }
              interestRate={loan.rate}
              schemeType="msme"
            />
          ))}
        </div>

        {/* Best banks */}
        <div className="bg-cs-900 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-cs-50 mb-1">Best Banks for Your Business</h2>
          <p className="text-cs-400 text-sm mb-8">Selected financial partners based on your compliance score.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bankData.map((bank) => (
              <div key={bank.name} className="bg-cs-800 border border-cs-700 rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-cs-50 text-base">{bank.name}</h3>
                </div>
                <div>
                  <p className="text-cs-500 text-xs font-bold tracking-widest uppercase mb-1">Recommended Account</p>
                  <p className="text-cs-200 font-semibold text-sm">{bank.account}</p>
                </div>
                <div>
                  <p className="text-cs-500 text-xs font-bold tracking-widest uppercase mb-1">Primary Benefit</p>
                  <p className="text-cs-300 text-sm leading-snug">{bank.benefit}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full !border-cs-600 !text-cs-200 hover:!bg-cs-700 mt-auto">
                  Open Account
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </DashboardLayout>
  );
}
