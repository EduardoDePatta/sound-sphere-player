import { FC } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useFetchFavorites } from '../../hooks/query'
import AudioListItem from '../../ui/AudioListItem'
import EmptyRecord from '../../ui/EmptyRecord'

interface FavoriteTabProps {}

const FavoriteTab: FC<FavoriteTabProps> = (props) => {
  const { data, isLoading } = useFetchFavorites()
  console.log('🚀 ~ file: FavoriteTab.tsx:9 ~ data:', data)

  if (!data?.length) {
    return <EmptyRecord title='There is no favorited audio' />
  }

  return (
    <ScrollView style={styles.container}>
      {data?.map((audio) => {
        return (
          <AudioListItem key={audio.id} audio={audio} loading={isLoading} />
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default FavoriteTab
