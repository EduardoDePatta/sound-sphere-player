import { FC, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import LatestUploads from '../components/LatestUploads'
import RecommendedAudios from '../components/RecommendedAudios'
import OptionsModal from '../components/OptionsModal'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../constants/colors'
import { AudioData } from '../@types/audio'
import { getClient } from '../api/client'
import { Keys, getFromAsyncStorage } from '../storage/asyncStorage'
import catchAsyncError from '../api/catchError'
import { Notification } from '../utils/notification'
import PlaylistModal from '../components/PlaylistModal'
import PlaylistForm, {
  PlaylistInfo,
} from '../components/form/playlistForm/PlaylistForm'
import { useFetchPlaylist } from '../hooks/query'
import { Playlist } from '../@types/playlist'
interface HomeProps {}

type Options = {
  title: string
  icon: keyof typeof MaterialCommunityIcons.glyphMap
  onPress: () => void
}

const Home: FC<HomeProps> = () => {
  const [showOptions, setShowOptions] = useState(false)
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)
  const [showPlaylistForm, setShowPlaylistForm] = useState(false)
  const [selectedAudio, setSelectedAudio] = useState<AudioData>()

  const { data } = useFetchPlaylist()

  const handleOnFavoritePress = async () => {
    if (!selectedAudio) return
    try {
      const client = await getClient()
      await client.post(`/favorite?audioId=${selectedAudio.id}`)
      Notification.success('Audio successfully added to favorites!')
    } catch (error) {
      const errorMessage = catchAsyncError(error)
      Notification.error(errorMessage)
    } finally {
      setSelectedAudio(undefined)
      setShowOptions(false)
    }
  }

  const handleOnAddToPlaylist = async () => {
    setShowOptions(false)
    setShowPlaylistModal(true)
  }

  const options: Options[] = [
    {
      title: 'add to playlist',
      icon: 'playlist-music',
      onPress: handleOnAddToPlaylist,
    },
    {
      title: 'add to favorite',
      icon: 'cards-heart',
      onPress: handleOnFavoritePress,
    },
  ]

  const handleOnLongPress = (item: AudioData) => {
    setSelectedAudio(item)
    setShowOptions(true)
  }

  const handlePlaylistSubmit = async (value: PlaylistInfo) => {
    if (!value.title.trim()) return
    try {
      const client = await getClient()
      await client.post('/playlist/create', {
        resId: selectedAudio?.id,
        title: value.title,
        visibility: value.private ? 'private' : 'public',
      })
      Notification.success('Playlist created Successfully!')
    } catch (error) {
      const errorMessage = catchAsyncError(error)
      Notification.error(errorMessage)
    } finally {
      setShowPlaylistForm(false)
    }
  }

  const updatePlaylist = async (playlist: Playlist) => {
    try {
      const client = await getClient()
      const { data } = await client.patch('/playlist', {
        id: playlist.id,
        item: selectedAudio?.id,
        title: playlist.title,
        visibility: playlist.visibility,
      })
      setSelectedAudio(undefined)
      setShowPlaylistModal(false)
      Notification.success(`New audio added to ${data.playlist.title}`)
    } catch (error) {
      const errorMessage = catchAsyncError(error)
      Notification.error(errorMessage)
    }
  }

  return (
    <View style={styles.container}>
      <LatestUploads
        onAudioPress={(item) => {
          console.log(item)
        }}
        onAudioLongPress={(item) => handleOnLongPress(item)}
      />
      <RecommendedAudios
        onAudioPress={(item) => {
          console.log(item)
        }}
        onAudioLongPress={(item) => handleOnLongPress(item)}
      />
      <OptionsModal
        visible={showOptions}
        onRequestClose={() => setShowOptions(false)}
        options={options}
        renderitem={(item) => {
          return (
            <Pressable onPress={item.onPress} style={styles.optionContainer}>
              <MaterialCommunityIcons
                size={24}
                color={colors.PRIMARY}
                name={item.icon}
              />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </Pressable>
          )
        }}
      />
      <PlaylistModal
        visible={showPlaylistModal}
        onRequestClose={() => {
          setShowPlaylistModal(false)
        }}
        onCreateNewPress={() => {
          setShowPlaylistModal(false)
          setShowPlaylistForm(true)
        }}
        onPlaylistPress={updatePlaylist}
        playlists={data ?? []}
      />
      <PlaylistForm
        visible={showPlaylistForm}
        onRequestClose={() => {
          setShowPlaylistForm(false)
        }}
        onSubmit={handlePlaylistSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  itemTitle: { color: colors.PRIMARY, fontSize: 16, marginLeft: 5 },
})

export default Home
