import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface ProfileProps {}

const Profile: FC<ProfileProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default Profile
