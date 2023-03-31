import requestApi from '../utils/requestApi'

export const getdetailTimeSlotService = async (id: string) => {
  try {
    const response = await requestApi({
      url: `/time_slots/${id}`,
      method: 'get'
    })
    return response.data
  } catch (error) {
    return error
  }
}
