import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'

export default function StudentLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', className: '', rollNumber: '', email: '', password: '' })
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
    if (!form.password || !(form.email || (form.name && form.className && form.rollNumber))) {
      setError('Provide Email+Password or Name+Class+Roll+Password')
      setLoading(false)
      return
    }
    try {
      const { data } = await api.post('/students/login', form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', 'student')
      window.location.href = '/student-dashboard'
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
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
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
      background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
      backgroundSize: '30px 30px',
      opacity: 0.4
    },
    loginCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '1.25rem',
      maxWidth: '600px',
      width: '95%',
      maxHeight: '70vh',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
      zIndex: 2,
      overflow: 'hidden'
    },
    header: {
      textAlign: 'center',
      marginBottom: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    studentImage: {
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '0.5rem',
      border: '3px solid rgba(79, 172, 254, 0.2)',
      boxShadow: '0 6px 20px -5px rgba(79, 172, 254, 0.3)'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '800',
      color: '#111827',
      marginBottom: '0.25rem',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      fontSize: '0.8rem',
      color: '#6B7280',
      fontWeight: '500'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.6rem'
    },
    inputRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    label: {
      fontSize: '0.85rem',
      fontWeight: '600',
      color: '#374151',
      minWidth: '90px',
      textAlign: 'right'
    },
    input: {
      padding: '0.6rem',
      borderRadius: '8px',
      border: '2px solid #E5E7EB',
      fontSize: '0.9rem',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      color: '#111827',
      fontFamily: 'inherit',
      flex: 1
    },
    inputFocus: {
      borderColor: '#4facfe',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(79, 172, 254, 0.1)'
    },
    button: {
      backgroundColor: '#4facfe',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '0.7rem 1rem',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 12px -2px rgba(79, 172, 254, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '0.5rem'
    },
    buttonHover: {
      backgroundColor: '#0ea5e9',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px -5px rgba(79, 172, 254, 0.4)'
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
      borderRadius: '10px',
      padding: '0.75rem',
      fontSize: '0.85rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.75rem'
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
            src="https://educatemisc.s3.ap-south-1.amazonaws.com/educateWebsiteImages/student.png" 
            alt="Student" 
            style={styles.studentImage}
          />
          <h1 style={styles.title}>Student Portal</h1>
          <p style={styles.subtitle}>Login with your credentials to access the dashboard</p>
        </div>

        {error && (
          <div style={styles.errorMessage}>
            <span>⚠️</span>
            {error}
          </div>
        )}

        <form style={styles.form} onSubmit={onSubmit}>
          <div style={styles.inputRow}>
            <label style={styles.label}>Name:</label>
            <input 
              type="text" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your full name..."
              style={{
                ...styles.input,
                ...(focusedInput === 'name' ? styles.inputFocus : {})
              }}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          
          <div style={styles.inputRow}>
            <label style={styles.label}>Class:</label>
            <input 
              type="text" 
              value={form.className} 
              onChange={(e) => setForm({ ...form, className: e.target.value })}
              placeholder="Enter your class..."
              style={{
                ...styles.input,
                ...(focusedInput === 'class' ? styles.inputFocus : {})
              }}
              onFocus={() => setFocusedInput('class')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          
          <div style={styles.inputRow}>
            <label style={styles.label}>Roll No:</label>
            <input 
              type="text" 
              value={form.rollNumber} 
              onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
              placeholder="Enter your roll number..."
              style={{
                ...styles.input,
                ...(focusedInput === 'roll' ? styles.inputFocus : {})
              }}
              onFocus={() => setFocusedInput('roll')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          
          <div style={styles.inputRow}>
            <label style={styles.label}>Email:</label>
            <input 
              type="email" 
              value={form.email} 
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email address..."
              style={{
                ...styles.input,
                ...(focusedInput === 'email' ? styles.inputFocus : {})
              }}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          
          <div style={styles.inputRow}>
            <label style={styles.label}>Password:</label>
            <input 
              type="password" 
              value={form.password} 
              onChange={(e) => setForm({ ...form, password: e.target.value })}
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
                Continue to Dashboard
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}


