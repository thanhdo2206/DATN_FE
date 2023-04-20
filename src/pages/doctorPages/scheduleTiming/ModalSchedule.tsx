import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import React, { useEffect, useState } from 'react'

import ButtonCustomize from '../../../components/ButtonCustomize'
import {
  ITimeSlotRequest,
  ITimeSlotResponse
} from '../../../interface/TimeSlotInterfaces'
import { useAppDispatch } from '../../../redux/hooks'
import { addArrTimeSlotThunk } from '../../../redux/slices/timeSlotSlice'
import { addHoursToDate, getAllHour, subDate } from '../../../utils/date'
import FormSelectTime from './FormSelectTime'

type SelectTime = {
  startTime: string
  endTime: string
  isDisable: boolean
  [key: string]: any
}

type Props = {
  dayOfWeek: string
  timeSlotsOfDay: ITimeSlotResponse[]
}

const arrStartTimeDefaut = getAllHour()

export default function ModalSchedule(props: Props) {
  const dispatch = useAppDispatch()
  const { dayOfWeek, timeSlotsOfDay } = props

  const [open, setOpen] = useState(false)

  const [selectTimes, setSelectTimes] = useState<SelectTime[]>([
    { startTime: '', endTime: '', isDisable: false }
  ])

  const [checkSelect, setCheckSelect] = useState<boolean>(true)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setSelectTimes([{ startTime: '', endTime: '', isDisable: false }])
    setCheckSelect(true)
    createArrStartAndEndTime()
  }

  const addArrTimeSlotApi = async () => {
    const dataRequest: ITimeSlotRequest[] = selectTimes.map(
      (timeSlotItem, index) => {
        const minuteDuration = subDate(
          timeSlotItem.startTime,
          timeSlotItem.endTime
        )
        const objDayOfWeek = new Date(dayOfWeek)
        const startTimeRequest = new Date(timeSlotItem.startTime)
        startTimeRequest.setDate(objDayOfWeek.getDate())
        startTimeRequest.setMonth(objDayOfWeek.getMonth())
        startTimeRequest.setFullYear(objDayOfWeek.getFullYear())
        return {
          startTime: startTimeRequest.toISOString(),
          duration: minuteDuration
        }
      }
    )
    // console.log(dataRequest)

    await dispatch(addArrTimeSlotThunk(dataRequest))
  }

  const handleChangeSelect = (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const values = [...selectTimes]
    values[index][event.target.name] = event.target.value
    setSelectTimes(values)
  }

  const addSelectTime = () => {
    const selectTime: SelectTime = selectTimes[selectTimes.length - 1]

    if (selectTimes.length !== 0) {
      if (!selectTime.startTime || !selectTime.endTime) {
        setCheckSelect(false)
        return
      }
    } else {
      setSelectTimes([
        ...selectTimes,
        { startTime: '', endTime: '', isDisable: false }
      ])
      return
    }

    updateStartTimeCorrectAndEndTime()
    const arrSelectTimeDisable = selectTimes.map((item, index) => {
      item.isDisable = true
      return item
    })

    setCheckSelect(true)

    setSelectTimes([
      ...arrSelectTimeDisable,
      { startTime: '', endTime: '', isDisable: false }
    ])
  }

  const removeSelectTime = (index: number) => {
    updateTimeRemoveSelect(selectTimes[index])
    const values = selectTimes.filter((item, indexSelect) => {
      return indexSelect !== index
    })
    setSelectTimes(values)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (
      !selectTimes[selectTimes.length - 1].startTime ||
      !selectTimes[selectTimes.length - 1].endTime
    ) {
      setCheckSelect(false)
      return
    }
    console.log('SelectTimes', selectTimes)
    addArrTimeSlotApi()
    // thực hiện lưu dữ liệu api ở trên
    handleClose()
    setSelectTimes([{ startTime: '', endTime: '', isDisable: false }])
  }

  const [arrStartTime, setArrStartTime] = useState<Date[]>([])
  const [arrEndTime, setArrEndTime] = useState<Date[]>([])
  const [arrStartTimeCorrect, setArrStartTimeCorrect] = useState<Date[]>([])

  useEffect(() => {
    // console.log('dayOfWeek', dayOfWeek)
    createArrStartAndEndTime()
  }, [dayOfWeek, timeSlotsOfDay])

  const createArrStartAndEndTime = () => {
    // console.log('createArrStartAndEndTime')
    const arrStartTimeCheck: Date[] = []
    const arrEndTimeCheck: Date[] = []

    timeSlotsOfDay.forEach((item, index) => {
      const { timeSlotDTO } = item
      const dayByStartTime = new Date(timeSlotDTO.startTime)
      dayByStartTime.setDate(1)
      dayByStartTime.setMonth(4)
      dayByStartTime.setFullYear(2023)
      //dayByStartTime: 01/05/2023 giờ
      arrStartTimeCheck.push(dayByStartTime)
      arrEndTimeCheck.push(addHoursToDate(dayByStartTime, timeSlotDTO.duration))

      if (timeSlotDTO.duration === 60) {
        arrStartTimeCheck.push(addHoursToDate(dayByStartTime, 30))
        arrEndTimeCheck.push(addHoursToDate(dayByStartTime, 30))
      }
    })

    createArrStartTimeCorrect(arrStartTimeCheck, arrStartTimeDefaut)

    // console.log('arrStartTimeCheck', arrStartTimeCheck)

    // console.log('arrEndTimeCheck', arrEndTimeCheck)

    // setArrStartTime(arrStartTimeCheck)
    setArrEndTime(arrEndTimeCheck)
  }

  const createArrStartTimeCorrect = (
    arrStartTimeCheck: Date[],
    arrStartTimeMain: Date[]
  ) => {
    const arrTime: Date[] = arrStartTimeMain.filter((dayMainItem) => {
      const checkExist = arrStartTimeCheck.some(
        (startTime) => startTime.getTime() === dayMainItem.getTime()
      )
      return !checkExist
    })

    // console.log('arrStartTimeCorrect', arrTime)

    setArrStartTimeCorrect(arrTime)
  }

  const updateStartTimeCorrectAndEndTime = () => {
    // console.log('update correct start time')
    const arrStartTimeUpdate: Date[] = []
    const arrEndTimeUpdate: Date[] = [...arrEndTime]

    const selectTime: SelectTime = selectTimes[selectTimes.length - 1]
    arrStartTimeUpdate.push(new Date(selectTime.startTime))
    arrEndTimeUpdate.push(new Date(selectTime.endTime))
    if (subDate(selectTime.startTime, selectTime.endTime) === 60) {
      arrStartTimeUpdate.push(
        addHoursToDate(new Date(selectTime.startTime), 30)
      )
      arrEndTimeUpdate.push(addHoursToDate(new Date(selectTime.startTime), 30))
    }
    createArrStartTimeCorrect(arrStartTimeUpdate, arrStartTimeCorrect)
    // console.log('arrEndTimeUpdate', arrEndTimeUpdate)
    setArrEndTime([...arrEndTimeUpdate])
  }

  const updateTimeRemoveSelect = (selectTimeItem: SelectTime) => {
    const arrEndTimeDelete: Date[] = []

    arrStartTimeCorrect.push(new Date(selectTimeItem.startTime))
    arrEndTimeDelete.push(new Date(selectTimeItem.endTime))
    if (subDate(selectTimeItem.startTime, selectTimeItem.endTime) === 60) {
      const timeAdd: Date = addHoursToDate(
        new Date(selectTimeItem.startTime),
        30
      )
      arrStartTimeCorrect.push(timeAdd)
      arrEndTimeDelete.push(timeAdd)
    }

    const arrEndTimeUpdate: Date[] = arrEndTime.filter((endTimeItem) => {
      const checkExist = arrEndTimeDelete.some(
        (endTimeDeleteItem) =>
          endTimeDeleteItem.getTime() === endTimeItem.getTime()
      )
      return !checkExist
    })
    setArrEndTime([...arrEndTimeUpdate])
  }

  // const checkStopAddMore = () => {}

  // useEffect(() => {
  //   checkStopAddMore()
  // }, [arrStartTimeCorrect])

  // console.log('arrStartTimeDefaut', arrStartTimeDefaut)
  // console.log('arrStartTime', arrStartTime)

  // console.log('arrEndTime', arrEndTime)

  // console.log('arrStartTimeCorrect', arrStartTimeCorrect)

  return (
    <>
      <span className='btn__add__time' onClick={handleOpen}>
        <span>
          <AddCircleIcon sx={{ marginRight: '2px' }} />
          Add Time Slot
        </span>
      </span>
      <Modal
        open={open}
        onClose={() => {
          handleClose()
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className='container__modal-schedule'>
          <div className='modal__header'>
            <div className='title'>
              <h2>Add Time Slots</h2>
            </div>
            <IconButton className='icon__close' onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className='modal__body'>
            <form action='' onSubmit={handleSubmit}>
              <div className='container__select__time'>
                {selectTimes.map((item, indexTimeItem) => {
                  return (
                    <FormSelectTime
                      key={indexTimeItem}
                      handleChange={handleChangeSelect}
                      removeSelect={removeSelectTime}
                      indexTimeItem={indexTimeItem}
                      isDisable={item.isDisable}
                      arrStartTimeCorrect={arrStartTimeCorrect}
                      arrEndTime={arrEndTime}
                      valueStartTime={item.startTime}
                      valueEndTime={item.endTime}
                      lengthSelectTime={selectTimes.length}
                    />
                  )
                })}
              </div>

              {checkSelect ? (
                ''
              ) : (
                <p className='error__select'>
                  Enter your start time and end time
                </p>
              )}

              <div className='btn__add__time' onClick={addSelectTime}>
                <span>
                  <AddCircleIcon />
                  Add More
                </span>
              </div>

              <ButtonCustomize
                className='btn__save'
                type='submit'
                text='Save'
              />
            </form>
          </div>
        </Box>
      </Modal>
    </>
  )
}
