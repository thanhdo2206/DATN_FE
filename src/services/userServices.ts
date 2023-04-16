import requestApi from '../utils/requestApi'

export const getCurrentUser = async (): Promise<any> => {
  try {
    const response = await requestApi({
      method: 'get',
      url: '/user'
    })
    return response.data
  } catch (error: any) {
    const responseErr = error.response
    return responseErr.data
  }
}
