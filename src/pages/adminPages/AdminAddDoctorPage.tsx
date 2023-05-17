import { NavigateBefore, NavigateNext } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { Box, Step, StepLabel, Stepper } from '@mui/material'
import React, { useState } from 'react'

import '../../assets/css/pages/adminPage/admin_add_doctor.css'
import ButtonCustomize from '../../components/ButtonCustomize'
import {
  QontoConnector,
  QontoStepIcon,
  steps
} from './adminAddDoctor/AdminStep'
import AdminBreadCrumb from './adminBreadcrumb/AdminBreadCrumb'
import AdminDoctorOverviewInput from './adminProfileDoctor/AdminDoctorOverviewInput'
import AdminDoctorOverviewTextArea from './adminProfileDoctor/AdminDoctorOverviewTextArea'
import AdminDoctorSettings from './adminProfileDoctor/AdminDoctorSettings'

const completedSurvey = require('../../assets/img/completed-survey.jpg')

const AdminAddDoctorPage = () => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [stepFailed, setStepFaild] = useState<number | undefined>()

  const isStepFailed = (step: number) => {
    return step === stepFailed
  }

  const handleBackStep = () => {
    const backstep = activeStep ? activeStep - 1 : 0
    setActiveStep(backstep)
  }

  const handleNextStep = () => {
    const nextStep = activeStep !== 2 ? activeStep + 1 : 2
    setActiveStep(nextStep)
  }

  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {}
  return (
    <div>
      <div className='admin__doctor--header'>
        <AdminBreadCrumb breadcrumbTitle='Add Doctor' />
      </div>
      <div className='admin__table--body'>
        <div className='admin__doctor--add'>
          <div className='doctor__add--stepper'>
            <Box sx={{ width: '100%' }}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                connector={<QontoConnector />}
              >
                {steps.map((label, index) => {
                  const labelProps: {
                    optional?: React.ReactNode
                    error?: boolean
                  } = {}
                  if (isStepFailed(index)) {
                    labelProps.optional = (
                      <Typography variant='caption' color='error'>
                        Alert message
                      </Typography>
                    )
                    labelProps.error = true
                  }

                  return (
                    <Step
                      key={label}
                      className={`${
                        isStepFailed(index) ? 'lable__failed' : 'lable__success'
                      }`}
                    >
                      <StepLabel
                        StepIconComponent={QontoStepIcon}
                        {...labelProps}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
            </Box>
          </div>
          <div className='doctor__add--body'>
            {activeStep === 0 ? (
              <div className='doctor__add--basic'>
                <AdminDoctorSettings />
              </div>
            ) : (
              <></>
            )}
            {activeStep === 1 ? (
              <div className='doctor__add--des'>
                <AdminDoctorOverviewInput />
                <AdminDoctorOverviewTextArea
                  onChangeTextArea={handleChangeTextArea}
                  rows={4}
                  title='Short Description'
                />
                <AdminDoctorOverviewTextArea
                  onChangeTextArea={handleChangeTextArea}
                  rows={15}
                  title='Description'
                />
                <div className='doctor__add--btn'>
                  <ButtonCustomize
                    text='Save'
                    className='btn__department--add'
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            {activeStep === 2 ? (
              <div className='doctor__add--success'>
                <img src={completedSurvey} alt='' className='img--success' />
                <p className='p--success'>Create a successful doctor! 🎉</p>
                <div className='group__div--btn'>
                  <ButtonCustomize
                    text='Go to the list of doctors'
                    className='btn__department--add'
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className='div__group--action'>
              <Button
                onClick={() => handleBackStep()}
                variant='contained'
                className='btn__edit btn__group--action'
                startIcon={<NavigateBefore />}
              />
              <Button
                onClick={() => handleNextStep()}
                variant='contained'
                className='btn__edit btn__group--action'
                startIcon={<NavigateNext />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAddDoctorPage
