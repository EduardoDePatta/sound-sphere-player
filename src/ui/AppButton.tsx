import { FC } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import colors from '../constants/colors'
import Spinner from 'react-native-loading-spinner-overlay'

interface AppButtonProps {
  title: string
  loading?: boolean
  onPress?: () => void
}

const AppButton: FC<AppButtonProps> = ({ title, onPress, loading = false }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Spinner
        visible={loading}
        textContent='Loading...'
        textStyle={styles.spinnerTextStyle}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 18,
  },
  spinnerTextStyle: {
    color: colors.CONTRAST,
  },
})

export default AppButton
