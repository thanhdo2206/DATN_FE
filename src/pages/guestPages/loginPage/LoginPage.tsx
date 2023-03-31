import { ThemeProvider } from '@emotion/react'
import { InputLabel } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Form, Formik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import { FormLoginValues } from '../../../interface/validate_interface'
import { customFontLoginTheme } from '../../../themes/login_theme'
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../../utils/regex'
import {
  EMAIL_AGAIN,
  EMAIL_REQUIRE,
  PASSWORD_AGAIN,
  PASSWORD_REQUIRE
} from '../../../utils/validate_inform'
import './login_page.css'

const LoginPage: React.FC = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .required(EMAIL_REQUIRE)
          .matches(EMAIL_REGEX, EMAIL_AGAIN),
        password: Yup.string()
          .required(PASSWORD_REQUIRE)
          .matches(PASSWORD_REGEX, PASSWORD_AGAIN)
      })}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values: FormLoginValues) => {
        alert(JSON.stringify(values))
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <Container component='main' maxWidth='xs' className='container__login'>
          <Box className='box__login'>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Form className='form__login' onSubmit={handleSubmit}>
              <ThemeProvider theme={customFontLoginTheme}>
                <InputLabel shrink htmlFor='email' className='lable__input'>
                  Your Email
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
              <Box className='box__signup--link'>
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
  )
}

export default LoginPage
