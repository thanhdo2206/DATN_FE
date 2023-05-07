export interface DataUserProfile {
  userId?: number
  firstName?: string
  lastName?: string
  gender: boolean
  address?: string
  phoneNumber?: string
}

export interface DataUserProfilePicture {
  userId?: number
  profilePicture: File | string
}

export interface FormUserProfileValues {
  firstName: string
  lastName: string
  gender: string
  address: string
  phoneNumber: string
}

export interface UserInformation {
  id?: number
  address?: string
  profilePicture?: string
  email?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  gender?: boolean
  role?: string
}

export interface UserResponse {
  user: UserInformation
  status: number
}
