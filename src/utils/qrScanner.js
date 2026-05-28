import { Html5Qrcode } from 'html5-qrcode'

/**
 * QR Code Scanner Service
 * Handles QR code scanning using device camera
 */

let html5QrCode = null

/**
 * Start QR code scanner
 * @param {string} elementId - ID of the HTML element to render scanner
 * @param {function} onSuccess - Callback when QR code is scanned
 * @param {function} onError - Callback when error occurs
 */
export const startScanner = async (elementId, onSuccess, onError) => {
  try {
    html5QrCode = new Html5Qrcode(elementId)
    
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0
    }
    
    await html5QrCode.start(
      { facingMode: 'environment' }, // Use back camera
      config,
      (decodedText, decodedResult) => {
        onSuccess(decodedText, decodedResult)
      },
      (errorMessage) => {
        // Ignore frequent scanning errors
        if (!errorMessage.includes('NotFoundException')) {
          console.warn('QR scan error:', errorMessage)
        }
      }
    )
    
    return true
  } catch (error) {
    console.error('Error starting scanner:', error)
    if (onError) {
      onError(error)
    }
    return false
  }
}

/**
 * Stop QR code scanner
 */
export const stopScanner = async () => {
  try {
    if (html5QrCode) {
      await html5QrCode.stop()
      html5QrCode.clear()
      html5QrCode = null
    }
    return true
  } catch (error) {
    console.error('Error stopping scanner:', error)
    return false
  }
}

/**
 * Check if camera permission is granted
 * @returns {Promise<boolean>} - True if permission granted
 */
export const checkCameraPermission = async () => {
  try {
    const result = await navigator.permissions.query({ name: 'camera' })
    return result.state === 'granted'
  } catch (error) {
    console.error('Error checking camera permission:', error)
    return false
  }
}

/**
 * Request camera permission
 * @returns {Promise<boolean>} - True if permission granted
 */
export const requestCameraPermission = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    stream.getTracks().forEach(track => track.stop())
    return true
  } catch (error) {
    console.error('Error requesting camera permission:', error)
    return false
  }
}

/**
 * Parse QR code data and extract item ID
 * @param {string} qrData - QR code data
 * @returns {string|null} - Item ID or null
 */
export const parseQRCode = (qrData) => {
  try {
    // Check if it's a URL
    if (qrData.startsWith('http')) {
      const url = new URL(qrData)
      const pathParts = url.pathname.split('/')
      const itemIndex = pathParts.indexOf('item')
      
      if (itemIndex !== -1 && pathParts[itemIndex + 1]) {
        return pathParts[itemIndex + 1]
      }
    }
    
    // Check if it's just an item ID
    if (qrData.length === 20) { // Firestore ID length
      return qrData
    }
    
    return null
  } catch (error) {
    console.error('Error parsing QR code:', error)
    return null
  }
}
