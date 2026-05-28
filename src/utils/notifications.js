import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import toast from 'react-hot-toast'

/**
 * Notification Service
 * Handles email and SMS notifications
 */

/**
 * Send email notification (requires backend implementation)
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} body - Email body
 */
export const sendEmailNotification = async (to, subject, body) => {
  try {
    // Store notification in Firestore
    // Firebase Cloud Function will pick this up and send email
    await addDoc(collection(db, 'notifications'), {
      type: 'email',
      to,
      subject,
      body,
      status: 'pending',
      createdAt: new Date(),
    })
    
    console.log('Email notification queued:', to)
    return true
  } catch (error) {
    console.error('Error sending email notification:', error)
    return false
  }
}

/**
 * Send SMS notification (requires Twilio setup)
 * @param {string} to - Recipient phone number
 * @param {string} message - SMS message
 */
export const sendSMSNotification = async (to, message) => {
  try {
    // Store notification in Firestore
    // Firebase Cloud Function will pick this up and send SMS via Twilio
    await addDoc(collection(db, 'notifications'), {
      type: 'sms',
      to,
      message,
      status: 'pending',
      createdAt: new Date(),
    })
    
    console.log('SMS notification queued:', to)
    return true
  } catch (error) {
    console.error('Error sending SMS notification:', error)
    return false
  }
}

/**
 * Notify user about item match
 * @param {object} item - Item object
 * @param {object} matchedItem - Matched item object
 */
export const notifyItemMatch = async (item, matchedItem) => {
  try {
    const subject = `Possible Match Found for ${item.itemName}`
    const body = `
      Good news! We found a possible match for your ${item.type} item: ${item.itemName}.
      
      Matched Item: ${matchedItem.itemName}
      Location: ${matchedItem.location}
      Date: ${matchedItem.date}
      
      View details: ${window.location.origin}/item/${matchedItem.id}
      
      Contact: ${matchedItem.phone}
    `
    
    // Send email
    await sendEmailNotification(item.email, subject, body)
    
    // Send SMS
    const smsMessage = `FindIt: Possible match found for ${item.itemName}. Check your email for details.`
    await sendSMSNotification(item.phone, smsMessage)
    
    return true
  } catch (error) {
    console.error('Error notifying item match:', error)
    return false
  }
}

/**
 * Notify about claim status update
 * @param {object} claim - Claim object
 * @param {string} status - New status
 */
export const notifyClaimStatus = async (claim, status) => {
  try {
    const subject = `Claim ${status.toUpperCase()}: ${claim.itemName}`
    const body = `
      Your claim for ${claim.itemName} has been ${status}.
      
      ${status === 'approved' ? 'You can now contact the reporter to collect your item.' : 'Please try again or contact support.'}
      
      View details: ${window.location.origin}/item/${claim.itemId}
    `
    
    await sendEmailNotification(claim.email, subject, body)
    
    const smsMessage = `FindIt: Your claim for ${claim.itemName} has been ${status}.`
    await sendSMSNotification(claim.phone, smsMessage)
    
    // Show toast notification
    if (status === 'approved') {
      toast.success('Claim approved! Check your email for details.')
    } else {
      toast.error('Claim rejected. Check your email for details.')
    }
    
    return true
  } catch (error) {
    console.error('Error notifying claim status:', error)
    return false
  }
}

/**
 * Notify about new item report
 * @param {object} item - Item object
 */
export const notifyNewItem = async (item) => {
  try {
    const subject = `Item Reported: ${item.itemName}`
    const body = `
      Your ${item.type} item report has been submitted successfully.
      
      Item: ${item.itemName}
      Category: ${item.category}
      Location: ${item.location}
      Date: ${item.date}
      
      We'll notify you if we find a match.
      
      View your item: ${window.location.origin}/item/${item.id}
    `
    
    await sendEmailNotification(item.email, subject, body)
    
    const smsMessage = `FindIt: Your ${item.type} item "${item.itemName}" has been reported. We'll notify you of any matches.`
    await sendSMSNotification(item.phone, smsMessage)
    
    toast.success('Item reported successfully! You will be notified of any matches.')
    
    return true
  } catch (error) {
    console.error('Error notifying new item:', error)
    return false
  }
}
