import { FC } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Playlist } from '../@types/playlist'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import colors from '../constants/colors'

interface PlaylistItemProps {
  playlist: Playlist
  onPress?: () => void
}

const PlaylistItem: FC<PlaylistItemProps> = ({ playlist, onPress }) => {
  const { id, itemsCount, title, visibility } = playlist

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.posterContainer}>
        <MaterialCommunityIcons
          name='playlist-music'
          size={30}
          color={colors.CONTRAST}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>
          {title}
        </Text>
        <View style={styles.iconContainer}>
          <FontAwesome
            name={visibility === 'public' ? 'globe' : 'lock'}
            color={colors.SECONDARY}
            size={15}
          />
          <Text style={styles.count}>
            {itemsCount} {itemsCount > 1 ? 'audios' : 'audio'}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: colors.OVERLAY,
    marginBottom: 15,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  posterContainer: {
    backgroundColor: colors.OVERLAY,
    height: 50,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: colors.CONTRAST,
    fontWeight: 'bold',
  },
  count: {
    color: colors.SECONDARY,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    paddingtop: 4,
  },
})

export default PlaylistItem
