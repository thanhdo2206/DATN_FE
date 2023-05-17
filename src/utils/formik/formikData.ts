import { UserProfileField } from '../../interface/FormikInterface'

export const adminProfileFields: UserProfileField[] = [
  {
    id: 'firstName',
    label: 'First Name',
    autoFoucus: true
  },
  {
    id: 'lastName',
    label: 'Last Name'
  },
  { id: 'age', label: 'Age' },
  {
    id: 'gender',
    label: 'Gender'
  },
  { id: 'department', label: 'Department' },
  {
    id: 'address',
    label: 'Address'
  },
  {
    id: 'phoneNumber',
    label: 'Phone Number'
  }
]

export const userProfileFields: UserProfileField[] = [
  {
    id: 'firstName',
    label: 'First Name',
    autoFoucus: true
  },
  {
    id: 'lastName',
    label: 'Last Name'
  },
  { id: 'age', label: 'Age' },
  {
    id: 'gender',
    label: 'Gender'
  },
  {
    id: 'address',
    label: 'Address'
  },
  {
    id: 'phoneNumber',
    label: 'Phone Number'
  }
]
