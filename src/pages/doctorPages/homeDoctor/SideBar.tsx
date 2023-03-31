import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

const arrSelectSideBar = [
  {
    url: '/doctor/appointment',
    name: 'Appointment',
    icon: <CalendarMonthIcon className='side__bar-icon' />
  },

  {
    url: '/doctor/schedule-timing',
    name: 'Schedule Timing',
    icon: <WatchLaterIcon className='side__bar-icon' />
  }
]

export default function SideBar({}: Props) {
  return (
    <div className='conatainer__side__bar'>
      <div className='profile__info-widget'>
        <div className='img__doctor'>
          <img
            src='http://azim.commonsupport.com/Docpro/assets/images/team/team-24.jpg'
            alt=''
          />
        </div>
        <h3 className='name__doctor'>Dr. Darren Elder</h3>
      </div>
      <div className='list__side__bar'>
        <ul>
          {arrSelectSideBar.map((item, index) => {
            return (
              <li key={index}>
                <NavLink className='nav__link' to={item.url}>
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            )
          })}

          <li className='logout__container'>
            <InboxIcon className='side__bar-icon' />
            Logout
          </li>
        </ul>
      </div>
    </div>
  )
}
