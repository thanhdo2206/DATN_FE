import CloseIcon from '@mui/icons-material/Close'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import React, { useState } from 'react'

import '../assets/css/components/modal_confirm.css'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../utils/contant'
import ButtonCustomize from './ButtonCustomize'

type Props = {
  openModalConfirm: boolean
  title?: string
  textBtn?: string
  onAction: (type: string) => void
  backgroundColorBtnConfirm?: string
  icon?: JSX.Element
  contentBody?: JSX.Element
}

export default function ModalConfirm(props: Props) {
  const {
    textBtn,
    openModalConfirm,
    onAction,
    backgroundColorBtnConfirm,
    icon,
    contentBody,
    title
  } = props

  return (
    <>
      <Modal
        open={openModalConfirm}
        onClose={() => {
          onAction(MODAL_ACTION_CLOSE)
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className='modal__confirm'
      >
        <Box className='container__modal-confirm'>
          <div className='modal__header'>
            <IconButton
              className='icon__close'
              onClick={() => {
                onAction(MODAL_ACTION_CLOSE)
              }}
            >
              <CloseIcon />
            </IconButton>
            <div className='title'>
              <h3>{title}</h3>

              {icon}
            </div>
          </div>
          <div className='modal__body'>{contentBody}</div>

          <div className='modal__footer'>
            <ButtonCustomize
              text='Cancel'
              className='btn__cancel'
              onClick={() => {
                onAction(MODAL_ACTION_CLOSE)
              }}
            />

            <ButtonCustomize
              text={textBtn}
              className='btn__confirm'
              onClick={() => {
                onAction(MODAL_ACTION_CONFIRM)
              }}
              backgroundColor={backgroundColorBtnConfirm}
            />
          </div>
        </Box>
      </Modal>
    </>
  )
}
