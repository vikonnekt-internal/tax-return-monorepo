import React from 'react'
import classNames from 'classnames'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'xs' | 'sm' | 'md'
  disabled?: boolean
  hasError?: boolean
  type?: 'button' | 'submit' | 'reset'
  icon?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  hasError = false,
  type = 'button',
  icon,
  onClick,
  className,
  ...rest
}) => {
  const buttonClassNames = classNames(
    'button',
    variant && `${variant}-btn`,
    size && `size-${size}`,
    {
      'has-error': hasError,
      disabled: disabled,
    },
    className,
  )

  return (
    <button
      type={type}
      className={buttonClassNames}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {icon && <span className="icon">{icon}</span>}
      {children}
    </button>
  )
}

export default Button
