import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar.jsx'

export default function StudentSubjectVideos() {
  const { cls, subject } = useParams()
  const navigate = useNavigate()
  const [hoveredVideo, setHoveredVideo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState(null)

  useEffect(() => {
    // Set body background and loading
    document.body.style.backgroundColor = '#ffffff'
    document.documentElement.style.backgroundColor = '#ffffff'
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    
    const rootElement = document.getElementById('root')
    if (rootElement) {
      rootElement.style.backgroundColor = '#ffffff'
    }
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 800)
  }, [])

  console.log('Class:', cls, 'Subject:', subject)

  // Class Range Restriction: Only support classes 7 to 10
  const classNum = parseInt(cls)
  if (classNum < 7 || classNum > 10) {
    return (
      <>
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
        `}</style>
        
        <div style={styles.layout}>
          <Sidebar />
          <div style={styles.content}>
            <div style={styles.unsupportedCard}>
              <button 
                style={{
                  ...styles.backButton,
                  ...(hoveredVideo === 'back' ? styles.backButtonHover : {})
                }}
                onMouseEnter={() => setHoveredVideo('back')}
                onMouseLeave={() => setHoveredVideo(null)}
                onClick={() => navigate(-1)}
              >
                ← Back
              </button>
              
              <div style={styles.unsupportedIcon}>⚠️</div>
              <h2 style={styles.unsupportedTitle}>Unsupported Class Level</h2>
              <p style={styles.unsupportedDescription}>
                Video content is only available for <strong>Classes 7 to 10</strong>.<br/>
                You requested <strong>Class {cls}</strong>, which is not supported at this time.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button 
                  style={{
                    ...styles.actionButton,
                    ...(hoveredVideo === 'dashboard' ? styles.actionButtonHover : {})
                  }}
                  onMouseEnter={() => setHoveredVideo('dashboard')}
                  onMouseLeave={() => setHoveredVideo(null)}
                  onClick={() => navigate('/student-dashboard')}
                >
                  🏠 Go to Dashboard
                </button>
                
                <button 
                  style={{
                    ...styles.actionButton,
                    backgroundColor: '#10B981',
                    ...(hoveredVideo === 'explore' ? {
                      ...styles.actionButtonHover,
                      backgroundColor: '#059669'
                    } : {})
                  }}
                  onMouseEnter={() => setHoveredVideo('explore')}
                  onMouseLeave={() => setHoveredVideo(null)}
                  onClick={() => navigate('/student/class/7')}
                >
                  📚 Explore Class 7
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Real video links for Class 7, Class 8, Class 9, and Class 10 subjects
  const getSubjectVideos = (classNum, subjectName) => {
    // Class 7, Class 8, Class 9, and Class 10 have real video links, others use YouTube educational videos
    if (classNum === 7) {
      const videoLinks = {
        'social st.': [
          { title: `${subjectName} - Medieval History`, link: 'https://www.youtube.com/embed/yuQy_adFAts' },
          { title: `${subjectName} - Geography Concepts`, link: 'https://www.youtube.com/embed/EbbaWkf37BQ' },
          { title: `${subjectName} - Civics Basics`, link: 'https://www.youtube.com/embed/lykn02iBuWM' }
        ],
        'science': [
          { title: `${subjectName} - Light and Reflection`, link: 'https://www.youtube.com/embed/ZM8ECpBuQYE' },
          { title: `${subjectName} - Acids and Bases`, link: 'https://www.youtube.com/embed/bka20Q2yUbo' },
          { title: `${subjectName} - Life Processes`, link: 'https://www.youtube.com/embed/QnQe0xW_JY4' }
        ],
        'mathematics': [
          { title: `${subjectName} - Integers`, link: 'https://www.youtube.com/embed/KJJW7EF5aVk' },
          { title: `${subjectName} - Algebra`, link: 'https://www.youtube.com/embed/NybHckSEQBI' },
          { title: `${subjectName} - Geometry`, link: 'https://www.youtube.com/embed/DF79PfL2Nes' }
        ],
        'punjabi': [
          { title: `${subjectName} - ਪੰਜਾਬੀ ਵਿਆਕਰਣ`, link: 'https://www.youtube.com/embed/7oax8kQ4uIo' },
          { title: `${subjectName} - ਕਹਾਣੀ ਲਿਖਣਾ`, link: 'https://www.youtube.com/embed/3vJXaOAmZac' },
          { title: `${subjectName} - ਕਵਿਤਾ ਸਮਝਣਾ`, link: 'https://www.youtube.com/embed/v_3KhEjhh8s' }
        ]
      }
      return videoLinks[subjectName.toLowerCase()] || []
    }
    
    if (classNum === 8) {
      const videoLinks = {
        'mathematics': [
          { title: `${subjectName} - Video 1`, link: 'https://drive.google.com/file/d/1ks5DtpBlJZEz9-3hvUhQHoR1MKLFryp2/preview' },
          { title: `${subjectName} - Video 2`, link: 'https://drive.google.com/file/d/1qMFtVyE6HqIfqZbfcGrvCwm1At9-4Nw0/preview' },
          { title: `${subjectName} - Video 3`, link: 'https://drive.google.com/file/d/1ux2ZD4t-8yGgnd1j5g-jR5XJ9fbQSQIo/preview' },
          { title: `${subjectName} - Video 4`, link: 'https://drive.google.com/file/d/1cZnkGvAOVp3Wx3VjHs0YMbBZkDpOmoz4/preview' },
          { title: `${subjectName} - Video 5`, link: 'https://drive.google.com/file/d/1SPE48ldwUiWsQjziHywt9vh486RlSPBx/preview' },
          { title: `${subjectName} - Video 6`, link: 'https://drive.google.com/file/d/1hIrT3s_FegB5GEn7be_BsousNzlQi35R/preview' },
          { title: `${subjectName} - Video 7`, link: 'https://drive.google.com/file/d/1jxIpekrXI8oXHJAahxOtjkPQQdFHLZSU/preview' },
          { title: `${subjectName} - Video 8`, link: 'https://drive.google.com/file/d/1UtIiVDGQjT5tmXIEVGVPTYl2gAmor90-/preview' },
          { title: `${subjectName} - Video 9`, link: 'https://drive.google.com/file/d/1jjw2MXqCGFriqbUPqOLJVNkAA8gD-WH8/preview' },
          { title: `${subjectName} - Video 10`, link: 'https://drive.google.com/file/d/1Tm0cnq2MBAEL281XYOWHGZaMLrJD6flC/preview' },
          { title: `${subjectName} - Video 11`, link: 'https://drive.google.com/file/d/1qNHoZ0Fr3ouUSK2OIOQeB94MCLDprL67/preview' },
          { title: `${subjectName} - Video 12`, link: 'https://drive.google.com/file/d/1ytwM2FqvYoUzC07080sdpueFQLmMPVFs/preview' },
          { title: `${subjectName} - Video 13`, link: 'https://drive.google.com/file/d/1cCf_eaBFoVi9ou4B10IQ91Z_mltESSWS/preview' },
          { title: `${subjectName} - Video 14`, link: 'https://drive.google.com/file/d/14nMgaJy85smyYY7YqDvvEFSJJ4Fi_6jK/preview' }
        ],
        'english': [
          { title: `${subjectName} - Video 1`, link: 'https://drive.google.com/file/d/1lO5YoV3g0-J7IFf35bkFvjSaiSZUx1bI/preview' },
          { title: `${subjectName} - Video 2`, link: 'https://drive.google.com/file/d/1m0thN3Egfn-1FJcyLtZknYBd1QVOCorA/preview' },
          { title: `${subjectName} - Video 3`, link: 'https://drive.google.com/file/d/1kMHwQB0JVe6biQzl77ZJg0gKq9Cfc0Pq/preview' },
          { title: `${subjectName} - Video 4`, link: 'https://drive.google.com/file/d/1eCEspt_4_94Z-jSTVxILj8TC_gAA7UN1/preview' },
          { title: `${subjectName} - Video 5`, link: 'https://drive.google.com/file/d/1J8oCtsNDrTnKQi6hO322Mqn9hZT5ER2A/preview' },
          { title: `${subjectName} - Video 6`, link: 'https://drive.google.com/file/d/1GHbj31scNnSqEOMQ-pU75qzqoBvlX2fi/preview' },
          { title: `${subjectName} - Video 7`, link: 'https://drive.google.com/file/d/1-jz1KgKNlqY5t7d6ds7QaF1nwSQNhD6A/preview' },
          { title: `${subjectName} - Video 8`, link: 'https://drive.google.com/file/d/18zTniMkoT1x7ziCmvx1P6VoIpS1BFShW/preview' }
        ],
        'hindi': [
          { title: `${subjectName} - Video 1`, link: 'https://drive.google.com/file/d/1c_c5frGEip0-f21IpA0EuhXWOWK8ZgXh/preview' },
          { title: `${subjectName} - Video 2`, link: 'https://drive.google.com/file/d/1Jf2AuKdD7teW_YA1cmaRpgmUyMFj-ETM/preview' }
        ],
        'punjabi': [
          { title: `${subjectName} - Video 1`, link: 'https://drive.google.com/file/d/1IMxHu6D7XdGX5RGE-28IFA63ApRItDuJ/preview' },
          { title: `${subjectName} - Video 2`, link: 'https://drive.google.com/file/d/1pKtv0dVaE09EON8EWbQyRUFywYqlikLk/preview' },
          { title: `${subjectName} - Video 3`, link: 'https://drive.google.com/file/d/1Kb47WlvTjk14_DNLaxRm7-7-EpMsTkjc/preview' },
          { title: `${subjectName} - Video 4`, link: 'https://drive.google.com/file/d/1W0UTB01AzLiUMwjPYyKC4hNcDjyHv3Mh/preview' }
        ],
        'science': [
          { title: `${subjectName} - Video 1`, link: 'https://drive.google.com/file/d/1nOTRvHzmo41yHtZqGi4G_gNum3mxxJhq/preview' },
          { title: `${subjectName} - Video 2`, link: 'https://drive.google.com/file/d/1Ppb6d5iovJdCsnfti52V76nWm-uNNCx5/preview' },
          { title: `${subjectName} - Video 3`, link: 'https://drive.google.com/file/d/1c0CGtd48NTQK4-bG-Da-dWUjnsMPYkZM/preview' },
          { title: `${subjectName} - Video 4`, link: 'https://drive.google.com/file/d/1CtsGWLYora10xcJvPHcthHmfFa2dHBCQ/preview' }
        ],
        'social st.': [
          { title: `${subjectName} - Video 1`, link: 'https://drive.google.com/file/d/1OmPKu7oxKrZ5jkD57vOw-NnkTAoLK1KN/preview' },
          { title: `${subjectName} - Video 2`, link: 'https://drive.google.com/file/d/1GxS35cAA8OM5L9XMDH1vrvRKeNE2Eo0u/preview' },
          { title: `${subjectName} - Video 3`, link: 'https://drive.google.com/file/d/1ZDsL0etePpGR-BMeqX9gblw9g7HpFB5d/preview' },
          { title: `${subjectName} - Video 4`, link: 'https://drive.google.com/file/d/1H8X5H0Z41u9u3VRLpNP5gl5V90ca-H7N/preview' },
          { title: `${subjectName} - Video 5`, link: 'https://drive.google.com/file/d/1PW20tCTt38r9ju7Q2syLb8ZGPmesopFD/preview' }
        ]
      }
      return videoLinks[subjectName.toLowerCase()] || []
    }
    
    // Class 9 video links
    if (classNum === 9) {
      const videoLinks = {
        'english': [
          { title: `${subjectName} - Video 1`, link: 'https://drive.google.com/file/d/14VPu_oWDloG3GsTkR9aMaKB1jjtjUpl6/preview' },
          { title: `${subjectName} - Video 2`, link: 'https://drive.google.com/file/d/1FIY0luevK54BNz5oBxNqL8VG56-U43oH/preview' },
          { title: `${subjectName} - Video 3`, link: 'https://drive.google.com/file/d/1U2jVgacr-UgqDvyKM1_Sawq1c20ltTE3/preview' }
        ],
        'mathematics': [
          { title: `${subjectName} - Video 1`, link: 'https://drive.google.com/file/d/1wzyyPsutjZt9rQNHardE_NvGvxe7U99W/preview' },
          { title: `${subjectName} - Video 2`, link: 'https://drive.google.com/file/d/16Bw7wKolmV8S51Pj7xyExMIkxrreXZ9H/preview' },
          { title: `${subjectName} - Video 3`, link: 'https://drive.google.com/file/d/17E7wjX-ED6ubGIJ7oSFoCuCp78slJvQV/preview' }
        ],
        'punjabi': [
          { title: `${subjectName} - Video 1`, link: 'https://drive.google.com/file/d/1Wp408rf1YQTht-IIwIGIXAVc6Tm7h1Si/preview' },
          { title: `${subjectName} - Video 2`, link: 'https://drive.google.com/file/d/1btvMu3xDkSrKCyu_lye1StZXBfPUNR6k/preview' },
          { title: `${subjectName} - Video 3`, link: 'https://drive.google.com/file/d/10a-Juvy0OMY9MEwv8KPd5D3G1XSYkxhM/preview' }
        ],
        'science': [
          { title: `${subjectName} - Video 1`, link: 'https://drive.google.com/file/d/1UxOtbWLSW85PjOhbAiDRK0cpRRwqGxuw/preview' },
          { title: `${subjectName} - Video 2`, link: 'https://drive.google.com/file/d/13KgQ64o_LjFnUfqKHBVKy7O16Cs_G8rQ/preview' },
          { title: `${subjectName} - Video 3`, link: 'https://drive.google.com/file/d/1c5DQ5FVy5n9tyhVo_IJEsEJJVLn6sX1P/preview' }
        ],
        'social st.': [
          { title: `${subjectName} - Video 1`, link: 'https://drive.google.com/file/d/1xiYFpIgEAT1zK5OV8fXBkwUFwoDVN_Cl/preview' },
          { title: `${subjectName} - Video 2`, link: 'https://drive.google.com/file/d/1d-xUZ9AmqnxJ9Bt_1mgfMF3RCEj_GUTY/preview' },
          { title: `${subjectName} - Video 3`, link: 'https://drive.google.com/file/d/1UDHqts7IL6pTruGEqeC4O45186Hvg0g3/preview' }
        ]
      }
      return videoLinks[subjectName.toLowerCase()] || []
    }
    
    // Class 10 video links
    if (classNum === 10) {
      const videoLinks = {
        'english': [
          { title: `${subjectName} - Video 1`, link: 'https://drive.google.com/file/d/1OvSaY-1AL6NC0-u5X_A5UgUzLr_-e5GI/preview' },
          { title: `${subjectName} - Video 2`, link: 'https://drive.google.com/file/d/1nLxordMj2HsmDwC065FQ3D-FjO5urpnr/preview' },
          { title: `${subjectName} - Video 3`, link: 'https://drive.google.com/file/d/16WXEs7E4YQ8IExf9wnhZoUhAiWqPBfSU/preview' },
          { title: `${subjectName} - Video 4`, link: 'https://drive.google.com/file/d/18mHadHsVPz2FJkZ1-DFMeMTr3WRxyijr/preview' }
        ],
        'mathematics': [
          { title: `${subjectName} - Video 1`, link: 'https://drive.google.com/file/d/1Y8NS8LJYPxXit7RvUxHK8nKl98Xqglmw/preview' },
          { title: `${subjectName} - Video 2`, link: 'https://drive.google.com/file/d/1jx8mYaJcgep1OHBSkvkUVTD1SPf7e7qh/preview' },
          { title: `${subjectName} - Video 3`, link: 'https://drive.google.com/file/d/1dEBkLSrwoQqMoWMfqlNg3TdfxE27_eD3/preview' },
          { title: `${subjectName} - Video 4`, link: 'https://drive.google.com/file/d/1qrFAJ8-6Mz3t6cd3nVM9qCawnWctFhmE/preview' },
          { title: `${subjectName} - Video 5`, link: 'https://drive.google.com/file/d/1rkIIBwdh21_pDaxL6iYI7UQn-SoCvjfV/preview' },
          { title: `${subjectName} - Video 6`, link: 'https://drive.google.com/file/d/17J84UFU-MZ3QeQoDL2DNnewGYtyCmuyL/preview' }
        ],
        'punjabi': [
          { title: `${subjectName} - Video 1`, link: 'https://drive.google.com/file/d/1meyFOmFmAohDPIoecy14Tf6CfPYfMDhX/preview' },
          { title: `${subjectName} - Video 2`, link: 'https://drive.google.com/file/d/1L5MwUuscdHR5JoW20rpBtn3LApC2pk30/preview' },
          { title: `${subjectName} - Video 3`, link: 'https://drive.google.com/file/d/1GohaDvpG1xTavIzHjWMwJ9nbRtzs4AXp/preview' },
          { title: `${subjectName} - Video 4`, link: 'https://drive.google.com/file/d/1HSGvBnc1ePgyj9ElbTs50Zm-_aOZVwGX/preview' }
        ],
        'science': [
          { title: `${subjectName} - Video 1`, link: 'https://drive.google.com/file/d/133RpVW5bWJCwout8UwW6UKIQ-bRfRZwV/preview' },
          { title: `${subjectName} - Video 2`, link: 'https://drive.google.com/file/d/1EhNk4NYbr1QVEXV9pwXlo6wJq7c59IeB/preview' },
          { title: `${subjectName} - Video 3`, link: 'https://drive.google.com/file/d/1zDz2P_R9GjIRwduV6-SEp3lr1gk0q8Su/preview' },
          { title: `${subjectName} - Video 4`, link: 'https://drive.google.com/file/d/1Fp8Q11d2-lh85W7oF004zIUEJ-LQVJ0V/preview' },
          { title: `${subjectName} - Video 5`, link: 'https://drive.google.com/file/d/1PfVrYEk3j5Fw_-FdliqcvbQV7rHm_qfq/preview' }
        ],
        'social st.': [
          { title: `${subjectName} - Video 1`, link: 'https://drive.google.com/file/d/17fsMpHtQ4jn3DnF6pLeWBNlTtB4YBSQn/preview' },
          { title: `${subjectName} - Video 2`, link: 'https://drive.google.com/file/d/1cSM4-pCCcS-CzOahJfchgDa4oYO-ASyl/preview' },
          { title: `${subjectName} - Video 3`, link: 'https://drive.google.com/file/d/1mrvn_8B5ztHE1fCsgh-1CsCP1Q2rcKap/preview' }
        ]
      }
      return videoLinks[subjectName.toLowerCase()] || []
    }
    
    // For other classes, use YouTube educational videos
    const youtubeVideoLinks = {
      'computer': [
        { title: `${subjectName} - Introduction to Computers`, link: 'https://www.youtube.com/embed/mGSVsXwSjAs' },
        { title: `${subjectName} - Computer Hardware Basics`, link: 'https://www.youtube.com/embed/ExxFxD4OSZ0' },
        { title: `${subjectName} - Software Applications`, link: 'https://www.youtube.com/embed/26QPDBe-NB8' },
        { title: `${subjectName} - Internet and Web`, link: 'https://www.youtube.com/embed/7_LPdttKXPc' },
        { title: `${subjectName} - Programming Concepts`, link: 'https://www.youtube.com/embed/zOjov-2OZ0E' }
      ],
      'english': [
        { title: `${subjectName} - Grammar Fundamentals`, link: 'https://www.youtube.com/embed/ta3L35wsE6o' },
        { title: `${subjectName} - Reading Comprehension`, link: 'https://www.youtube.com/embed/8S-8s6Q2wZg' },
        { title: `${subjectName} - Essay Writing`, link: 'https://www.youtube.com/embed/eW7xGyuQZEw' },
        { title: `${subjectName} - Literature Analysis`, link: 'https://www.youtube.com/embed/MSYw502dJNY' },
        { title: `${subjectName} - Speaking Skills`, link: 'https://www.youtube.com/embed/HAnw168huqA' }
      ],
      'hindi': [
        { title: `${subjectName} - हिंदी व्याकरण मूल बातें`, link: 'https://www.youtube.com/embed/gp-t1-kWVLI' },
        { title: `${subjectName} - कहानी लेखन`, link: 'https://www.youtube.com/embed/V1uSjOl4x0U' },
        { title: `${subjectName} - कविता समझना`, link: 'https://www.youtube.com/embed/7S1Yk2L2TzE' },
        { title: `${subjectName} - निबंध लेखन`, link: 'https://www.youtube.com/embed/zYx3hNiCzVw' },
        { title: `${subjectName} - साहित्य अध्ययन`, link: 'https://www.youtube.com/embed/Tb3EKcvJmMw' }
      ],
      'mathematics': [
        { title: `${subjectName} - Basic Arithmetic`, link: 'https://www.youtube.com/embed/KJJW7EF5aVk' },
        { title: `${subjectName} - Algebra Introduction`, link: 'https://www.youtube.com/embed/NybHckSEQBI' },
        { title: `${subjectName} - Geometry Basics`, link: 'https://www.youtube.com/embed/DF79PfL2Nes' },
        { title: `${subjectName} - Problem Solving`, link: 'https://www.youtube.com/embed/sW5npAhSH-A' },
        { title: `${subjectName} - Advanced Concepts`, link: 'https://www.youtube.com/embed/1rlwIe3CQJ4' }
      ],
      'punjabi': [
        { title: `${subjectName} - ਪੰਜਾਬੀ ਵਿਆਕਰਣ`, link: 'https://www.youtube.com/embed/7oax8kQ4uIo' },
        { title: `${subjectName} - ਕਹਾਣੀ ਲਿਖਣਾ`, link: 'https://www.youtube.com/embed/3vJXaOAmZac' },
        { title: `${subjectName} - ਕਵਿਤਾ ਸਮਝਣਾ`, link: 'https://www.youtube.com/embed/v_3KhEjhh8s' },
        { title: `${subjectName} - ਨਿਬੰਧ ਲਿਖਣਾ`, link: 'https://www.youtube.com/embed/OKgYoLe5f-8' },
        { title: `${subjectName} - ਸਾਹਿਤ ਅਧਿਐਨ`, link: 'https://www.youtube.com/embed/XqZsoesa55w' }
      ],
      'science': [
        { title: `${subjectName} - Physics Concepts`, link: 'https://www.youtube.com/embed/ZM8ECpBuQYE' },
        { title: `${subjectName} - Chemistry Basics`, link: 'https://www.youtube.com/embed/bka20Q2yUbo' },
        { title: `${subjectName} - Biology Fundamentals`, link: 'https://www.youtube.com/embed/QnQe0xW_JY4' },
        { title: `${subjectName} - Scientific Experiments`, link: 'https://www.youtube.com/embed/YuqA_uojSJ4' },
        { title: `${subjectName} - Environmental Science`, link: 'https://www.youtube.com/embed/44XbqOHtTf8' }
      ],
      'social st.': [
        { title: `${subjectName} - World History`, link: 'https://www.youtube.com/embed/yuQy_adFAts' },
        { title: `${subjectName} - Geography Basics`, link: 'https://www.youtube.com/embed/EbbaWkf37BQ' },
        { title: `${subjectName} - Civics and Government`, link: 'https://www.youtube.com/embed/lykn02iBuWM' },
        { title: `${subjectName} - Economics Introduction`, link: 'https://www.youtube.com/embed/3ez10ADR_gM' },
        { title: `${subjectName} - Indian Culture`, link: 'https://www.youtube.com/embed/vhh01qJEqHA' }
      ]
    }
    return youtubeVideoLinks[subjectName.toLowerCase()] || []
  }

  // Extract subject name from subject-8 format
  const subjectName = subject ? subject.replace(`-${cls}`, '') : ''
  console.log('Extracted subject name:', subjectName)
  
  const videos = getSubjectVideos(parseInt(cls), subjectName)
  console.log('Videos found:', videos.length, videos)

  // Modern UI Styles
  const styles = {
    layout: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      display: 'flex'
    },
    content: {
      flex: 1,
      marginLeft: '20%',
      padding: '2rem',
      paddingTop: '90px',
      overflowY: 'auto',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      position: 'relative'
    },
    pageHeader: {
      background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 50%, #5B21B6 100%)',
      borderRadius: '20px',
      padding: '3rem 2rem',
      marginBottom: '2.5rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      position: 'relative',
      overflow: 'hidden',
      animation: 'slideInDown 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
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
    pageTitle: {
      margin: 0,
      fontSize: '2.5rem',
      fontWeight: '800',
      marginBottom: '0.5rem',
      textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    pageSubtitle: {
      opacity: 0.95,
      fontSize: '1.1rem',
      fontWeight: '400',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      margin: 0
    },
    backButton: {
      backgroundColor: 'white',
      color: '#7C3AED',
      border: '2px solid #7C3AED',
      borderRadius: '12px',
      padding: '0.875rem 1.75rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 4px 12px -2px rgba(124, 58, 237, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    },
    backButtonHover: {
      backgroundColor: '#7C3AED',
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px -5px rgba(124, 58, 237, 0.4)'
    },
    videosContainer: {
      display: 'grid',
      gap: '2rem',
      animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    videoCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '2px solid #F3F4F6',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    },
    videoCardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1)',
      borderColor: '#7C3AED'
    },
    videoTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#111827',
      marginTop: 0,
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      paddingBottom: '1rem',
      borderBottom: '2px solid #F3F4F6'
    },
    videoFrame: {
      width: '100%',
      height: '450px',
      border: 'none',
      borderRadius: '16px',
      boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease',
      backgroundColor: '#000'
    },
    videoFrameHover: {
      transform: 'scale(1.02)',
      boxShadow: '0 16px 40px -12px rgba(0, 0, 0, 0.3)'
    },
    emptyState: {
      textAlign: 'center',
      padding: '4rem 2rem',
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
      border: '2px solid #F3F4F6'
    },
    emptyIcon: {
      fontSize: '4rem',
      marginBottom: '1.5rem',
      opacity: 0.6
    },
    emptyTitle: {
      fontSize: '1.75rem',
      fontWeight: '700',
      color: '#374151',
      marginBottom: '1rem'
    },
    emptyDescription: {
      fontSize: '1.1rem',
      color: '#6B7280',
      marginBottom: '2rem',
      lineHeight: 1.6
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '2rem'
    },
    spinner: {
      width: '60px',
      height: '60px',
      border: '4px solid #F3F4F6',
      borderTop: '4px solid #7C3AED',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    loadingText: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#6B7280',
      animation: 'pulse 2s infinite'
    },
    unsupportedCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '3rem 2rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
      border: '2px solid #FEE2E2',
      textAlign: 'center',
      animation: 'shake 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    unsupportedIcon: {
      fontSize: '4rem',
      marginBottom: '1.5rem',
      color: '#DC2626'
    },
    unsupportedTitle: {
      fontSize: '2rem',
      fontWeight: '800',
      color: '#DC2626',
      marginBottom: '1rem'
    },
    unsupportedDescription: {
      fontSize: '1.2rem',
      color: '#374151',
      marginBottom: '2rem',
      lineHeight: 1.6
    },
    actionButton: {
      backgroundColor: '#7C3AED',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '0.875rem 2rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px -2px rgba(124, 58, 237, 0.3)'
    },
    actionButtonHover: {
      backgroundColor: '#6D28D9',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px -5px rgba(124, 58, 237, 0.4)'
    }
  }

  return (
    <>
      {/* Add CSS animations */}
      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .video-card-enter {
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .video-card-enter:nth-child(1) { animation-delay: 0.1s; }
        .video-card-enter:nth-child(2) { animation-delay: 0.2s; }
        .video-card-enter:nth-child(3) { animation-delay: 0.3s; }
        .video-card-enter:nth-child(4) { animation-delay: 0.4s; }
        .video-card-enter:nth-child(5) { animation-delay: 0.5s; }
      `}</style>
      
      <div style={styles.layout}>
        <Sidebar />
        <div style={styles.content}>
          {/* Page Header */}
          <div style={styles.pageHeader}>
            <div style={styles.headerPattern}></div>
            <div style={styles.headerContent}>
              <h1 style={styles.pageTitle}>
                🎥 Class {cls} - {subjectName} Videos
              </h1>
              <p style={styles.pageSubtitle}>
                📚 Explore educational videos for better understanding
              </p>
            </div>
          </div>

          {/* Back Button */}
          <button 
            style={{
              ...styles.backButton,
              ...(hoveredVideo === 'back' ? styles.backButtonHover : {})
            }}
            onMouseEnter={() => setHoveredVideo('back')}
            onMouseLeave={() => setHoveredVideo(null)}
            onClick={() => navigate(-1)}
          >
            ← Back to Class {cls} Subjects
          </button>

          {/* Loading State */}
          {isLoading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              <div style={styles.loadingText}>Loading amazing videos for you...</div>
            </div>
          ) : videos.length === 0 ? (
            /* Empty State */
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📹</div>
              <h3 style={styles.emptyTitle}>No Videos Found</h3>
              <p style={styles.emptyDescription}>
                No videos found for <strong>{subjectName}</strong> in <strong>Class {cls}</strong><br/>
                <small style={{ color: '#9CA3AF' }}>Debug info: Class={cls}, Subject={subject}, Extracted={subjectName}</small>
              </p>
              <button 
                style={{
                  ...styles.actionButton,
                  ...(hoveredVideo === 'explore' ? styles.actionButtonHover : {})
                }}
                onMouseEnter={() => setHoveredVideo('explore')}
                onMouseLeave={() => setHoveredVideo(null)}
                onClick={() => navigate(`/student/class/${cls}`)}
              >
                🔍 Explore Other Subjects
              </button>
            </div>
          ) : (
            /* Videos Grid */
            <div style={styles.videosContainer}>
              {videos.map((video, index) => (
                <div 
                  key={index} 
                  className={`video-card-enter`}
                  style={{
                    ...styles.videoCard,
                    ...(hoveredVideo === index ? styles.videoCardHover : {}),
                    animationDelay: `${index * 0.1}s`
                  }}
                  onMouseEnter={() => setHoveredVideo(index)}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  <h3 style={styles.videoTitle}>
                    🎬 {video.title}
                  </h3>
                  <iframe
                    src={video.link}
                    style={{
                      ...styles.videoFrame,
                      ...(hoveredVideo === index ? styles.videoFrameHover : {})
                    }}
                    allow="autoplay; encrypted-media; fullscreen"
                    allowFullScreen
                    title={video.title}
                    loading="lazy"
                  ></iframe>
                  
                  {/* Video overlay for better UX */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    right: '1rem',
                    background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0 0 12px 12px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    boxShadow: '0 4px 12px -2px rgba(124, 58, 237, 0.3)'
                  }}>
                    📺 Video {index + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
