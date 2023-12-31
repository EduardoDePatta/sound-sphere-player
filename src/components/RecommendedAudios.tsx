import { FC } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useFetchRecommendedAudios } from '../hooks/query'
import colors from '../constants/colors'
import GridView from '../ui/GridView'

interface RecommendedAudiosProps {}

const RecommendedAudios: FC<RecommendedAudiosProps> = (props) => {
  const { data, isLoading } = useFetchRecommendedAudios()

  const getPoster = (poster?: string) => {
    return poster ? { uri: poster } : require('../assets/sound-sphere-logo.png')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Audios</Text>
      <GridView
        data={data ?? []}
        col={3}
        renderItem={(item) => {
          return (
            <Pressable>
              <Image style={styles.poster} source={getPoster(item.poster)} />
              <Text
                ellipsizeMode='tail'
                numberOfLines={2}
                style={styles.audioTitle}
              >
                {item.title}
              </Text>
            </Pressable>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  audioTitle: {
    color: colors.CONTRAST,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
  poster: { width: '100%', aspectRatio: 1, borderRadius: 7 },
})

export default RecommendedAudios
