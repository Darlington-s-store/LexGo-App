import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RoleSelection from './pages/RoleSelection';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmailVerification from './pages/EmailVerification';
import PhoneVerification from './pages/PhoneVerification';
import SettingUp from './pages/SettingUp';
import Success from './pages/Success';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import CasesPage from './pages/CasesPage';
import QuizPage from './pages/QuizPage';
import CoursesPage from './pages/CoursesPage';
import CompanionPage from './pages/CompanionPage';
import RecordsPage from './pages/RecordsPage';
import HelpCenterPage from './pages/HelpCenterPage';
import DictionaryPage from './pages/DictionaryPage';
import ProfilePage from './pages/ProfilePage';
import AiPage from './pages/AiPage';
import NotesPage from './pages/NotesPage';
import FacultyLayout from './pages/faculty/FacultyLayout';



function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to role-selection or login */}
        <Route path="/" element={<Navigate to="/role-selection" replace />} />
        
        {/* Pages */}
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/verify-phone" element={<PhoneVerification />} />
        <Route path="/setting-up" element={<SettingUp />} />
        <Route path="/success" element={<Success />} />

        {/* Faculty Routes */}
        <Route path="/faculty" element={<FacultyLayout />} />

        {/* Student Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout title="Home"><DashboardHome /></DashboardLayout>} />
        <Route path="/dashboard/cases" element={<DashboardLayout title="Cases"><CasesPage /></DashboardLayout>} />
        <Route path="/dashboard/quiz" element={<DashboardLayout title="Quiz"><QuizPage /></DashboardLayout>} />
        <Route path="/dashboard/courses" element={<DashboardLayout title="Courses"><CoursesPage /></DashboardLayout>} />
        <Route path="/dashboard/help" element={<DashboardLayout title="Help Center"><HelpCenterPage /></DashboardLayout>} />
        <Route path="/dashboard/companion" element={<DashboardLayout title="Companion"><CompanionPage /></DashboardLayout>} />
        <Route path="/dashboard/records" element={<DashboardLayout title="Academic Record"><RecordsPage /></DashboardLayout>} />
        <Route path="/dashboard/dictionary" element={<DashboardLayout title="Law Dictionary"><DictionaryPage /></DashboardLayout>} />
        <Route path="/dashboard/ai" element={<DashboardLayout title="Ask AI"><AiPage /></DashboardLayout>} />
        <Route path="/dashboard/notes" element={<DashboardLayout title="Notes"><NotesPage /></DashboardLayout>} />
        <Route path="/dashboard/profile" element={<DashboardLayout title="My Profile"><ProfilePage /></DashboardLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
