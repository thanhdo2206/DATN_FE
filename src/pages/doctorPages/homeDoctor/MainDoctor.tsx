import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import { Grid } from '@mui/material'
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
import { Outlet } from 'react-router-dom'

import '../../../assets/css/pages/doctorPages/home_doctor.css'
import SideBar from './SideBar'

type Props = {}

export default function MainDoctor(props: Props) {
  return (
    <div className='container__doctor-page'>
      <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1 }}>
        <Grid item lg={3}>
          <SideBar />
        </Grid>
        <Grid item lg={9}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  )
}
