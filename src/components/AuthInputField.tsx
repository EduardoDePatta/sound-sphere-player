import { FC } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native'
import AppInput from '../ui/AppInput'
import colors from '../constants/colors'

interface AuthInputFieldProps {
  label?: string
  placeholder?: string
  keyboardType?: TextInputProps['keyboardType']
  autoCapitalize?: TextInputProps['autoCapitalize']
  secureTextEntry?: TextInputProps['secureTextEntry']
  containerStyle?: StyleProp<ViewStyle>
  onChangeText?: (text: string) => void
}

const AuthInputField: FC<AuthInputFieldProps> = (props) => {
  const {
    label,
    placeholder,
    keyboardType,
    autoCapitalize,
    secureTextEntry,
    containerStyle,
    onChangeText,
  } = props

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <AppInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  label: {
    color: colors.CONTRAST,
    paddingLeft: 10,
    marginBottom: 5,
  },
})

export default AuthInputField
