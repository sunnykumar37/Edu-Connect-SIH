import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import api from '../lib/api'

export default function StudentCompetitiveBooks() {
  const [topic, setTopic] = useState('')
  const [exam, setExam] = useState('')
  const [year, setYear] = useState('2024')
  const [mcq, setMcq] = useState(10)
  const [reasoning, setReasoning] = useState(5)
  const [english, setEnglish] = useState(5)
  const [pattern, setPattern] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [generatedId, setGeneratedId] = useState(null)
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
  }, [])

  async function generate() {
    if (!topic.trim()) {
      setError('Please enter a topic')
      return
    }
    
    setSaving(true)
    setError('')
    setGeneratedId(null)
    try {
      const total = Number(mcq) + Number(reasoning) + Number(english)
      const examContext = exam ? ` for ${exam} exam` : ''
      const yearContext = year ? ` (${year} pattern)` : ''
      
      const { data } = await api.post('/ai/generate-quiz', {
        topic: `${topic}${examContext}${yearContext}`,
        numQuestions: total,
        difficulty: 'medium',
        subject: exam || 'Competitive'
      })
      setGeneratedId(data.quiz?._id || null)
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to generate quiz')
    } finally {
      setSaving(false)
    }
  }

  // Modern UI Styles
  const styles = {
    layout: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      marginLeft: '20%',
      width: '80%',
      position: 'relative',
      overflowX: 'hidden'
    },
    content: {
      width: '100%',
      padding: '2rem',
      paddingTop: '90px',
      overflowY: 'auto',
      overflowX: 'hidden',
      minHeight: '100vh',
      boxSizing: 'border-box',
      backgroundColor: '#ffffff',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    pageHeader: {
      background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065F46 100%)',
      borderRadius: '20px',
      padding: '3rem 2rem',
      marginBottom: '2.5rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '1200px',
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
    card: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '2rem',
      marginBottom: '2.5rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #F3F4F6',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      width: '100%',
      maxWidth: '1200px',
      boxSizing: 'border-box',
      overflowX: 'hidden'
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
      borderBottom: '2px solid #F3F4F6',
      textAlign: 'center',
      justifyContent: 'center'
    },
    categoriesGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    },
    categoryCard: {
      backgroundColor: '#F8FAFC',
      borderRadius: '16px',
      padding: '2rem',
      border: '2px solid #E2E8F0',
      transition: 'all 0.3s ease',
      width: '100%',
      boxSizing: 'border-box'
    },
    categoryCardHover: {
      borderColor: '#059669',
      boxShadow: '0 10px 25px -5px rgba(5, 150, 105, 0.1)'
    },
    categoryTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#374151',
      marginTop: 0,
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    categoryList: {
      fontSize: '0.875rem',
      color: '#6B7280',
      lineHeight: '1.6'
    },
    categoryListItem: {
      marginBottom: '0.75rem',
      padding: '0.75rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #E5E7EB'
    },
    examButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    examButton: {
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      border: '2px solid #E5E7EB',
      backgroundColor: '#ffffff',
      color: '#374151',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textAlign: 'left'
    },
    examButtonHover: {
      borderColor: '#059669',
      backgroundColor: '#059669',
      color: 'white',
      transform: 'translateY(-1px)'
    },
    quizSection: {
      background: 'linear-gradient(135deg, #1E293B 0%, #334155 50%, #475569 100%)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '1200px',
      boxSizing: 'border-box'
    },
    quizHeaderContent: {
      color: 'white',
      position: 'relative',
      zIndex: 2
    },
    quizTitle: {
      margin: 0,
      marginBottom: '2rem',
      fontSize: '1.75rem',
      fontWeight: '700',
      textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      textAlign: 'center'
    },
    quizForm: {
      display: 'grid',
      gap: '1.5rem'
    },
    formRow: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    numberRow: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },
    formGroupSmall: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },
    formGroupButton: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginTop: '1rem'
    },
    label: {
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#E2E8F0'
    },
    input: {
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      boxSizing: 'border-box',
      width: '100%'
    },
    inputFocus: {
      borderColor: '#059669',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(5, 150, 105, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.15)'
    },
    select: {
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      cursor: 'pointer',
      width: '100%'
    },
    numberInput: {
      padding: '0.75rem 0.5rem',
      borderRadius: '12px',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box'
    },
    generateButton: {
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      color: 'white',
      border: 'none',
      padding: '1rem 2rem',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 8px 20px -5px rgba(5, 150, 105, 0.4)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      width: '100%',
      boxSizing: 'border-box'
    },
    generateButtonHover: {
      transform: 'translateY(-2px) scale(1.02)',
      boxShadow: '0 15px 35px -5px rgba(5, 150, 105, 0.5)'
    },
    generateButtonDisabled: {
      background: '#64748B',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none'
    },
    checkbox: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#E2E8F0',
      fontSize: '0.875rem',
      marginTop: '1rem'
    },
    successCard: {
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      border: '2px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '16px',
      padding: '2rem',
      textAlign: 'center',
      marginTop: '2rem'
    },
    successText: {
      color: '#10B981',
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '1rem'
    },
    attemptButton: {
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    attemptButtonHover: {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px -2px rgba(16, 185, 129, 0.3)'
    },
    numberInputsRow: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    numberInputGroup: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      minWidth: '100px'
    },
    errorMessage: {
      backgroundColor: 'rgba(248, 113, 113, 0.2)',
      border: '1px solid rgba(248, 113, 113, 0.4)',
      borderRadius: '12px',
      padding: '1rem',
      color: '#FCA5A5',
      fontSize: '0.875rem',
      fontWeight: '500',
      textAlign: 'center',
      marginBottom: '1rem'
    }
  }

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Navbar />
      <div style={styles.layout}>
        <Sidebar />
        <div style={styles.content}>
          {/* Page Header */}
          <div style={styles.pageHeader}>
            <div style={styles.headerPattern}></div>
            <div style={styles.pageHeaderContent}>
              <h1 style={styles.pageTitle}>📚 Competitive Books</h1>
              <p style={styles.pageSubtitle}>
                Prepare for competitive exams with AI-powered practice
              </p>
            </div>
          </div>

          {/* Categories Section */}
          <div 
            style={{
              ...styles.card,
              ...(hoveredCard === 'categories' ? styles.cardHover : {})
            }}
            onMouseEnter={() => setHoveredCard('categories')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h2 style={styles.cardTitle}>
              📖 Study Categories
            </h2>
            
            <div style={styles.categoriesGrid}>
              <div 
                style={{
                  ...styles.categoryCard,
                  ...(hoveredCard === 'bookCategories' ? styles.categoryCardHover : {})
                }}
                onMouseEnter={() => setHoveredCard('bookCategories')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h4 style={styles.categoryTitle}>
                  📚 Book Categories
                </h4>
                <div style={styles.categoryList}>
                  <div style={styles.categoryListItem}>🏠 Punjab State specific books — Coming soon</div>
                  <div style={styles.categoryListItem}>🔢 Mathematics practice series — Coming soon</div>
                  <div style={styles.categoryListItem}>🧠 Reasoning & Aptitude — Coming soon</div>
                  <div style={styles.categoryListItem}>🌍 General Knowledge (Punjab) — Coming soon</div>
                </div>
              </div>
              
              <div 
                style={{
                  ...styles.categoryCard,
                  ...(hoveredCard === 'examCategories' ? styles.categoryCardHover : {})
                }}
                onMouseEnter={() => setHoveredCard('examCategories')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h4 style={styles.categoryTitle}>
                  🎯 Popular Exams (Class 10+)
                </h4>
                <div style={styles.examButtons}>
                  {['NDA (National Defence Academy)', 'Indian Navy SSR/AA', 'Air Force Group X/Y', 'Punjab Police (Constable)'].map(b => (
                    <button 
                      key={b} 
                      style={{
                        ...styles.examButton,
                        ...(hoveredButton === b ? styles.examButtonHover : {})
                      }}
                      onMouseEnter={() => setHoveredButton(b)}
                      onMouseLeave={() => setHoveredButton(null)}
                      onClick={() => setExam(b)}
                    >
                      🏅 {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Quiz Generator */}
          <div style={styles.quizSection}>
            <div style={styles.headerPattern}></div>
            <div style={styles.quizHeaderContent}>
              <h3 style={styles.quizTitle}>
                🤖 AI Competitive Quiz Generator
              </h3>
              
              {error && (
                <div style={styles.errorMessage}>
                  ⚠️ {error}
                </div>
              )}
              
              <div style={styles.quizForm}>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Topic</label>
                    <input 
                      style={styles.input}
                      placeholder="Topic (e.g., Algebra, General Knowledge)"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                        e.target.style.boxShadow = 'none'
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                      }}
                    />
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Exam Type (Optional)</label>
                    <select 
                      style={styles.select}
                      value={exam}
                      onChange={(e) => setExam(e.target.value)}
                    >
                      <option value="" style={{ color: '#6B7280' }}>Choose exam type...</option>
                      {['NDA', 'Indian Navy SSR/AA', 'Air Force X/Y', 'Punjab Police', 'SSC GD', 'Railway Group D'].map(x => (
                        <option key={x} value={x} style={{ color: '#111827' }}>{x}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Year Pattern</label>
                    <input 
                      style={styles.input}
                      placeholder="Year (e.g., 2024)"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                        e.target.style.boxShadow = 'none'
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                      }}
                    />
                  </div>
                </div>
                
                <div style={styles.numberInputsRow}>
                  <div style={styles.numberInputGroup}>
                    <label style={styles.label}>MCQ Questions</label>
                    <input 
                      type="number" 
                      min="1" 
                      style={styles.numberInput}
                      value={mcq}
                      onChange={(e) => setMcq(e.target.value)}
                      onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                        e.target.style.boxShadow = 'none'
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                      }}
                    />
                  </div>
                  
                  <div style={styles.numberInputGroup}>
                    <label style={styles.label}>Reasoning</label>
                    <input 
                      type="number" 
                      min="0" 
                      style={styles.numberInput}
                      value={reasoning}
                      onChange={(e) => setReasoning(e.target.value)}
                      onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                        e.target.style.boxShadow = 'none'
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                      }}
                    />
                  </div>
                  
                  <div style={styles.numberInputGroup}>
                    <label style={styles.label}>English</label>
                    <input 
                      type="number" 
                      min="0" 
                      style={styles.numberInput}
                      value={english}
                      onChange={(e) => setEnglish(e.target.value)}
                      onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                        e.target.style.boxShadow = 'none'
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                      }}
                    />
                  </div>
                </div>
                
                <div style={styles.formGroupButton}>
                  <button
                    style={{
                      ...styles.generateButton,
                      ...(saving || !topic.trim() ? styles.generateButtonDisabled : {}),
                      ...(hoveredButton === 'generate' && !saving && topic.trim() ? styles.generateButtonHover : {})
                    }}
                    onClick={generate}
                    disabled={saving || !topic.trim()}
                    onMouseEnter={() => setHoveredButton('generate')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    {saving ? '🔄 Generating...' : '✨ Generate Quiz'}
                  </button>
                </div>
                
                <label style={styles.checkbox}>
                  <input 
                    type="checkbox" 
                    checked={pattern} 
                    onChange={(e) => setPattern(e.target.checked)} 
                  /> 
                  📅 Emulate previous-year pattern (paraphrased)
                </label>

                {generatedId && (
                  <div style={styles.successCard}>
                    <div style={styles.successText}>
                      🎉 Quiz ready! Total questions: {Number(mcq) + Number(reasoning) + Number(english)}
                    </div>
                    <button 
                      style={{
                        ...styles.attemptButton,
                        ...(hoveredButton === 'attempt' ? styles.attemptButtonHover : {})
                      }}
                      onMouseEnter={() => setHoveredButton('attempt')}
                      onMouseLeave={() => setHoveredButton(null)}
                      onClick={() => (window.location.href = `/quizzes/${generatedId}`)}
                    >
                      🚀 Attempt Quiz
                    </button>
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


