import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment } from '@mui/material'
import { useState } from 'react'

import { TextFieldProfile } from '../../../themes/profileStyle'

function SearchBoxBookedAppointment() {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClick = () => {}
  return (
    <TextFieldProfile
      id='search'
      type='search'
      size='small'
      value={searchTerm}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={handleClick}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}

export default SearchBoxBookedAppointment
