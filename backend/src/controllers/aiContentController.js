import Content from '../models/Content.js'
import fs from 'fs'
import path from 'path'
import PDFDocument from 'pdfkit'

// OpenAI API configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

export async function testAIContent(req, res) {
  try {
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ message: 'OpenAI API key not configured on server' })
    }
    console.log('Testing OpenAI API for content generation...')
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: 'Generate a brief educational content about "Photosynthesis" for grade 6 students. Keep it short and structured.'
        }],
        max_tokens: 200
      })
    })

    console.log('Test response status:', response.status)
    const data = await response.json()
    console.log('Test response data:', data)
    
    return res.json({ 
      message: 'AI Content API test successful', 
      status: response.status,
      data: data.choices?.[0]?.message?.content || 'No content received'
    })
  } catch (err) {
    console.error('AI Content API test error:', err)
    return res.status(500).json({ 
      message: 'AI Content API test failed', 
      error: err.message 
    })
  }
}

export async function generateContent(req, res) {
  try {
    console.log('AI Content generation request:', req.body)
    const { topic, subject, format = 'pdf', difficulty = 'medium', grade = '6' } = req.body

    if (!topic || !topic.trim()) {
      return res.status(400).json({ message: 'Topic is required' })
    }
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ message: 'OpenAI API key not configured on server' })
    }

    // Create prompt for AI content generation
    const prompt = `Create comprehensive educational content about "${topic}" for grade ${grade} students in ${subject || 'General'} subject.

    DIFFICULTY: ${difficulty}
    FORMAT: ${format.toUpperCase()}

    Create a detailed study guide with the following structure:

    # ${topic} - Study Guide

    ## Introduction
    - Brief overview of the topic
    - Why it's important to learn
    - What students will learn

    ## Key Concepts
    - Main concepts with clear definitions
    - Important terms and their meanings
    - Core principles

    ## Detailed Explanation
    - Step-by-step explanations
    - Real-world examples
    - Visual descriptions where helpful

    ## Examples and Practice
    - Worked examples
    - Practice problems with solutions
    - Common mistakes to avoid

    ## Applications
    - How this topic is used in real life
    - Related topics and connections
    - Career applications

    ## Summary
    - Key points to remember
    - Important formulas or rules
    - Quick reference guide

    ## Practice Questions
    - 5-10 practice questions
    - Include answers and explanations
    - Vary difficulty levels

    Make the content:
    - Age-appropriate for grade ${grade}
    - Engaging and easy to understand
    - Well-structured with clear headings
    - Educational and comprehensive
    - Suitable for self-study

    Use clear, simple language and include plenty of examples.`

    // Call OpenAI API
    console.log('Calling OpenAI API for content generation...')
    console.log('Topic:', topic)
    
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: prompt
        }],
        temperature: 0.7,
        max_tokens: 3000
      })
    })

    console.log('OpenAI API response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', response.status, errorText)
      
      // Only fallback for specific errors, not all errors
      if (response.status === 429 || response.status === 403 || response.status === 404) {
        console.log('Using fallback content due to API error')
        const fallbackContent = await generateLocalContent(topic, subject, grade)
        const content = await Content.create({
          title: fallbackContent.title,
          description: fallbackContent.description,
          subject: fallbackContent.subject,
          type: 'pdf',
          fileUrl: fallbackContent.fileUrl,
          teacher: req.user.id,
          isAIGenerated: true
        })
        return res.json({ 
          message: 'AI quota exceeded. Generated comprehensive local PDF content instead. The content includes detailed explanations, examples, and practice questions.', 
          content: {
            _id: content._id,
            title: content.title,
            description: content.description,
            subject: content.subject,
            type: content.type,
            fileUrl: content.fileUrl,
            isAIGenerated: true
          }
        })
      }
      
      // For other errors, throw the error instead of falling back
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('OpenAI API response:', JSON.stringify(data, null, 2))
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid AI response structure:', data)
      throw new Error('Invalid response from AI API')
    }

    const aiResponse = data.choices[0].message.content
    
    // Create PDF from AI response
    const uploadsDir = path.join(process.cwd(), 'uploads')
    try { fs.mkdirSync(uploadsDir, { recursive: true }) } catch {}
    const filename = `ai-content-${Date.now()}.pdf`
    const filePath = path.join(uploadsDir, filename)
    await new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 })
      const stream = fs.createWriteStream(filePath)
      doc.pipe(stream)
      
      // Title
      doc.fontSize(20).text(`${topic} - Study Guide`, { align: 'center', underline: true })
      doc.moveDown(2)
      
      // Add metadata
      doc.fontSize(12).text(`Subject: ${subject || 'General'}`, { align: 'left' })
      doc.text(`Grade: ${grade}`, { align: 'left' })
      doc.text(`Difficulty: ${difficulty}`, { align: 'left' })
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, { align: 'left' })
      doc.moveDown(2)
      
      // Content with better formatting
      const lines = aiResponse.split('\n')
      let currentFontSize = 12
      
      lines.forEach(line => {
        const trimmedLine = line.trim()
        
        if (trimmedLine.startsWith('# ')) {
          // Main heading
          doc.fontSize(16).text(trimmedLine.substring(2), { underline: true })
          doc.moveDown()
        } else if (trimmedLine.startsWith('## ')) {
          // Sub heading
          doc.fontSize(14).text(trimmedLine.substring(3), { underline: true })
          doc.moveDown(0.5)
        } else if (trimmedLine.startsWith('- ')) {
          // Bullet point
          doc.fontSize(11).text(`• ${trimmedLine.substring(2)}`, { indent: 20 })
          doc.moveDown(0.3)
        } else if (trimmedLine.length > 0) {
          // Regular text
          doc.fontSize(11).text(trimmedLine)
          doc.moveDown(0.5)
        } else {
          // Empty line
          doc.moveDown(0.3)
        }
      })
      
      // Footer
      doc.moveDown(2)
      doc.fontSize(10).text('Generated by EduConnect Punjab AI Content Generator', { align: 'center', opacity: 0.7 })
      
      doc.end()
      stream.on('finish', resolve)
      stream.on('error', reject)
    })

    // Save content record as PDF file
    const content = await Content.create({
      title: `AI Generated: ${topic}`,
      description: aiResponse.substring(0, 200) + '...',
      subject: subject || 'General',
      type: 'pdf',
      fileUrl: `/uploads/${filename}`,
      teacher: req.user.id,
      isAIGenerated: true
    })

    return res.json({ 
      message: 'Content generated successfully',
      content: {
        _id: content._id,
        title: content.title,
        description: content.description,
        subject: content.subject,
          type: content.type,
          fileUrl: content.fileUrl,
        isAIGenerated: true
      }
    })

  } catch (err) {
    console.error('AI Content generation error:', err)
    return res.status(500).json({ 
      message: 'Failed to generate content', 
      error: err.message 
    })
  }
}

