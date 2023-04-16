import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import '../src/assets/css/base/root.css'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { updateAuth } from './redux/slices/authSlice'
import './reset_css.css'
import ApplicationRoute from './routes/ApplicationRoute'
import Loading from './utils/Loading'

function App() {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.auths)

  useEffect(() => {
    const fetchApiUpdateAuth = async () => {
      await dispatch(updateAuth())
    }
    fetchApiUpdateAuth()
  }, [])

  return (
    <BrowserRouter>
      {loading ? <Loading /> : <ApplicationRoute />}
    </BrowserRouter>
  )
}

export default App
