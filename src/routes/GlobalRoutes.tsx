import { RouteObject } from 'react-router'

import AppointmentDoctor from '../pages/doctorPages/appointmentDoctor/AppointmentDoctor'
import AppointmentPatientOfDoctor from '../pages/doctorPages/appointmentDoctor/AppointmentPatientOfDoctor'
import MainDoctor from '../pages/doctorPages/homeDoctor/MainDoctor'
import ScheduleTiming from '../pages/doctorPages/scheduleTiming/ScheduleTiming'
import DetailExamination from '../pages/guestPages/detailExamination/DetailExamination'
import MainFindDoctor from '../pages/guestPages/findDoctorPage/MainFindDoctor'
import HomePage from '../pages/guestPages/homePage/HomePage'
import LoginPage from '../pages/guestPages/loginPage/LoginPage'
import BookAppointment from '../pages/patientPages/bookAppointment/BookAppointment'
import HomeTemplates from '../templates/HomeTemplates'
import AuthRoute from '../utils/AuthRoute'
import { Role } from '../utils/roles'
import patientRoutes from './PatientRoutes'

const globalRoutes: RouteObject[] = [
  { path: 'login', element: <LoginPage /> },
  {
    path: 'home',
    element: <HomeTemplates />,
    children: [
      {
        path: 'search-doctor',
        element: <MainFindDoctor />
      },
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'examination/detail/:id',
        element: <DetailExamination />
      },

      ...patientRoutes
    ]
  }
]

export default globalRoutes
