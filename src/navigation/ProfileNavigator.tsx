import { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../views/Profile'
import ProfileSettings from '../components/profile/ProfileSettings'

interface ProfileNavigatorProps {}

const Stack = createNativeStackNavigator()

const ProfileNavigator: FC<ProfileNavigatorProps> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='ProfileSettings' component={ProfileSettings} />
    </Stack.Navigator>
  )
}

export default ProfileNavigator
