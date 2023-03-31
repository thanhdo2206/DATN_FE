import React from 'react'

import '../assets/css/components/button.css'

type Props = {
  text: string
  className?: string
  type?: 'submit' | 'reset' | 'button' | undefined
}

export default function ButtonCustomize(props: Props) {
  const { text, className, type } = props
  return (
    <button
      type={`${type ?? 'button'}`}
      className={`button__customize ${className ?? ''}`}
    >
      {text}
    </button>
  )
}
