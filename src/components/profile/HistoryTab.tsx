import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface HistoryTabProps {}

const HistoryTab: FC<HistoryTabProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>HistoryTab</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default HistoryTab
