import { useState } from 'react'
import api from '../lib/api'

export default function AIQuizGenerator({ onQuizGenerated }) {
  const [topic, setTopic] = useState('')
  const [numQuestions, setNumQuestions] = useState(5)
  const [difficulty, setDifficulty] = useState('medium')
  const [subject, setSubject] = useState('')
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [hoveredButton, setHoveredButton] = useState(false)

  // Modern styles matching the Quizzes page design
  const styles = {
    container: {
      backgroundColor: 'transparent',
      marginBottom: 0
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#111827',
      marginTop: 0,
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    form: {
      display: 'grid',
      gap: '1.5rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontSize: '0.95rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    input: {
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      border: '2px solid #E5E7EB',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      width: '100%',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#667eea',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    },
    select: {
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      border: '2px solid #E5E7EB',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      width: '100%',
      boxSizing: 'border-box'
    },
    gridRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '1.5rem'
    },
    button: {
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
      width: '100%',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      disabled: false
    },
    buttonHover: {
      transform: 'translateY(-2px) scale(1.02)',
      boxShadow: '0 15px 35px -5px rgba(102, 126, 234, 0.5)'
    },
    buttonDisabled: {
      background: '#9CA3AF',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none'
    },
    errorMessage: {
      color: '#EF4444',
      backgroundColor: '#FEF2F2',
      border: '1px solid #FECACA',
      borderRadius: '12px',
      padding: '1rem',
      fontSize: '0.95rem',
      fontWeight: '500'
    }
  }

  async function generateQuiz() {
    if (!topic.trim()) {
      setError('Please enter a topic')
      return
    }

    setGenerating(true)
    setError('')

    try {
      // Call backend API to generate quiz using Google AI
      const response = await api.post('/ai/generate-quiz', {
        topic: topic.trim(),
        numQuestions: parseInt(numQuestions),
        difficulty,
        subject: subject.trim() || 'General'
      })

      if (response.data.quiz) {
        onQuizGenerated(response.data.quiz)
        setTopic('')
        setSubject('')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate quiz')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Topic *</label>
          <input
            style={styles.input}
            type="text"
            placeholder="e.g., Photosynthesis, Algebra, World War II"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
            onBlur={(e) => {
              e.target.style.borderColor = '#E5E7EB'
              e.target.style.boxShadow = 'none'
            }}
          />
        </div>

        <div style={styles.gridRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Questions</label>
            <input
              style={styles.input}
              type="number"
              min="3"
              max="10"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = '#E5E7EB'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Difficulty</label>
            <select
              style={styles.select}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">🟢 Easy</option>
              <option value="medium">🟡 Medium</option>
              <option value="hard">🔴 Hard</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Subject</label>
            <input
              style={styles.input}
              type="text"
              placeholder="e.g., Science, Math, History"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = '#E5E7EB'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>
        </div>

        {error && (
          <div style={styles.errorMessage}>
            ⚠️ {error}
          </div>
        )}

        <button
          style={{
            ...styles.button,
            ...(generating || !topic.trim() ? styles.buttonDisabled : {}),
            ...(hoveredButton && !generating && topic.trim() ? styles.buttonHover : {})
          }}
          onClick={generateQuiz}
          disabled={generating || !topic.trim()}
          onMouseEnter={() => setHoveredButton(true)}
          onMouseLeave={() => setHoveredButton(false)}
        >
          {generating ? '🔄 Generating Quiz...' : '✨ Generate AI Quiz'}
        </button>
      </div>
    </div>
  )
}
