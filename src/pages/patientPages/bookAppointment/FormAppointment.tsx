import PersonIcon from '@mui/icons-material/Person'
import PhoneIcon from '@mui/icons-material/Phone'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { error } from 'console'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import ButtonCustomize from '../../../components/ButtonCustomize'
import ModalConfirm from '../../../components/ModalConfirm'
import { ITimeSlotResponse } from '../../../interface/TimeSlotInterfaces'
import { UserInformation } from '../../../interface/UsersInterface'
import { useAppSelector } from '../../../redux/hooks'
import { bookAppointmentService } from '../../../services/appointmentService'
import { MODAL_ACTION_CONFIRM } from '../../../utils/contant'
import { PHONE_REGEX_VN } from '../../../utils/regex'
import {
  CHECK_ADDRESS_EMPTY,
  CHECK_FIRST_NAME_EMPTY,
  CHECK_LAST_NAME_EMPTY,
  CHECK_PHONE_NUMBER_EMPTY,
  CHECK_PHONE_NUMBER_MATCH_REGEX
} from '../../../utils/validateInform'
import CustomizedSwitch from './CustomizedSwitch'

type IPatientInformation = {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  address?: string
  gender: number
}
type Props = {
  timeSlotResponse?: ITimeSlotResponse
}

export default function FormAppointment(props: Props) {
  const { timeSlotResponse } = props
  const { currentUser } = useAppSelector((state) => state.auths)
  const [checkSwitch, setCheckSwitch] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik<IPatientInformation>({
    initialValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      phoneNumber: currentUser.phoneNumber,
      address: currentUser.address,
      gender: currentUser.gender ? 1 : 0
    },

    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(CHECK_FIRST_NAME_EMPTY),
      lastName: Yup.string().required(CHECK_LAST_NAME_EMPTY),
      phoneNumber: Yup.string()
        .required(CHECK_PHONE_NUMBER_EMPTY)
        .matches(PHONE_REGEX_VN, CHECK_PHONE_NUMBER_MATCH_REGEX),
      address: Yup.string().required(CHECK_ADDRESS_EMPTY)
    }),

    onSubmit: (values) => {
      const inputData: UserInformation = {
        ...values,
        gender: +values.gender === 1
      }
      console.log(inputData)
      // console.log('checkSwitch', checkSwitch)
      if (checkSwitch) {
        // call api update
      }

      // call api book appointment
      bookAppointmentApi()
      navigate('/home/search-doctor')
    }
  })

  const { values, touched, errors, handleChange, handleSubmit, handleBlur } =
    formik

  const bookAppointmentApi = async () => {
    await bookAppointmentService(
      timeSlotResponse?.doctorId as number,
      timeSlotResponse?.timeSlotDTO.id as number
    )
  }
  // const arrInformationPatient = [
  //   {
  //     label: 'First Name',
  //     placeholder: 'e.g. Do Van',
  //     nameInput: 'firstname',
  //     valueInput: currentUser.firstName,
  //     checkError: errors.firstName ? true : false
  //   },
  //   {
  //     label: 'Last Name',
  //     placeholder: 'e.g. Duc Thanh',
  //     nameInput: 'lastName',
  //     valueInput: currentUser.lastName,
  //     checkError: errors.lastName ? true : false
  //   }
  // ]

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      values.firstName = currentUser.firstName
      values.lastName = currentUser.lastName
      values.gender = currentUser.gender ? 1 : 0
      values.phoneNumber = currentUser.phoneNumber
      values.address = currentUser.address
    }
    setCheckSwitch(event.target.checked)
  }

  const [openModalConfirm, setOpenModalConfirm] = useState(false)
  const toggleModalConfirm = () => {
    setOpenModalConfirm(!openModalConfirm)
  }

  const handleBookAppointment = async (type: string) => {
    if (type === MODAL_ACTION_CONFIRM) {
      handleSubmit()
    }
    toggleModalConfirm()
  }

  return (
    <>
      <div className='container__form__book'>
        <h3 className='form__title'>Personal Information</h3>
        <div className='container__switch'>
          <CustomizedSwitch
            handleChange={handleChangeSwitch}
            checkSwitch={checkSwitch}
          />
          {checkSwitch ? (
            <p className='text__notification'>
              If you change your information, your personal information will be
              updated
            </p>
          ) : (
            ''
          )}
        </div>
        <form action='' onSubmit={handleSubmit}>
          <div className='container__input'>
            <label className='label__input'>
              First Name <span className='sign__required'>*</span>
            </label>
            <TextField
              disabled={!checkSwitch}
              fullWidth
              className='text__field'
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder='e.g. Do Van'
              error={errors.firstName ? true : false}
              helperText={errors.firstName}
              name='firstName'
              value={values.firstName}
            />
          </div>

          <div className='container__input'>
            <label className='label__input'>
              Last Name <span className='sign__required'>*</span>
            </label>
            <TextField
              disabled={!checkSwitch}
              fullWidth
              className='text__field'
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder='e.g. Duc Thanh'
              error={errors.lastName ? true : false}
              helperText={errors.lastName}
              name='lastName'
              value={values.lastName}
            />
          </div>

          <div className='container__input'>
            <label className='label__input'>
              Gender <span className='sign__required'>*</span>
            </label>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              // defaultValue={0}
              name='gender'
              onChange={handleChange}
              value={values.gender}
            >
              <FormControlLabel
                value={0}
                control={<Radio size='small' />}
                label='Female'
                className='form__control__label'
                disabled={!checkSwitch}
              />
              <FormControlLabel
                value={1}
                control={<Radio size='small' />}
                label='Male'
                className='form__control__label'
                disabled={!checkSwitch}
              />
            </RadioGroup>
          </div>

          <div className='container__input'>
            <label className='label__input'>
              Phone Number <span className='sign__required'>*</span>
            </label>
            <TextField
              disabled={!checkSwitch}
              fullWidth
              className='text__field'
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder='e.g. 097371223'
              error={errors.phoneNumber ? true : false}
              helperText={errors.phoneNumber}
              name='phoneNumber'
              value={values.phoneNumber}
              type='text'
            />
          </div>

          <div className='container__input'>
            <label className='label__input'>
              Address <span className='sign__required'>*</span>
            </label>
            <TextField
              disabled={!checkSwitch}
              fullWidth
              className='text__field'
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder='e.g. 48 Doan Van Cu, Lien Chieu District, Da Nang City'
              error={errors.address ? true : false}
              helperText={errors.address}
              name='address'
              value={values.address}
            />
          </div>
        </form>

        <ButtonCustomize
          text='Book an appointment'
          onClick={toggleModalConfirm}
        />
      </div>

      <ModalConfirm
        openModalConfirm={openModalConfirm}
        onAction={handleBookAppointment}
        title='Book Appointment'
        textBtn='Create'
        backgroundColorBtnConfirm='var(--primary-color)'
        contentBody={
          <>
            <h3>You are about to book appointment</h3>
            <p style={{ color: '#da4040' }}>
              Your personal information will be updated. Are you sure ?
            </p>
          </>
        }
      />
    </>
  )
}
