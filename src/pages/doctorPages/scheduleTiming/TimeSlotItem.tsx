import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import React, { useState } from 'react'

import ButtonCustomize from '../../../components/ButtonCustomize'
import FormSelectTime from './FormSelectTime'

type Props = {}

export default function TimeSlotItem({}: Props) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <div className='time__slot-item'>
        8:00 pm - 11:30 pm
        <CloseIcon className='delete__time-icon' />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className='container__modal-schedule'>
          <div className='modal__header'>
            <h3>Add Time Slots</h3>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className='modal__body'>
            <form action=''>
              <div className='container__select__time'></div>
              
              <ButtonCustomize
                className='btn__save'
                type='submit'
                text='Add Time Slots'
              />
            </form>
          </div>
        </Box>
      </Modal>
    </>
  )
}
