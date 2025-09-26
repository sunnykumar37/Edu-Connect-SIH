import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'

export default function TeacherPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
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

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const accessKey = localStorage.getItem('accessKey') || ''
    try {
      const { data } = await api.post('/teachers/login', { email: accessKey || 'teacher@educonnect.local', password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', 'teacher')
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden'
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
      backgroundSize: '30px 30px',
      opacity: 0.4
    },
    loginCard: {
      backgroundColor: 'white',
      borderRadius: '24px',
      padding: '2.5rem',
      maxWidth: '420px',
      width: '90%',
      maxHeight: '90vh',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
      zIndex: 2,
      overflowY: 'auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    teacherImage: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '1rem',
      border: '4px solid rgba(102, 126, 234, 0.2)',
      boxShadow: '0 8px 25px -5px rgba(102, 126, 234, 0.3)'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '800',
      color: '#111827',
      marginBottom: '0.5rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#6B7280',
      fontWeight: '500'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    input: {
      padding: '1rem',
      borderRadius: '12px',
      border: '2px solid #E5E7EB',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      color: '#111827',
      fontFamily: 'inherit'
    },
    inputFocus: {
      borderColor: '#667eea',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    },
    button: {
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '1rem 2rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 12px -2px rgba(102, 126, 234, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '1rem'
    },
    buttonHover: {
      backgroundColor: '#5a67d8',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px -5px rgba(102, 126, 234, 0.4)'
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none'
    },
    errorMessage: {
      color: '#EF4444',
      backgroundColor: '#FEF2F2',
      border: '1px solid #FECACA',
      borderRadius: '12px',
      padding: '1rem',
      fontSize: '0.95rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    backButton: {
      position: 'absolute',
      bottom: '2rem',
      right: '2rem',
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      color: 'white',
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
      background: 'rgba(255, 255, 255, 0.3)',
      transform: 'translateY(-1px)'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>
      
      <button 
        onClick={() => navigate('/role')}
        style={{
          ...styles.backButton,
          ...(hoveredButton === 'back' ? styles.backButtonHover : {})
        }}
        onMouseEnter={() => setHoveredButton('back')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        ←
      </button>

      <div style={styles.loginCard}>
        <div style={styles.header}>
          <img 
            src="https://educatemisc.s3.ap-south-1.amazonaws.com/educateWebsiteImages/teacher.png" 
            alt="Teacher" 
            style={styles.teacherImage}
          />
          <h1 style={styles.title}>Teacher Portal</h1>
          <p style={styles.subtitle}>Enter your password to access the dashboard</p>
        </div>

        {error && (
          <div style={styles.errorMessage}>
            <span>⚠️</span>
            {error}
          </div>
        )}

        <form style={styles.form} onSubmit={onSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              style={{
                ...styles.input,
                ...(focusedInput === 'password' ? styles.inputFocus : {})
              }}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...styles.button,
              ...(hoveredButton === 'submit' ? styles.buttonHover : {}),
              ...(loading ? styles.buttonDisabled : {})
            }}
            onMouseEnter={() => setHoveredButton('submit')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            {loading ? (
              <>
                <span>🔄</span>
                Logging in...
              </>
            ) : (
              <>
                <span>🚀</span>
                Login to Dashboard
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}


