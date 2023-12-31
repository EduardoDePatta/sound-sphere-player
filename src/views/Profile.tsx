import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import UploadsTab from '../components/profile/UploadsTab'
import PlaylistTab from '../components/profile/PlaylistTab'
import FavoriteTab from '../components/profile/FavoriteTab'
import HistoryTab from '../components/profile/HistoryTab'
import colors from '../constants/colors'

interface ProfileProps {}

const Tab = createMaterialTopTabNavigator()

const Profile: FC<ProfileProps> = (props) => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      >
        <Tab.Screen name='Uploads' component={UploadsTab} />
        <Tab.Screen name='Playlist' component={PlaylistTab} />
        <Tab.Screen name='Favorites' component={FavoriteTab} />
        <Tab.Screen name='History' component={HistoryTab} />
      </Tab.Navigator>
      <Text>Profile</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowRadius: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    marginBottom: 20,
  },
  tabBarLabelStyle: {
    color: colors.CONTRAST_2,
    fontSize: 12,
  },
})

export default Profile
