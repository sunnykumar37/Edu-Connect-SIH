import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import api from '../lib/api'

export default function CertificateGenerator() {
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('')
  const [certificateType, setCertificateType] = useState('completion')
  const [courseName, setCourseName] = useState('')
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0])
  const [customMessage, setCustomMessage] = useState('')
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredButton, setHoveredButton] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [generatedCertificate, setGeneratedCertificate] = useState(null)

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
    
    loadStudents()
  }, [])

  async function loadStudents() {
    try {
      // This would fetch students from your API
      // const { data } = await api.get('/students')
      // setStudents(data.students || [])
      
      // For now, using mock data
      setStudents([
        { _id: '1', name: 'John Doe', className: 'Class 10A', rollNumber: '001' },
        { _id: '2', name: 'Jane Smith', className: 'Class 10A', rollNumber: '002' },
        { _id: '3', name: 'Mike Johnson', className: 'Class 10B', rollNumber: '003' }
      ])
    } catch (error) {
      console.error('Failed to load students:', error)
    }
  }

  async function generateCertificate() {
    if (!selectedStudent || !courseName) {
      alert('Please select a student and enter course name')
      return
    }

    setGenerating(true)
    try {
      // Simulate certificate generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const selectedStudentData = students.find(s => s._id === selectedStudent)
      const certificate = {
        id: Date.now(),
        studentName: selectedStudentData.name,
        courseName,
        certificateType,
        issueDate,
        customMessage,
        className: selectedStudentData.className,
        rollNumber: selectedStudentData.rollNumber
      }
      
      setGeneratedCertificate(certificate)
      alert('Certificate generated successfully!')
      
    } catch (error) {
      console.error('Failed to generate certificate:', error)
      alert('Failed to generate certificate')
    } finally {
      setGenerating(false)
    }
  }

  function resetForm() {
    setSelectedStudent('')
    setCourseName('')
    setCustomMessage('')
    setGeneratedCertificate(null)
  }

  function downloadCertificate() {
    if (!generatedCertificate) return
    
    // In a real app, this would generate and download a PDF
    const certificateData = JSON.stringify(generatedCertificate, null, 2)
    const blob = new Blob([certificateData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `certificate_${generatedCertificate.studentName.replace(/\s+/g, '_')}_${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

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
      background: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 50%, #0E7490 100%)',
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
    form: {
      display: 'grid',
      gap: '2rem'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem'
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
      color: '#111827'
    },
    inputFocus: {
      borderColor: '#06B6D4',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.1)'
    },
    select: {
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      border: '2px solid #E5E7EB',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      color: '#111827'
    },
    textarea: {
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      border: '2px solid #E5E7EB',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      resize: 'vertical',
      minHeight: '100px',
      color: '#111827'
    },
    generateButton: {
      background: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
      color: 'white',
      border: 'none',
      padding: '1rem 2rem',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 8px 20px -5px rgba(6, 182, 212, 0.4)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    generateButtonHover: {
      transform: 'translateY(-2px) scale(1.02)',
      boxShadow: '0 15px 35px -5px rgba(6, 182, 212, 0.5)'
    },
    generateButtonDisabled: {
      background: '#9CA3AF',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none'
    },
    previewCard: {
      backgroundColor: '#F8FAFC',
      border: '2px dashed #CBD5E1',
      borderRadius: '16px',
      padding: '3rem 2rem',
      textAlign: 'center',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    previewText: {
      color: '#475569',
      fontSize: '1.1rem',
      marginBottom: '1rem',
      fontWeight: '500'
    },
    previewIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      opacity: 0.8,
      color: '#06B6D4'
    },
    certificatePreview: {
      backgroundColor: '#ffffff',
      border: '3px solid #06B6D4',
      borderRadius: '20px',
      padding: '3rem 2rem',
      textAlign: 'center',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 15px 35px -5px rgba(6, 182, 212, 0.2)',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #ffffff 0%, #f0fdff 50%, #ffffff 100%)'
    },
    certificateTitle: {
      fontSize: '2.2rem',
      fontWeight: '800',
      color: '#0E7490',
      marginBottom: '1.5rem',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      textShadow: '0 2px 4px rgba(14, 116, 144, 0.2)'
    },
    certificateSubtitle: {
      fontSize: '1.3rem',
      color: '#374151',
      marginBottom: '2rem',
      fontStyle: 'italic',
      fontWeight: '500'
    },
    certificateStudentName: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '2rem',
      textDecoration: 'underline',
      textDecorationColor: '#06B6D4',
      textShadow: '0 2px 4px rgba(17, 24, 39, 0.1)'
    },
    certificateDetails: {
      fontSize: '1.3rem',
      color: '#4B5563',
      lineHeight: '2',
      marginBottom: '2.5rem',
      fontWeight: '500'
    },
    certificateDate: {
      fontSize: '1.1rem',
      color: '#6B7280',
      fontWeight: '600',
      padding: '0.5rem 1rem',
      border: '2px solid #E5E7EB',
      borderRadius: '10px',
      backgroundColor: '#F9FAFB'
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
              <h1 style={styles.pageTitle}>🏆 Certificate Generator</h1>
              <p style={styles.pageSubtitle}>
                Create professional certificates for student achievements
              </p>
            </div>
          </div>

          {/* Certificate Form */}
          <div 
            style={{
              ...styles.card,
              ...(hoveredCard === 'form' ? styles.cardHover : {})
            }}
            onMouseEnter={() => setHoveredCard('form')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h2 style={styles.cardTitle}>
              📜 Certificate Details
            </h2>
            
            <div style={styles.form}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Student *</label>
                  <select 
                    style={{
                      ...styles.select,
                      color: selectedStudent ? '#111827' : '#9CA3AF'
                    }}
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                  >
                    <option value="" disabled style={{ color: '#9CA3AF' }}>Choose student name...</option>
                    {students.map(student => (
                      <option key={student._id} value={student._id} style={{ color: '#111827' }}>
                        {student.name} - {student.className} (Roll: {student.rollNumber})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Certificate Type</label>
                  <select 
                    style={styles.select}
                    value={certificateType}
                    onChange={(e) => setCertificateType(e.target.value)}
                  >
                    <option value="completion">🎓 Course Completion</option>
                    <option value="achievement">🏆 Achievement</option>
                    <option value="participation">🎖️ Participation</option>
                    <option value="excellence">⭐ Excellence</option>
                  </select>
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Course/Subject Name *</label>
                  <input 
                    style={styles.input}
                    type="text"
                    placeholder="e.g., Mathematics Grade 10"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#E5E7EB'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Issue Date</label>
                  <input 
                    style={styles.input}
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#E5E7EB'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Custom Message (Optional)</label>
                <textarea 
                  style={styles.textarea}
                  placeholder="Add a personalized message for the certificate..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E5E7EB'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div style={styles.formRow}>
                <button 
                  style={{
                    ...styles.generateButton,
                    ...(generating || !selectedStudent || !courseName ? styles.generateButtonDisabled : {}),
                    ...(hoveredButton === 'generate' && !generating && selectedStudent && courseName ? styles.generateButtonHover : {})
                  }}
                  onClick={generateCertificate}
                  disabled={generating || !selectedStudent || !courseName}
                  onMouseEnter={() => setHoveredButton('generate')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  {generating ? (
                    <>🔄 Generating Certificate...</>
                  ) : (
                    <>🎖️ Generate Certificate</>
                  )}
                </button>

                <button 
                  style={{
                    ...styles.generateButton,
                    background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                    boxShadow: '0 8px 20px -5px rgba(220, 38, 38, 0.4)',
                    ...(hoveredButton === 'reset' ? {
                      transform: 'translateY(-2px) scale(1.02)',
                      boxShadow: '0 15px 35px -5px rgba(220, 38, 38, 0.5)'
                    } : {})
                  }}
                  onClick={resetForm}
                  onMouseEnter={() => setHoveredButton('reset')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  🔄 Reset Form
                </button>
              </div>
            </div>
          </div>

          {/* Certificate Preview */}
          <div 
            style={{
              ...styles.card,
              ...(hoveredCard === 'preview' ? styles.cardHover : {})
            }}
            onMouseEnter={() => setHoveredCard('preview')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h2 style={styles.cardTitle}>
              👀 Certificate Preview
            </h2>
            
            <div style={generatedCertificate ? styles.certificatePreview : styles.previewCard}>
              {generatedCertificate ? (
                <>
                  <div style={styles.previewIcon}>🏆</div>
                  <div style={styles.certificateTitle}>🌟 Certificate of {certificateType === 'completion' ? 'Completion' : certificateType === 'achievement' ? 'Achievement' : certificateType === 'participation' ? 'Participation' : 'Excellence'} 🌟</div>
                  <div style={styles.certificateSubtitle}>📜 This is to certify that 📜</div>
                  <div style={styles.certificateStudentName}>✨ {generatedCertificate.studentName} ✨</div>
                  <div style={styles.certificateDetails}>
                    📚 has successfully completed the course 📚<br/>
                    <strong>🎯 {generatedCertificate.courseName} 🎯</strong><br/>
                    {generatedCertificate.customMessage && (
                      <><br/>💬 <em>{generatedCertificate.customMessage}</em> 💬<br/></>
                    )}
                    <br/>🏫 Class: {generatedCertificate.className} | 🎒 Roll No: {generatedCertificate.rollNumber}
                  </div>
                  <div style={styles.certificateDate}>
                    📅 Issued on: {new Date(generatedCertificate.issueDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} 📅
                  </div>
                  <button 
                    style={{
                      ...styles.generateButton,
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      boxShadow: '0 8px 20px -5px rgba(5, 150, 105, 0.4)',
                      marginTop: '2rem',
                      ...(hoveredButton === 'download' ? {
                        transform: 'translateY(-2px) scale(1.02)',
                        boxShadow: '0 15px 35px -5px rgba(5, 150, 105, 0.5)'
                      } : {})
                    }}
                    onClick={downloadCertificate}
                    onMouseEnter={() => setHoveredButton('download')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    📥 Download Certificate
                  </button>
                </>
              ) : (
                <>
                  <div style={styles.previewIcon}>📜</div>
                  <div style={styles.previewText}>
                    {selectedStudent && courseName 
                      ? `Certificate preview will appear here for ${students.find(s => s._id === selectedStudent)?.name || 'selected student'}`
                      : 'Select a student and enter course details to see preview'
                    }
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}