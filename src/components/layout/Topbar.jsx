import React from "react";
import { NavLink } from "react-router-dom";
import { Search, Bell, HelpCircle } from "lucide-react";

export function Topbar({ dark = false }) {
  return (
    <header
      className={`h-14 flex items-center justify-between px-6 border-b ${
        dark
          ? "bg-cs-900 border-cs-800 text-cs-50"
          : "bg-white border-cs-100 text-cs-900"
      }`}
    >
      {/* Brand */}
      <NavLink
        to="/dashboard"
        className="font-extrabold text-lg tracking-tight"
      >
        ComplianceOS
      </NavLink>

      {/* Center links */}
      <div className={`hidden md:flex items-center gap-6 text-sm font-medium ${dark ? "text-cs-300" : "text-cs-500"}`}>
        <NavLink to="/notices" className="hover:text-cs-900 transition-colors">Marketplace</NavLink>
        <NavLink to="/calendar" className="hover:text-cs-900 transition-colors">Calendar</NavLink>
        <NavLink to="/documents" className="hover:text-cs-900 transition-colors">Document Vault</NavLink>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-2 rounded-full px-4 h-8 text-sm ${dark ? "bg-cs-800 text-cs-300" : "bg-cs-50 text-cs-400"}`}>
          <Search size={14} />
          <input
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-32 placeholder:text-cs-400"
          />
        </div>
        <Bell size={18} className={dark ? "text-cs-300" : "text-cs-500"} />
        <HelpCircle size={18} className={dark ? "text-cs-300" : "text-cs-500"} />
        <div className="w-8 h-8 rounded-full bg-cs-200 flex items-center justify-center text-xs font-bold text-cs-800">
          JD
        </div>
      </div>
    </header>
  );
}
