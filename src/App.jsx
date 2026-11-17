import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RecruiterLayout from './layouts/RecruiterLayout';
import Dashboard from './pages/Dashboard';
import JobPostings from './pages/JobPostings';
import CandidatePipeline from './pages/CandidatePipeline';
import InterviewSchedule from './pages/InterviewSchedule';
import AnalyticsReports from './pages/AnalyticsReports';
import CareersPortal from './pages/CareersPortal';
import { CandidateProvider } from './context/CandidateContext';
import CandidateDashboard from './pages/CandidateDashboard';

function App() {
  return (
    <CandidateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route element={<RecruiterLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<JobPostings />} />
            <Route path="/pipeline" element={<CandidatePipeline />} />
            <Route path="/interviews" element={<InterviewSchedule />} />
            <Route path="/analytics" element={<AnalyticsReports />} />
            <Route path="/careers" element={<CareersPortal />} />
            <Route path="/candidate-dashboard" element={<CandidateDashboard/>} />
          </Route>
        </Routes>
      </Router>
    </CandidateProvider>
  );
}

export default App;