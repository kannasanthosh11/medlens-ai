import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HealthRecordProvider } from './context/HealthRecordContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UploadPage } from './pages/UploadPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { OcrResultsPage } from './pages/OcrResultsPage';
import { ReportsPage } from './pages/ReportsPage';
import { ReportDetailPage } from './pages/ReportDetailPage';
import { TimelinePage } from './pages/TimelinePage';
import { LabsPage } from './pages/LabsPage';
import { MedicationsPage } from './pages/MedicationsPage';
import { DiagnosesPage } from './pages/DiagnosesPage';
import { SearchPage } from './pages/SearchPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { SettingsPage } from './pages/SettingsPage';
import { ArchitecturePage } from './pages/ArchitecturePage';

function App() {
  return (
    <HealthRecordProvider>
      <Router>
        <Routes>
          {/* Public / Landing routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Authenticated / Dashboard Clinical routes */}
          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            }
          />
          <Route
            path="/upload"
            element={
              <AppLayout>
                <UploadPage />
              </AppLayout>
            }
          />
          <Route
            path="/processing"
            element={
              <AppLayout>
                <ProcessingPage />
              </AppLayout>
            }
          />
          <Route
            path="/ocr-results"
            element={
              <AppLayout>
                <OcrResultsPage />
              </AppLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <AppLayout>
                <ReportsPage />
              </AppLayout>
            }
          />
          <Route
            path="/reports/:id"
            element={
              <AppLayout>
                <ReportDetailPage />
              </AppLayout>
            }
          />
          <Route
            path="/timeline"
            element={
              <AppLayout>
                <TimelinePage />
              </AppLayout>
            }
          />
          <Route
            path="/labs"
            element={
              <AppLayout>
                <LabsPage />
              </AppLayout>
            }
          />
          <Route
            path="/medications"
            element={
              <AppLayout>
                <MedicationsPage />
              </AppLayout>
            }
          />
          <Route
            path="/diagnoses"
            element={
              <AppLayout>
                <DiagnosesPage />
              </AppLayout>
            }
          />
          <Route
            path="/search"
            element={
              <AppLayout>
                <SearchPage />
              </AppLayout>
            }
          />
          <Route
            path="/privacy"
            element={
              <AppLayout>
                <PrivacyPage />
              </AppLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <AppLayout>
                <SettingsPage />
              </AppLayout>
            }
          />
          <Route
            path="/architecture"
            element={
              <AppLayout>
                <ArchitecturePage />
              </AppLayout>
            }
          />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </HealthRecordProvider>
  );
}

export default App;
