import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

export default function HomeTemplates(props: Props) {
  return (
    <div>
      <header>header</header>
      <Outlet />
      <footer></footer>
    </div>
  )
}
