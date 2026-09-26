import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { CockpitLayout } from "@/components/layout/CockpitLayout";
import { LandingPage } from "@/pages/public/LandingPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { SignupPage } from "@/pages/auth/SignupPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import { OtpVerificationPage } from "@/pages/auth/OtpVerificationPage";
import { CockpitDashboardPage } from "@/pages/dashboard/CockpitDashboardPage";
import { CasesListPage } from "@/pages/cases/CasesListPage";
import { CaseCockpitPage } from "@/pages/cases/CaseCockpitPage";
import { DataSourcesPage } from "@/pages/data/DataSourcesPage";
import { ExtractionJobsPage } from "@/pages/data/ExtractionJobsPage";
import { SchemaViewerPage } from "@/pages/data/SchemaViewerPage";
import { EntitiesListPage } from "@/pages/entities/EntitiesListPage";
import { EntityProfilePage } from "@/pages/entities/EntityProfilePage";
import { EntityResolutionWorkbenchPage } from "@/pages/entities/EntityResolutionWorkbenchPage";
import { NetworkGraphPage } from "@/pages/network/NetworkGraphPage";
import { GeoTemporalMapPage } from "@/pages/geo/GeoTemporalMapPage";
import { EventTimelinePage } from "@/pages/geo/EventTimelinePage";
import { PatternsPage } from "@/pages/geo/PatternsPage";
import { LeadsPrioritizationPage } from "@/pages/leads/LeadsPrioritizationPage";
import { IntelligenceSummaryPage } from "@/pages/leads/IntelligenceSummaryPage";
import { EvidenceTraceabilityPage } from "@/pages/evidence/EvidenceTraceabilityPage";
import { IntelligenceReportsPage } from "@/pages/reports/IntelligenceReportsPage";
import { GeneralSettingsPage } from "@/pages/settings/GeneralSettingsPage";
import { IntegrationsPage } from "@/pages/settings/IntegrationsPage";
import { SchemaSettingsPage } from "@/pages/settings/SchemaSettingsPage";
import { UsersManagementPage } from "@/pages/settings/UsersManagementPage";
import { NotificationsPage } from "@/pages/notifications/NotificationsPage";
import { UserProfilePage } from "@/pages/profile/UserProfilePage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/landing" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/otp-verify" element={<OtpVerificationPage />} />

      {/* Authenticated Dashboard / Application Routes */}
      <Route
        element={
          <ProtectedRoute>
            <CockpitLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<CockpitDashboardPage />} />
        <Route path="/overview" element={<CockpitDashboardPage />} />
        <Route path="/cases" element={<CasesListPage />} />
        <Route path="/cases/:id" element={<CaseCockpitPage />} />
        <Route path="/investigations" element={<Navigate to="/cases" replace />} />
        <Route path="/data/sources" element={<DataSourcesPage />} />
        <Route path="/data/extraction-jobs" element={<ExtractionJobsPage />} />
        <Route path="/data/schema" element={<SchemaViewerPage />} />
        <Route path="/entities" element={<EntitiesListPage />} />
        <Route path="/entities/:id" element={<EntityProfilePage />} />
        <Route path="/entity-resolution" element={<EntityResolutionWorkbenchPage />} />
        <Route path="/network" element={<NetworkGraphPage />} />
        <Route path="/geo" element={<GeoTemporalMapPage />} />
        <Route path="/timeline" element={<EventTimelinePage />} />
        <Route path="/patterns" element={<PatternsPage />} />
        <Route path="/leads" element={<LeadsPrioritizationPage />} />
        <Route path="/intelligence/summary" element={<IntelligenceSummaryPage />} />
        <Route path="/evidence" element={<EvidenceTraceabilityPage />} />
        <Route path="/reports" element={<IntelligenceReportsPage />} />
        <Route path="/settings" element={<Navigate to="/settings/general" replace />} />
        <Route path="/settings/general" element={<GeneralSettingsPage />} />
        <Route path="/settings/integrations" element={<IntegrationsPage />} />
        <Route path="/settings/schema" element={<SchemaSettingsPage />} />
        <Route path="/settings/users" element={<UsersManagementPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />

        {/* Alias routes */}
        <Route path="/admin/dashboard" element={<Navigate to="/dashboard" replace />} />
        <Route path="/admin/agents" element={<Navigate to="/settings/users" replace />} />
        <Route path="/admin/system-config" element={<Navigate to="/settings/integrations" replace />} />
        <Route path="/admin/audit-ledger" element={<Navigate to="/cases" replace />} />
        <Route path="/admin/analytics" element={<Navigate to="/dashboard" replace />} />
        <Route path="/agent/workspace" element={<Navigate to="/dashboard" replace />} />
        <Route path="/agent/criminal-persons" element={<Navigate to="/entities" replace />} />
        <Route path="/agent/entity-resolution" element={<Navigate to="/entity-resolution" replace />} />
        <Route path="/agent/network-analysis" element={<Navigate to="/network" replace />} />
        <Route path="/agent/geo-temporal-map" element={<Navigate to="/geo" replace />} />
        <Route path="/agent/lead-prioritization" element={<Navigate to="/leads" replace />} />
        <Route path="/agent/report-builder" element={<Navigate to="/intelligence/summary" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export { AppRoutes };
export default AppRoutes;
