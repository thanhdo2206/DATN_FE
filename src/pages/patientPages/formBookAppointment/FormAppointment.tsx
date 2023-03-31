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
import { useFormik } from 'formik'
import React from 'react'
import { useLocation } from 'react-router-dom'
import * as Yup from 'yup'

import '../../../assets/css/pages/patientPages/form_appointment.css'
import Button from '../../../components/ButtonCustomize'
import { PHONE_REGEX_VN } from '../../../utils/regex'
import {
  CHECK_ADDRESS_EMPTY,
  CHECK_PATIENT_NAME_EMPTY,
  CHECK_PHONE_NUMBER_EMPTY,
  CHECK_PHONE_NUMBER_MATCH_REGEX
} from '../../../utils/validateInform'

type Props = {}

interface IPatientInformation {
  patientName: string
  phoneNumber: string
  address: string
  gender: number
}

export default function FormAppointment(props: Props) {
  const formik = useFormik<IPatientInformation>({
    initialValues: {
      patientName: '',
      phoneNumber: '',
      address: '',
      gender: 0
    },

    validationSchema: Yup.object().shape({
      patientName: Yup.string().required(CHECK_PATIENT_NAME_EMPTY),
      phoneNumber: Yup.string()
        .required(CHECK_PHONE_NUMBER_EMPTY)
        .matches(PHONE_REGEX_VN, CHECK_PHONE_NUMBER_MATCH_REGEX),
      address: Yup.string().required(CHECK_ADDRESS_EMPTY)
    }),

    onSubmit: (values) => {
      const inputData: IPatientInformation = {
        ...values,
        gender: +values.gender
      }
      console.log(inputData)
    }
  })

  const { values, touched, errors, handleChange, handleSubmit, handleBlur } =
    formik

  return (
    <div className='container__form__book'>
      <h3 className='form__title'>Personal Information</h3>
      <form action='' onSubmit={handleSubmit}>
        <div className='container__input'>
          <label className='label__input'>
            Patient name <span className='sign__required'>*</span>
          </label>
          <TextField
            fullWidth
            className='text__field'
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder='e.g. Do Van Duc Thanh'
            error={errors.patientName ? true : false}
            helperText={errors.patientName}
            name='patientName'
          />
        </div>

        <div className='container__input'>
          {/* <label className='label__input'>Gender</label>
          <input type='radio' id='male' name='gender' defaultValue='Male' />
          <label htmlFor='male'>Male</label>
          <br />
          <br />
          <input type='radio' id='female' name='gender' defaultValue='Female' />
          <label htmlFor='female'>Female</label> */}
          <label className='label__input'>Gender</label>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue={0}
            name='gender'
            onChange={handleChange}
          >
            <FormControlLabel
              value={0}
              control={<Radio size='small' />}
              label='Female'
              className='form__control__label'
            />
            <FormControlLabel
              value={1}
              control={<Radio size='small' />}
              label='Male'
              className='form__control__label'
            />
          </RadioGroup>
        </div>

        <div className='container__input'>
          <label className='label__input'>
            Phone Number <span className='sign__required'>*</span>
          </label>
          <TextField
            fullWidth
            className='text__field'
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder='e.g. 097371223'
            error={errors.phoneNumber ? true : false}
            helperText={errors.phoneNumber}
            name='phoneNumber'
            type='text'
          />
        </div>

        <div className='container__input'>
          <label className='label__input'>
            Address <span className='sign__required'>*</span>
          </label>
          <TextField
            fullWidth
            className='text__field'
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder='e.g. 48 Doan Van Cu, Lien Chieu District, Da Nang City'
            error={errors.address ? true : false}
            helperText={errors.address}
            name='address'
          />
        </div>

        <Button text='Book an appointment' />
      </form>
    </div>
  )
}
