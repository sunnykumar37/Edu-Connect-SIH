import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RoleSelect() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState('')
  const [userName, setUserName] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)
  const [hoveredButton, setHoveredButton] = useState(null)

  useEffect(() => {
    // Set body background to white - following Dashboard Background Consistency spec
    document.body.style.backgroundColor = '#ffffff'
    document.documentElement.style.backgroundColor = '#ffffff'
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    
    const rootElement = document.getElementById('root')
    if (rootElement) {
      rootElement.style.backgroundColor = '#ffffff'
    }
  }, [])

  const handleRoleSelection = (role) => {
    setSelectedRole(role)
  }

  const handleContinue = () => {
    if (selectedRole && userName.trim()) {
      localStorage.setItem('selectedRole', selectedRole)
      localStorage.setItem('userName', userName.trim())
      
      if (selectedRole === 'teacher') {
        navigate('/teacher')
      } else {
        navigate('/student')
      }
    }
  }

  const getRoleTheme = (role) => {
    return role === 'teacher'
      ? {
          gradient: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 50%, #5B21B6 100%)',
          color: '#7C3AED',
          lightColor: '#A855F7'
        }
      : {
          gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: '#4facfe',
          lightColor: '#0EA5E9'
        }
  }

  const styles = {
    container: {
      minHeight: '100vh',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      margin: 0,
      background: '#ffffff',
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden',
      overflowX: 'hidden',
      overflowY: 'hidden'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '2rem',
      maxWidth: '500px',
      width: '85%',
      maxHeight: '85vh',
      boxShadow: '0 0 0 2px #7C3AED, 0 0 30px rgba(124, 58, 237, 0.3), 0 25px 50px -12px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(124, 58, 237, 0.2)',
      position: 'relative',
      zIndex: 2,
      overflow: 'hidden'
    },
    header: {
      textAlign: 'center',
      marginBottom: '1.5rem'
    },
    logoImage: {
      width: '60px',
      height: '60px',
      marginBottom: '1rem',
      borderRadius: '10px',
      boxShadow: '0 4px 12px -2px rgba(124, 58, 237, 0.2)'
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: '700',
      color: '#374151',
      marginBottom: '0.25rem'
    },
    subtitle: {
      fontSize: '0.95rem',
      color: '#6B7280',
      fontWeight: '500'
    },
    roleText: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#8B5CF6',
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    roleContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    roleCard: {
      backgroundColor: 'white',
      border: '2px solid #E5E7EB',
      borderRadius: '12px',
      padding: '1.5rem 0.75rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative'
    },
    roleCardSelected: {
      borderColor: selectedRole === 'teacher' ? '#7C3AED' : '#4facfe',
      boxShadow: selectedRole === 'teacher' 
        ? '0 0 0 3px rgba(124, 58, 237, 0.1)'
        : '0 0 0 3px rgba(79, 172, 254, 0.1)',
      transform: 'translateY(-2px)'
    },
    roleCardHover: {
      borderColor: '#D1D5DB',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.1)'
    },
    radioButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      border: '2px solid #E5E7EB',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    radioButtonSelected: {
      borderColor: selectedRole === 'teacher' ? '#7C3AED' : '#4facfe',
      backgroundColor: selectedRole === 'teacher' ? '#7C3AED' : '#4facfe'
    },
    radioButtonInner: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: 'white'
    },
    roleImageContainer: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: selectedRole === 'teacher' 
        ? 'linear-gradient(135deg, #C084FC 0%, #A855F7 100%)'
        : 'linear-gradient(135deg, #7DD3FC 0%, #0EA5E9 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '0.75rem',
      transition: 'all 0.3s ease'
    },
    roleImage: {
      width: '65px',
      height: '65px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    roleLabel: {
      background: selectedRole === 'teacher' 
        ? 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)'
        : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: 'white',
      padding: '0.5rem 1.5rem',
      borderRadius: '8px',
      fontSize: '0.95rem',
      fontWeight: '600',
      marginTop: '0.75rem',
      width: '100%',
      textAlign: 'center'
    },
    inputContainer: {
      marginBottom: '1.5rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '10px',
      border: '2px solid #E5E7EB',
      fontSize: '0.95rem',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      color: '#111827',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: selectedRole === 'teacher' ? '#7C3AED' : '#4facfe',
      outline: 'none',
      boxShadow: selectedRole === 'teacher'
        ? '0 0 0 3px rgba(124, 58, 237, 0.1)'
        : '0 0 0 3px rgba(79, 172, 254, 0.1)'
    },
    continueButton: {
      width: '100%',
      background: selectedRole === 'teacher'
        ? 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)'
        : selectedRole === 'student'
        ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        : '#9CA3AF',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: selectedRole && userName.trim() ? 'pointer' : 'not-allowed',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: selectedRole && userName.trim() 
        ? '0 4px 12px -2px rgba(124, 58, 237, 0.3)' 
        : 'none',
      opacity: selectedRole && userName.trim() ? 1 : 0.5
    },
    continueButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: selectedRole === 'teacher'
        ? '0 8px 25px -5px rgba(124, 58, 237, 0.4)'
        : '0 8px 25px -5px rgba(79, 172, 254, 0.4)'
    },
    backButton: {
      position: 'absolute',
      bottom: '2rem',
      right: '2rem',
      background: 'rgba(107, 114, 128, 0.1)',
      border: '1px solid rgba(107, 114, 128, 0.2)',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      color: '#6B7280',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: '1.5rem',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      zIndex: 3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    backButtonHover: {
      background: 'rgba(107, 114, 128, 0.2)',
      transform: 'translateY(-1px)'
    }
  }

  return (
    <div style={styles.container}>
      <button 
        onClick={() => navigate('/access')}
        style={{
          ...styles.backButton,
          ...(hoveredButton === 'back' ? styles.backButtonHover : {})
        }}
        onMouseEnter={() => setHoveredButton('back')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        ←
      </button>

      <div style={styles.card}>
        <div style={styles.header}>
          <img 
            src="https://educateapp.in/_next/static/media/logo.2b96f31d.png" 
            alt="EduConnect Logo" 
            style={styles.logoImage}
          />
          <h1 style={styles.title}>Tell Us About You</h1>
          <p style={styles.subtitle}>To Get Started Need little Info</p>
        </div>

        <div style={styles.roleText}>You are a</div>

        <div style={styles.roleContainer}>
          {/* Teacher Card */}
          <div 
            style={{
              ...styles.roleCard,
              ...(selectedRole === 'teacher' ? styles.roleCardSelected : {}),
              ...(hoveredButton === 'teacher' && selectedRole !== 'teacher' ? styles.roleCardHover : {})
            }}
            onClick={() => handleRoleSelection('teacher')}
            onMouseEnter={() => setHoveredButton('teacher')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div style={{
              ...styles.radioButton,
              ...(selectedRole === 'teacher' ? styles.radioButtonSelected : {})
            }}>
              {selectedRole === 'teacher' && <div style={styles.radioButtonInner}></div>}
            </div>
            
            <div style={{
              ...styles.roleImageContainer,
              background: selectedRole === 'teacher' 
                ? 'linear-gradient(135deg, #C084FC 0%, #A855F7 100%)'
                : 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)'
            }}>
              <img 
                src="https://educatemisc.s3.ap-south-1.amazonaws.com/educateWebsiteImages/teacher.png" 
                alt="Teacher" 
                style={styles.roleImage}
              />
            </div>
            
            <div style={{
              ...styles.roleLabel,
              background: selectedRole === 'teacher'
                ? 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)'
                : '#6B7280'
            }}>
              Teacher
            </div>
          </div>

          {/* Student Card */}
          <div 
            style={{
              ...styles.roleCard,
              ...(selectedRole === 'student' ? styles.roleCardSelected : {}),
              ...(hoveredButton === 'student' && selectedRole !== 'student' ? styles.roleCardHover : {})
            }}
            onClick={() => handleRoleSelection('student')}
            onMouseEnter={() => setHoveredButton('student')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div style={{
              ...styles.radioButton,
              ...(selectedRole === 'student' ? styles.radioButtonSelected : {})
            }}>
              {selectedRole === 'student' && <div style={styles.radioButtonInner}></div>}
            </div>
            
            <div style={{
              ...styles.roleImageContainer,
              background: selectedRole === 'student'
                ? 'linear-gradient(135deg, #7DD3FC 0%, #0EA5E9 100%)'
                : 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)'
            }}>
              <img 
                src="https://educatemisc.s3.ap-south-1.amazonaws.com/educateWebsiteImages/student.png" 
                alt="Student" 
                style={styles.roleImage}
              />
            </div>
            
            <div style={{
              ...styles.roleLabel,
              background: selectedRole === 'student'
                ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                : '#6B7280'
            }}>
              Student
            </div>
          </div>
        </div>

        <div style={styles.inputContainer}>
          <input 
            type="text"
            placeholder="Enter Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              ...styles.input,
              ...(focusedInput === 'name' ? styles.inputFocus : {})
            }}
            onFocus={() => setFocusedInput('name')}
            onBlur={() => setFocusedInput(null)}
          />
        </div>

        <button 
          onClick={handleContinue}
          disabled={!selectedRole || !userName.trim()}
          style={{
            ...styles.continueButton,
            ...(hoveredButton === 'continue' && selectedRole && userName.trim() ? styles.continueButtonHover : {})
          }}
          onMouseEnter={() => setHoveredButton('continue')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Continue
        </button>
      </div>
    </div>
  )
}


