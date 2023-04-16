export const checkResponseSuccess = (status: number) => {
  return status < 300 && status >= 200
}
