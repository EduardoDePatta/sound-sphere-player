import { NavigationContainer } from '@react-navigation/native'
import { FC, useCallback, useEffect } from 'react'
import AuthNavigator from './AuthNavigator'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthState, updateProfile } from '../store/auth'
import TabNavigator from './TabNavigator'
import { Keys, getFromAsyncStorage } from '../storage/asyncStorage'
import client from '../api/client'

interface indexProps {}

const AppNavigator: FC<indexProps> = () => {
  const { loggedIn } = useSelector(getAuthState)
  const dispatch = useDispatch()

  const fetchAuthInfo = useCallback(async () => {
    try {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN)
      if (!token) return
      const { data } = await client.get('/auth/is-auth', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      dispatch(updateProfile(data.profile))
      console.log('🚀 ~ file: index.tsx:24 ~ fetchAuthInfo ~ data:', data)
    } catch (error) {
      console.log('auth errorrrrrr bla bla: ', error)
    }
  }, [dispatch])

  useEffect(() => {
    fetchAuthInfo()
  }, [fetchAuthInfo])

  return (
    <NavigationContainer>
      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default AppNavigator
