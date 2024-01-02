import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../constants/colors'

interface EmptyRecordProps {
  title: string
}

const EmptyRecord: FC<EmptyRecordProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.INACTIVE_CONTRAST,
  },
})

export default EmptyRecord
