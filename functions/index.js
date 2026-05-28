const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')

admin.initializeApp()

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email?.user,
    pass: functions.config().email?.password,
  },
})

/**
 * Send Email Notification
 * Triggered when a notification document is created
 */
exports.sendEmailNotification = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate(async (snap, context) => {
    const notification = snap.data()
    
    if (notification.type !== 'email' || notification.status !== 'pending') {
      return null
    }
    
    try {
      await transporter.sendMail({
        from: functions.config().email?.user,
        to: notification.to,
        subject: notification.subject,
        text: notification.body,
        html: `<div style="font-family: Arial, sans-serif;">${notification.body.replace(/\n/g, '<br>')}</div>`,
      })
      
      await snap.ref.update({
        status: 'sent',
        sentAt: admin.firestore.FieldValue.serverTimestamp(),
      })
      
      console.log('Email sent to:', notification.to)
      return null
    } catch (error) {
      console.error('Error sending email:', error)
      
      await snap.ref.update({
        status: 'failed',
        error: error.message,
      })
      
      return null
    }
  })


/**
 * Send SMS Notification
 * Triggered when a notification document is created
 */
exports.sendSMSNotification = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate(async (snap, context) => {
    const notification = snap.data()
    
    if (notification.type !== 'sms' || notification.status !== 'pending') {
      return null
    }
    
    try {
      const twilio = require('twilio')(
        functions.config().twilio?.sid,
        functions.config().twilio?.token
      )
      
      await twilio.messages.create({
        body: notification.message,
        from: functions.config().twilio?.phone,
        to: notification.to,
      })
      
      await snap.ref.update({
        status: 'sent',
        sentAt: admin.firestore.FieldValue.serverTimestamp(),
      })
      
      console.log('SMS sent to:', notification.to)
      return null
    } catch (error) {
      console.error('Error sending SMS:', error)
      
      await snap.ref.update({
        status: 'failed',
        error: error.message,
      })
      
      return null
    }
  })


/**
 * Auto-Archive Old Items
 * Scheduled function that runs daily at midnight
 */
exports.autoArchiveItems = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('Asia/Kolkata')
  .onRun(async (context) => {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const itemsRef = admin.firestore().collection('items')
    const oldItems = await itemsRef
      .where('createdAt', '<=', thirtyDaysAgo)
      .where('status', 'in', ['lost', 'found'])
      .get()
    
    const batch = admin.firestore().batch()
    let count = 0
    
    oldItems.forEach((doc) => {
      batch.update(doc.ref, {
        status: 'archived',
        archivedAt: admin.firestore.FieldValue.serverTimestamp(),
      })
      count++
    })
    
    await batch.commit()
    console.log(`Archived ${count} items`)
    
    return null
  })


/**
 * Find Matches for New Items
 * Triggered when a new item is created
 */
exports.findMatches = functions.firestore
  .document('items/{itemId}')
  .onCreate(async (snap, context) => {
    const newItem = snap.data()
    const oppositeType = newItem.type === 'lost' ? 'found' : 'lost'
    
    const itemsRef = admin.firestore().collection('items')
    const oppositeItems = await itemsRef
      .where('type', '==', oppositeType)
      .where('status', '!=', 'claimed')
      .where('category', '==', newItem.category)
      .get()
    
    const matches = []
    
    oppositeItems.forEach((doc) => {
      const item = doc.data()
      const score = calculateSimilarity(newItem, item)
      
      if (score >= 50) {
        matches.push({
          id: doc.id,
          ...item,
          similarityScore: score,
        })
      }
    })
    
    matches.sort((a, b) => b.similarityScore - a.similarityScore)
    
    if (matches.length > 0) {
      const topMatch = matches[0]
      
      await admin.firestore().collection('notifications').add({
        type: 'email',
        to: newItem.email,
        subject: `Possible Match Found for ${newItem.itemName}`,
        body: `We found a possible match for your ${newItem.type} item.\n\nMatched Item: ${topMatch.itemName}\nLocation: ${topMatch.location}\nSimilarity: ${topMatch.similarityScore}%`,
        status: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })
    }
    
    return null
  })

function calculateSimilarity(item1, item2) {
  let score = 0
  
  if (item1.category === item2.category) score += 30
  if (item1.location === item2.location) score += 25
  
  const keywords1 = extractKeywords(`${item1.itemName} ${item1.description}`)
  const keywords2 = extractKeywords(`${item2.itemName} ${item2.description}`)
  const commonKeywords = keywords1.filter(k => keywords2.includes(k))
  score += (commonKeywords.length / Math.max(keywords1.length, 1)) * 30
  
  return Math.min(Math.round(score), 100)
}

function extractKeywords(text) {
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at']
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word))
}
