import { Component } from 'react'

/**
 * Error Boundary - catches JS errors and shows fallback UI instead of white screen
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('App Error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-2 text-sm font-mono bg-red-50 p-3 rounded-lg text-left">
              {this.state.error?.message}
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Make sure your <strong>.env</strong> file has valid Firebase credentials.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
