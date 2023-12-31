import { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { useFetchUploadsByProfile } from '../../hooks/query'
import AudioListItem from '../../ui/AudioListItem'

interface UploadTabProps {}

const UploadsTab: FC<UploadTabProps> = (props) => {
  const { data } = useFetchUploadsByProfile()

  return (
    <View style={styles.container}>
      {data?.map((audio) => {
        return <AudioListItem audio={audio} />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default UploadsTab
