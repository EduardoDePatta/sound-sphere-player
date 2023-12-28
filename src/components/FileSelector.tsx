import { FC, ReactNode } from 'react'
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import colors from '../constants/colors'

interface FileSelectorProps {
  icon: ReactNode
  buttonTitle?: string
  style?: StyleProp<ViewStyle>
}

const FileSelector: FC<FileSelectorProps> = ({ icon, buttonTitle, style }) => {
  return (
    <Pressable style={[styles.buttonContainer, style]}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.buttonTitle}>{buttonTitle}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 70,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: colors.CONTRAST_2,
    marginTop: 5,
  },
})

export default FileSelector
