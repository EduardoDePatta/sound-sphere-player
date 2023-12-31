import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface PlaylistTabProps {}

const PlaylistTab: FC<PlaylistTabProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>PlaylistTab</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default PlaylistTab
