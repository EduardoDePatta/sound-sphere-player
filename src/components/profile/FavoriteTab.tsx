import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface FavoriteTabProps {}

const FavoriteTab: FC<FavoriteTabProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>FavoriteTab</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default FavoriteTab
