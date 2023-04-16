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
