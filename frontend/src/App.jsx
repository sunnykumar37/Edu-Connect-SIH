import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Navbar from './components/Navbar.jsx'
import AccessGate from './pages/AccessGate.jsx'
import RoleSelect from './pages/RoleSelect.jsx'
import TeacherPassword from './pages/TeacherPassword.jsx'
import StudentLogin from './pages/StudentLogin.jsx'
import Placeholder from './pages/Placeholder.jsx'
import UploadContent from './pages/UploadContent.jsx'
import Quizzes from './pages/Quizzes.jsx'
import TeacherQuizzes from './pages/TeacherQuizzes.jsx'
import Results from './pages/Results.jsx'
import Modules from './pages/Modules.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import StudentContent from './pages/StudentContent.jsx'
import StudentClassSubjects from './pages/StudentClassSubjects.jsx'
import StudentComputer6 from './pages/StudentComputer6.jsx'
import StudentEnglish6 from './pages/StudentEnglish6.jsx'
import StudentHindi6 from './pages/StudentHindi6.jsx'
import StudentMath6 from './pages/StudentMath6.jsx'
import StudentCompetitiveBooks from './pages/StudentCompetitiveBooks.jsx'
import StudentSubjectVideos from './pages/StudentSubjectVideos.jsx'
import QuizAttempt from './pages/QuizAttempt.jsx'
import SignupUnified from './pages/SignupUnified.jsx'
import CertificateGenerator from './pages/CertificateGenerator.jsx'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/student-dashboard" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
        <Route path="/student-content" element={<PrivateRoute><StudentContent /></PrivateRoute>} />
        <Route path="/student/class/:cls" element={<PrivateRoute><StudentClassSubjects /></PrivateRoute>} />
        <Route path="/student/class/:cls/videos/:subject" element={<PrivateRoute><StudentSubjectVideos /></PrivateRoute>} />
        <Route path="/student/class/:cls/computer-6" element={<PrivateRoute><StudentComputer6 /></PrivateRoute>} />
        <Route path="/student/class/:cls/english-6" element={<PrivateRoute><StudentEnglish6 /></PrivateRoute>} />
        <Route path="/student/class/:cls/hindi-6" element={<PrivateRoute><StudentHindi6 /></PrivateRoute>} />
        <Route path="/student/class/:cls/math-6" element={<PrivateRoute><StudentMath6 /></PrivateRoute>} />
        <Route path="/quizzes/:id" element={<PrivateRoute><QuizAttempt /></PrivateRoute>} />
        <Route path="/teacher/quizzes" element={<PrivateRoute><TeacherQuizzes /></PrivateRoute>} />
        <Route path="/student-competitive-books" element={<PrivateRoute><StudentCompetitiveBooks /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/access" element={<AccessGate />} />
        <Route path="/role" element={<RoleSelect />} />
        <Route path="/teacher" element={<TeacherPassword />} />
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/signup" element={<SignupUnified />} />
        <Route path="/upload-content" element={<PrivateRoute><UploadContent /></PrivateRoute>} />
        <Route path="/quizzes" element={<PrivateRoute><Quizzes /></PrivateRoute>} />
        <Route path="/results" element={<PrivateRoute><Results /></PrivateRoute>} />
        <Route path="/certificates" element={<PrivateRoute><CertificateGenerator /></PrivateRoute>} />
      </Routes>
    </div>
  )
}
