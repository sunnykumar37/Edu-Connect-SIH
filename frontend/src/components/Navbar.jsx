import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const student = localStorage.getItem('student')

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('teacher')
    navigate('/login')
  }

  const navbarStyles = {
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: '70px',
      boxSizing: 'border-box'
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      textDecoration: 'none'
    },
    logo: {
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      objectFit: 'contain'
    },
    links: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    signupLink: {
      color: '#6b7280',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      transition: 'all 0.2s ease'
    },
    logoutButton: {
      backgroundColor: '#8b5cf6',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '25px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
    },
    logoutButtonHover: {
      backgroundColor: '#7c3aed',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)'
    }
  }

  return (
    <header style={navbarStyles.nav}>
      <div style={navbarStyles.brand}>
        <img 
          src="https://educateapp.in/_next/static/media/logo.2b96f31d.png" 
          alt="EduConnect Logo" 
          style={navbarStyles.logo}
        />
        EduConnect Punjab
      </div>
      <nav style={navbarStyles.links}>
        {!token && !student && (
          <Link 
            to="/signup" 
            style={navbarStyles.signupLink}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f3f4f6'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'
            }}
          >
            Signup
          </Link>
        )}
        {(token || student) && (
          <button 
            style={navbarStyles.logoutButton}
            onClick={logout}
            onMouseEnter={(e) => {
              Object.assign(e.target.style, navbarStyles.logoutButtonHover)
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#8b5cf6'
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.3)'
            }}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  )
}


