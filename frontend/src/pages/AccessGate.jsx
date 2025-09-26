import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AccessGate() {
  const navigate = useNavigate()
  const [accessKey, setAccessKey] = useState('')
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

  function onContinue(e) {
    e.preventDefault()
    localStorage.setItem('accessKey', accessKey.trim())
    navigate('/role')
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
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
      backgroundSize: '25px 25px',
      opacity: 0.6
    },
    accessCard: {
      backgroundColor: 'white',
      borderRadius: '24px',
      padding: '2.5rem',
      maxWidth: '500px',
      width: '90%',
      boxShadow: '0 0 0 2px #7C3AED, 0 0 30px rgba(124, 58, 237, 0.3), 0 25px 50px -12px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(124, 58, 237, 0.2)',
      position: 'relative',
      zIndex: 2,
      overflow: 'hidden'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    logoIcon: {
      width: '80px',
      height: '80px',
      marginBottom: '1rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px -2px rgba(124, 58, 237, 0.3)'
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: '800',
      color: '#111827',
      marginBottom: '0.5rem',
      background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 50%, #5B21B6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#6B7280',
      fontWeight: '500',
      lineHeight: 1.6
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
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
      borderColor: '#7C3AED',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.1)'
    },
    helpText: {
      fontSize: '0.875rem',
      color: '#6B7280',
      fontStyle: 'italic',
      marginTop: '0.5rem',
      padding: '0.75rem',
      backgroundColor: '#F9FAFB',
      borderRadius: '8px',
      border: '1px solid #E5E7EB'
    },
    button: {
      background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 50%, #5B21B6 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '1rem 2rem',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 12px -2px rgba(124, 58, 237, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '1rem'
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px -5px rgba(124, 58, 237, 0.4)',
      filter: 'brightness(1.05)'
    },
    floatingElements: {
      position: 'absolute',
      top: '10%',
      left: '10%',
      fontSize: '2rem',
      opacity: 0.1,
      zIndex: 1
    },
    floatingElements2: {
      position: 'absolute',
      bottom: '15%',
      right: '15%',
      fontSize: '2.5rem',
      opacity: 0.1,
      zIndex: 1
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>
      
      {/* Floating decorative elements */}
      <div style={styles.floatingElements}>🎓</div>
      <div style={styles.floatingElements2}>📚</div>

      <div style={styles.accessCard}>
        <div style={styles.header}>
          <img 
            src="https://educateapp.in/_next/static/media/logo.2b96f31d.png" 
            alt="EduConnect Logo" 
            style={styles.logoIcon}
          />
          <h1 style={styles.title}>Welcome to EduConnect</h1>
          <p style={styles.subtitle}>Enter your access credentials to continue</p>
        </div>

        <form style={styles.form} onSubmit={onContinue}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Access Key / Email</label>
            <input 
              type="text" 
              placeholder="For teachers, enter your email here..."
              value={accessKey} 
              onChange={(e) => setAccessKey(e.target.value)}
              style={{
                ...styles.input,
                ...(focusedInput === 'access' ? styles.inputFocus : {})
              }}
              onFocus={() => setFocusedInput('access')}
              onBlur={() => setFocusedInput(null)}
            />
            <div style={styles.helpText}>
              📝 <strong>For Teachers:</strong> This will be used as your login identifier on the next screen.
            </div>
          </div>
          
          <button 
            type="submit"
            style={{
              ...styles.button,
              ...(hoveredButton === 'continue' ? styles.buttonHover : {})
            }}
            onMouseEnter={() => setHoveredButton('continue')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <span>🚀</span>
            Continue to Role Selection
          </button>
        </form>
      </div>
    </div>
  )
}


