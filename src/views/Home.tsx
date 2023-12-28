import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface HomeProps {}

const Home: FC<HomeProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default Home
