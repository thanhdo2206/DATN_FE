import SearchIcon from '@mui/icons-material/Search'
import React from 'react'

import Button from '../../../components/ButtonCustomize'

export default function Search() {
  return (
    <>
      <form action='' className='form__search'>
        <div className='container__input-search'>
          <SearchIcon className='icon__search' />
          <input className='input__search' placeholder='Search....' />
          <Button text='Search' className='btn__search' />
        </div>
      </form>
    </>
  )
}
