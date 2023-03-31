import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Button } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import React from 'react'
import { NavLink } from 'react-router-dom'

import '../../../assets/css/pages/doctorPages/appointment_doctor.css'

type Props = {}

const arrInforPatient = [
  {
    icon: <AccessTimeFilledOutlinedIcon className='icon__infor' />,
    value: '14 Nov 2019, 10.00 AM'
  },
  {
    icon: <LocationOnIcon className='icon__infor' />,
    value: ' Newyork, United States'
  },
  { icon: <EmailIcon className='icon__infor' />, value: 'richard@example.com' },
  { icon: <LocalPhoneIcon className='icon__infor' />, value: '+1 923 782 4575' }
]

const arrStatus = [
  { value: 0, text: 'Pending' },
  { value: 1, text: 'Approved' },
  { value: 2, text: 'Cancel' }
]

export default function AppointmentDoctor({}: Props) {
  const renderActionAppointmentByStatus = (status: number) => {
    if (status === 0) {
      return (
        <>
          <Button
            variant='contained'
            className='btn accept'
            startIcon={<CheckOutlinedIcon />}
          >
            Approve
          </Button>
          <Button
            variant='contained'
            className='btn cancel'
            startIcon={<CloseOutlinedIcon />}
          >
            Cancel
          </Button>
        </>
      )
    }

    if (status === 1) {
      return <span className='text__status approved'>Approved</span>
    }

    if (status === 2) {
      return <span className='text__status cancelled'>Cancelled</span>
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value)
  }
  return (
    <div className='container__appointment'>
      <div className='appointment__doctor__list'>
        <div className='container__title'>
          <h3>Appointment Lists</h3>
          <FormControl sx={{ width: '175px' }}>
            <InputLabel id='status__label'>Select Status</InputLabel>
            <Select
              labelId='status__label'
              id='demo-simple-select'
              label='Select Status'
              onChange={handleChange}
              className='select__status'
              sx={{
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: ' rgba(0, 0, 0, 0.23)'
                }
              }}
              size='small'
            >
              {arrStatus.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={item.value}
                    className='select__item'
                  >
                    {item.text}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>

        <div className='appointment__list'>
          <div className='appointment__item'>
            <div className='profile__infor'>
              <div className='avatar__patient'>
                <img
                  src='http://azim.commonsupport.com/Docpro/assets/images/resource/appointment-1.jpg'
                  alt=''
                />
              </div>
              <div className='infor__patient'>
                <NavLink to=''>
                  <h4>Mary Astor</h4>
                </NavLink>

                <ul className='infor__list'>
                  {arrInforPatient.map((item, index) => {
                    return (
                      <li key={index}>
                        {item.icon}
                        {item.value}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            <div className='appointment__action'>
              <span className='text__status approved'>Approved</span>
            </div>
          </div>

          <div className='appointment__item'>
            <div className='profile__infor'>
              <div className='avatar__patient'>
                <img
                  src='http://azim.commonsupport.com/Docpro/assets/images/resource/appointment-1.jpg'
                  alt=''
                />
              </div>
              <div className='infor__patient'>
                <NavLink to=''>
                  <h4>Mary Astor</h4>
                </NavLink>

                <ul className='infor__list'>
                  {arrInforPatient.map((item, index) => {
                    return (
                      <li key={index}>
                        {item.icon}
                        {item.value}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            <div className='appointment__action'>
              <span className='text__status cancelled'>Cancelled</span>
            </div>
          </div>

          <div className='appointment__item'>
            <div className='profile__infor'>
              <div className='avatar__patient'>
                <img
                  src='http://azim.commonsupport.com/Docpro/assets/images/resource/appointment-1.jpg'
                  alt=''
                />
              </div>
              <div className='infor__patient'>
                <NavLink to=''>
                  <h4>Mary Astor</h4>
                </NavLink>

                <ul className='infor__list'>
                  {arrInforPatient.map((item, index) => {
                    return (
                      <li key={index}>
                        {item.icon}
                        {item.value}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            <div className='appointment__action'>
              <Button
                variant='contained'
                className='btn accept'
                startIcon={<CheckOutlinedIcon />}
              >
                Approve
              </Button>
              <Button
                variant='contained'
                className='btn cancel'
                startIcon={<CloseOutlinedIcon />}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='pagnination__appointment'>
        <ul className='pagination'>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          {/* <li>
            <i className='icon-Arrow-Right' />
          </li> */}
        </ul>
      </div>
    </div>
  )
}
