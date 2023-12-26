import { FC } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import colors from '../constants/colors'

interface AppButtonProps {
  title: string
  onPress?: () => void
}

const AppButton: FC<AppButtonProps> = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
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
})

export default AppButton
