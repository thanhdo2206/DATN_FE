import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { ITimeSlot } from '../../../interface/TimeSlotInterfaces'
import { convertVND } from '../../../utils/convertMoney'
import {
  addHoursToDate,
  formatDate,
  getTimeSlotsAfterCurrentDay,
  getTimeSlotsDateFirst,
  getTimeZone,
  removeDuplicatesDate,
  sortDate,
  sortStartTime
} from '../../../utils/date'

type Props = {
  timeSlots: ITimeSlot[]
  examinationPrice: number
  examinationTitle: string
}

export default function TimeSlots(props: Props) {
  const { timeSlots, examinationPrice, examinationTitle } = props

  const listTimeSlotsAfterCurrentDay: ITimeSlot[] =
    getTimeSlotsAfterCurrentDay(timeSlots)

  const listDate: Date[] = listTimeSlotsAfterCurrentDay.map((item) => {
    let date = new Date(item.startTime)
    date.setHours(0, 0, 0, 0)
    return date
  })

  const listDateSort: Date[] = sortDate(removeDuplicatesDate(listDate))

  const listTimeSlotsCurrentDay: ITimeSlot[] = getTimeSlotsDateFirst(
    listTimeSlotsAfterCurrentDay,
    listDateSort[0]
  )

  const [listTimeSlot, setListTimeSlot] = useState(
    sortStartTime(listTimeSlotsCurrentDay)
  )

  const getDateSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const dateSelect: string = event.target.value

    const listTimeOfDateSelect = listTimeSlotsAfterCurrentDay.filter((item) => {
      const dateItem = new Date(item.startTime)
      dateItem.setHours(0, 0, 0, 0)
      return dateItem.getTime() === new Date(dateSelect).getTime()
    })

    const listTimeSlotSort = sortStartTime(listTimeOfDateSelect)

    setListTimeSlot(listTimeSlotSort)
  }

  return (
    <div className='time__slot-box'>
      <select name='' id='' className='select__day' onChange={getDateSelect}>
        {listDateSort.map((date, index) => {
          return (
            <option key={index} value={date.toString()}>
              {formatDate(date)}
            </option>
          )
        })}
      </select>
      <div className='package__schedule'>
        <div className='container__icon-time'>
          <CalendarMonthIcon />
          <b>SCHEDULE</b>
        </div>
        <div className='container__time-slots'>
          {listTimeSlot.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={`/home/examination/book-appointment/${item.id}`}
                state={{ examinationPrice, examinationTitle }}
              >
                <span className='time__slot-item'>
                  {`${getTimeZone(item.startTime)} - ${getTimeZone(
                    addHoursToDate(new Date(item.startTime), item.duration)
                  )}`}
                </span>
              </NavLink>
            )
          })}
        </div>
      </div>
      <div className='container__price'>
        <b>EXAMINATION PRICE: </b>
        <span>{convertVND.format(examinationPrice)}</span>
      </div>
    </div>
  )
}
