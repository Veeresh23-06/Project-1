/**
 * Smart Matching Algorithm
 * Matches lost items with found items based on keywords, category, location, and date
 */

/**
 * Calculate similarity score between two items
 * @param {object} lostItem - Lost item
 * @param {object} foundItem - Found item
 * @returns {number} - Similarity score (0-100)
 */
export const calculateSimilarity = (lostItem, foundItem) => {
  let score = 0
  
  // Category match (30 points)
  if (lostItem.category === foundItem.category) {
    score += 30
  }
  
  // Location match (25 points)
  if (lostItem.location === foundItem.location) {
    score += 25
  }
  
  // Date proximity (15 points)
  const dateDiff = Math.abs(
    new Date(lostItem.date) - new Date(foundItem.date)
  )
  const daysDiff = dateDiff / (1000 * 60 * 60 * 24)
  if (daysDiff <= 7) {
    score += 15 - (daysDiff * 2)
  }
  
  // Keyword matching in name and description (30 points)
  const lostKeywords = extractKeywords(
    `${lostItem.itemName} ${lostItem.description}`
  )
  const foundKeywords = extractKeywords(
    `${foundItem.itemName} ${foundItem.description}`
  )
  
  const commonKeywords = lostKeywords.filter(k => foundKeywords.includes(k))
  const keywordScore = (commonKeywords.length / Math.max(lostKeywords.length, 1)) * 30
  score += keywordScore
  
  return Math.min(Math.round(score), 100)
}

/**
 * Extract keywords from text
 * @param {string} text - Text to extract keywords from
 * @returns {array} - Array of keywords
 */
const extractKeywords = (text) => {
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word))
}

/**
 * Find matches for an item
 * @param {object} item - Item to find matches for
 * @param {array} items - Array of items to search through
 * @param {number} threshold - Minimum similarity score (default: 50)
 * @returns {array} - Array of matched items with scores
 */
export const findMatches = (item, items, threshold = 50) => {
  const oppositeType = item.type === 'lost' ? 'found' : 'lost'
  
  const matches = items
    .filter(i => i.type === oppositeType && i.status !== 'claimed')
    .map(i => ({
      ...i,
      similarityScore: calculateSimilarity(item, i)
    }))
    .filter(i => i.similarityScore >= threshold)
    .sort((a, b) => b.similarityScore - a.similarityScore)
  
  return matches
}

/**
 * Get similar items (same category, different status)
 * @param {object} item - Reference item
 * @param {array} items - Array of items
 * @param {number} limit - Maximum number of results
 * @returns {array} - Array of similar items
 */
export const getSimilarItems = (item, items, limit = 4) => {
  return items
    .filter(i => 
      i.id !== item.id && 
      i.category === item.category &&
      i.status !== 'archived'
    )
    .slice(0, limit)
}
