import { ThemeProvider } from '@emotion/react'
import {
  Alert,
  Box,
  Button,
  Container,
  InputLabel,
  TextField,
  Typography
} from '@mui/material'
import { Form, Formik } from 'formik'
import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import '../../../assets/css/pages/guestPage/loginPage/login_page.css'
import { FormLoginValues } from '../../../interface/ValidateInterface'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { loginUser } from '../../../redux/slices/authSlice'
import { customFontLoginTheme } from '../../../themes/loginTheme'
import { EMAIL_REGEX } from '../../../utils/regex'
import { Role } from '../../../utils/roles'
import {
  CHECK_EMAIL_EMPTY,
  CHECK_EMAIL_MATCH_REGEX,
  CHECK_PASSWORD_EMPTY
} from '../../../utils/validateInform'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { message, isAuth, role } = useAppSelector((state) => state.auths)

  const redirectByRole = (checkRole: string) => {
    if (checkRole === Role.Doctor) {
      navigate('/doctor/appointment')
    }

    if (checkRole === Role.Patient) {
      navigate('/home')
    }
  }

  useEffect(() => {
    if (isAuth && role) {
      redirectByRole(role as string)
    }
  }, [isAuth])

  return (
    <>
      {message ? (
        <Box className='box__alert'>
          <Alert severity='error'>{message}</Alert>
        </Box>
      ) : (
        <></>
      )}
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required(CHECK_EMAIL_EMPTY)
            .matches(EMAIL_REGEX, CHECK_EMAIL_MATCH_REGEX),
          password: Yup.string().required(CHECK_PASSWORD_EMPTY)
        })}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values: FormLoginValues) => {
          const fetchApiLoign = async (dataLogin: FormLoginValues) => {
            await dispatch(loginUser(dataLogin))
          }
          fetchApiLoign(values)
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Container
            component='main'
            maxWidth='xs'
            className='container__login'
          >
            <Box className='box__login'>
              <Typography component='h1' variant='h5'>
                Sign in
              </Typography>
              <Form className='form__login' onSubmit={handleSubmit}>
                <ThemeProvider theme={customFontLoginTheme}>
                  <InputLabel shrink htmlFor='email' className='lable__input'>
                    Your Email
                    <span>*</span>
                  </InputLabel>
                  <TextField
                    error={errors.email ? true : false}
                    fullWidth
                    id='email'
                    name='email'
                    autoComplete='email'
                    autoFocus
                    size='small'
                    className='input__email'
                    value={values.email}
                    onChange={handleChange}
                    helperText={errors.email}
                  />
                  <InputLabel
                    shrink
                    htmlFor='password'
                    margin='dense'
                    className='lable__input lable__input--pass'
                  >
                    Password
                    <span>*</span>
                  </InputLabel>
                  <TextField
                    error={errors.password ? true : false}
                    fullWidth
                    name='password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    size='small'
                    value={values.password}
                    onChange={handleChange}
                    helperText={errors.password}
                  />
                </ThemeProvider>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Box className='box__signUp--link'>
                  <p>Don't have an account?</p>
                  <Link to='/register' className='signUp__link'>
                    Sign up
                  </Link>
                </Box>
              </Form>
            </Box>
          </Container>
        )}
      </Formik>
    </>
  )
}

export default LoginPage
