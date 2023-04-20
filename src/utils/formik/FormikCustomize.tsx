import {
  Box,
  Button,
  CircularProgress,
  Grid,
  ThemeProvider
} from '@mui/material'
import { Form, Formik } from 'formik'

import { FormUserProfileValues } from '../../interface/UsersInterface'
import {
  FormLoginValues,
  FormRegisterValues
} from '../../interface/ValidateInterface'
import { LoginInputField } from '../../pages/guestPages/authPage/LoginPage'
import { RegisterInputField } from '../../pages/guestPages/authPage/RegisterPage'
import { UserProfileField } from '../../pages/patientPages/dashboardPage/PatientProfile'
import { customFontLoginTheme } from '../../themes/authTheme'
import FieldInputFormik from './FieldInputFormik'

type Props = {
  initialFormikValues:
    | FormLoginValues
    | FormRegisterValues
    | FormUserProfileValues
  inputFields: LoginInputField[] | RegisterInputField[] | UserProfileField[]
  onValidationSchema: any
  onValidate?: any
  onSubmitFormik: (values: any) => void
  loadingFormik: boolean
  btnText: string
}

function FormikCustomize(props: Props) {
  const {
    initialFormikValues,
    inputFields,
    onValidate,
    onValidationSchema,
    onSubmitFormik,
    loadingFormik,
    btnText
  } = props

  return (
    <Formik
      initialValues={{
        ...initialFormikValues
      }}
      validate={onValidate}
      validationSchema={onValidationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmitFormik}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <Box className='box__login'>
          <Form className='auth__form' onSubmit={handleSubmit}>
            <ThemeProvider theme={customFontLoginTheme}>
              <Grid container spacing={2}>
                {inputFields.map((field) => {
                  return (
                    <FieldInputFormik
                      fieldId={field.id}
                      fieldLable={field.label}
                      fieldAutoFocus={field.autoFoucus}
                      onFieldChange={handleChange}
                      values={values}
                      errors={errors}
                      key={field.id}
                    />
                  )
                })}
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                {loadingFormik ? (
                  <>
                    <CircularProgress color='inherit' size={22} />
                  </>
                ) : (
                  btnText
                )}
              </Button>
            </ThemeProvider>
          </Form>
        </Box>
      )}
    </Formik>
  )
}

export default FormikCustomize
