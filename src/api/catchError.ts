import { isAxiosError } from 'axios'

const catchAsyncError = (error: any): string => {
  let errorMessage = error.message

  if (isAxiosError(error)) {
    const errorResponse = error.response?.data
    if (errorResponse) errorMessage = errorResponse.message
  }
  return errorMessage
}

export default catchAsyncError
