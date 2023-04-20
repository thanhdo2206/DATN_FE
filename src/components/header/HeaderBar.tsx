import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'

import '../../assets/css/components/header_bar.css'
import { pages } from '../../utils/HeaderSetting'
import MenuHeader from './HeaderBoxAvatar'
import HeaderBoxLogo from './HeaderBoxLogo'

const HeaderBar = () => {
  return (
    <Box className='header'>
      <HeaderBoxLogo />
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
        <MenuHeader />
      </Box>
    </Box>
  )
}

export default HeaderBar
