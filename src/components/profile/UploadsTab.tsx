import { FC } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useFetchUploadsByProfile } from '../../hooks/query'
import AudioListItem from '../../ui/AudioListItem'
import EmptyRecord from '../../ui/EmptyRecord'

interface UploadTabProps {}

const UploadsTab: FC<UploadTabProps> = () => {
  const { data, isLoading } = useFetchUploadsByProfile()

  if (!data?.length) {
    return <EmptyRecord title='there is no audio' />
  }

  return (
    <>
      <ScrollView style={styles.container}>
        {data?.map((audio) => {
          return (
            <AudioListItem key={audio.id} audio={audio} loading={isLoading} />
          )
        })}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default UploadsTab
