import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function StudentClassSubjects() {
  const { cls } = useParams()
  const navigate = useNavigate()
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredButton, setHoveredButton] = useState(null)

  const subjects = [
    { name: 'Computer', emoji: '💻', color: '#06B6D4' },
    { name: 'English', emoji: '📖', color: '#7C3AED' },
    { name: 'Hindi', emoji: '🗞️', color: '#F59E0B' },
    { name: 'Mathematics', emoji: '🔢', color: '#10B981' },
    { name: 'Punjabi', emoji: '🗣️', color: '#EF4444' },
    { name: 'Science', emoji: '🔬', color: '#8B5CF6' },
    { name: 'Social St.', emoji: '🌍', color: '#F97316' }
  ]

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

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '2rem',
      overflowX: 'hidden',
      boxSizing: 'border-box'
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
    },
    pageHeader: {
      background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 50%, #5B21B6 100%)',
      borderRadius: '20px',
      padding: '3rem 2rem',
      marginBottom: '2.5rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      boxSizing: 'border-box'
    },
    pageHeaderContent: {
      color: 'white',
      position: 'relative',
      zIndex: 2
    },
    pageTitle: {
      margin: 0,
      fontSize: '3rem',
      fontWeight: '800',
      marginBottom: '1rem',
      textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
    },
    pageSubtitle: {
      opacity: 0.95,
      fontSize: '1.3rem',
      fontWeight: '400',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    },
    headerPattern: {
      position: 'absolute',
      top: '-50%',
      right: '-20%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      opacity: 0.3
    },
    backButton: {
      backgroundColor: 'white',
      color: '#7C3AED',
      border: '2px solid #7C3AED',
      borderRadius: '12px',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 4px 12px -2px rgba(124, 58, 237, 0.2)'
    },
    backButtonHover: {
      backgroundColor: '#7C3AED',
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px -5px rgba(124, 58, 237, 0.3)'
    },
    subjectsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem',
      width: '100%'
    },
    subjectCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '2.5rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '2px solid #F3F4F6',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      minHeight: '280px',
      justifyContent: 'space-between'
    },
    subjectCardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1)'
    },
    subjectEmoji: {
      fontSize: '3rem',
      marginBottom: '1rem',
      display: 'block'
    },
    subjectTitle: {
      fontSize: '1.625rem',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '0.5rem'
    },
    subjectClass: {
      fontSize: '1rem',
      color: '#6B7280',
      fontWeight: '500'
    },
    subjectAccent: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      borderRadius: '20px 20px 0 0'
    },
    buttonContainer: {
      display: 'flex',
      gap: '0.75rem',
      marginTop: '1rem',
      width: '100%',
      justifyContent: 'center'
    },
    actionButton: {
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      border: 'none',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    contentButton: {
      backgroundColor: '#7C3AED',
      color: 'white'
    },
    videoButton: {
      backgroundColor: '#EF4444',
      color: 'white'
    },
    buttonHover: {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.3)'
    }
  }

  const handleSubjectClick = (subject) => {
    if (cls === '6' && subject.name === 'Computer') {
      navigate(`/student/class/${cls}/computer-6`)
    } else if (cls === '6' && subject.name === 'English') {
      navigate(`/student/class/${cls}/english-6`)
    } else if (cls === '6' && subject.name === 'Hindi') {
      navigate(`/student/class/${cls}/hindi-6`)
    } else if (cls === '6' && subject.name === 'Mathematics') {
      navigate(`/student/class/${cls}/math-6`)
    } else {
      navigate(`/student-content?cls=${cls}&subject=${encodeURIComponent(subject.name)}`)
    }
  }

  const handleVideoClick = (subject) => {
    // Navigate to video content for classes 7-10
    const subjectParam = subject.name.toLowerCase().replace(' ', '-').replace('.', '') + `-${cls}`
    navigate(`/student/class/${cls}/videos/${subjectParam}`)
  }

  return (
    <div style={{ 
      backgroundColor: '#ffffff', 
      minHeight: '100vh', 
      overflowX: 'hidden',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={styles.container}>
        <div style={styles.content}>
          {/* Page Header */}
          <div style={styles.pageHeader}>
            <div style={styles.headerPattern}></div>
            <div style={styles.pageHeaderContent}>
              <h1 style={styles.pageTitle}>📚 Class {cls} Subjects</h1>
              <p style={styles.pageSubtitle}>
                Choose your subject to explore learning materials
              </p>
            </div>
          </div>

          {/* Back Button */}
          <button 
            style={{
              ...styles.backButton,
              ...(hoveredButton === 'back' ? styles.backButtonHover : {})
            }}
            onMouseEnter={() => setHoveredButton('back')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigate(-1)}
          >
            ← Back to Classes
          </button>

          {/* Subjects Grid */}
          <div style={styles.subjectsGrid}>
            {subjects.map((subject, index) => (
              <div 
                key={subject.name} 
                style={{
                  ...styles.subjectCard,
                  ...(hoveredCard === index ? {
                    ...styles.subjectCardHover,
                    borderColor: subject.color
                  } : {})
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div 
                  style={{
                    ...styles.subjectAccent,
                    backgroundColor: subject.color
                  }}
                />
                <div style={{ textAlign: 'center' }}>
                  <span style={styles.subjectEmoji}>{subject.emoji}</span>
                  <h3 style={styles.subjectTitle}>{subject.name}</h3>
                  <p style={styles.subjectClass}>Class {cls}</p>
                </div>
                
                <div style={styles.buttonContainer}>
                  {/* Show video button for classes 7-10 */}
                  {parseInt(cls) >= 7 && parseInt(cls) <= 10 && (
                    <button 
                      style={{
                        ...styles.actionButton,
                        ...styles.videoButton,
                        ...(hoveredButton === `video-${index}` ? styles.buttonHover : {})
                      }}
                      onMouseEnter={() => setHoveredButton(`video-${index}`)}
                      onMouseLeave={() => setHoveredButton(null)}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleVideoClick(subject)
                      }}
                    >
                      🎥 Videos
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


