import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Ensure this matches your actual file name
import WorkerRegistration from './components/WorkerRegistration';
import EmployerDashboard from './components/EmployerDashboard';
import JobAlerts from './components/JobAlerts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/worker-register" element={<WorkerRegistration />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/job-alerts" element={<JobAlerts />} />
      </Routes>
    </Router>
  );
}

export default App;
