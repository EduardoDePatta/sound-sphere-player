import { FC } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import colors from '../constants/colors'

interface AppLinkProps {
  title: string
  onPress?: () => void
  active?: boolean
}

const AppLink: FC<AppLinkProps> = ({ title, onPress, active = true }) => {
  return (
    <Pressable
      onPress={active ? onPress : null}
      style={{ opacity: active ? 1 : 0 }}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  title: {
    color: colors.CONTRAST_2,
  },
})

export default AppLink
