import { FC } from 'react'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import colors from '../constants/colors'

interface AppInputProps extends TextInputProps {}

const AppInput: FC<AppInputProps> = (props) => {
  return (
    <>
      <TextInput
        {...props}
        placeholderTextColor={colors.INACTIVE_CONTRAST}
        style={styles.input}
      />
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    borderRadius: 15,
    paddingLeft: 15,
    color: colors.CONTRAST,
  },
})

export default AppInput
