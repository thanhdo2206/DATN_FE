import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { FormLoginValues } from '../../../interface/ValidateInterface'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { clearMessage } from '../../../redux/slices/authSlice'
import { loginUser } from '../../../redux/thunk/authThunk'
import FormikCustomize from '../../../utils/formik/FormikCustomize'
import { EMAIL_REGEX } from '../../../utils/regex'
import { Role } from '../../../utils/roles'
import {
  CHECK_EMAIL_EMPTY,
  CHECK_EMAIL_MATCH_REGEX,
  CHECK_PASSWORD_EMPTY
} from '../../../utils/validateInform'
import AuthBoxHeader from './AuthBoxHeader'

const initialLoginValues = {
  email: '',
  password: ''
}

export interface LoginInputField {
  id: string
  label: string
  autoFoucus?: boolean
}

const loginInputFields: LoginInputField[] = [
  {
    id: 'email',
    label: 'Your Email',
    autoFoucus: true
  },
  {
    id: 'password',
    label: 'Password'
  }
]

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false)

  const handleLoginSubmit = (values: FormLoginValues) => {
    const fetchApiLoign = async (dataLogin: FormLoginValues) => {
      setLoadingLogin(true)
      await dispatch(loginUser(dataLogin))
      setLoadingLogin(false)
    }
    fetchApiLoign(values)
  }

  const handleLoginValidationSchema = () => {
    return Yup.object().shape({
      email: Yup.string()
        .required(CHECK_EMAIL_EMPTY)
        .matches(EMAIL_REGEX, CHECK_EMAIL_MATCH_REGEX),
      password: Yup.string().required(CHECK_PASSWORD_EMPTY)
    })
  }

  return (
    <>
      <div className='container__auth'>
        <AuthBoxHeader
          title='Welcome to Hospital Care'
          detail='To get started, please enter your details'
        />
        <Box className='auth__box--body'>
          <FormikCustomize
            initialFormikValues={initialLoginValues}
            inputFields={loginInputFields}
            onValidationSchema={handleLoginValidationSchema}
            onSubmitFormik={handleLoginSubmit}
            loadingFormik={loadingLogin}
            btnText='Sign in'
          />
        </Box>
        <Box className='auth__footer'>
          <p>Don't have an account?</p>
          <Link
            to='/register'
            className='auth__link'
            onClick={() => dispatch(clearMessage())}
          >
            Sign up
          </Link>
        </Box>
      </div>
    </>
  )
}
