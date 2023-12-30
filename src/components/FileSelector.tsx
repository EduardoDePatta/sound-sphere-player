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
import * as DocumentPicker from 'expo-document-picker'
import { Notification } from '../utils/notification'

interface FileSelectorProps {
  icon: ReactNode
  buttonTitle?: string
  style?: StyleProp<ViewStyle>
  onSelect: (file?: DocumentPicker.DocumentPickerAsset) => void
  documentOptions: DocumentPicker.DocumentPickerOptions | undefined
}

const FileSelector: FC<FileSelectorProps> = ({
  icon,
  buttonTitle,
  style,
  onSelect,
  documentOptions,
}) => {
  const handleSelectDocument = async () => {
    try {
      const { assets } = await DocumentPicker.getDocumentAsync(documentOptions)
      if (assets) {
        onSelect(assets[0])
      } else {
        throw new Error()
      }
    } catch (error) {
      if (!(await DocumentPicker.getDocumentAsync()).canceled) {
        Notification.error(error as string)
      }
    }
  }
  return (
    <Pressable
      onPress={handleSelectDocument}
      style={[styles.buttonContainer, style]}
    >
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
