import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import api from '../lib/api'

export default function TeacherQuizzes() {
  const [title, setTitle] = useState('')
  const [klass, setKlass] = useState('')
  const [numQuestions, setNumQuestions] = useState(1)
  const [questions, setQuestions] = useState([{ text: '', options: ['', '', '', ''], correct: 0 }])
  const [saving, setSaving] = useState(false)
  const [list, setList] = useState([])
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredButton, setHoveredButton] = useState(null)
  const [focusedInput, setFocusedInput] = useState(null)

  async function load() {
    try {
      const { data } = await api.get('/quizzes')
      setList(data.items || [])
    } catch (error) {
      console.error('Failed to load quizzes:', error)
    }
  }
  
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
    
    load()
  }, [])

  function setQ(idx, patch) {
    setQuestions(qs => qs.map((q, i) => (i === idx ? { ...q, ...patch } : q)))
  }

  function resizeQuestions(n) {
    const count = Math.max(1, Math.min(50, Number(n) || 1))
    setNumQuestions(count)
    setQuestions(prev => {
      const cp = [...prev]
      if (cp.length < count) while (cp.length < count) cp.push({ text: '', options: ['', '', '', ''], correct: 0 })
      else cp.length = count
      return cp
    })
  }

  async function saveQuiz() {
    setSaving(true)
    try {
      const cleaned = questions
        .filter(q => (q.text || '').trim() && (q.options || []).every(o => (o || '').trim()))
        .map(q => ({ text: q.text.trim(), options: q.options.map(o => o.trim()), correct: q.correct }))
      if (!title.trim() || cleaned.length === 0) {
        alert('Please complete all fields')
        return
      }
      const payload = { title: title.trim(), className: klass, subject: 'MCQ', questions: cleaned }
      await api.post('/quizzes', payload)
      setTitle(''); setKlass(''); setNumQuestions(1); setQuestions([{ text: '', options: ['', '', '', ''], correct: 0 }])
      await load()
    } catch (error) {
      console.error('Failed to save quiz:', error)
      alert('Failed to save quiz. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const styles = {
    layout: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      marginLeft: '20%',
      width: '80%',
      position: 'relative',
      overflowX: 'hidden',
      boxSizing: 'border-box'
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
    mainGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    leftColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem',
      width: '100%'
    },
    quizListRow: {
      width: '100%',
      maxWidth: '1400px'
    },
    settingsCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #F3F4F6',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      boxSizing: 'border-box'
    },
    questionsSection: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #F3F4F6',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      boxSizing: 'border-box'
    },
    quizListSection: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '2.5rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #F3F4F6',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      width: '100%'
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
    metaGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    metaRow: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '1.5rem'
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
    questionCard: {
      backgroundColor: '#F8FAFC',
      borderRadius: '16px',
      padding: '2rem',
      marginBottom: '1.5rem',
      border: '2px solid #E2E8F0',
      transition: 'all 0.3s ease'
    },
    questionCardHover: {
      borderColor: '#7C3AED',
      boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.1)'
    },
    questionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #E2E8F0'
    },
    questionNumber: {
      fontSize: '1.2rem',
      fontWeight: '700',
      color: '#7C3AED',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    classInfo: {
      fontSize: '0.9rem',
      color: '#6B7280',
      fontWeight: '500',
      background: '#F3F4F6',
      padding: '0.5rem 1rem',
      borderRadius: '20px'
    },
    optionsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      marginTop: '1.5rem'
    },
    correctSelector: {
      marginTop: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    select: {
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      border: '2px solid #E5E7EB',
      fontSize: '1rem',
      backgroundColor: '#ffffff',
      color: '#111827',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    selectFocus: {
      borderColor: '#7C3AED',
      outline: 'none'
    },
    saveSection: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '2rem',
      display: 'flex',
      justifyContent: 'flex-end',
      boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.1)'
    },
    saveButton: {
      backgroundColor: '#7C3AED',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '1rem 2rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px -2px rgba(124, 58, 237, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    saveButtonHover: {
      backgroundColor: '#6D28D9',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px -5px rgba(124, 58, 237, 0.4)'
    },
    saveButtonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none'
    },
    quizListCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1rem',
      border: '1px solid #E5E7EB',
      transition: 'all 0.2s ease'
    },
    quizListCardHover: {
      borderColor: '#7C3AED',
      boxShadow: '0 4px 12px -2px rgba(124, 58, 237, 0.1)',
      transform: 'translateY(-2px)'
    },
    quizTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.5rem'
    },
    quizMeta: {
      fontSize: '0.875rem',
      color: '#6B7280'
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem 1rem',
      color: '#6B7280',
      fontSize: '1rem',
      fontStyle: 'italic'
    },
    scrollArea: {
      maxHeight: '50vh',
      overflowY: 'auto',
      paddingRight: '0.5rem'
    },
    quizListScrollArea: {
      maxHeight: '400px',
      overflowY: 'auto',
      paddingRight: '0.5rem'
    },
    quizListGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      width: '100%'
    }
  }

  return (
    <div style={{ 
      backgroundColor: '#ffffff', 
      minHeight: '100vh', 
      overflowX: 'hidden',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <Navbar />
      <div style={styles.layout}>
        <Sidebar />
        <div style={styles.content}>
          {/* Page Header */}
          <div style={styles.pageHeader}>
            <div style={styles.headerPattern}></div>
            <div style={styles.pageHeaderContent}>
              <h1 style={styles.pageTitle}>📝 Create Quiz</h1>
              <p style={styles.pageSubtitle}>
                Build engaging quizzes for your students
              </p>
            </div>
          </div>

          {/* Main Content Layout - 3 Rows */}
          <div style={styles.mainGrid}>
            
            {/* Row 1: Quiz Settings */}
            <div 
              style={{
                ...styles.settingsCard,
                ...(hoveredCard === 'meta' ? styles.cardHover : {})
              }}
              onMouseEnter={() => setHoveredCard('meta')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3 style={styles.cardTitle}>
                ⚙️ Quiz Settings
              </h3>
              <div style={styles.metaGrid}>
                <input 
                  placeholder="Quiz Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    ...styles.input,
                    ...(focusedInput === 'title' ? styles.inputFocus : {})
                  }}
                  onFocus={() => setFocusedInput('title')}
                  onBlur={() => setFocusedInput(null)}
                />
                <div style={styles.metaRow}>
                  <input 
                    placeholder="Class"
                    value={klass}
                    onChange={(e) => setKlass(e.target.value)}
                    style={{
                      ...styles.input,
                      ...(focusedInput === 'class' ? styles.inputFocus : {})
                    }}
                    onFocus={() => setFocusedInput('class')}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <input 
                    type="number"
                    min="1"
                    max="50"
                    placeholder="No. of Questions"
                    value={numQuestions}
                    onChange={(e) => resizeQuestions(e.target.value)}
                    style={{
                      ...styles.input,
                      ...(focusedInput === 'num' ? styles.inputFocus : {})
                    }}
                    onFocus={() => setFocusedInput('num')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Questions Editor */}
            <div style={styles.questionsSection}>
              <h3 style={styles.cardTitle}>
                📝 Questions Editor
              </h3>
              
              <div style={styles.scrollArea}>
                {questions.map((q, idx) => (
                  <div 
                    key={idx} 
                    style={{
                      ...styles.questionCard,
                      ...(hoveredCard === `question-${idx}` ? styles.questionCardHover : {})
                    }}
                    onMouseEnter={() => setHoveredCard(`question-${idx}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div style={styles.questionHeader}>
                      <div style={styles.questionNumber}>
                        📝 Question {idx + 1}
                      </div>
                      <div style={styles.classInfo}>
                        Class: {klass || 'Not set'}
                      </div>
                    </div>
                    
                    <input 
                      placeholder="Enter your question here..."
                      value={q.text}
                      onChange={(e) => setQ(idx, { text: e.target.value })}
                      style={{
                        ...styles.input,
                        width: '100%',
                        marginBottom: '1.5rem',
                        ...(focusedInput === `question-${idx}` ? styles.inputFocus : {})
                      }}
                      onFocus={() => setFocusedInput(`question-${idx}`)}
                      onBlur={() => setFocusedInput(null)}
                    />
                    
                    <div style={styles.optionsGrid}>
                      {q.options.map((opt, oi) => (
                        <input 
                          key={oi}
                          placeholder={`Option ${oi + 1}`}
                          value={opt}
                          onChange={(e) => {
                            const newOptions = [...q.options]
                            newOptions[oi] = e.target.value
                            setQ(idx, { options: newOptions })
                          }}
                          style={{
                            ...styles.input,
                            ...(focusedInput === `option-${idx}-${oi}` ? styles.inputFocus : {})
                          }}
                          onFocus={() => setFocusedInput(`option-${idx}-${oi}`)}
                          onBlur={() => setFocusedInput(null)}
                        />
                      ))}
                    </div>
                    
                    <div style={styles.correctSelector}>
                      <label style={{ fontWeight: '600', color: '#374151' }}>
                        ✅ Correct Answer:
                      </label>
                      <select 
                        value={q.correct}
                        onChange={(e) => setQ(idx, { correct: Number(e.target.value) })}
                        style={{
                          ...styles.select,
                          ...(focusedInput === `correct-${idx}` ? styles.selectFocus : {})
                        }}
                        onFocus={() => setFocusedInput(`correct-${idx}`)}
                        onBlur={() => setFocusedInput(null)}
                      >
                        <option value={0}>Option 1</option>
                        <option value={1}>Option 2</option>
                        <option value={2}>Option 3</option>
                        <option value={3}>Option 4</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={styles.saveSection}>
                <button 
                  style={{
                    ...styles.saveButton,
                    ...(hoveredButton === 'save' ? styles.saveButtonHover : {}),
                    ...(saving ? styles.saveButtonDisabled : {})
                  }}
                  onMouseEnter={() => setHoveredButton('save')}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={saveQuiz}
                  disabled={saving}
                >
                  {saving ? '🔄 Saving...' : '🚀 Save Quiz'}
                </button>
              </div>
            </div>

            {/* Row 3: Your Quizzes - Integrated without separate div */}
            <h3 style={styles.cardTitle}>
              📚 Your Quizzes ({(list || []).length})
            </h3>
            
            <div style={styles.quizListScrollArea}>
              {(list || []).length > 0 ? (
                <div style={styles.quizListGrid}>
                  {(list || []).map(q => (
                    <div 
                      key={q._id} 
                      style={{
                        ...styles.quizListCard,
                        ...(hoveredCard === `quiz-${q._id}` ? styles.quizListCardHover : {})
                      }}
                      onMouseEnter={() => setHoveredCard(`quiz-${q._id}`)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div style={styles.quizTitle}>
                        🧠 {q.title}
                      </div>
                      <div style={styles.quizMeta}>
                        Class: {q.className || 'Not specified'} • {q.questions?.length || 0} questions
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={styles.emptyState}>
                  📝 No quizzes created yet.
                  <br />Create your first quiz!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


