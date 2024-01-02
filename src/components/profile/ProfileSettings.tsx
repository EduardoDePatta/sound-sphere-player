import { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import AppHeader from '../AppHeader'

interface ProfileSettingsProps {}

const ProfileSettings: FC<ProfileSettingsProps> = (props) => {
  return (
    <View style={styles.container}>
      <AppHeader title='Settings' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

export default ProfileSettings
