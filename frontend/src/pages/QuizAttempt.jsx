import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import api from '../lib/api'

export default function QuizAttempt() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState([])
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredButton, setHoveredButton] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)

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
    
    ;(async () => {
      try {
        const { data } = await api.get('/quizzes')
        const q = (data.items || []).find(x => x._id === id)
        setQuiz(q)
        setAnswers(new Array(q?.questions?.length || 0).fill(null))
      } catch (error) {
        setMessage('Failed to load quiz')
      }
    })()
  }, [id])

  async function submit() {
    try {
      const { data } = await api.post('/quizzes/submit', { quizId: id, responses: answers })
      setMessage(`Score: ${data.correctCount}/${data.total}`)
      setScore({ correct: data.correctCount, total: data.total })
      setSubmitted(true)
    } catch (e) {
      setMessage('Submission failed')
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
      alignItems: 'center',
      maxWidth: '100%'
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
      fontSize: '2.5rem',
      fontWeight: '800',
      marginBottom: '1rem',
      textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
    },
    pageSubtitle: {
      opacity: 0.95,
      fontSize: '1.2rem',
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
    progressContainer: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #F3F4F6',
      width: '100%',
      maxWidth: '1200px',
      boxSizing: 'border-box'
    },
    progressBar: {
      width: '100%',
      height: '12px',
      backgroundColor: '#F3F4F6',
      borderRadius: '6px',
      overflow: 'hidden',
      marginBottom: '1rem'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #7C3AED, #6D28D9)',
      borderRadius: '6px',
      transition: 'width 0.3s ease'
    },
    progressText: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#374151',
      textAlign: 'center'
    },
    questionCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '2.5rem',
      marginBottom: '2rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #F3F4F6',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      width: '100%',
      maxWidth: '1200px',
      boxSizing: 'border-box'
    },
    questionCardHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 8px 16px -4px rgba(0, 0, 0, 0.1)'
    },
    questionNumber: {
      backgroundColor: '#7C3AED',
      color: 'white',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1rem',
      fontWeight: '700',
      marginBottom: '1rem'
    },
    questionText: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '2rem',
      lineHeight: '1.6'
    },
    optionsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    optionItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '1rem 1.5rem',
      backgroundColor: '#F8FAFC',
      border: '2px solid #E2E8F0',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '1rem',
      color: '#374151'
    },
    optionItemHover: {
      backgroundColor: '#EDE9FE',
      borderColor: '#7C3AED'
    },
    optionItemSelected: {
      backgroundColor: '#7C3AED',
      borderColor: '#7C3AED',
      color: 'white'
    },
    optionItemDisabled: {
      cursor: 'not-allowed',
      opacity: 0.6
    },
    radioInput: {
      marginRight: '1rem',
      width: '20px',
      height: '20px',
      accentColor: '#7C3AED'
    },
    resultCard: {
      padding: '1.5rem',
      borderRadius: '12px',
      marginTop: '1.5rem',
      border: '2px solid'
    },
    correctResult: {
      backgroundColor: '#D1FAE5',
      borderColor: '#10B981',
      color: '#065F46'
    },
    incorrectResult: {
      backgroundColor: '#FEE2E2',
      borderColor: '#EF4444',
      color: '#991B1B'
    },
    resultTitle: {
      fontSize: '1.1rem',
      fontWeight: '700',
      marginBottom: '0.5rem'
    },
    resultText: {
      fontSize: '0.95rem',
      marginBottom: '0.25rem'
    },
    actionButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      marginTop: '2rem',
      flexWrap: 'wrap'
    },
    submitButton: {
      backgroundColor: '#7C3AED',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '1rem 2rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px -2px rgba(124, 58, 237, 0.3)'
    },
    submitButtonHover: {
      backgroundColor: '#6D28D9',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px -5px rgba(124, 58, 237, 0.4)'
    },
    backButton: {
      backgroundColor: 'white',
      color: '#7C3AED',
      border: '2px solid #7C3AED',
      borderRadius: '12px',
      padding: '1rem 2rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    backButtonHover: {
      backgroundColor: '#7C3AED',
      color: 'white',
      transform: 'translateY(-2px)'
    },
    scoreCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '2.5rem',
      marginBottom: '2rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
      border: '1px solid #F3F4F6',
      textAlign: 'center',
      width: '100%',
      maxWidth: '600px'
    },
    scoreTitle: {
      fontSize: '2rem',
      fontWeight: '800',
      color: '#111827',
      marginBottom: '1rem'
    },
    scoreValue: {
      fontSize: '3rem',
      fontWeight: '900',
      color: '#7C3AED',
      marginBottom: '1rem'
    },
    loadingCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '3rem',
      textAlign: 'center',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '600px'
    },
    errorMessage: {
      backgroundColor: '#FEE2E2',
      border: '1px solid #FECACA',
      borderRadius: '12px',
      padding: '1rem',
      color: '#DC2626',
      marginTop: '1rem',
      textAlign: 'center'
    }
  }

  const answeredQuestions = answers.filter(a => a !== null).length
  const progressPercentage = quiz ? (answeredQuestions / quiz.questions.length) * 100 : 0

  if (!quiz) {
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
            <div style={styles.loadingCard}>
              <h2>🔄 Loading Quiz...</h2>
              <p>Please wait while we prepare your quiz.</p>
            </div>
            {message && (
              <div style={styles.errorMessage}>
                ⚠️ {message}
              </div>
            )}
          </div>
        </div>
      </div>
    )
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
              <h1 style={styles.pageTitle}>🧠 {quiz.title}</h1>
              <p style={styles.pageSubtitle}>
                {submitted ? '📊 Quiz Completed!' : '✏️ Answer all questions and submit when ready'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          {!submitted && (
            <div style={styles.progressContainer}>
              <div style={styles.progressBar}>
                <div 
                  style={{
                    ...styles.progressFill,
                    width: `${progressPercentage}%`
                  }}
                />
              </div>
              <div style={styles.progressText}>
                📝 Progress: {answeredQuestions} of {quiz.questions.length} questions answered
              </div>
            </div>
          )}

          {/* Score Display */}
          {submitted && (
            <div style={styles.scoreCard}>
              <div style={styles.scoreTitle}>🎯 Your Final Score</div>
              <div style={styles.scoreValue}>
                {score.correct}/{score.total}
              </div>
              <p>🎉 {score.correct === score.total ? 'Perfect Score!' : 
                  score.correct >= score.total * 0.8 ? 'Excellent Work!' :
                  score.correct >= score.total * 0.6 ? 'Good Job!' : 'Keep Practicing!'}
              </p>
            </div>
          )}

          {/* Questions */}
          {(quiz.questions || []).map((q, idx) => (
            <div 
              key={idx} 
              style={{
                ...styles.questionCard,
                ...(hoveredCard === idx ? styles.questionCardHover : {})
              }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.questionNumber}>{idx + 1}</div>
              <div style={styles.questionText}>{q.text}</div>
              
              <div style={styles.optionsList}>
                {(q.options || []).map((opt, oi) => (
                  <label 
                    key={oi} 
                    style={{
                      ...styles.optionItem,
                      ...(answers[idx] === oi ? styles.optionItemSelected : {}),
                      ...(submitted ? styles.optionItemDisabled : {}),
                      ...(hoveredCard === `${idx}-${oi}` && !submitted ? styles.optionItemHover : {})
                    }}
                    onMouseEnter={() => !submitted && setHoveredCard(`${idx}-${oi}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <input 
                      type="radio" 
                      name={`q${idx}`} 
                      checked={answers[idx] === oi}
                      disabled={submitted}
                      onChange={() => setAnswers(prev => { 
                        const copy = [...prev]; 
                        copy[idx] = oi; 
                        return copy 
                      })}
                      style={styles.radioInput}
                    /> 
                    {opt}
                  </label>
                ))}
              </div>
              
              {submitted && (
                <div style={{
                  ...styles.resultCard,
                  ...(answers[idx] === q.correct ? styles.correctResult : styles.incorrectResult)
                }}>
                  <div style={styles.resultTitle}>
                    {answers[idx] === q.correct ? '✅ Correct!' : '❌ Incorrect'}
                  </div>
                  <div style={styles.resultText}>
                    <strong>Your answer:</strong> {Number.isInteger(answers[idx]) ? q.options[answers[idx]] : 'Not answered'}
                  </div>
                  <div style={styles.resultText}>
                    <strong>Correct answer:</strong> {q.options[q.correct]}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Action Buttons */}
          <div style={styles.actionButtons}>
            {!submitted && (
              <button 
                style={{
                  ...styles.submitButton,
                  ...(hoveredButton === 'submit' ? styles.submitButtonHover : {}),
                  opacity: answeredQuestions === quiz.questions.length ? 1 : 0.6,
                  cursor: answeredQuestions === quiz.questions.length ? 'pointer' : 'not-allowed'
                }}
                onMouseEnter={() => setHoveredButton('submit')}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={submit}
                disabled={answeredQuestions !== quiz.questions.length}
              >
                🚀 Submit Quiz ({answeredQuestions}/{quiz.questions.length})
              </button>
            )}
            
            <button 
              style={{
                ...styles.backButton,
                ...(hoveredButton === 'back' ? styles.backButtonHover : {})
              }}
              onMouseEnter={() => setHoveredButton('back')}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => navigate(-1)}
            >
              ← Back to Dashboard
            </button>
          </div>

          {message && (
            <div style={{
              ...styles.errorMessage,
              backgroundColor: submitted ? '#D1FAE5' : '#FEE2E2',
              borderColor: submitted ? '#10B981' : '#EF4444',
              color: submitted ? '#065F46' : '#DC2626'
            }}>
              {submitted ? '🎉' : '⚠️'} {message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


