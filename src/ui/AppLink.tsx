import { FC } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import colors from '../constants/colors'

interface AppLinkProps {
  title: string
  onPress?: () => void
}

const AppLink: FC<AppLinkProps> = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress}>
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
