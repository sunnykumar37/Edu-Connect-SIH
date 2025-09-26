import { useState } from 'react'
import api from '../lib/api'

export default function AIContentGenerator({ onContentGenerated }) {
  const [topic, setTopic] = useState('')
  const [subject, setSubject] = useState('')
  const [grade, setGrade] = useState('6')
  const [difficulty, setDifficulty] = useState('medium')
  const [format, setFormat] = useState('pdf')
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [hoveredButton, setHoveredButton] = useState(null)

  const subjects = [
    'Mathematics', 'Science', 'English', 'Hindi', 'Punjabi', 
    'Social Studies', 'Computer Science', 'General'
  ]

  async function generateContent() {
    if (!topic.trim()) {
      setError('Please enter a topic')
      return
    }

    setGenerating(true)
    setError('')

    try {
      const response = await api.post('/ai-content/generate-content', {
        topic: topic.trim(),
        subject: subject.trim() || 'General',
        grade: grade,
        difficulty,
        format
      })

      if (response.data.content) {
        onContentGenerated(response.data.content)
        setTopic('')
        setSubject('')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate content')
    } finally {
      setGenerating(false)
    }
  }

  // Modern UI Styles
  const styles = {
    container: {
      background: 'linear-gradient(135deg, #1E293B 0%, #334155 50%, #475569 100%)',
      borderRadius: '20px',
      padding: '2.5rem',
      marginBottom: '2.5rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '1200px'
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
    headerContent: {
      color: 'white',
      position: 'relative',
      zIndex: 2
    },
    title: {
      margin: 0,
      marginBottom: '2rem',
      fontSize: '1.75rem',
      fontWeight: '700',
      textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    formGrid: {
      display: 'grid',
      gap: '1.5rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      display: 'block',
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
      width: '100%',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#7C3AED',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.2)',
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
      width: '100%',
      boxSizing: 'border-box'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1.5rem'
    },
    generateButton: {
      background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
      color: 'white',
      border: 'none',
      padding: '1rem 2rem',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 8px 20px -5px rgba(124, 58, 237, 0.4)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      width: '100%'
    },
    generateButtonHover: {
      transform: 'translateY(-2px) scale(1.02)',
      boxShadow: '0 15px 35px -5px rgba(124, 58, 237, 0.5)'
    },
    generateButtonDisabled: {
      background: '#64748B',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none'
    },
    errorMessage: {
      backgroundColor: 'rgba(248, 113, 113, 0.2)',
      border: '1px solid rgba(248, 113, 113, 0.4)',
      borderRadius: '12px',
      padding: '1rem',
      color: '#FCA5A5',
      fontSize: '0.875rem',
      fontWeight: '500'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerPattern}></div>
      <div style={styles.headerContent}>
        <h4 style={styles.title}>
          🤖 AI Content Generator
        </h4>
        
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Topic</label>
            <input
              type="text"
              placeholder="e.g., Photosynthesis, Algebra, World War II, Cell Structure"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                e.target.style.boxShadow = 'none'
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
              }}
            />
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={styles.select}
              >
                <option value="" style={{ color: '#6B7280' }}>Choose subject...</option>
                {subjects.map(sub => (
                  <option key={sub} value={sub} style={{ color: '#111827' }}>{sub}</option>
                ))}
              </select>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Grade</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                style={styles.select}
              >
                {[6,7,8,9,10].map(g => (
                  <option key={g} value={g} style={{ color: '#111827' }}>Grade {g}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                style={styles.select}
              >
                <option value="easy" style={{ color: '#111827' }}>Easy</option>
                <option value="medium" style={{ color: '#111827' }}>Medium</option>
                <option value="hard" style={{ color: '#111827' }}>Hard</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                style={styles.select}
              >
                <option value="pdf" style={{ color: '#111827' }}>PDF Content</option>
                <option value="html" style={{ color: '#111827' }}>Web Content</option>
                <option value="text" style={{ color: '#111827' }}>Text Content</option>
              </select>
            </div>
          </div>

          {error && (
            <div style={styles.errorMessage}>
              ⚠️ {error}
            </div>
          )}

          <button
            style={{
              ...styles.generateButton,
              ...(generating || !topic.trim() ? styles.generateButtonDisabled : {}),
              ...(hoveredButton === 'generate' && !generating && topic.trim() ? styles.generateButtonHover : {})
            }}
            onClick={generateContent}
            disabled={generating || !topic.trim()}
            onMouseEnter={() => setHoveredButton('generate')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            {generating ? (
              <>🔄 Generating Content...</>
            ) : (
              <>✨ Generate Content</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
