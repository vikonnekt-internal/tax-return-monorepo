'use client'
import clsx from 'clsx'
import { forwardRef, useState } from 'react'

interface IInput {
  name?: string
  value?: string
  label?: string
  className?: string
  rest?: any
  error?: any
  input?: {
    class?: string
  }
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const IDInput = forwardRef<HTMLInputElement, IInput>(
  (
    {
      name,
      value,
      label,
      className,
      error,
      input = { class: '' },
      placeholder,
      onChange,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(value || '')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/\D/g, '').slice(0, 6)
      setInputValue(newValue)

      const newEvent = {
        ...e,
        target: {
          ...e.target,
          value: newValue,
        },
      }

      if (onChange) {
        onChange(newEvent as React.ChangeEvent<HTMLInputElement>)
      }
    }

    const validateInput = (e: React.FocusEvent<HTMLInputElement>) => {
      const currentValue = e.target.value

      if (currentValue.length > 0 && currentValue.length !== 6) {
        const newError = {
          ...error,
          message: 'Please enter exactly 6 digits',
        }
      }

      if (onBlur) {
        onBlur(e)
      }
    }

    return (
      <div className={clsx('input-container', className)}>
        {label && <label className="input-container__label">{label}</label>}
        <input
          className={clsx(
            error && 'input-container__input input-error',
            input.class,
          )}
          name={name}
          value={inputValue}
          type="text"
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          placeholder={placeholder || 'Enter 6 digits'}
          onChange={handleChange}
          onBlur={validateInput}
          {...rest}
          ref={ref}
        />
        <label className="input-container__error">{error?.message || ''}</label>
      </div>
    )
  },
)

// Rename the display name for better debugging
IDInput.displayName = 'IDInput'

export default IDInput
