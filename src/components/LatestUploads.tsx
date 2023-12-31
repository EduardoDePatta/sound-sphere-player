import { FC } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useFetchLatestAudios } from '../hooks/query'
import Loader from '../ui/Loader'
import colors from '../constants/colors'
import AudioCard from '../ui/AudioCard'

interface LatestUploadsProps {}

const LatestUploads: FC<LatestUploadsProps> = () => {
  const { data, isLoading } = useFetchLatestAudios()

  const handlePress = () => {}

  const handleLongPress = () => {}

  if (isLoading) {
    return <Loader loading={isLoading} />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Uploads</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.map((item) => {
          return (
            <AudioCard
              key={item.id}
              title={item.title}
              poster={item.poster}
              handleLongPress={handleLongPress}
              handlePress={handlePress}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    width: '100%',
    marginRight: 15,
  },
  itemTitle: {
    color: colors.CONTRAST,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
  poster: {
    height: 100,
    aspectRatio: 1,
    borderRadius: 7,
  },
  dummyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: colors.INACTIVE_CONTRAST,
    marginBottom: 15,
    borderRadius: 5,
  },
})

export default LatestUploads
