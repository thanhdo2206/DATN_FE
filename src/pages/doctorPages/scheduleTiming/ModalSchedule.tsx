import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import React, { useState } from 'react'

import ButtonCustomize from '../../../components/ButtonCustomize'
import FormSelectTime from './FormSelectTime'

type SelectTime = {
  startTime: string
  endTime: string
  [key: string]: string
}

type Props = {
  day: string
}

export default function ModalSchedule(props: Props) {
  const { day } = props
  console.log(day)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [selectTimes, setSelectTimes] = useState<SelectTime[]>([
    { startTime: '', endTime: '' }
  ])

  const handleChangeSelect = (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const values = [...selectTimes]
    values[index][event.target.name] = event.target.value
    setSelectTimes(values)
  }

  const addSelectTime = () => {
    setSelectTimes([...selectTimes, { startTime: '', endTime: '' }])
  }

  const removeSelectTime = (index: number) => {
    const values = selectTimes.filter((item, indexSelect) => {
      return indexSelect !== index
    })
    setSelectTimes(values)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // thực hiện lưu dữ liệu ở trên
    handleClose()
    setSelectTimes([{ startTime: '', endTime: '' }])
    console.log(selectTimes)
  }

  return (
    <>
      <span className='btn__add__time' onClick={handleOpen}>
        <span>
          <AddCircleIcon />
          Add Time Slot
        </span>
      </span>
      <Modal
        open={open}
        onClose={() => {
          handleClose()
          setSelectTimes([{ startTime: '', endTime: '' }])
        }}
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
            <form action='' onSubmit={handleSubmit}>
              <div className='container__select__time'>
                {selectTimes.map((item, index) => {
                  return (
                    <>
                      <FormSelectTime
                        handleChange={handleChangeSelect}
                        removeSelect={removeSelectTime}
                        index={index}
                      />
                    </>
                  )
                })}
              </div>
              <div className='btn__add__time' onClick={addSelectTime}>
                <span>
                  <AddCircleIcon />
                  Add More
                </span>
              </div>
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
