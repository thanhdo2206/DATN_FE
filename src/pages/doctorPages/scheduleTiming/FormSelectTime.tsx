import DeleteIcon from '@mui/icons-material/Delete'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import IconButton from '@mui/material/IconButton'
import React from 'react'

type Props = {
  index: number
  handleChange: (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void
  removeSelect: (index: number) => void
}

export default function FormSelectTime(props: Props) {
  const { handleChange, removeSelect, index } = props
  return (
    <div className='form__row'>
      <div className='form__group'>
        <label>Start Time</label>
        <select
          className='form__select'
          onChange={(event) => {
            handleChange(index, event)
          }}
          name='startTime'
        >
          <option>-</option>
          <option value='12.00 am'>12.00 am</option>
          <option value='12.30 am'>12.30 am</option>
          <option value='1.00 am'>1.00 am</option>
          <option value='1.30 am'>1.30 am</option>
        </select>
      </div>

      <div className='form__group'>
        <label>End Time</label>
        <select
          className='form__select'
          onChange={(event) => {
            handleChange(index, event)
          }}
          name='endTime'
        >
          <option>-</option>
          <option value='12.00 am'>12.00 am</option>
          <option value='12.30 am'>12.30 am</option>
          <option value='1.00 am'>1.00 am</option>
          <option value='1.30 am'>1.30 am</option>
        </select>
      </div>

      {/* <DeleteOutlineIcon
        onClick={() => {
          removeSelect(index)
        }}
      /> */}

      <IconButton
        aria-label='delete'
        onClick={() => {
          removeSelect(index)
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
