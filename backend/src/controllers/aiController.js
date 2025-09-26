import Quiz from '../models/Quiz.js'

// OpenAI API configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

function generateLocalQuiz(topic, numQuestions, subject) {
  const count = Math.max(3, Math.min(10, parseInt(numQuestions) || 5))
  
  // Create diverse question templates
  const questionTemplates = [
    {
      text: `What is the primary definition of ${topic}?`,
      options: [
        `The main concept of ${topic}`,
        `A related but different concept`,
        `An opposite concept`,
        `A completely unrelated concept`
      ]
    },
    {
      text: `Which of the following best describes ${topic}?`,
      options: [
        `A detailed explanation of ${topic}`,
        `A simple overview of ${topic}`,
        `A complex analysis of ${topic}`,
        `A basic introduction to ${topic}`
      ]
    },
    {
      text: `What is the main purpose of ${topic}?`,
      options: [
        `The primary function of ${topic}`,
        `A secondary function of ${topic}`,
        `An unrelated purpose`,
        `A minor aspect of ${topic}`
      ]
    },
    {
      text: `Which statement about ${topic} is correct?`,
      options: [
        `A true statement about ${topic}`,
        `A partially true statement`,
        `A false statement`,
        `An irrelevant statement`
      ]
    },
    {
      text: `What are the key characteristics of ${topic}?`,
      options: [
        `The main features of ${topic}`,
        `Secondary features of ${topic}`,
        `Unrelated characteristics`,
        `Minor aspects of ${topic}`
      ]
    }
  ]
  
  const questions = Array.from({ length: count }).map((_, i) => {
    const template = questionTemplates[i % questionTemplates.length]
    const correctIndex = Math.floor(Math.random() * 4)
    
    return {
      text: template.text,
      options: template.options,
      correct: correctIndex
    }
  })
  
  return {
    title: `Practice Quiz: ${topic}`,
    className: '6',
    subject: subject || 'General',
    questions
  }
}

export async function testAI(req, res) {
  try {
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ message: 'OpenAI API key not configured on server' })
    }
    console.log('Testing OpenAI API...')
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
          content: 'Hello, can you respond with "API is working"?'
        }],
        max_tokens: 50
      })
    })

    console.log('Test response status:', response.status)
    const data = await response.json()
    console.log('Test response data:', data)
    
    return res.json({ 
      message: 'AI API test successful', 
      status: response.status,
      data 
    })
  } catch (err) {
    console.error('AI API test error:', err)
    return res.status(500).json({ 
      message: 'AI API test failed', 
      error: err.message 
    })
  }
}

export async function generateQuiz(req, res) {
  try {
    console.log('AI Quiz generation request:', req.body)
    const { topic, numQuestions = 5, difficulty = 'medium', subject = 'General' } = req.body

    if (!topic || !topic.trim()) {
      return res.status(400).json({ message: 'Topic is required' })
    }
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ message: 'OpenAI API key not configured on server' })
    }

    // Create prompt for AI
    const prompt = `Generate a ${difficulty} level quiz about "${topic}" for ${numQuestions} questions. 
    
    IMPORTANT: Create DIVERSE questions covering different aspects of the topic. Each question should be unique and test different concepts, not variations of the same question.
    
    For each question:
    - Test different subtopics, concepts, or applications
    - Use varied question types (definition, application, analysis, calculation, etc.)
    - Make options realistic and plausible
    - Ensure only one correct answer
    - For competitive exams, focus on practical knowledge and problem-solving
    
    Format the response as JSON with this exact structure:
    {
      "title": "Quiz: ${topic}",
      "className": "6",
      "subject": "${subject}",
      "questions": [
        {
          "text": "What is the definition of [concept 1]?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correct": 0
        },
        {
          "text": "Which of the following is an example of [concept 2]?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correct": 1
        }
      ]
    }
    
    Make sure each question covers a different aspect of "${topic}". 
    The "correct" field should be the index (0-3) of the correct option.
    Return ONLY the JSON, no additional text.`

    // Call OpenAI API
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
        max_tokens: 2048
      })
    })

    if (!response.ok) {
      // Graceful fallback for quota errors or model access issues
      if (response.status === 429 || response.status === 403 || response.status === 404) {
        const fallback = generateLocalQuiz(topic, numQuestions, subject)
        const quiz = await Quiz.create({
          title: fallback.title,
          className: fallback.className,
          subject: fallback.subject,
          questions: fallback.questions,
          isAIGenerated: true
        })
        return res.json({ message: 'AI quota exceeded or model unavailable. Generated a local practice quiz instead.', quiz })
      }
      const errorText = await response.text()
      console.error('OpenAI API error:', response.status, errorText)
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('OpenAI API response:', JSON.stringify(data, null, 2))
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid AI response structure:', data)
      throw new Error('Invalid response from AI API')
    }

    const aiResponse = data.choices[0].message.content
    
    // Parse the JSON response from AI
    let quizData
    try {
      // Extract JSON from the response (AI might include extra text)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in AI response')
      }
      quizData = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse)
      throw new Error('Failed to parse AI response')
    }

    // Validate the quiz data
    if (!quizData.questions || !Array.isArray(quizData.questions) || quizData.questions.length === 0) {
      throw new Error('Invalid quiz structure from AI')
    }

    // Create quiz in database
    const quiz = await Quiz.create({
      title: quizData.title || `AI Generated Quiz: ${topic}`,
      className: quizData.className || '6',
      subject: quizData.subject || subject,
      questions: quizData.questions,
      teacher: req.user.id, // Associate with the requesting user
      isAIGenerated: true // Flag to identify AI-generated quizzes
    })

    return res.json({ 
      message: 'Quiz generated successfully',
      quiz: {
        _id: quiz._id,
        title: quiz.title,
        className: quiz.className,
        subject: quiz.subject,
        questions: quiz.questions,
        isAIGenerated: true
      }
    })

  } catch (err) {
    console.error('AI Quiz generation error:', err)
    return res.status(500).json({ 
      message: 'Failed to generate quiz', 
      error: err.message 
    })
  }
}
