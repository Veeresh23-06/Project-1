/**
 * AI Image Recognition Service
 * Uses Google Cloud Vision API or Clarifai for image analysis
 */

/**
 * Analyze image and extract labels/categories
 * @param {File} imageFile - Image file to analyze
 * @returns {object} - Analysis results with labels and suggested category
 */
export const analyzeImage = async (imageFile) => {
  try {
    // Convert image to base64
    const base64Image = await fileToBase64(imageFile)
    
    // Check if API key is configured
    const apiKey = import.meta.env.VITE_AI_VISION_API_KEY
    
    if (!apiKey) {
      console.warn('AI Vision API key not configured')
      return {
        labels: [],
        suggestedCategory: null,
        confidence: 0
      }
    }
    
    // Call Google Cloud Vision API
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64Image.split(',')[1]
              },
              features: [
                {
                  type: 'LABEL_DETECTION',
                  maxResults: 10
                },
                {
                  type: 'OBJECT_LOCALIZATION',
                  maxResults: 5
                }
              ]
            }
          ]
        })
      }
    )
    
    const data = await response.json()
    
    if (data.responses && data.responses[0]) {
      const labels = data.responses[0].labelAnnotations || []
      const objects = data.responses[0].localizedObjectAnnotations || []
      
      // Extract label names
      const labelNames = labels.map(l => l.description.toLowerCase())
      const objectNames = objects.map(o => o.name.toLowerCase())
      
      // Combine all detected items
      const allDetections = [...labelNames, ...objectNames]
      
      // Suggest category based on detected labels
      const suggestedCategory = suggestCategoryFromLabels(allDetections)
      
      return {
        labels: allDetections,
        suggestedCategory,
        confidence: labels[0]?.score || 0
      }
    }
    
    return {
      labels: [],
      suggestedCategory: null,
      confidence: 0
    }
  } catch (error) {
    console.error('Error analyzing image:', error)
    return {
      labels: [],
      suggestedCategory: null,
      confidence: 0,
      error: error.message
    }
  }
}

/**
 * Convert file to base64
 * @param {File} file - File to convert
 * @returns {Promise<string>} - Base64 string
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

/**
 * Suggest category based on detected labels
 * @param {array} labels - Array of detected labels
 * @returns {string|null} - Suggested category ID
 */
const suggestCategoryFromLabels = (labels) => {
  const categoryKeywords = {
    electronics: ['phone', 'mobile', 'laptop', 'computer', 'tablet', 'headphone', 'earphone', 'charger', 'cable', 'electronic'],
    documents: ['document', 'paper', 'card', 'certificate', 'id', 'passport', 'license'],
    accessories: ['watch', 'glasses', 'sunglasses', 'jewelry', 'ring', 'necklace', 'bracelet'],
    books: ['book', 'notebook', 'textbook', 'novel', 'magazine', 'journal'],
    clothing: ['shirt', 'jacket', 'coat', 'pants', 'dress', 'shoe', 'clothing', 'apparel'],
    keys: ['key', 'keychain', 'car key'],
    wallets: ['wallet', 'purse', 'bag', 'backpack', 'handbag'],
    sports: ['ball', 'racket', 'sports', 'equipment', 'bottle', 'gym'],
    jewelry: ['jewelry', 'ring', 'necklace', 'earring', 'bracelet', 'gold', 'silver'],
  }
  
  // Count matches for each category
  const categoryScores = {}
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    categoryScores[category] = 0
    
    for (const label of labels) {
      for (const keyword of keywords) {
        if (label.includes(keyword) || keyword.includes(label)) {
          categoryScores[category]++
        }
      }
    }
  }
  
  // Find category with highest score
  let maxScore = 0
  let suggestedCategory = null
  
  for (const [category, score] of Object.entries(categoryScores)) {
    if (score > maxScore) {
      maxScore = score
      suggestedCategory = category
    }
  }
  
  return maxScore > 0 ? suggestedCategory : null
}

/**
 * Generate description from image labels
 * @param {array} labels - Array of detected labels
 * @returns {string} - Generated description
 */
export const generateDescription = (labels) => {
  if (labels.length === 0) {
    return ''
  }
  
  const topLabels = labels.slice(0, 5)
  return `Detected: ${topLabels.join(', ')}`
}
