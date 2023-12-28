import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../views/Home'
import Profile from '../views/Profile'
import Upload from '../views/Upload'
import colors from '../constants/colors'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.PRIMARY },
      }}
    >
      <Tab.Screen
        name='HomeScreen'
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => {
            return <AntDesign name='home' size={size} color={color} />
          },
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name='ProfileScreen'
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => {
            return <AntDesign name='user' size={size} color={color} />
          },
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen
        name='UploadScreen'
        component={Upload}
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <MaterialCommunityIcons
                name='account-music-outline'
                size={size}
                color={color}
              />
            )
          },
          tabBarLabel: 'Upload',
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default TabNavigator
