export interface FormLoginValues {
  email: string
  password: string
}

export interface FormRegisterValues extends FormLoginValues {
  firstName: string
  lastName: string
  phoneNumber: string
  confirmPassword: string
}
