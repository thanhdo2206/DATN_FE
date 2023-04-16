import { Box } from '@mui/material'

import '../../../assets/css/pages/guestPage/homePage/home_page.css'
import ModalConfirm from '../../../components/ModalConfirm'

const nurseImg = require('../../../assets/img/nurse-intro.png')
export default function HomePage() {
  return (
    <Box className='home__page--container'>
      <Box className='home__banner--container'>
        <Box className='banner__intro--group'>
          <Box className='banner__intro--text'>
            <p className='banner__intro--title'>
              Find a doctor
              <span>for you now !</span>
            </p>
            <p className='banner__intor--des'>
              We take the guesswork out of locating a doctor, hospital, or other
              medical facility in your area for you and your family.
            </p>
          </Box>
          <Box className='banner__intro--btn'>
            <button className='btn_appointment'>Get Appointment</button>
          </Box>
        </Box>
        <Box className='banner__intro--img'>
          <img src={nurseImg} alt='#' />
        </Box>
        <Box className='banner__intro--experience'>
          <Box className='box__intro--experience'>
            <p className='title--experience'>15+</p>
            <p className='content--experience'>
              Years of <span>Experience</span>
            </p>
          </Box>
          <Box className='box__intro--experience'>
            <p className='title--experience'>200</p>
            <p className='content--experience'>
              Doctors <span>Speacialist</span>
            </p>
          </Box>
          <Box className='box__intro--experience'>
            <p className='title--experience'>100%</p>
            <p className='content--experience'>
              Patient <span>Satisfaction</span>
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
