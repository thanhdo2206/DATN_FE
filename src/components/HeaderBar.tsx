import {
  Avatar,
  Box,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  Typography
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import { Link, NavLink } from 'react-router-dom'

import '../assets/css/components/header_bar.css'
import { useAppSelector } from '../redux/hooks'
import { MenuItemOverride, MenuListOverrride } from '../themes/headerTheme'

interface PagesInteface {
  pageName: string
  link: string
}

interface MenuSettingsInteface {
  menuItem: string
  link?: string
  action: boolean
}

const pages: PagesInteface[] = [
  {
    pageName: 'Home',
    link: '/home'
  },
  {
    pageName: 'Find a Doctor',
    link: 'search-doctor'
  }
]
const settings: MenuSettingsInteface[] = [
  {
    menuItem: 'Profile Settings',
    link: '/profile-settings',
    action: false
  },
  {
    menuItem: 'Appointments',
    link: '/appointments',
    action: false
  },
  {
    menuItem: 'Logout',
    action: true
  }
]

const logo = require('../assets/img/logo-hospital-care.png')
const HeaderBar = () => {
  const navigate = useNavigate()
  const { isAuth, currentUser } = useAppSelector((state) => state.auths)
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event | React.SyntheticEvent, link?: string) => {
    if (link) {
      navigate(`${link}`)
    }
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <Box className='header'>
      <Box className='header__slogan'>
        <img className='header__slogan--img' src={logo} alt='' />
        <Link to='/home' className='header__slogan--title'>
          Hospital Care
        </Link>
      </Box>
      <Box className='header__nav'>
        <Box className='header__nav--container'>
          <ul className='header__nav--list'>
            {pages.map((page) => {
              return (
                <li className='header__nav--item' key={page.pageName}>
                  <NavLink
                    to={page.link}
                    className={({ isActive }) =>
                      isActive ? 'header__nav--active' : 'header__nav--link'
                    }
                  >
                    {page.pageName}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </Box>
        <Box>
          {isAuth ? (
            <div>
              <button
                ref={anchorRef}
                onClick={handleToggle}
                className='header__button--avatar'
              >
                <Avatar
                  alt={currentUser.lastName}
                  src={currentUser.profilePicture}
                  className={open ? 'header__avatar--border' : 'header__avatar'}
                />
                <Typography className='header__avatar--username'>
                  {currentUser.lastName}
                </Typography>
              </button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement='bottom-start'
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start'
                          ? 'left top'
                          : 'left bottom'
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuListOverrride
                          autoFocusItem={open}
                          id='composition-menu'
                          aria-labelledby='composition-button'
                          onKeyDown={handleListKeyDown}
                        >
                          {settings.map((setting) => (
                            <MenuItemOverride
                              key={setting.menuItem}
                              onClick={(event) =>
                                handleClose(event, setting.link)
                              }
                            >
                              {setting.link ? (
                                <Typography textAlign='center'>
                                  {setting.menuItem}
                                </Typography>
                              ) : (
                                <Typography textAlign='center'>
                                  {setting.menuItem}
                                </Typography>
                              )}
                            </MenuItemOverride>
                          ))}
                        </MenuListOverrride>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          ) : (
            <button
              className='header__button--signup'
              onClick={() => navigate('/login')}
            >
              Sign up{' '}
            </button>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default HeaderBar
