import { FC } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import colors from '../constants/colors'

interface AudioCardProps {
  title: string
  poster?: string
  handlePress: () => void
  handleLongPress: () => void
}

const AudioCard: FC<AudioCardProps> = ({
  title,
  poster,
  handleLongPress,
  handlePress,
}) => {
  const source = poster
    ? { uri: poster }
    : require('../assets/sound-sphere-logo.png')
  return (
    <Pressable
      onPress={handlePress}
      onLongPress={handleLongPress}
      style={styles.itemContainer}
    >
      <Image source={source} style={styles.poster} />
      <Text ellipsizeMode='tail' numberOfLines={2} style={styles.itemTitle}>
        {title}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
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
})

export default AudioCard
