import { Box } from '@mui/material'

import '../../assets/css/components/header_bar.css'
import { pages, settings } from '../../utils/HeaderSetting'
import MenuHeader from './HeaderBoxAvatar'
import HeaderBoxLogo from './HeaderBoxLogo'
import HeaderNav from './HeaderNav'

const HeaderBar = () => {
  return (
    <Box className='header'>
      <HeaderBoxLogo />
      <Box className='header__nav'>
        <HeaderNav pages={pages} />
        <MenuHeader settings={settings} />
      </Box>
    </Box>
  )
}

export default HeaderBar
