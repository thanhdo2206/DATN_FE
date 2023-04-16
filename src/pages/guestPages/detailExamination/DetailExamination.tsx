import { Grid } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import Avatar from 'react-avatar'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import '../../../assets/css/pages/guestPage/detailExamination/detail_examination.css'
import { IMedicalExaminationTime } from '../../../interface/MedicalExaminationInterfaces'
import { DispatchType, RootState } from '../../../redux/configStore'
import { getDetailMedicalExaminationTimeThunk } from '../../../redux/slices/medicalExaminationSlice'
import { getDetailMedicalExaminationTimeService } from '../../../services/medicalExaminationService'
import ScheduleExamination from './ScheduleExamination'
import TabInfomation from './TabInfomation'

type Props = {}

export default function DetailExamination(props: Props) {
  const dispatch: DispatchType = useDispatch()

  const params = useParams()

  const getDetailExamination = async () => {
    const id: string | undefined = params.id
    dispatch(getDetailMedicalExaminationTimeThunk(id as string))
  }

  useEffect(() => {
    getDetailExamination()
  }, [params.id])

  const { medicalExaminationDetail } = useSelector(
    (state: RootState) => state.medicalExaminationReducer
  )

  const medical = medicalExaminationDetail?.medicalExamination

  const timeSlotsResponse = medicalExaminationDetail?.listTimeSlot

  return (
    <div className='container__deatail_examination'>
      <div className='title__box'>
        <h1>Doctor Details</h1>
      </div>
      <div className='container__information'>
        <Grid
          container
          columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 5 }}
          className=''
        >
          <Grid item lg={8} className=''>
            <div className='container__short__information'>
              <div className='container__image__doctor'>
                {medical?.image ? (
                  <img className='img__doctor' src={medical.image} alt='' />
                ) : (
                  //TODO:
                  <Avatar facebookId='100008343750912' size='120' />
                )}
              </div>
              <div className='brief__information'>
                <h1>{medical?.title}</h1>
                <div className='brief__text'>
                  {medical?.shortDescription
                    .split('\n')
                    .map((item: string, index: number) => {
                      return <p key={index}>{item}</p>
                    })}
                </div>
              </div>
            </div>
            <div className='container__detail__information'>
              <TabInfomation medical={medical} />
            </div>
          </Grid>
          <Grid item lg={4} className=''>
            <ScheduleExamination
              timeSlotsResponse={timeSlotsResponse}
              examinationPrice={medical?.examinationPrice}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
