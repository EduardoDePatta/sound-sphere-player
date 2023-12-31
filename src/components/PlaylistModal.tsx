import { FC, ReactNode } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import BasicModalContainer from '../ui/BasicModalContainer'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import colors from '../constants/colors'
import { Playlist } from '../@types/playlist'

interface PlaylistModalProps {
  visible: boolean
  onRequestClose: () => void
  playlists: Playlist[]
  onCreateNewPress: () => void
  onPlaylistPress: (playlist: Playlist) => void
}

interface ListItemProps {
  label: string
  icon: ReactNode
  onPress?: () => void
}

const ListItem: FC<ListItemProps> = ({ label, icon, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.listItemContainer}>
      {icon}
      {/* <FontAwesome size={20} color={colors.PRIMARY} name='globe' /> */}
      <Text style={styles.listItemLabel}>{label}</Text>
    </Pressable>
  )
}

const PlaylistModal: FC<PlaylistModalProps> = ({
  onRequestClose,
  visible,
  playlists,
  onCreateNewPress,
  onPlaylistPress,
}) => {
  return (
    <BasicModalContainer visible={visible} onRequestClose={onRequestClose}>
      <ScrollView>
        {playlists?.map((playlist) => {
          return (
            <ListItem
              onPress={() => onPlaylistPress(playlist)}
              label={playlist.title}
              key={playlist.id}
              icon={
                <FontAwesome
                  size={20}
                  color={colors.PRIMARY}
                  name={playlist.visibility === 'public' ? 'globe' : 'lock'}
                />
              }
            />
          )
        })}
      </ScrollView>
      <Pressable
        style={{ flexDirection: 'row', alignItems: 'center', height: 45 }}
      >
        <ListItem
          label='Create New'
          onPress={onCreateNewPress}
          icon={<AntDesign size={20} color={colors.PRIMARY} name='plus' />}
        />
      </Pressable>
    </BasicModalContainer>
  )
}

const styles = StyleSheet.create({
  container: {},
  listItemContainer: { flexDirection: 'row', alignItems: 'center', height: 45 },
  listItemLabel: { fontSize: 16, color: colors.PRIMARY, marginLeft: 5 },
})

export default PlaylistModal
