import { FC, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import BasicModalContainer from '../../../ui/BasicModalContainer'
import colors from '../../../constants/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export interface PlaylistInfo {
  title: string
  private: boolean
}

interface PlaylistFormProps {
  visible: boolean
  onRequestClose: () => void
  onSubmit: (value: PlaylistInfo) => void
}

const PlaylistForm: FC<PlaylistFormProps> = ({
  onRequestClose,
  visible,
  onSubmit,
}) => {
  const [playlistInfo, setPlaylistInfo] = useState({
    title: '',
    private: false,
  })

  const handleSubmit = () => {
    onSubmit(playlistInfo)
    handleClose()
  }

  const handleClose = () => {
    setPlaylistInfo({ title: '', private: false })
    onRequestClose()
  }

  return (
    <BasicModalContainer onRequestClose={onRequestClose} visible={visible}>
      <View>
        <Text style={styles.title}>Create New Playlist</Text>
        <TextInput
          onChangeText={(text) =>
            setPlaylistInfo({ ...playlistInfo, title: text })
          }
          placeholder='Title'
          style={styles.input}
          value={playlistInfo.title}
        />

        <Pressable onPress={handleSubmit} style={styles.privateSelector}>
          {playlistInfo.private ? (
            <MaterialCommunityIcons
              name='radiobox-marked'
              color={colors.PRIMARY}
            />
          ) : (
            <MaterialCommunityIcons
              name='radiobox-blank'
              color={colors.PRIMARY}
            />
          )}
          <Text style={styles.privateLabel}>Private</Text>
        </Pressable>

        <Pressable
          onPress={() => onSubmit(playlistInfo)}
          style={styles.submitButton}
        >
          <Text>Create</Text>
        </Pressable>
      </View>
    </BasicModalContainer>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: colors.PRIMARY,
    fontWeight: '700',
  },
  input: {
    height: 45,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    color: colors.PRIMARY,
  },
  privateSelector: {
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
  },
  privateLabel: {
    color: colors.PRIMARY,
    marginLeft: 5,
  },
  submitButton: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    borderRadius: 7,
  },
})

export default PlaylistForm
