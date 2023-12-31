import { useQuery } from 'react-query'
import { Notification } from '../utils/notification'
import client from '../api/client'
import catchAsyncError from '../api/catchError'
import { AudioData } from '../@types/audio'
import { Keys, getFromAsyncStorage } from '../storage/asyncStorage'

const fetchLatest = async (): Promise<AudioData[]> => {
  const { data } = await client('/audio/latest')
  return data.audios
}

export const useFetchLatestAudios = () => {
  return useQuery(['latest-uploads'], {
    queryFn: () => fetchLatest(),
    onError(error) {
      const errorMessage = catchAsyncError(error)
      Notification.error(errorMessage)
    },
  })
}

const fetchRecommended = async (): Promise<AudioData[]> => {
  const { data } = await client('/profile/recommended')
  return data.audios
}

export const useFetchRecommendedAudios = () => {
  return useQuery(['recommended'], {
    queryFn: () => fetchLatest(),
    onError(error) {
      const errorMessage = catchAsyncError(error)
      Notification.error(errorMessage)
    },
  })
}
