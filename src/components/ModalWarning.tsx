import CloseIcon from '@mui/icons-material/Close'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import React, { useState } from 'react'

import '../assets/css/components/modal_warning.css'
import ButtonCustomize from './ButtonCustomize'

type Props = {
  openModalWarning: boolean
  title?: string
  text?: string
  onAction: () => void
}

export default function ModalWarning(props: Props) {
  const { openModalWarning, onAction } = props

  return (
    <>
      <Modal
        open={openModalWarning}
        onClose={onAction}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className='modal__warning'
      >
        <Box className='container__modal-warning'>
          <div className='modal__header'>
            <ErrorOutlineIcon className='icon__warning' />
          </div>
          <div className='modal__body'>
            <h2>You cannot delete or edit this time slot !</h2>
            <p>
              This time slot, there were patients who booked an appointment.
            </p>

            <ButtonCustomize
              text='OK'
              className='btn__warning'
              onClick={onAction}
            />
          </div>
        </Box>
      </Modal>
    </>
  )
}
