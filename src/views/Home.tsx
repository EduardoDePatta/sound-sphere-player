import { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { useFetchLatestAudios } from '../hooks/query'
import Loader from '../ui/Loader'
import LatestUploads from '../components/LatestUploads'
import RecommendedAudios from '../components/RecommendedAudios'

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <View style={styles.container}>
      <LatestUploads />
      <RecommendedAudios />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

export default Home
