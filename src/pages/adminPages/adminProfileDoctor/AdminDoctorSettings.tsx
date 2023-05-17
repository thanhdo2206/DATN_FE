import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { ProgressListener } from '../../../components/Progress'
import {
  DataUserProfile,
  FormUserProfileValues
} from '../../../interface/UsersInterface'
import { FormRegisterValues } from '../../../interface/ValidateInterface'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { updateUserProfile } from '../../../redux/thunk/userThunk'
import { customFontDoctorProfileTheme } from '../../../themes/authTheme'
import {
  converGenderToBoolen,
  convertGenderToString
} from '../../../utils/convertGenderToString'
import FormikCustomize from '../../../utils/formik/FormikCustomize'
import { adminProfileFields } from '../../../utils/formik/formikData'
import { NAME_REGEX, PHONE_REGEX_VN } from '../../../utils/regex'
import {
  CHECK_ADDRESS_EMPTY,
  CHECK_AGE_EMPTY,
  CHECK_FIRST_NAME_EMPTY,
  CHECK_LAST_NAME_EMPTY,
  CHECK_NAME_EMPTY,
  CHECK_NAME_MATCH_REGEX,
  CHECK_PHONE_NUMBER_EMPTY,
  CHECK_PHONE_NUMBER_MATCH_REGEX
} from '../../../utils/validateInform'
import AdminDoctorSettingAvatar from './AdminDoctorSettingAvatar'

type Props = {
  id?: number
}

const AdminDoctorSettings = (props: Props) => {
  const { id } = props
  const dispatch = useAppDispatch()

  // const initialUserProfileValues = {
  //   firstName: firstName ? firstName : '',
  //   lastName: lastName ? lastName : '',
  //   gender: convertGenderToString(gender),
  //   address: address ? address : '',
  //   phoneNumber: phoneNumber ? phoneNumber : ''
  // }
  const initialUserProfileValues = {
    firstName: '',
    lastName: '',
    gender: convertGenderToString(true),
    address: '',
    age: '',
    phoneNumber: '',
    department: 1
  }

  const handleUpdateProfilesSubmit = (values: FormUserProfileValues) => {
    const fetchApiUpdateProfile = async (dataUserProfile: DataUserProfile) => {
      ProgressListener.emit('start')
      await dispatch(updateUserProfile(dataUserProfile))
      ProgressListener.emit('stop')
      toast.success('Your profile update successfully')
    }

    // const dataUserProfile: DataUserProfile = {
    //   userId: id,
    //   ...values,
    //   gender: converGenderToBoolen(values.gender)
    // }
    const dataUserProfile: DataUserProfile = {
      userId: id,
      ...values,
      gender: converGenderToBoolen(values.gender)
    }

    console.log(dataUserProfile)

    // fetchApiUpdateProfile(dataUserProfile)
  }

  const handleProfilesValidationSchema = () => {
    return Yup.object().shape({
      address: Yup.string().trim().required(CHECK_ADDRESS_EMPTY),
      phoneNumber: Yup.string()
        .trim()
        .required(CHECK_PHONE_NUMBER_EMPTY)
        .matches(PHONE_REGEX_VN, CHECK_PHONE_NUMBER_MATCH_REGEX),
      age: Yup.string().trim().required(CHECK_AGE_EMPTY)
    })
  }

  const handleProfilesValidation = (values: FormRegisterValues) => {
    const errors = {
      firstName: '',
      lastName: ''
    }

    errors.firstName = !values.firstName
      ? !values.lastName
        ? CHECK_NAME_EMPTY
        : CHECK_FIRST_NAME_EMPTY
      : !NAME_REGEX.test(values.firstName)
      ? !values.lastName
        ? ''
        : CHECK_NAME_MATCH_REGEX
      : !values.lastName
      ? ''
      : !NAME_REGEX.test(values.lastName)
      ? CHECK_NAME_MATCH_REGEX
      : ''

    errors.lastName = !values.lastName
      ? !values.firstName
        ? ' '
        : CHECK_LAST_NAME_EMPTY
      : !NAME_REGEX.test(values.lastName)
      ? !values.firstName
        ? ''
        : ' '
      : !values.firstName
      ? ''
      : !NAME_REGEX.test(values.lastName)
      ? ' '
      : ''

    const responseErrors = !errors.firstName && !errors.lastName ? {} : errors
    return responseErrors
  }

  return (
    <div className='admin__doctor--setting'>
      <AdminDoctorSettingAvatar />
      <div className='setting__div--formik'>
        <FormikCustomize
          initialFormikValues={initialUserProfileValues}
          inputFields={adminProfileFields}
          onValidationSchema={handleProfilesValidationSchema}
          onValidate={handleProfilesValidation}
          onSubmitFormik={handleUpdateProfilesSubmit}
          btnText='Save'
          theme={customFontDoctorProfileTheme}
        />
      </div>
    </div>
  )
}

export default AdminDoctorSettings
