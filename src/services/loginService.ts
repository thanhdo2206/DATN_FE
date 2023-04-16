import { FormLoginValues } from '../interface/ValidateInterface'
import requestApi from '../utils/requestApi'

export const loginServices = async (
  dataLogin: FormLoginValues
): Promise<any> => {
  try {
    const response = await requestApi({
      method: 'post',
      url: '/users/guest/authenticate',
      data: {
        email: `${dataLogin.email}`,
        password: `${dataLogin.password}`
      }
    })
    return response.data
  } catch (error: any) {
    const responseErr = error.response
    // console.log(responseErr.status)
    return responseErr.data
  }
}
