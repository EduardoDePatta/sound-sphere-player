import { FC } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useFetchPlaylist } from '../../hooks/query'
import PlaylistItem from '../../ui/PlaylistItem'

interface PlaylistTabProps {}

const PlaylistTab: FC<PlaylistTabProps> = (props) => {
  const { data, isLoading } = useFetchPlaylist()
  return (
    <ScrollView style={styles.container}>
      {data?.map((playlist) => {
        return <PlaylistItem playlist={playlist} key={playlist.id} />
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default PlaylistTab
