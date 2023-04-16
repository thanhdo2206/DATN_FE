import React from 'react'

import '../assets/css/components/button.css'

type Props = {
  text?: string
  className?: string
  type?: 'submit' | 'reset' | 'button' | undefined
  onClick?: () => void
  backgroundColor?: string
}

export default function ButtonCustomize(props: Props) {
  const { text, className, type, onClick, backgroundColor } = props
  const btnStyle = {
    backgroundColor: backgroundColor
  }
  return (
    <button
      type={`${type ?? 'button'}`}
      className={`button__customize ${className ?? ''}`}
      onClick={onClick}
      style={btnStyle}
    >
      {text}
    </button>
  )
}
