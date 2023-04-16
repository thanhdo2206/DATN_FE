import React from 'react'
import { Outlet } from 'react-router-dom'

import HeaderBar from '../components/HeaderBar'

type Props = {}

export default function HomeTemplates(props: Props) {
  return (
    <div>
      <HeaderBar />
      <Outlet />
      <footer></footer>
    </div>
  )
}
