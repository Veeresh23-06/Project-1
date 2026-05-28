import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { ARCHIVE_DURATION } from '@/config/categories'

/**
 * Archive Service
 * Handles automatic archiving of old items (30 days)
 */

/**
 * Check and archive old items
 * This should be called by a Firebase Cloud Function on a schedule
 * @returns {number} - Number of items archived
 */
export const archiveOldItems = async () => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - ARCHIVE_DURATION)
    
    // Query items older than 30 days that are not claimed or archived
    const q = query(
      collection(db, 'items'),
      where('createdAt', '<=', thirtyDaysAgo),
      where('status', 'in', ['lost', 'found'])
    )
    
    const querySnapshot = await getDocs(q)
    let archivedCount = 0
    
    // Archive each item
    for (const docSnapshot of querySnapshot.docs) {
      await updateDoc(doc(db, 'items', docSnapshot.id), {
        status: 'archived',
        archivedAt: new Date(),
      })
      archivedCount++
    }
    
    console.log(`Archived ${archivedCount} items`)
    return archivedCount
  } catch (error) {
    console.error('Error archiving items:', error)
    return 0
  }
}

/**
 * Check if an item should be archived
 * @param {object} item - Item to check
 * @returns {boolean} - True if item should be archived
 */
export const shouldArchive = (item) => {
  if (item.status === 'claimed' || item.status === 'archived') {
    return false
  }
  
  const itemDate = item.createdAt?.toDate?.() || new Date(item.createdAt)
  const daysSinceCreation = (Date.now() - itemDate.getTime()) / (1000 * 60 * 60 * 24)
  
  return daysSinceCreation >= 30
}

/**
 * Get days until archive
 * @param {object} item - Item to check
 * @returns {number} - Days until archive (negative if already should be archived)
 */
export const getDaysUntilArchive = (item) => {
  const itemDate = item.createdAt?.toDate?.() || new Date(item.createdAt)
  const daysSinceCreation = (Date.now() - itemDate.getTime()) / (1000 * 60 * 60 * 24)
  
  return Math.ceil(30 - daysSinceCreation)
}
