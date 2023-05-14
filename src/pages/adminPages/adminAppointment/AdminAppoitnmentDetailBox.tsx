import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import React from 'react'

import { RenderStatus } from '../../patientPages/dashboardPage/TableBookedAppointment'
import { DataAdminDetailAppointment } from './AdminAppointmentDetail'

type Props = {
  dataInfor: DataAdminDetailAppointment[]
  name: string
  title: string
  status: boolean
}

const AdminAppoitnmentDetailBox = (props: Props) => {
  const { dataInfor, name, title, status } = props
  return (
    <Grid
      container
      className={`apptdetail__grid--container ${
        !status ? 'apptdetail__grid--last' : ''
      }`}
    >
      <Grid item xs={12} className='admin__apptdetail--header'>
        <p>{title}</p>
      </Grid>
      {status ? (
        <Grid item xs={3} className='admin__apptdetail--bodyleft'>
          <Avatar
            src={'https://uko-react.vercel.app/static/avatar/001-man.svg'}
            sx={{
              width: 90,
              height: 90,
              border: '1px solid var(--color-text)'
            }}
          />
          <p className='bodyleft__p'>{name}</p>
        </Grid>
      ) : (
        <></>
      )}

      <Grid item xs={9} className='admin__apptdetail--bodyright'>
        {dataInfor.map((item, index) => {
          return (
            <div className='bodyright__div' key={index}>
              {item.title === 'status' ? (
                <div className='bodyright__div--status'>
                  <p className='bodyright__p'>{item.title}</p>
                  <span className='bodyright__span--status'>:</span>{' '}
                  <RenderStatus status={parseInt(item.data)} />
                </div>
              ) : (
                <>
                  <p className='bodyright__p'>{item.title}</p>
                  <span className='bodyright__span'>{`: ${item.data}`}</span>
                </>
              )}
            </div>
          )
        })}
      </Grid>
    </Grid>
  )
}

export default AdminAppoitnmentDetailBox
