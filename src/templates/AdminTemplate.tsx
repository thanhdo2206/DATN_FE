import AccessibleIcon from '@mui/icons-material/Accessible'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import HandshakeIcon from '@mui/icons-material/Handshake'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem'
import TreeView from '@mui/lab/TreeView'
import Box from '@mui/material/Box'
import { SvgIconProps } from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

import '../assets/css/templates/admin_template.css'
import MenuHeader from '../components/header/HeaderBoxAvatar'
import HeaderBoxLogo from '../components/header/HeaderBoxLogo'
import { settingsAdmin } from '../utils/HeaderSetting'

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string
    '--tree-view-bg-color'?: string
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string
  color?: string
  labelIcon: React.ElementType<SvgIconProps>
  labelInfo?: string
  labelText: string
}

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    marginTop: '10px',
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular
    },
    '&:hover': {
      backgroundColor: 'white',
      color: 'var(--color-title-hover)'
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: 'white',
      color: 'var(--color-title-hover)'
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'white'
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit'
    },
    '&.MuiTreeItem-content': {
      position: 'relative'
    },
    '&.MuiTreeItem-content .MuiTreeItem-iconContainer': {
      position: 'absolute',
      right: '0'
    }
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2)
    }
  }
}))

function StyledTreeItem(props: StyledTreeItemProps) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box
            component={LabelIcon}
            color='inherit'
            sx={{ mr: 1 }}
            className='style__box--icon'
          />
          <Typography
            variant='body2'
            sx={{ fontWeight: 'inherit', flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant='caption' color='inherit'>
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor
      }}
      {...other}
    />
  )
}

function AdminTemplate() {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const segments = path.split('/')
  const [url, setUrl] = useState<String>('')

  useEffect(() => {
    const url = segments[segments.length - 1]
    setUrl(url)
  }, [])

  return (
    <div className='admin__container'>
      <div className='admin__sidebar'>
        <div className='admin__sidebar--header admin__header'>
          <HeaderBoxLogo />
        </div>
        <div className='admin__sidebar--body'>
          <TreeView
            aria-label='gmail'
            defaultExpanded={['3']}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
            sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
          >
            <StyledTreeItem
              nodeId='1'
              labelText='Appointment'
              labelIcon={HandshakeIcon}
              onClick={() => {
                navigate('/admin/appointments')
              }}
              className={
                url === 'appointments' ? 'department__lable--focus' : ''
              }
            />
            <StyledTreeItem
              nodeId='2'
              labelText='Departments'
              labelIcon={MeetingRoomIcon}
              onClick={() => {
                setUrl('deparments')
                navigate('/admin/departments')
              }}
              className={
                url === 'departments' ? 'department__lable--focus' : ''
              }
            />
            <StyledTreeItem
              nodeId='3'
              labelText='Doctors'
              labelIcon={VolunteerActivismIcon}
            >
              <StyledTreeItem
                nodeId='4'
                labelText='Doctors'
                labelIcon={SupervisorAccountIcon}
                onClick={() => {
                  setUrl('doctors')
                  navigate('/admin/doctors')
                }}
                className={url === 'doctors' ? 'department__lable--focus' : ''}
              />
              <StyledTreeItem
                nodeId='5'
                labelText='Add Doctor'
                labelIcon={GroupAddIcon}
                onClick={() => {
                  setUrl('add-doctor')
                  navigate('/admin/add-doctor')
                }}
                className={
                  url === 'add-doctor' ? 'department__lable--focus' : ''
                }
              />
            </StyledTreeItem>
            <StyledTreeItem
              nodeId='6'
              labelText='Patients'
              labelIcon={AccessibleIcon}
              onClick={() => {
                setUrl('patients')
                navigate('/admin/patients')
              }}
              className={url === 'patients' ? 'department__lable--focus' : ''}
            />
          </TreeView>
        </div>
      </div>
      <div className='admin__content--container'>
        <div className='admin__header admin__content--header'>
          <MenuHeader settings={settingsAdmin} />
        </div>
        <div className='admin__outlet--container'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminTemplate
