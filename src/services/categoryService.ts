import requestApi from '../utils/requestApi';


export const getAllCategoryService = async () => {
  try {
    const response = await requestApi({
      url: '/categories/guest',
      method: 'get'
    })
    return response.data
  } catch (error) {
    return error
  }
}