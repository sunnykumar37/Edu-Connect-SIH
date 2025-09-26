import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import api from '../lib/api'

export default function Results() {
  const [results, setResults] = useState([])
  const [classFilter, setClassFilter] = useState('')
  const [quizFilter, setQuizFilter] = useState('')
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredButton, setHoveredButton] = useState(null)
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null
  
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
    
    (async () => {
      const { data } = await api.get('/quizzes/results')
      setResults(data.results || [])
    })()
  }, [])

  const classes = useMemo(() => Array.from(new Set((results || []).map(r => r.student?.className).filter(Boolean))), [results])
  const quizzes = useMemo(() => Array.from(new Set((results || []).map(r => r.quiz?.title).filter(Boolean))), [results])

  const filtered = useMemo(() => (results || []).filter(r => {
    const okClass = !classFilter || r.student?.className === classFilter
    const okQuiz = !quizFilter || r.quiz?.title === quizFilter
    return okClass && okQuiz
  }), [results, classFilter, quizFilter])

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
    pageHeader: {
      background: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)',
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
    filterContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    filterGroup: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    },
    select: {
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      border: '2px solid #E5E7EB',
      fontSize: '0.95rem',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      minWidth: '150px'
    },
    exportButton: {
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      padding: '0.875rem 1.5rem',
      borderRadius: '12px',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    exportButtonHover: {
      transform: 'translateY(-1px)',
      boxShadow: '0 8px 15px -3px rgba(16, 185, 129, 0.4)'
    },
    resultItem: {
      backgroundColor: '#F8FAFC',
      border: '2px solid #E2E8F0',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '1rem',
      transition: 'all 0.3s ease'
    },
    resultItemHover: {
      backgroundColor: '#ffffff',
      borderColor: '#10B981',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    resultGrid: {
      display: 'grid',
      gap: '1rem'
    },
    teacherGrid: {
      gridTemplateColumns: '1.2fr 0.8fr 0.8fr 1fr 1fr 0.8fr'
    },
    studentGrid: {
      gridTemplateColumns: '1fr 1fr 1fr'
    },
    resultField: {
      display: 'flex',
      flexDirection: 'column'
    },
    fieldLabel: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#6B7280',
      marginBottom: '0.25rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    fieldValue: {
      fontSize: '1rem',
      fontWeight: '500',
      color: '#111827'
    },
    scoreValue: {
      fontSize: '1.125rem',
      fontWeight: '700',
      color: '#10B981'
    },
    emptyState: {
      textAlign: 'center',
      color: '#6B7280',
      fontSize: '1rem',
      padding: '3rem'
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    statCard: {
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      border: 'none',
      borderRadius: '16px',
      padding: '1.5rem',
      textAlign: 'center',
      color: 'white',
      boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
      transition: 'all 0.3s ease'
    },
    statCardHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 15px 35px -5px rgba(16, 185, 129, 0.5)'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: '800',
      marginBottom: '0.5rem'
    },
    statLabel: {
      fontSize: '0.875rem',
      opacity: 0.9,
      fontWeight: '500'
    }
  }

  function exportCsv() {
    const rows = [
      ['Student', 'Class', 'Roll No.', 'Quiz', 'Attempts', 'Marks', 'Submitted'],
      ...filtered.map(r => [
        r.student?.name || '',
        r.student?.className || '',
        r.student?.rollNumber || '',
        r.quiz?.title || '',
        '1',
        `${r.correctCount || 0}/${r.total || 0}`,
        new Date(r.createdAt).toLocaleString(),
      ])
    ]
    const csv = rows.map(row => row.map(x => `"${String(x).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'quiz-results.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Teacher detailed view
  const teacherView = (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Navbar />
      <div style={styles.layout}>
        <Sidebar />
        <div style={styles.content}>
          {/* Page Header */}
          <div style={styles.pageHeader}>
            <div style={styles.headerPattern}></div>
            <div style={styles.pageHeaderContent}>
              <h1 style={styles.pageTitle}>📊 Quiz Results Analytics</h1>
              <p style={styles.pageSubtitle}>
                Monitor student performance and track quiz outcomes
              </p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div style={styles.statsContainer}>
            <div 
              style={{
                ...styles.statCard,
                ...(hoveredCard === 'totalResults' ? styles.statCardHover : {})
              }}
              onMouseEnter={() => setHoveredCard('totalResults')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.statValue}>{filtered.length}</div>
              <div style={styles.statLabel}>Total Results</div>
            </div>
            <div 
              style={{
                ...styles.statCard,
                ...(hoveredCard === 'avgScore' ? styles.statCardHover : {})
              }}
              onMouseEnter={() => setHoveredCard('avgScore')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.statValue}>
                {filtered.length > 0 
                  ? Math.round((filtered.reduce((sum, r) => sum + (r.correctCount || 0), 0) / filtered.length) * 10) / 10
                  : 0
                }
              </div>
              <div style={styles.statLabel}>Average Score</div>
            </div>
            <div 
              style={{
                ...styles.statCard,
                ...(hoveredCard === 'totalQuizzes' ? styles.statCardHover : {})
              }}
              onMouseEnter={() => setHoveredCard('totalQuizzes')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.statValue}>{quizzes.length}</div>
              <div style={styles.statLabel}>Total Quizzes</div>
            </div>
          </div>

          {/* Results Management */}
          <div 
            style={{
              ...styles.card,
              ...(hoveredCard === 'results' ? styles.cardHover : {})
            }}
            onMouseEnter={() => setHoveredCard('results')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.filterContainer}>
              <h2 style={styles.cardTitle}>
                📋 Student Results
              </h2>
              <div style={styles.filterGroup}>
                <select 
                  style={styles.select} 
                  value={classFilter} 
                  onChange={(e) => setClassFilter(e.target.value)}
                >
                  <option value="">🎓 All Classes</option>
                  {classes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select 
                  style={styles.select} 
                  value={quizFilter} 
                  onChange={(e) => setQuizFilter(e.target.value)}
                >
                  <option value="">📝 All Quizzes</option>
                  {quizzes.map(q => <option key={q} value={q}>{q}</option>)}
                </select>
                <button 
                  style={{
                    ...styles.exportButton,
                    ...(hoveredButton === 'export' ? styles.exportButtonHover : {})
                  }}
                  onClick={exportCsv}
                  onMouseEnter={() => setHoveredButton('export')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  📥 Export CSV
                </button>
              </div>
            </div>
            
            <div>
              {filtered.map((result, index) => (
                <div
                  key={result._id}
                  style={{
                    ...styles.resultItem,
                    ...(hoveredCard === `result-${index}` ? styles.resultItemHover : {})
                  }}
                  onMouseEnter={() => setHoveredCard(`result-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={{ ...styles.resultGrid, ...styles.teacherGrid }}>
                    <div style={styles.resultField}>
                      <div style={styles.fieldLabel}>Student</div>
                      <div style={styles.fieldValue}>{result.student?.name || '-'}</div>
                    </div>
                    <div style={styles.resultField}>
                      <div style={styles.fieldLabel}>Class</div>
                      <div style={styles.fieldValue}>{result.student?.className || '-'}</div>
                    </div>
                    <div style={styles.resultField}>
                      <div style={styles.fieldLabel}>Roll No.</div>
                      <div style={styles.fieldValue}>{result.student?.rollNumber || '-'}</div>
                    </div>
                    <div style={styles.resultField}>
                      <div style={styles.fieldLabel}>Quiz</div>
                      <div style={styles.fieldValue}>{result.quiz?.title}</div>
                    </div>
                    <div style={styles.resultField}>
                      <div style={styles.fieldLabel}>Attempts</div>
                      <div style={styles.fieldValue}>1</div>
                    </div>
                    <div style={styles.resultField}>
                      <div style={styles.fieldLabel}>Score</div>
                      <div style={styles.scoreValue}>{result.correctCount}/{result.total}</div>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div style={styles.emptyState}>
                  📭 No quiz submissions found. Results will appear here once students complete quizzes.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Student compact view
  const studentView = (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Navbar />
      <div style={styles.layout}>
        <Sidebar />
        <div style={styles.content}>
          {/* Page Header */}
          <div style={styles.pageHeader}>
            <div style={styles.headerPattern}></div>
            <div style={styles.pageHeaderContent}>
              <h1 style={styles.pageTitle}>🎆 My Quiz Results</h1>
              <p style={styles.pageSubtitle}>
                Track your performance and progress
              </p>
            </div>
          </div>

          {/* Student Statistics */}
          <div style={styles.statsContainer}>
            <div 
              style={{
                ...styles.statCard,
                ...(hoveredCard === 'totalAttempts' ? styles.statCardHover : {})
              }}
              onMouseEnter={() => setHoveredCard('totalAttempts')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.statValue}>{results.length}</div>
              <div style={styles.statLabel}>Quizzes Taken</div>
            </div>
            <div 
              style={{
                ...styles.statCard,
                ...(hoveredCard === 'myAvgScore' ? styles.statCardHover : {})
              }}
              onMouseEnter={() => setHoveredCard('myAvgScore')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.statValue}>
                {results.length > 0 
                  ? Math.round((results.reduce((sum, r) => sum + (r.correctCount || 0), 0) / results.length) * 10) / 10
                  : 0
                }
              </div>
              <div style={styles.statLabel}>Average Score</div>
            </div>
            <div 
              style={{
                ...styles.statCard,
                ...(hoveredCard === 'bestScore' ? styles.statCardHover : {})
              }}
              onMouseEnter={() => setHoveredCard('bestScore')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.statValue}>
                {results.length > 0 
                  ? Math.max(...results.map(r => r.correctCount || 0))
                  : 0
                }
              </div>
              <div style={styles.statLabel}>Best Score</div>
            </div>
          </div>

          {/* My Results */}
          <div 
            style={{
              ...styles.card,
              ...(hoveredCard === 'myResults' ? styles.cardHover : {})
            }}
            onMouseEnter={() => setHoveredCard('myResults')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h2 style={styles.cardTitle}>
              📋 My Quiz History
            </h2>
            
            <div>
              {(results || []).map((result, index) => (
                <div
                  key={result._id}
                  style={{
                    ...styles.resultItem,
                    ...(hoveredCard === `myResult-${index}` ? styles.resultItemHover : {})
                  }}
                  onMouseEnter={() => setHoveredCard(`myResult-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={{ ...styles.resultGrid, ...styles.studentGrid }}>
                    <div style={styles.resultField}>
                      <div style={styles.fieldLabel}>Quiz</div>
                      <div style={styles.fieldValue}>{result.quiz?.title}</div>
                    </div>
                    <div style={styles.resultField}>
                      <div style={styles.fieldLabel}>Score</div>
                      <div style={styles.scoreValue}>{result.correctCount}/{result.total}</div>
                    </div>
                    <div style={styles.resultField}>
                      <div style={styles.fieldLabel}>Submitted</div>
                      <div style={styles.fieldValue}>{new Date(result.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  {/* Performance indicator */}
                  <div style={{
                    marginTop: '1rem',
                    height: '4px',
                    backgroundColor: '#E5E7EB',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${((result.correctCount / result.total) * 100)}%`,
                      backgroundColor: '#10B981',
                      borderRadius: '2px',
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                </div>
              ))}
              
              {(!results || results.length === 0) && (
                <div style={styles.emptyState}>
                  📘 No quiz attempts yet. Take your first quiz to see results here!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return role === 'teacher' ? teacherView : studentView
}


