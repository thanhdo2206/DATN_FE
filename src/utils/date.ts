import { ITimeSlot } from '../interface/TimeSlotInterfaces'

export const formatDate = (date: Date): string => {
  const dayOfWeek = new Intl.DateTimeFormat('en-US', {
    weekday: 'long'
  }).format(date)
  const dateFormat = date.toLocaleDateString('en-US')
  const rs = `${dayOfWeek} - ${dateFormat}`
  return rs
}

// export const formatDateByDateString = (date: string): string => {
//   let objDate = new Date(date)
//   const dayOfWeek = new Intl.DateTimeFormat('en-US', {
//     weekday: 'long'
//   }).format(objDate)
//   const dateFormat = objDate.toLocaleDateString('en-US')
//   const rs = `${dayOfWeek}, ${dateFormat}`
//   return rs
// }

export const getTimeSlotsAfterCurrentDay = (
  arrTimeSlots: ITimeSlot[]
): ITimeSlot[] => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return arrTimeSlots.filter((item) => {
    let date = new Date(item.startTime)
    return date > today
  })
}

export const getTimeSlotsDateFirst = (
  arrTimeSlots: ITimeSlot[],
  dateFirst: Date
): ITimeSlot[] => {
  dateFirst?.setHours(0, 0, 0, 0)
  return arrTimeSlots.filter((item) => {
    let date = new Date(item.startTime)
    date.setHours(0, 0, 0, 0)
    return dateFirst.getTime() === date.getTime()
  })
}

export const addHoursToDate = (objDate: Date, minuteDuration: number) => {
  var numberOfMlSeconds = objDate.getTime()
  var addMlSeconds = minuteDuration * 60 * 1000
  var newDateObj = new Date(numberOfMlSeconds + addMlSeconds)
  return newDateObj
}

export const getTimeZone = (dateString: string | Date): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('vi-VN', {
    hour: 'numeric',
    minute: 'numeric'
  }).format(date)
}

export const removeDuplicatesDate = (array: Date[]): Date[] => {
  return array
    .map(function (date) {
      return date.getTime()
    })
    .filter(function (date, i, array) {
      return array.indexOf(date) === i
    })
    .map(function (time) {
      return new Date(time)
    })
}

export const sortDate = (array: Date[]): Date[] => {
  return array.sort(function (a: Date, b: Date) {
    return a.getTime() - b.getTime()
  })
}

export const sortStartTime = (arrTimeSlots: ITimeSlot[]): ITimeSlot[] => {
  return arrTimeSlots.sort(function (a: ITimeSlot, b: ITimeSlot) {
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  })
}
