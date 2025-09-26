import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import api from '../lib/api'
import AIQuizGenerator from '../components/AIQuizGenerator.jsx'

export default function Quizzes() {
  const [list, setList] = useState([])
  const [error, setError] = useState('')
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredButton, setHoveredButton] = useState(null)

  useEffect(() => {
    // Set body background to white
    document.body.style.backgroundColor = '#ffffff'
    document.documentElement.style.backgroundColor = '#ffffff'
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    
    load()
  }, [])

  async function load() {
    try {
      const { data } = await api.get('/quizzes')
      setList(data.items || [])
    } catch (e) {
      setError('Failed to load quizzes')
    }
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
    pageHeader: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      borderRadius: '20px',
      padding: '3rem 2rem',
      marginBottom: '2.5rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      position: 'relative',
      overflow: 'hidden'
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
      textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
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
    quizItem: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
      border: '2px solid #E2E8F0',
      borderRadius: '16px',
      padding: '2rem',
      marginBottom: '1.5rem',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    },
    quizItemHover: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderColor: '#667eea',
      transform: 'translateY(-4px) scale(1.01)',
      boxShadow: '0 15px 35px -5px rgba(102, 126, 234, 0.2), 0 5px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    quizTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    quizPreview: {
      fontSize: '0.95rem',
      color: '#6B7280',
      marginBottom: '1rem',
      lineHeight: '1.5'
    },
    attemptButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      padding: '1rem 2rem',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 8px 20px -5px rgba(102, 126, 234, 0.4)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    attemptButtonHover: {
      transform: 'translateY(-2px) scale(1.05)',
      boxShadow: '0 15px 35px -5px rgba(102, 126, 234, 0.5)'
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
    emptyState: {
      textAlign: 'center',
      color: '#6B7280',
      fontSize: '1rem',
      padding: '3rem'
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2.5rem'
    },
    statCard: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      borderRadius: '16px',
      padding: '2rem 1.5rem',
      textAlign: 'center',
      color: 'white',
      boxShadow: '0 10px 25px -5px rgba(102, 126, 234, 0.4)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    },
    statCardHover: {
      transform: 'translateY(-5px) scale(1.02)',
      boxShadow: '0 20px 40px -10px rgba(102, 126, 234, 0.5)'
    },
    statValue: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: 'white',
      marginBottom: '0.5rem',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    },
    statLabel: {
      fontSize: '1rem',
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
  }

  return (
    <>
      <Navbar />
      <div style={styles.layout}>
        <Sidebar />
        <div style={styles.content}>
          {/* Page Header */}
          <div style={styles.pageHeader}>
            <div style={styles.headerPattern}></div>
            <div style={styles.pageHeaderContent}>
              <h1 style={styles.pageTitle}>📝 Quiz Management</h1>
              <p style={styles.pageSubtitle}>
                Create, manage and track your educational quizzes
              </p>
            </div>
          </div>

          {/* Quiz Statistics */}
          <div style={styles.statsContainer}>
            <div 
              style={{
                ...styles.statCard,
                ...(hoveredCard === 'stat1' ? styles.statCardHover : {})
              }}
              onMouseEnter={() => setHoveredCard('stat1')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.statValue}>{list.length}</div>
              <div style={styles.statLabel}>Total Quizzes</div>
            </div>
            <div 
              style={{
                ...styles.statCard,
                ...(hoveredCard === 'stat2' ? styles.statCardHover : {})
              }}
              onMouseEnter={() => setHoveredCard('stat2')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.statValue}>{list.filter(q => q.isAIGenerated).length}</div>
              <div style={styles.statLabel}>AI Generated</div>
            </div>
            <div 
              style={{
                ...styles.statCard,
                ...(hoveredCard === 'stat3' ? styles.statCardHover : {})
              }}
              onMouseEnter={() => setHoveredCard('stat3')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.statValue}>{list.filter(q => !q.isAIGenerated).length}</div>
              <div style={styles.statLabel}>Manual Created</div>
            </div>
          </div>

          {/* AI Quiz Generator */}
          <div 
            style={{
              ...styles.card,
              ...(hoveredCard === 'generator' ? styles.cardHover : {})
            }}
            onMouseEnter={() => setHoveredCard('generator')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h2 style={styles.cardTitle}>
              🤖 AI Quiz Generator
            </h2>
            <AIQuizGenerator onQuizGenerated={(q) => setList(prev => [q, ...prev])} />
          </div>

          {/* Quiz List */}
          <div 
            style={{
              ...styles.card,
              ...(hoveredCard === 'list' ? styles.cardHover : {})
            }}
            onMouseEnter={() => setHoveredCard('list')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h2 style={styles.cardTitle}>
              📚 Available Quizzes
            </h2>
            
            {error && (
              <div style={styles.errorMessage}>
                ⚠️ {error}
              </div>
            )}
            
            <div>
              {(list || []).map((quiz, index) => (
                <div
                  key={quiz._id}
                  style={{
                    ...styles.quizItem,
                    ...(hoveredCard === `quiz-${index}` ? styles.quizItemHover : {})
                  }}
                  onMouseEnter={() => setHoveredCard(`quiz-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={styles.quizTitle}>
                    🎯 {quiz.title}
                    {quiz.isAIGenerated && (
                      <span style={{
                        backgroundColor: '#ECFDF5',
                        color: '#059669',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                        🤖 AI Generated
                      </span>
                    )}
                  </div>
                  
                  <div style={styles.quizPreview}>
                    {quiz.question || (quiz.questions?.[0]?.text || 'Click to view quiz questions')}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                      {quiz.questions?.length || 1} question{(quiz.questions?.length || 1) !== 1 ? 's' : ''}
                    </div>
                    
                    <button 
                      style={{
                        ...styles.attemptButton,
                        ...(hoveredButton === `attempt-${index}` ? styles.attemptButtonHover : {})
                      }}
                      onClick={() => (window.location.href = `/quizzes/${quiz._id}`)}
                      onMouseEnter={() => setHoveredButton(`attempt-${index}`)}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      🚀 Start Quiz
                    </button>
                  </div>
                </div>
              ))}
              
              {(!list || list.length === 0) && (
                <div style={styles.emptyState}>
                  📝 No quizzes available yet. Use the AI generator above to create your first quiz!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


