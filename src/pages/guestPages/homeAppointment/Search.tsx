import SearchIcon from '@mui/icons-material/Search'
import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import React from 'react'

import Button from '../../../components/ButtonCustomize'

type Props = {}

export default function Search(props: Props) {
  return (
    <>
      <form action='' className='form__search'>
        <div className='container__input__search'>
          <SearchIcon className='icon__search' />
          <input className='input__search' placeholder='Search....' />
          <Button text='Search' className='btn__search' />
        </div>
      </form>
    </>
  )
}
