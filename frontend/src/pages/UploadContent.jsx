import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import api from '../lib/api'

export default function UploadContent() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [subject, setSubject] = useState('')
  const [file, setFile] = useState(null)
  const [type, setType] = useState('pdf')
  const [linkUrl, setLinkUrl] = useState('')
  const [items, setItems] = useState([])
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
    const { data } = await api.get('/content')
    setItems(data.items)
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('subject', subject)
      formData.append('type', type)
      formData.append('linkUrl', linkUrl)
      if (type !== 'link' && file) formData.append('file', file)
      await api.post('/content', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      setTitle(''); setDescription(''); setSubject(''); setFile(null); setLinkUrl(''); setType('pdf')
      await load()
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed')
    }
  }

  async function remove(id) {
    await api.delete(`/content/${id}`)
    await load()
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
      background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%)',
      borderRadius: '16px',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
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
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    },
    pageSubtitle: {
      opacity: 0.9,
      fontSize: '1.1rem',
      fontWeight: '400'
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
      borderRadius: '16px',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid #F3F4F6',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    cardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    cardTitle: {
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
      backgroundColor: '#ffffff'
    },
    inputFocus: {
      borderColor: '#4F46E5',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)'
    },
    select: {
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      border: '2px solid #E5E7EB',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      cursor: 'pointer'
    },
    textarea: {
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      border: '2px solid #E5E7EB',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      resize: 'vertical',
      minHeight: '100px'
    },
    button: {
      backgroundColor: '#4F46E5',
      color: 'white',
      border: 'none',
      padding: '0.875rem 2rem',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.3)'
    },
    buttonHover: {
      backgroundColor: '#3730A3',
      transform: 'translateY(-1px)',
      boxShadow: '0 8px 15px -3px rgba(79, 70, 229, 0.4)'
    },
    deleteButton: {
      backgroundColor: '#EF4444',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    deleteButtonHover: {
      backgroundColor: '#DC2626',
      transform: 'translateY(-1px)'
    },
    contentItem: {
      backgroundColor: '#F9FAFB',
      border: '2px solid #F3F4F6',
      borderRadius: '12px',
      padding: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      transition: 'all 0.3s ease',
      marginBottom: '1rem'
    },
    contentItemHover: {
      backgroundColor: '#ffffff',
      borderColor: '#4F46E5',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    contentTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.5rem'
    },
    contentMeta: {
      fontSize: '0.875rem',
      color: '#6B7280',
      marginBottom: '0.25rem'
    },
    aiTag: {
      backgroundColor: '#ECFDF5',
      color: '#059669',
      padding: '0.25rem 0.5rem',
      borderRadius: '6px',
      fontSize: '0.75rem',
      fontWeight: '500',
      marginLeft: '0.5rem'
    },
    link: {
      color: '#4F46E5',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: '0.875rem'
    },
    linkHover: {
      textDecoration: 'underline'
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
    }
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
              <h1 style={styles.pageTitle}>📚 Upload Content</h1>
              <p style={styles.pageSubtitle}>
                Share educational materials with your students
              </p>
            </div>
          </div>

          {/* Upload Form */}
          <div 
            style={{
              ...styles.card,
              ...(hoveredCard === 'form' ? styles.cardHover : {})
            }}
            onMouseEnter={() => setHoveredCard('form')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h2 style={styles.cardTitle}>
              ⬆️ Add New Content
            </h2>
            {error && (
              <div style={styles.errorMessage}>
                ⚠️ {error}
              </div>
            )}
            <form style={styles.form} onSubmit={onSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title *</label>
                <input 
                  style={styles.input}
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                  placeholder="Enter content title"
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E5E7EB'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea 
                  style={styles.textarea}
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the content"
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E5E7EB'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Subject</label>
                <input 
                  style={styles.input}
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)} 
                  placeholder="e.g., Mathematics, Science, English"
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E5E7EB'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Content Type</label>
                <select 
                  style={styles.select} 
                  value={type} 
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="pdf">📄 PDF Document</option>
                  <option value="video">🎥 Video</option>
                  <option value="link">🔗 External Link</option>
                </select>
              </div>
              {type === 'link' && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Link URL *</label>
                  <input 
                    style={styles.input}
                    value={linkUrl} 
                    onChange={(e) => setLinkUrl(e.target.value)} 
                    placeholder="https://example.com"
                    onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#E5E7EB'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
              )}
              {type !== 'link' && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Choose File *</label>
                  <input 
                    style={styles.input}
                    type="file" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    accept={type === 'pdf' ? '.pdf' : 'video/*'}
                  />
                </div>
              )}
              <button 
                style={{
                  ...styles.button,
                  ...(hoveredButton === 'submit' ? styles.buttonHover : {})
                }}
                type="submit"
                onMouseEnter={() => setHoveredButton('submit')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                🚀 Upload Content
              </button>
            </form>
          </div>

          {/* Content List */}
          <div 
            style={{
              ...styles.card,
              ...(hoveredCard === 'list' ? styles.cardHover : {})
            }}
            onMouseEnter={() => setHoveredCard('list')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3 style={styles.cardTitle}>
              📋 Your Content Library
            </h3>
            <div>
              {items.map((item, index) => (
                <div
                  key={item._id}
                  style={{
                    ...styles.contentItem,
                    ...(hoveredCard === `item-${index}` ? styles.contentItemHover : {})
                  }}
                  onMouseEnter={() => setHoveredCard(`item-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={{ flex: 1 }}>
                    <div style={styles.contentTitle}>
                      {item.title}
                      {item.isAIGenerated && (
                        <span style={styles.aiTag}>🤖 AI Generated</span>
                      )}
                      {item.type && (
                        <span style={{ 
                          ...styles.aiTag, 
                          backgroundColor: '#EBF8FF', 
                          color: '#1E40AF' 
                        }}>
                          {item.type === 'pdf' ? '📄' : item.type === 'video' ? '🎥' : '🔗'} {item.type.toUpperCase()}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <div style={styles.contentMeta}>{item.description}</div>
                    )}
                    {item.subject && (
                      <div style={styles.contentMeta}>
                        <strong>Subject:</strong> {item.subject}
                      </div>
                    )}
                    {item.type === 'link' && item.linkUrl && (
                      <a 
                        href={item.linkUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        style={styles.link}
                        onMouseEnter={(e) => Object.assign(e.target.style, styles.linkHover)}
                        onMouseLeave={(e) => {
                          e.target.style.textDecoration = 'none'
                        }}
                      >
                        🔗 Open Link
                      </a>
                    )}
                    {item.type !== 'link' && item.fileUrl && (
                      <a 
                        href={item.fileUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        style={styles.link}
                        onMouseEnter={(e) => Object.assign(e.target.style, styles.linkHover)}
                        onMouseLeave={(e) => {
                          e.target.style.textDecoration = 'none'
                        }}
                      >
                        📁 Open File
                      </a>
                    )}
                  </div>
                  <button 
                    style={{
                      ...styles.deleteButton,
                      ...(hoveredButton === `delete-${index}` ? styles.deleteButtonHover : {})
                    }}
                    onClick={() => remove(item._id)}
                    onMouseEnter={() => setHoveredButton(`delete-${index}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))}
              {items.length === 0 && (
                <div style={styles.emptyState}>
                  📭 No content uploaded yet. Start by adding your first educational material!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


