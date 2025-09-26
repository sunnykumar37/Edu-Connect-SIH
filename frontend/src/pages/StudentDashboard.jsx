import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import api from '../lib/api'

export default function StudentDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [subject, setSubject] = useState('')
  const [pdfClass, setPdfClass] = useState('')
  const [content, setContent] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [error, setError] = useState('')
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredButton, setHoveredButton] = useState(null)

  useEffect(() => {
    // Set body background to white - following Dashboard Background Consistency spec
    document.body.style.backgroundColor = '#ffffff'
    document.documentElement.style.backgroundColor = '#ffffff'
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    
    // Ensure root container has white background
    const rootElement = document.getElementById('root')
    if (rootElement) {
      rootElement.style.backgroundColor = '#ffffff'
    }
    
    async function init() {
      try {
        const s = await api.get('/students/me')
        setUser(s.data.student)
        const [c, q] = await Promise.all([api.get('/content'), api.get('/quizzes')])
        setContent(c.data.items || [])
        setQuizzes(q.data.items || [])
      } catch (e) {
        setError('Failed to load student dashboard')
      }
    }
    init()
  }, [])

  // Modern UI Styles
  const styles = {
    layout: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      marginLeft: '20%',
      width: '80%',
      position: 'relative'
    },
    content: {
      width: '100%',
      padding: '2rem',
      paddingTop: '90px',
      overflowY: 'auto',
      minHeight: '100vh',
      boxSizing: 'border-box',
      backgroundColor: '#ffffff',
      position: 'relative'
    },
    welcomeHeader: {
      background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 50%, #5B21B6 100%)',
      borderRadius: '20px',
      padding: '3rem 2rem',
      marginBottom: '2.5rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
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
      fontSize: '3rem',
      fontWeight: '800',
      marginBottom: '1rem',
      textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
    },
    welcomeSubtitle: {
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
    card: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '2.5rem',
      marginBottom: '2.5rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #F3F4F6',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    cardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1)'
    },
    cardTitle: {
      fontSize: '1.75rem',
      fontWeight: '700',
      color: '#111827',
      marginTop: 0,
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      paddingBottom: '1rem',
      borderBottom: '2px solid #F3F4F6'
    },
    mainLayout: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem',
      width: '100%'
    },
    gridLayout: {
      display: 'flex',
      gap: '2.5rem',
      alignItems: 'flex-start'
    },
    contentSection: {
      flex: '2',
      minWidth: '0'
    },
    quizzesSection: {
      flex: '1',
      minWidth: '300px'
    },
    contentGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    },
    contentRow: {
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'flex-start'
    },
    subCard: {
      backgroundColor: '#F8FAFC',
      borderRadius: '16px',
      padding: '2rem',
      border: '2px solid #E2E8F0',
      transition: 'all 0.3s ease',
      flex: '1',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column'
    },
    subCardHover: {
      borderColor: '#7C3AED',
      boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.1)'
    },
    subCardTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#374151',
      marginTop: 0,
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      paddingBottom: '1rem',
      borderBottom: '2px solid #E2E8F0'
    },
    classButtons: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
      marginBottom: '1.5rem'
    },
    classButton: {
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      border: '2px solid #E5E7EB',
      backgroundColor: '#ffffff',
      color: '#374151',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    classButtonHover: {
      borderColor: '#7C3AED',
      backgroundColor: '#7C3AED',
      color: 'white',
      transform: 'translateY(-1px)'
    },
    searchInput: {
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      border: '2px solid #E5E7EB',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      color: '#111827',
      width: '240px'
    },
    searchInputFocus: {
      borderColor: '#7C3AED',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.1)'
    },
    contentItem: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1rem',
      border: '1px solid #E5E7EB',
      transition: 'all 0.2s ease'
    },
    contentItemHover: {
      borderColor: '#7C3AED',
      boxShadow: '0 4px 12px -2px rgba(124, 58, 237, 0.1)'
    },
    contentTitle: {
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.5rem',
      fontSize: '1rem'
    },
    contentSubject: {
      color: '#7C3AED',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    actionButton: {
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: '#7C3AED',
      color: 'white',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginTop: '1rem'
    },
    actionButtonHover: {
      backgroundColor: '#6D28D9',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px -2px rgba(124, 58, 237, 0.3)'
    },
    linkButton: {
      color: '#7C3AED',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: '0.875rem',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      border: '1px solid #7C3AED',
      display: 'inline-block',
      marginTop: '0.5rem',
      transition: 'all 0.2s ease'
    },
    linkButtonHover: {
      backgroundColor: '#7C3AED',
      color: 'white',
      transform: 'translateY(-1px)'
    },
    contentScrollArea: {
      flex: '1',
      overflowY: 'auto',
      maxHeight: '300px',
      paddingRight: '0.5rem'
    },
    quizzesContainer: {
      overflowY: 'auto',
      maxHeight: '400px',
      paddingRight: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem 1rem',
      color: '#6B7280',
      fontSize: '1rem',
      fontStyle: 'italic'
    },
  }

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Navbar />
      <div style={styles.layout}>
        <Sidebar />
        <div style={styles.content}>
          {/* Welcome Header */}
          <div style={styles.welcomeHeader}>
            <div style={styles.headerPattern}></div>
            <div style={styles.welcomeContent}>
              <h1 style={styles.welcomeTitle}>🎓 Welcome, {user?.name || 'Student'}!</h1>
              <p style={styles.welcomeSubtitle}>
                📚 Your personalized learning dashboard
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={styles.errorMessage}>
              ⚠️ {error}
            </div>
          )}

          {/* Search Section */}
          <div 
            style={{
              ...styles.card,
              ...(hoveredCard === 'search' ? styles.cardHover : {})
            }}
            onMouseEnter={() => setHoveredCard('search')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', alignItems: 'center', gap: '2rem' }}>
              <h3 style={styles.cardTitle}>
                🔍 Browse by Subject
              </h3>
              <input 
                style={styles.searchInput}
                placeholder="Search subjects (e.g., Maths)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                onFocus={(e) => Object.assign(e.target.style, styles.searchInputFocus)}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
          </div>

          {/* Main Content Layout - Row-wise */}
          <div style={styles.mainLayout}>
            
            {/* 1. Learning Content Section */}
            <div 
              style={{
                ...styles.card,
                ...(hoveredCard === 'content' ? styles.cardHover : {})
              }}
              onMouseEnter={() => setHoveredCard('content')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3 style={styles.cardTitle}>
                📖 Learning Content
              </h3>
              
              <div style={styles.contentGrid}>
                {/* First Row: Online PDF and Video Content */}
                <div style={styles.contentRow}>
                  {/* Online PDF Content */}
                  <div 
                    style={{
                      ...styles.subCard,
                      ...(hoveredCard === 'pdf' ? styles.subCardHover : {})
                    }}
                    onMouseEnter={() => setHoveredCard('pdf')}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <h4 style={styles.subCardTitle}>
                      📄 Online PDF Content
                    </h4>
                    
                    <div style={styles.classButtons}>
                      {[6,7,8,9,10].map(cls => (
                        <button 
                          key={cls} 
                          style={{
                            ...styles.classButton,
                            ...(hoveredButton === `class-${cls}` ? styles.classButtonHover : {})
                          }}
                          onMouseEnter={() => setHoveredButton(`class-${cls}`)}
                          onMouseLeave={() => setHoveredButton(null)}
                          onClick={() => (window.location.href = `/student/class/${cls}`)}
                        >
                          Class {cls}
                        </button>
                      ))}
                      {pdfClass && (
                        <button 
                          style={{
                            ...styles.classButton,
                            backgroundColor: '#DC2626',
                            color: 'white',
                            borderColor: '#DC2626'
                          }}
                          onClick={() => setPdfClass('')}
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    
                    <div style={styles.contentScrollArea}>
                      {(content || [])
                        .filter(c => c.type === 'pdf' && !c.fileUrl)
                        .filter(c => !subject || (c.subject || '').toLowerCase().includes(subject.toLowerCase()))
                        .filter(c => !pdfClass ||
                          (c.subject || '').includes(pdfClass) ||
                          (c.title || '').includes(pdfClass) ||
                          (c.description || '').includes(pdfClass))
                        .length > 0 ? (
                          (content || [])
                            .filter(c => c.type === 'pdf' && !c.fileUrl)
                            .filter(c => !subject || (c.subject || '').toLowerCase().includes(subject.toLowerCase()))
                            .filter(c => !pdfClass ||
                              (c.subject || '').includes(pdfClass) ||
                              (c.title || '').includes(pdfClass) ||
                              (c.description || '').includes(pdfClass))
                            .map(c => (
                              <div key={c._id} style={styles.contentItem}>
                                <div style={styles.contentTitle}>{c.title}</div>
                                {c.subject && <div style={styles.contentSubject}>📚 {c.subject}</div>}
                                {c.linkUrl && (
                                  <a 
                                    href={c.linkUrl} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    style={styles.linkButton}
                                  >
                                    📖 Open PDF
                                  </a>
                                )}
                              </div>
                            ))
                        ) : (
                          <div style={styles.emptyState}>
                            📄 No PDF content available
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Video Content */}
                  <div 
                    style={{
                      ...styles.subCard,
                      ...(hoveredCard === 'video' ? styles.subCardHover : {})
                    }}
                    onMouseEnter={() => setHoveredCard('video')}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <h4 style={styles.subCardTitle}>
                      🎥 Video Content
                    </h4>
                    
                    {/* Class-wise Video Navigation */}
                    <div style={styles.classButtons}>
                      {[7,8,9,10].map(cls => (
                        <button 
                          key={cls} 
                          style={{
                            ...styles.classButton,
                            ...(hoveredButton === `video-class-${cls}` ? styles.classButtonHover : {})
                          }}
                          onMouseEnter={() => setHoveredButton(`video-class-${cls}`)}
                          onMouseLeave={() => setHoveredButton(null)}
                          onClick={() => navigate(`/student/class/${cls}`)}
                        >
                          🎥 Class {cls} Videos
                        </button>
                      ))}
                    </div>
                    
                    <div style={styles.contentScrollArea}>
                      {/* Database Video Content */}
                      {(content || [])
                        .filter(c => c.type === 'video')
                        .filter(c => !subject || (c.subject || '').toLowerCase().includes(subject.toLowerCase()))
                        .length > 0 ? (
                          (content || [])
                            .filter(c => c.type === 'video')
                            .filter(c => !subject || (c.subject || '').toLowerCase().includes(subject.toLowerCase()))
                            .map(c => (
                              <div key={c._id} style={styles.contentItem}>
                                <div style={styles.contentTitle}>{c.title}</div>
                                {c.subject && <div style={styles.contentSubject}>🎬 {c.subject}</div>}
                                {c.fileUrl && (
                                  <a 
                                    href={c.fileUrl} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    style={styles.linkButton}
                                  >
                                    ▶️ Watch Video
                                  </a>
                                )}
                              </div>
                            ))
                        ) : (
                          <div style={styles.emptyState}>
                            🎥 No database videos available<br/>
                            📚 Use the Class buttons above to access educational videos
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Class Content Section (Full Width) */}
            <div 
              style={{
                ...styles.card,
                ...(hoveredCard === 'class' ? styles.cardHover : {})
              }}
              onMouseEnter={() => setHoveredCard('class')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3 style={styles.cardTitle}>
                🏫 Class Content
              </h3>
              
              <div style={styles.contentScrollArea}>
                {(content || [])
                  .filter(c => c.type === 'link' || (c.type === 'pdf' && c.fileUrl))
                  .filter(c => !subject || (c.subject || '').toLowerCase().includes(subject.toLowerCase()))
                  .length > 0 ? (
                    (content || [])
                      .filter(c => c.type === 'link' || (c.type === 'pdf' && c.fileUrl))
                      .filter(c => !subject || (c.subject || '').toLowerCase().includes(subject.toLowerCase()))
                      .map(c => (
                        <div key={c._id} style={styles.contentItem}>
                          <div style={styles.contentTitle}>{c.title}</div>
                          {c.subject && <div style={styles.contentSubject}>📝 {c.subject}</div>}
                          {c.linkUrl && (
                            <a 
                              href={c.linkUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              style={styles.linkButton}
                            >
                              🔗 Open Link
                            </a>
                          )}
                          {c.fileUrl && (
                            <a 
                              href={c.fileUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              style={styles.linkButton}
                            >
                              📄 Open File
                            </a>
                          )}
                        </div>
                      ))
                  ) : (
                    <div style={styles.emptyState}>
                      🏫 No class content available
                    </div>
                  )}
              </div>
            </div>

            {/* 3. Quizzes Section (Full Width) */}
            <div 
              style={{
                ...styles.card,
                ...(hoveredCard === 'quizzes' ? styles.cardHover : {})
              }}
              onMouseEnter={() => setHoveredCard('quizzes')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3 style={styles.cardTitle}>
                🧠 Available Quizzes
              </h3>
              
              <div style={styles.quizzesContainer}>
                {(quizzes || [])
                  .filter(q => !subject || (q.subject || '').toLowerCase().includes(subject.toLowerCase()))
                  .length > 0 ? (
                    (quizzes || [])
                      .filter(q => !subject || (q.subject || '').toLowerCase().includes(subject.toLowerCase()))
                      .map(q => (
                        <div 
                          key={q._id} 
                          style={{
                            ...styles.contentItem,
                            ...(hoveredCard === `quiz-${q._id}` ? styles.contentItemHover : {}),
                            margin: 0
                          }}
                          onMouseEnter={() => setHoveredCard(`quiz-${q._id}`)}
                          onMouseLeave={() => setHoveredCard(null)}
                        >
                          <div style={styles.contentTitle}>
                            {q.title}
                            {q.isAIGenerated && (
                              <span style={{ 
                                color: '#10B981', 
                                fontSize: '0.75rem', 
                                marginLeft: '0.5rem',
                                backgroundColor: '#D1FAE5',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '12px',
                                fontWeight: '600'
                              }}>
                                🤖 AI Generated
                              </span>
                            )}
                          </div>
                          {q.subject && <div style={styles.contentSubject}>🎯 {q.subject}</div>}
                          <button 
                            style={{
                              ...styles.actionButton,
                              ...(hoveredButton === `attempt-${q._id}` ? styles.actionButtonHover : {})
                            }}
                            onMouseEnter={() => setHoveredButton(`attempt-${q._id}`)}
                            onMouseLeave={() => setHoveredButton(null)}
                            onClick={() => (window.location.href = `/quizzes/${q._id}`)}
                          >
                            🚀 Attempt Quiz
                          </button>
                        </div>
                      ))
                  ) : (
                    <div style={styles.emptyState}>
                      📝 No quizzes available at the moment
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


