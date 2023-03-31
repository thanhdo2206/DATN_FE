import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import './assets/css/base/root.css'
import AppointmentDoctor from './pages/doctorPages/appointmentDoctor/AppointmentDoctor'
import MainDoctor from './pages/doctorPages/homeDoctor/MainDoctor'
import ScheduleTiming from './pages/doctorPages/scheduleTiming/ScheduleTiming'
import DetailExamination from './pages/guestPages/detailExamination/DetailExamination'
import HomeDoctor from './pages/guestPages/homeAppointment/HomeDoctor'
import LoginPage from './pages/guestPages/loginPage/LoginPage'
import RegisterPage from './pages/guestPages/registerPage/RegisterPage'
import BookAppointment from './pages/patientPages/formBookAppointment/BookAppointment'
import { store } from './redux/configStore'
import HomeTemplates from './templates/HomeTemplates'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='home' element={<HomeTemplates />}>
            <Route path='search-doctor' element={<HomeDoctor />} />
            <Route path='examination'>
              <Route path='detail/:id' element={<DetailExamination />}></Route>
              <Route
                path='book-appointment/:id'
                element={<BookAppointment />}
              />
            </Route>
          </Route>
          <Route path='doctor' element={<MainDoctor />}>
            <Route path='appointment' element={<AppointmentDoctor />} />
            <Route path='schedule-timing' element={<ScheduleTiming />} />
          </Route>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
