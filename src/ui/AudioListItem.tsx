import { FC } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text } from 'react-native'
import colors from '../constants/colors'
import { AudioData } from '../@types/audio'

interface AudioListItemProps {
  audio: AudioData
  onPress?: () => void
}

const AudioListItem: FC<AudioListItemProps> = ({ audio, onPress }) => {
  const getSource = (poster?: string) => {
    return poster ? { uri: poster } : require('../assets/music_small.png')
  }
  return (
    <Pressable onPress={onPress} style={styles.listItem}>
      <Image style={styles.poster} source={getSource(audio.poster)} />
      <ScrollView style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>
          {audio.title}
        </Text>
        <Text style={styles.owner} numberOfLines={1} ellipsizeMode='tail'>
          {audio.owner.name}
        </Text>
      </ScrollView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    backgroundColor: colors.OVERLAY,
    marginBottom: 15,
    borderRadius: 5,
  },
  titleContainer: {
    flex: 1,
    padding: 5,
  },
  poster: {
    width: 50,
    height: 50,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: '700',
  },
  owner: {
    color: colors.CONTRAST_2,
    fontWeight: '700',
  },
})

export default AudioListItem
