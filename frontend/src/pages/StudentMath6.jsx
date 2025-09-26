import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function StudentMath6() {
  const navigate = useNavigate()
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredButton, setHoveredButton] = useState(null)
  
  const pdfLinks = [
    { title: 'Basic Arithmetic', link: 'https://drive.google.com/file/d/1y5bnLQWKnSznCANFholhTAtbE4EEpps7/preview' },
    { title: 'Fractions and Decimals', link: 'https://drive.google.com/file/d/1tvD2uaUFspbhd_HCCkx1JgXI-BP9mKj-/preview' },
    { title: 'Geometry Basics', link: 'https://drive.google.com/file/d/1wnvuICfX4lXN02UesWY8y_9rW-itGvud/preview' },
    { title: 'Algebra Introduction', link: 'https://drive.google.com/file/d/1iuCykQyVZQI1mp3_OrJChhnQbfUgOM55/preview' },
    { title: 'Data and Statistics', link: 'https://drive.google.com/file/d/1j9aGuUUEOYvhq8OVsJq7K1k-DY56bKer/preview' },
  ]

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
  }, [])

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '2rem',
      overflowX: 'hidden',
      boxSizing: 'border-box'
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
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
    backButton: {
      backgroundColor: 'white',
      color: '#7C3AED',
      border: '2px solid #7C3AED',
      borderRadius: '12px',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 4px 12px -2px rgba(124, 58, 237, 0.2)'
    },
    backButtonHover: {
      backgroundColor: '#7C3AED',
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px -5px rgba(124, 58, 237, 0.3)'
    },
    pdfGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem',
      width: '100%'
    },
    pdfCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '2.5rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #F3F4F6',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    },
    pdfCardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1)',
      borderColor: '#7C3AED'
    },
    pdfTitle: {
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
    iframe: {
      width: '100%',
      height: '600px',
      border: 'none',
      borderRadius: '12px',
      boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.1)'
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
      <div style={styles.container}>
        <div style={styles.content}>
          {/* Page Header */}
          <div style={styles.pageHeader}>
            <div style={styles.headerPattern}></div>
            <div style={styles.pageHeaderContent}>
              <h1 style={styles.pageTitle}>🔢 Class 6 Mathematics</h1>
              <p style={styles.pageSubtitle}>
                Master mathematical concepts with interactive PDFs
              </p>
            </div>
          </div>

          {/* Back Button */}
          <button 
            style={{
              ...styles.backButton,
              ...(hoveredButton === 'back' ? styles.backButtonHover : {})
            }}
            onMouseEnter={() => setHoveredButton('back')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigate(-1)}
          >
            ← Back to Class 6 Subjects
          </button>

          {/* PDF Grid */}
          <div style={styles.pdfGrid}>
            {pdfLinks.map((pdf, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.pdfCard,
                  ...(hoveredCard === index ? styles.pdfCardHover : {})
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h3 style={styles.pdfTitle}>
                  📚 {pdf.title}
                </h3>
                <iframe
                  src={pdf.link}
                  style={styles.iframe}
                  allow="autoplay"
                  allowFullScreen
                  title={pdf.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
