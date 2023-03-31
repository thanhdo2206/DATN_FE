import FmdBadIcon from '@mui/icons-material/FmdBad'
import Grid from '@mui/material/Grid'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../../../assets/css/pages/guestPage/home_appointment.css'
import { IMedicalExaminationTime } from '../../../interface/MedicalExaminationInterfaces'
import { DispatchType, RootState } from '../../../redux/configStore'
import { getAllMedicalExaminationTimeThunk } from '../../../redux/reducers/medicalExaminationReducer'
import FilterDoctor from './FilterDoctor'
import InformationAppointment from './InformationAppointment'
import Search from './Search'

type Props = {}

export default function HomeDoctor(props: Props) {
  const dispatch: DispatchType = useDispatch()

  const getMedicalExaminationTimeApi = () => {
    dispatch(getAllMedicalExaminationTimeThunk())
  }

  useEffect(() => {
    getMedicalExaminationTimeApi()
  }, [])
  const { arrMedicalExaminations } = useSelector(
    (state: RootState) => state.medicalExaminationReducer
  )

  const renderMedicalExamination = () => {
    if (arrMedicalExaminations.length === 0)
      return (
        <div className='box__filter__not__found'>
          <div className='filter__not_found--view'>
            <FmdBadIcon />
            <p className='filter__not_found--text'>
              No matches were found, please choose again
            </p>
          </div>
        </div>
      )
    return arrMedicalExaminations.map(
      (medicalExamination: IMedicalExaminationTime, index: number) => {
        return (
          <InformationAppointment
            key={index}
            examinationAndTime={medicalExamination}
          />
        )
      }
    )
  }
  return (
    <section className='container__home-doctor'>
      <div className='search__doctor-image'>
        <div className='container__search-doctor'>
          <h1 className='title'>Search Doctor, Make an Appointment</h1>
          <Search />
        </div>
      </div>
      <section className='infor__appointment__container'>
        <Grid container spacing={5} className='grid__container'>
          <Grid item xs={3} className='grid__filter'>
            <FilterDoctor />
          </Grid>
          <Grid item xs={9} className='information__container'>
            {renderMedicalExamination()}
          </Grid>
        </Grid>
      </section>
    </section>
  )
}
