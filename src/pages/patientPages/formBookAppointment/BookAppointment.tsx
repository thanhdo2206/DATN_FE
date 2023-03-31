import Grid from '@mui/material/Grid/Grid'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ITimeSlot } from '../../../interface/TimeSlotInterfaces'
import { getdetailTimeSlotService } from '../../../service/timeSlotService'
import BookingSummary from './BookingSummary'
import FormAppointment from './FormAppointment'

type Props = {}

export default function BookAppointment(props: Props) {
  const params = useParams()

  const [timeSlot, setTimeSlot] = useState<ITimeSlot>()

  const getDetailTimeSlot = async () => {
    const id: string | undefined = params.id
    const timeSlotDetail: ITimeSlot = await getdetailTimeSlotService(
      id as string
    )
    setTimeSlot(timeSlotDetail)
  }

  useEffect(() => {
    getDetailTimeSlot()
  }, [params.id])

  return (
    <div className='book__appointment'>
      <Grid
        container
        columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 4 }}
        className=''
      >
        <Grid item lg={8} className=''>
          <FormAppointment />
        </Grid>
        <Grid item lg={4} className=''>
          <BookingSummary timeSlot={timeSlot} />
        </Grid>
      </Grid>
    </div>
  )
}
