import { useState } from 'react'

/**
 * Form Validation Hook
 * Provides form validation functionality
 */
export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  /**
   * Validate a single field
   */
  const validateField = (name, value) => {
    const rules = validationRules[name]
    if (!rules) return null

    // Required validation
    if (rules.required && !value) {
      return rules.required
    }

    // Min length validation
    if (rules.minLength && value.length < rules.minLength.value) {
      return rules.minLength.message
    }

    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength.value) {
      return rules.maxLength.message
    }

    // Email validation
    if (rules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return rules.email
      }
    }

    // Phone validation
    if (rules.phone && value) {
      const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
      if (!phoneRegex.test(value)) {
        return rules.phone
      }
    }

    // Custom validation
    if (rules.custom && typeof rules.custom === 'function') {
      return rules.custom(value, values)
    }

    return null
  }

  /**
   * Validate all fields
   */
  const validateAll = () => {
    const newErrors = {}
    let isValid = true

    Object.keys(validationRules).forEach((name) => {
      const error = validateField(name, values[name])
      if (error) {
        newErrors[name] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  /**
   * Handle input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })

    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors({ ...errors, [name]: error })
    }
  }

  /**
   * Handle input blur
   */
  const handleBlur = (e) => {
    const { name } = e.target
    setTouched({ ...touched, [name]: true })

    const error = validateField(name, values[name])
    setErrors({ ...errors, [name]: error })
  }

  /**
   * Reset form
   */
  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    setValues,
  }
}
