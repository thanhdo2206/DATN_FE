import { useEffect } from 'react'
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom'

import '../src/assets/css/base/root.css'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { updateAuth } from './redux/thunk/authThunk'
import './reset_css.css'
import ApplicationRoute from './routes/ApplicationRoute'
import Loading from './utils/Loading'
import { Role } from './utils/roles'

function App() {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.auths)

  useEffect(() => {
    const fetchApiUpdateAuth = async () => {
      await dispatch(updateAuth())
    }
    fetchApiUpdateAuth()
  }, [])

  return <>{loading ? <Loading /> : <ApplicationRoute />}</>
}

export default App
