import { useQuery } from 'react-query'
import { Notification } from '../utils/notification'
import { getClient } from '../api/client'
import catchAsyncError from '../api/catchError'
import { AudioData } from '../@types/audio'
import { Playlist } from '../@types/playlist'

const fetchLatest = async (): Promise<AudioData[]> => {
  const client = await getClient()
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
  const client = await getClient()
  const { data } = await client('/profile/recommended')
  return data.audios
}

export const useFetchRecommendedAudios = () => {
  return useQuery(['recommended'], {
    queryFn: () => fetchRecommended(),
    onError(error) {
      const errorMessage = catchAsyncError(error)
      Notification.error(errorMessage)
    },
  })
}

const fetchPlaylist = async (): Promise<Playlist[]> => {
  const client = await getClient()
  const { data } = await client('/playlist/by-profile')
  return data.playlist
}

export const useFetchPlaylist = () => {
  return useQuery(['playlist'], {
    queryFn: () => fetchPlaylist(),
    onError(error) {
      const errorMessage = catchAsyncError(error)
      Notification.error(errorMessage)
    },
  })
}

const fetchUploadsByProfile = async (): Promise<AudioData[]> => {
  const client = await getClient()
  const { data } = await client('/profile/uploads')
  return data.audios
}

export const useFetchUploadsByProfile = () => {
  return useQuery(['uploads-by-profile'], {
    queryFn: () => fetchUploadsByProfile(),
    onError(error) {
      const errorMessage = catchAsyncError(error)
      Notification.error(errorMessage)
    },
  })
}

const fetchFavorites = async (): Promise<AudioData[]> => {
  const client = await getClient()
  const { data } = await client('/favorite')
  return data.audios
}

export const useFetchFavorites = () => {
  return useQuery(['favorites'], {
    queryFn: () => fetchFavorites(),
    onError(error) {
      const errorMessage = catchAsyncError(error)
      Notification.error(errorMessage)
    },
  })
}
