import { RouteObject } from 'react-router-dom'

import AdminAddDoctorPage from '../pages/adminPages/AdminAddDoctorPage'
import AdminAppointmentPage from '../pages/adminPages/AdminAppointmentPage'
import AdminDepartmentPage from '../pages/adminPages/AdminDepartmentPage'
import AdminDoctorPage from '../pages/adminPages/AdminDoctorPage'
import AdminPatientPage from '../pages/adminPages/AdminPatientPage'
import AdminProfileDoctorPage from '../pages/adminPages/AdminProfileDoctorPage'
import AdminTemplate from '../templates/AdminTemplate'
import AuthRoute from '../utils/AuthRoute'
import { Role } from '../utils/roles'

const adminRoutes: RouteObject[] = [
  {
    path: 'admin',
    element: (
      <AuthRoute roles={Role.Admin}>
        <AdminTemplate />
      </AuthRoute>
    ),
    children: [
      {
        path: 'appointments',
        element: <AdminAppointmentPage />
      },
      {
        path: 'doctors',
        children: [
          {
            path: 'list',
            element: <AdminDoctorPage />
          },
          {
            path: 'add',
            element: <AdminAddDoctorPage />
          },
          {
            path: 'profile/:id',
            element: <AdminProfileDoctorPage />
          }
        ]
      },
      {
        path: 'patients',
        element: <AdminPatientPage />
      },
      {
        path: 'departments',
        element: <AdminDepartmentPage />
      }
    ]
  }
]

export default adminRoutes
