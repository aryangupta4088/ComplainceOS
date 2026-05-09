import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { getToken, getRole } from "./utils/helpers";

// Pages
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/Calendar";
import DocumentsPage from "./pages/Documents";
import SchemesPage from "./pages/Schemes";
import RegistrationPage from "./pages/Registration";
import CAConnectPage from "./pages/CAConnect";
import LoansPage from "./pages/Loans";
import NoticesPage from "./pages/Notices";
import ProfilePage from "./pages/Profile";
import CADashboard from "./pages/ca/CADashboard";

function ProtectedRoute({ children, caOnly = false }) {
  const token = getToken();
  const role = getRole();

  if (!token) return <Navigate to="/" replace />;
  if (caOnly && role !== "ca") return <Navigate to="/dashboard" replace />;

  return children;
}

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <DocumentsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/schemes"
          element={
            <ProtectedRoute>
              <SchemesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/registration"
          element={
            <ProtectedRoute>
              <RegistrationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ca-connect"
          element={
            <ProtectedRoute>
              <CAConnectPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/loans"
          element={
            <ProtectedRoute>
              <LoansPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notices"
          element={
            <ProtectedRoute>
              <NoticesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ca/dashboard"
          element={
            <ProtectedRoute caOnly>
              <CADashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
