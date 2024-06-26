import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { FC, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuthNavigator from './AuthNavigator'
import { getAuthState, updateLoadingState, updateProfile } from '../store/auth'
import TabNavigator from './TabNavigator'
import { Keys, getFromAsyncStorage } from '../storage/asyncStorage'
import { getClient } from '../api/client'
import colors from '../constants/colors'
import Loader from '../ui/Loader'
import catchAsyncError from '../api/catchError'
import { Notification } from '../utils/notification'

interface indexProps {}

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.PRIMARY,
    primary: colors.CONTRAST_2,
  },
}

const AppNavigator: FC<indexProps> = () => {
  const { loggedIn, loading } = useSelector(getAuthState)
  const dispatch = useDispatch()

  const fetchAuthInfo = useCallback(async () => {
    try {
      dispatch(updateLoadingState(true))
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN)
      if (!token) return
      const client = await getClient()
      const { data } = await client.get('/auth/is-auth')
      dispatch(updateProfile(data.profile))
    } catch (error) {
      const errorMessage = catchAsyncError(error)
      Notification.error(errorMessage)
    } finally {
      dispatch(updateLoadingState(false))
    }
  }, [dispatch])

  useEffect(() => {
    fetchAuthInfo()
  }, [fetchAuthInfo])

  return (
    <NavigationContainer theme={AppTheme}>
      {loading ? <Loader loading={loading} /> : null}
      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default AppNavigator
