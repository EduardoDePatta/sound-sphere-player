import { FC } from 'react'
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import colors from '../constants/colors'
import { AudioData } from '../@types/audio'
import { Skeleton } from 'moti/skeleton'

interface AudioListItemProps {
  audio: AudioData
  onPress?: () => void
  loading: boolean
}

const SkeletonCommonProps = {
  colorMode: 'light',
  transition: {
    type: 'timing',
    duration: 2000,
  },
  backgroundColor: colors.OVERLAY,
} as const

const AudioListItem: FC<AudioListItemProps> = ({ audio, onPress, loading }) => {
  const getSource = (poster?: string) => {
    return poster ? { uri: poster } : require('../assets/music_small.png')
  }
  return (
    <>
      <Pressable onPress={onPress} style={styles.listItem}>
        <Skeleton
          show={loading}
          height={50}
          width={50}
          radius={5}
          {...SkeletonCommonProps}
        >
          <Image style={styles.poster} source={getSource(audio.poster)} />
        </Skeleton>
        <ScrollView style={styles.titleContainer}>
          <View>
            <Skeleton show={loading} height={20} {...SkeletonCommonProps}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>
                {audio.title}
              </Text>
            </Skeleton>
            <Skeleton show={loading} height={20} {...SkeletonCommonProps}>
              <Text style={styles.owner} numberOfLines={1} ellipsizeMode='tail'>
                {audio.owner.name}
              </Text>
            </Skeleton>
          </View>
        </ScrollView>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 5,
    gap: 10,
  },
  titleContainer: {
    flex: 1,
    padding: 5,
    backgroundColor: colors.OVERLAY,
    borderRadius: 5,
  },
  poster: {
    width: 50,
    height: 50,
    borderRadius: 5,
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
