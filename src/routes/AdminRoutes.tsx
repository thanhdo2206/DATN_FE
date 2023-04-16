import { RouteObject } from 'react-router-dom'

import TestAdminPages from '../pages/adminPages/TestAdminPages'
import AuthRoute from '../utils/AuthRoute'
import { Role } from '../utils/roles'

const adminRoutes: RouteObject[] = [
  {
    path: 'admin',
    element: (
      <AuthRoute roles={Role.Admin}>
        <TestAdminPages />
      </AuthRoute>
    )
  }
]

export default adminRoutes
