import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null
  const dashboardTo = role === 'student' ? '/student-dashboard' : '/dashboard'
  const items = role === 'student'
    ? [
        { to: dashboardTo, label: 'Dashboard', icon: '📊' },
        { to: '/student-content', label: 'Content', icon: '📁' },
        { to: '/quizzes', label: 'Quizzes', icon: '📝' },
        { to: '/student-competitive-books', label: 'Competitive Books', icon: '📚' },
        { to: '/results', label: 'Results', icon: '🎯' },
      ]
    : [
        { to: dashboardTo, label: 'Dashboard', icon: '📊' },
        { to: '/upload-content', label: 'Upload Content', icon: '📁' },
        { to: '/teacher/quizzes', label: 'Quizzes', icon: '📝' },
        { to: '/results', label: 'Results', icon: '🎯' },
        { to: '/certificates', label: 'Certificate Generator', icon: '🎓' },
      ]

  const sidebarStyles = {
    sidebar: {
      width: '20%',
      height: 'calc(100vh - 70px)',
      backgroundColor: '#1f2937',
      padding: '1.5rem',
      boxSizing: 'border-box',
      position: 'fixed',
      left: 0,
      top: '70px',
      overflowY: 'auto'
    },
    brand: {
      color: 'white',
      fontSize: '1.25rem',
      fontWeight: '700',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #374151'
    },
    nav: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      color: '#d1d5db',
      textDecoration: 'none',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      fontSize: '0.95rem'
    },
    linkHover: {
      backgroundColor: '#374151',
      color: 'white'
    },
    linkActive: {
      backgroundColor: '#4f46e5',
      color: 'white'
    },
    icon: {
      fontSize: '1.2rem'
    }
  }

  return (
    <aside style={sidebarStyles.sidebar}>
      <div style={sidebarStyles.brand}>
        {role === 'student' ? 'Student Dashboard' : 'Teachers Dashboard'}
      </div>
      <nav style={sidebarStyles.nav}>
        {items.map(i => (
          <NavLink 
            key={i.to} 
            to={i.to} 
            style={({ isActive }) => ({
              ...sidebarStyles.link,
              ...(isActive ? sidebarStyles.linkActive : {})
            })}
            onMouseEnter={(e) => {
              if (!e.target.matches('.active')) {
                Object.assign(e.target.style, sidebarStyles.linkHover)
              }
            }}
            onMouseLeave={(e) => {
              if (!e.target.matches('.active')) {
                Object.assign(e.target.style, sidebarStyles.link)
              }
            }}
          >
            <span style={sidebarStyles.icon}>{i.icon}</span>
            {i.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}


