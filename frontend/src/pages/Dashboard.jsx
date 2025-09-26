import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Navbar from '../components/Navbar.jsx'
import api from '../lib/api'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredButton, setHoveredButton] = useState(null)

  // Add notifications state
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Set body background to white
    document.body.style.backgroundColor = '#ffffff'
    document.documentElement.style.backgroundColor = '#ffffff'
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    
    async function fetchMe() {
      try {
        // Try student first
        const s = await api.get('/students/me')
        setUser({ ...s.data.student, role: 'student' })
        return
      } catch {}
      try {
        const t = await api.get('/teachers/me')
        setUser({ ...t.data.teacher, role: 'teacher' })
      } catch (err) {
        setError('Failed to load profile')
      }
    }
    
    async function fetchNotifications() {
      try {
        const response = await api.get('/notifications')
        if (response.data.success) {
          setNotifications(response.data.notifications)
        }
      } catch (err) {
        console.error('Failed to fetch notifications:', err)
        // Fallback to mock data if API fails
        loadMockNotifications()
      }
    }
    
    fetchMe()
    fetchNotifications()
  }, [])

  // Load mock notifications for important exams and job opportunities
  function loadMockNotifications() {
    // In a real application, these would come from an API
    const examNotifications = [
      {
        id: 1,
        type: 'exam',
        title: 'Class 10 Board Exams',
        description: 'Important dates and guidelines for upcoming board examinations',
        date: '2025-10-15',
        priority: 'high'
      },
      {
        id: 2,
        type: 'exam',
        title: 'NTSE Stage 1',
        description: 'National Talent Search Examination registration deadline approaching',
        date: '2025-11-01',
        priority: 'high'
      }
    ]
    
    const jobNotifications = [
      {
        id: 3,
        type: 'job',
        title: 'Government Jobs After Class 10',
        description: 'New recruitment opportunities for Class 10 pass students',
        date: '2025-10-05',
        priority: 'medium'
      }
    ]
    
    // Combine and sort notifications
    const allNotifications = [...examNotifications, ...jobNotifications]
    setNotifications(allNotifications)
  }

  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  // Modern UI Styles
  const styles = {
    layout: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      marginLeft: '20%',
      width: '80%'
    },
    content: {
      width: '100%',
      padding: '2rem',
      paddingTop: '90px',
      overflowY: 'auto',
      minHeight: '100vh',
      boxSizing: 'border-box',
      backgroundColor: '#ffffff'
    },
    welcomeCard: {
      background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%)',
      borderRadius: '16px',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      position: 'relative',
      overflow: 'hidden'
    },
    welcomeContent: {
      color: 'white',
      position: 'relative',
      zIndex: 2
    },
    welcomeTitle: {
      margin: 0,
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    },
    welcomeSubtitle: {
      opacity: 0.9,
      fontSize: '1.1rem',
      fontWeight: '400'
    },
    welcomePattern: {
      position: 'absolute',
      top: '-50%',
      right: '-20%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      opacity: 0.3
    },
    errorMessage: {
      color: '#EF4444',
      backgroundColor: '#FEF2F2',
      border: '1px solid #FECACA',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '1.5rem',
      fontSize: '0.95rem',
      fontWeight: '500'
    },
    loadingContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px',
      color: '#6B7280',
      fontSize: '1.1rem'
    },
    buttonGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    buttonGridStudent: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    actionButton: {
      backgroundColor: 'white',
      border: 'none',
      borderRadius: '16px',
      padding: '1.575rem',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#374151',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '120px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    },
    actionButtonHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      backgroundColor: '#4F46E5',
      color: 'white'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '1.575rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid #F3F4F6',
      minHeight: '120px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    },
    statCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    statLabel: {
      color: '#6B7280',
      fontSize: '0.9625rem',
      fontWeight: '500',
      marginBottom: '0.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    statValue: {
      color: '#111827',
      fontSize: '2.5rem',
      fontWeight: '700',
      margin: 0,
      lineHeight: '1'
    },
    iconContainer: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1rem',
      fontSize: '1.6875rem'
    },
    // Add notification styles
    notificationsContainer: {
      backgroundColor: '#FFF0F5', // Light pink background
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid #FFB6C1', // Pink border
      marginBottom: '2rem'
    },
    notificationsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    notificationsTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#9C27B0', // Purple/pink text
      margin: 0
    },
    notificationItem: {
      padding: '1rem',
      borderBottom: '1px solid #FFB6C1', // Pink border
      display: 'flex',
      alignItems: 'flex-start'
    },
    notificationIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '1rem',
      fontSize: '1.25rem',
      flexShrink: 0,
      backgroundColor: '#FFD1DC', // Light pink background for icon
      color: '#9C27B0' // Purple/pink icon color
    },
    notificationContent: {
      flex: 1
    },
    notificationTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#9C27B0', // Purple/pink title
      margin: '0 0 0.25rem 0'
    },
    notificationDescription: {
      fontSize: '0.9rem',
      color: '#6B7280',
      margin: '0 0 0.5rem 0'
    },
    notificationDate: {
      fontSize: '0.8rem',
      color: '#9CA3AF'
    }
  }

  // Color variations for different button types
  const getButtonColors = (type) => {
    const colors = {
      upload: { bg: '#10B981', icon: '📚' },
      quiz: { bg: '#F59E0B', icon: '📝' },
      results: { bg: '#8B5CF6', icon: '📊' },
      certificate: { bg: '#06B6D4', icon: '🏆' },
      join: { bg: '#EF4444', icon: '🎯' },
      digital: { bg: '#10B981', icon: '💻' },
      modules: { bg: '#F59E0B', icon: '📖' }
    }
    return colors[type] || { bg: '#6B7280', icon: '📋' }
  }
  
  // Get notification icon and color based on type
  const getNotificationStyle = (type) => {
    const styles = {
      exam: { 
        bg: '#FFB6C1', 
        icon: '📝',
        color: '#9C27B0'
      },
      job: { 
        bg: '#FFD1DC', 
        icon: '💼',
        color: '#9C27B0'
      }
    }
    return styles[type] || { bg: '#FFB6C1', icon: '🔔', color: '#9C27B0' }
  }

  return (
    <>
      <Navbar />
      <div style={styles.layout}>
        <Sidebar />
        <div style={styles.content}>
        {/* Welcome Header */}
        <div style={styles.welcomeCard}>
          <div style={styles.welcomePattern}></div>
          <div style={styles.welcomeContent}>
            <h1 style={styles.welcomeTitle}>
              Welcome back, {user?.name || 'Loading...'}! 👋
            </h1>
            <p style={styles.welcomeSubtitle}>
              {user?.role === 'teacher' 
                ? `Manage your classes at ${user?.school || 'EduConnect Punjab'}` 
                : 'Ready to continue your learning journey?'
              }
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={styles.errorMessage}>
            ⚠️ {error}
          </div>
        )}

        {/* Loading State */}
        {!user ? (
          <div style={styles.loadingContainer}>
            <div style={{ animation: 'pulse 2s infinite' }}>
              Loading your dashboard...
            </div>
          </div>
        ) : (
          <>
            {/* Teacher Dashboard */}
            {user.role === 'teacher' ? (
              <>
                {/* Action Buttons */}
                <div style={styles.buttonGrid}>
                  {[
                    { text: 'Upload Content', type: 'upload' },
                    { text: 'Create Quiz', type: 'quiz' },
                    { text: 'View Results', type: 'results' },
                    { text: 'Certificate Generator', type: 'certificate' }
                  ].map((btn, index) => {
                    const colors = getButtonColors(btn.type)
                    return (
                      <button
                        key={index}
                        style={{
                          ...styles.actionButton,
                          ...(hoveredButton === index ? styles.actionButtonHover : {})
                        }}
                        onMouseEnter={() => setHoveredButton(index)}
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        <div style={{
                          ...styles.iconContainer,
                          backgroundColor: `${colors.bg}20`
                        }}>
                          {colors.icon}
                        </div>
                        {btn.text}
                      </button>
                    )
                  })}
                </div>

                {/* Stats Cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1.5rem'
                }}>
                  {[
                    { label: 'Total Content', value: '24', color: '#10B981', icon: '📚' },
                    { label: 'Total Quizzes', value: '8', color: '#F59E0B', icon: '📝' },
                    { label: 'Total Students', value: '45', color: '#8B5CF6', icon: '👥' }
                  ].map((stat, index) => (
                    <div
                      key={index}
                      style={{
                        ...styles.statCard,
                        ...(hoveredCard === `teacher-${index}` ? styles.statCardHover : {})
                      }}
                      onMouseEnter={() => setHoveredCard(`teacher-${index}`)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div style={{
                        ...styles.iconContainer,
                        backgroundColor: `${stat.color}20`,
                        color: stat.color
                      }}>
                        {stat.icon}
                      </div>
                      <div style={styles.statLabel}>{stat.label}</div>
                      <h3 style={{ ...styles.statValue, color: stat.color }}>{stat.value}</h3>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Student Dashboard */}
                <div style={styles.buttonGrid}>
                  {[
                    { text: 'Join Quiz', type: 'join' },
                    { text: 'View Results', type: 'results' },
                    { text: 'Digital Literacy', type: 'digital' },
                    { text: 'Learning Modules', type: 'modules' }
                  ].map((btn, index) => {
                    const colors = getButtonColors(btn.type)
                    return (
                      <button
                        key={index}
                        style={{
                          ...styles.actionButton,
                          ...(hoveredButton === index ? styles.actionButtonHover : {})
                        }}
                        onMouseEnter={() => setHoveredButton(index)}
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        <div style={{
                          ...styles.iconContainer,
                          backgroundColor: `${colors.bg}20`
                        }}>
                          {colors.icon}
                        </div>
                        {btn.text}
                      </button>
                    )
                  })}
                </div>

                {/* Student Stats */}
                <div style={styles.statsGrid}>
                  {[
                    { label: 'Quizzes Available', value: '8', color: '#EF4444', icon: '🎯' },
                    { label: 'Learning Modules', value: '12', color: '#F59E0B', icon: '📖' }
                  ].map((stat, index) => (
                    <div
                      key={index}
                      style={{
                        ...styles.statCard,
                        ...(hoveredCard === `student-${index}` ? styles.statCardHover : {})
                      }}
                      onMouseEnter={() => setHoveredCard(`student-${index}`)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div style={{
                        ...styles.iconContainer,
                        backgroundColor: `${stat.color}20`,
                        color: stat.color
                      }}>
                        {stat.icon}
                      </div>
                      <div style={styles.statLabel}>{stat.label}</div>
                      <h3 style={{ ...styles.statValue, color: stat.color }}>{stat.value}</h3>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Notifications Section */}
        {user && notifications.length > 0 && (
          <div style={styles.notificationsContainer}>
            <div style={styles.notificationsHeader}>
              <h2 style={styles.notificationsTitle}>Important Notifications</h2>
            </div>
            {notifications.map((notification) => {
              const style = getNotificationStyle(notification.type)
              return (
                <div key={notification.id} style={styles.notificationItem}>
                  <div style={{
                    ...styles.notificationIcon,
                    backgroundColor: `${style.bg}20`,
                    color: style.color
                  }}>
                    {style.icon}
                  </div>
                  <div style={styles.notificationContent}>
                    <h3 style={styles.notificationTitle}>{notification.title}</h3>
                    <p style={styles.notificationDescription}>{notification.description}</p>
                    <p style={styles.notificationDate}>
                      {new Date(notification.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
    </>
  )
}


