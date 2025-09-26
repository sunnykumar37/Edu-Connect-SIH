import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'

export default function SignupUnified() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', role: 'teacher', password: '' })
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
    try {
      if (form.role === 'teacher') {
        const payload = { name: form.name, email: form.email, phone: '0000000000', password: form.password, school: 'N/A', subjects: [] }
        const { data } = await api.post('/teachers/signup', payload)
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', 'teacher')
        navigate('/dashboard')
      } else {
        const payload = { name: form.name, email: form.email, password: form.password }
        const { data } = await api.post('/students/signup', payload)
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', 'student')
        navigate('/student-dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const getRoleImage = () => {
    return form.role === 'teacher' 
      ? 'https://educatemisc.s3.ap-south-1.amazonaws.com/educateWebsiteImages/teacher.png'
      : 'https://educatemisc.s3.ap-south-1.amazonaws.com/educateWebsiteImages/student.png'
  }

  const getRoleTheme = () => {
    return form.role === 'teacher'
      ? {
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#667eea',
          focusColor: 'rgba(102, 126, 234, 0.1)'
        }
      : {
          gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: '#4facfe',
          focusColor: 'rgba(79, 172, 254, 0.1)'
        }
  }

  const theme = getRoleTheme()

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
      background: theme.gradient,
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
    signupCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '1.5rem',
      maxWidth: '550px',
      width: '95%',
      maxHeight: '80vh',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
      zIndex: 2,
      overflow: 'hidden'
    },
    header: {
      textAlign: 'center',
      marginBottom: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    roleImage: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '0.75rem',
      border: `4px solid ${theme.color}33`,
      boxShadow: `0 8px 25px -5px ${theme.color}4D`,
      transition: 'all 0.3s ease'
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: '800',
      color: '#111827',
      marginBottom: '0.25rem',
      background: theme.gradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      fontSize: '0.9rem',
      color: '#6B7280',
      fontWeight: '500'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.8rem'
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
      minWidth: '80px',
      textAlign: 'right'
    },
    input: {
      padding: '0.75rem',
      borderRadius: '10px',
      border: '2px solid #E5E7EB',
      fontSize: '0.9rem',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      color: '#111827',
      fontFamily: 'inherit',
      flex: 1
    },
    inputFocus: {
      borderColor: theme.color,
      outline: 'none',
      boxShadow: `0 0 0 3px ${theme.focusColor}`
    },
    select: {
      padding: '0.75rem',
      borderRadius: '10px',
      border: '2px solid #E5E7EB',
      fontSize: '0.9rem',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      color: '#111827',
      fontFamily: 'inherit',
      flex: 1,
      cursor: 'pointer'
    },
    selectFocus: {
      borderColor: theme.color,
      outline: 'none',
      boxShadow: `0 0 0 3px ${theme.focusColor}`
    },
    button: {
      backgroundColor: theme.color,
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      padding: '0.85rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: `0 4px 12px -2px ${theme.color}4D`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '1rem'
    },
    buttonHover: {
      filter: 'brightness(0.9)',
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 25px -5px ${theme.color}66`
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
      marginBottom: '1rem'
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
        onClick={() => navigate('/login')}
        style={{
          ...styles.backButton,
          ...(hoveredButton === 'back' ? styles.backButtonHover : {})
        }}
        onMouseEnter={() => setHoveredButton('back')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        ←
      </button>

      <div style={styles.signupCard}>
        <div style={styles.header}>
          <img 
            src={getRoleImage()} 
            alt={form.role === 'teacher' ? 'Teacher' : 'Student'} 
            style={styles.roleImage}
          />
          <h1 style={styles.title}>Create Account</h1>
          <p style={styles.subtitle}>Join our educational platform</p>
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
              required
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
            <label style={styles.label}>Email:</label>
            <input 
              type="email" 
              required
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
            <label style={styles.label}>Role:</label>
            <select 
              value={form.role} 
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={{
                ...styles.select,
                ...(focusedInput === 'role' ? styles.selectFocus : {})
              }}
              onFocus={() => setFocusedInput('role')}
              onBlur={() => setFocusedInput(null)}
            >
              <option value="teacher">🎓 Teacher</option>
              <option value="student">🎓 Student</option>
            </select>
          </div>
          
          <div style={styles.inputRow}>
            <label style={styles.label}>Password:</label>
            <input 
              type="password" 
              pattern="\d{4}" 
              title="4 digits" 
              required
              value={form.password} 
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter 4-digit password..."
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
                Creating Account...
              </>
            ) : (
              <>
                <span>🎆</span>
                Create Account
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}


