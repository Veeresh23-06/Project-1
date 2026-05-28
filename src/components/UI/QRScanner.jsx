import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { startScanner, stopScanner, parseQRCode } from '@/utils/qrScanner'
import { FiX, FiCamera } from 'react-icons/fi'
import toast from 'react-hot-toast'

/**
 * QR Scanner Component
 * Modal component for scanning QR codes
 */
const QRScanner = ({ isOpen, onClose }) => {
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      initScanner()
    } else {
      cleanup()
    }

    return () => cleanup()
  }, [isOpen])

  const initScanner = async () => {
    setScanning(true)
    setError(null)

    const success = await startScanner(
      'qr-reader',
      handleScanSuccess,
      handleScanError
    )

    if (!success) {
      setError('Failed to start camera. Please check permissions.')
      setScanning(false)
    }
  }

  const cleanup = async () => {
    await stopScanner()
    setScanning(false)
  }

  const handleScanSuccess = (decodedText) => {
    const itemId = parseQRCode(decodedText)

    if (itemId) {
      toast.success('QR Code scanned successfully!')
      cleanup()
      onClose()
      navigate(`/item/${itemId}`)
    } else {
      toast.error('Invalid QR code')
    }
  }

  const handleScanError = (error) => {
    setError('Camera access denied or not available')
    console.error('Scanner error:', error)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <FiCamera className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Scan QR Code
            </h2>
          </div>
          <button
            onClick={() => {
              cleanup()
              onClose()
            }}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Scanner Area */}
        <div className="p-6">
          {error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={initScanner}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div
                id="qr-reader"
                className="w-full rounded-lg overflow-hidden"
              ></div>
              <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                Position the QR code within the frame
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default QRScanner