async function generateLocalContent(topic, subject, grade) {
  const uploadsDir = path.join(process.cwd(), 'uploads')
  try { fs.mkdirSync(uploadsDir, { recursive: true }) } catch {}
  
  const filename = `ai-content-fallback-${Date.now()}.pdf`
  const filePath = path.join(uploadsDir, filename)
  
  // Create a comprehensive PDF with detailed content
  await new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 })
    const stream = fs.createWriteStream(filePath)
    doc.pipe(stream)
    
    // Title
    doc.fontSize(20).text(`${topic} - Study Guide`, { align: 'center', underline: true })
    doc.moveDown(2)
    
    // Metadata
    doc.fontSize(12).text(`Subject: ${subject || 'General'}`, { align: 'left' })
    doc.text(`Grade: ${grade}`, { align: 'left' })
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, { align: 'left' })
    doc.moveDown(2)
    
    // Introduction
    doc.fontSize(16).text('Introduction', { underline: true })
    doc.moveDown()
    doc.fontSize(11).text(`${topic} is an important topic in ${subject || 'General'} that students in grade ${grade} need to understand. This study guide will help you learn the key concepts, examples, and applications of ${topic}.`)
    doc.moveDown()
    
    // Key Concepts
    doc.fontSize(16).text('Key Concepts', { underline: true })
    doc.moveDown()
    doc.fontSize(11).text(`• Definition: ${topic} refers to the fundamental principles and ideas related to this topic.`)
    doc.text(`• Importance: Understanding ${topic} is crucial for your academic success.`)
    doc.text(`• Applications: ${topic} is used in various real-world situations.`)
    doc.moveDown()
    
    // Detailed Explanation
    doc.fontSize(16).text('Detailed Explanation', { underline: true })
    doc.moveDown()
    doc.fontSize(11).text(`To understand ${topic} properly, you need to focus on:`)
    doc.text(`1. Basic principles and definitions`)
    doc.text(`2. How it works and why it's important`)
    doc.text(`3. Real-world examples and applications`)
    doc.text(`4. Common problems and solutions`)
    doc.moveDown()
    
    // Examples
    doc.fontSize(16).text('Examples and Applications', { underline: true })
    doc.moveDown()
    doc.fontSize(11).text(`Here are some examples of ${topic}:`)
    doc.text(`• Example 1: A common application of ${topic}`)
    doc.text(`• Example 2: Another real-world use of ${topic}`)
    doc.text(`• Example 3: How ${topic} relates to your daily life`)
    doc.moveDown()
    
    // Practice Questions
    doc.fontSize(16).text('Practice Questions', { underline: true })
    doc.moveDown()
    doc.fontSize(11).text(`1. What is ${topic}?`)
    doc.text(`2. Why is ${topic} important?`)
    doc.text(`3. Give an example of ${topic} in real life.`)
    doc.text(`4. How does ${topic} work?`)
    doc.text(`5. What are the key features of ${topic}?`)
    doc.moveDown()
    
    // Summary
    doc.fontSize(16).text('Summary', { underline: true })
    doc.moveDown()
    doc.fontSize(11).text(`Key points to remember about ${topic}:`)
    doc.text(`• ${topic} is essential for understanding ${subject || 'General'}`)
    doc.text(`• Practice regularly to master the concepts`)
    doc.text(`• Look for real-world examples to better understand`)
    doc.text(`• Ask questions when you need help`)
    doc.moveDown()
    
    // Footer
    doc.fontSize(10).text('Generated by EduConnect Punjab - Local Content Generator', { align: 'center', opacity: 0.7 })
    doc.text('Note: This is locally generated content. For AI-generated content, please check API quota.', { align: 'center', opacity: 0.7 })
    
    doc.end()
    stream.on('finish', resolve)
    stream.on('error', reject)
  })
  
  return {
    title: `Study Guide: ${topic}`,
    description: `A comprehensive study guide about ${topic} for grade ${grade} students.`,
    subject: subject || 'General',
    fileUrl: `/uploads/${filename}`
  }
}
