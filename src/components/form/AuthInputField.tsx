import { FC, useEffect } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native'
import AppInput from '../../ui/AppInput'
import colors from '../../constants/colors'
import { useFormikContext } from 'formik'

interface AuthInputFieldProps {
  name: string
  label?: string
  placeholder?: string
  keyboardType?: TextInputProps['keyboardType']
  autoCapitalize?: TextInputProps['autoCapitalize']
  secureTextEntry?: TextInputProps['secureTextEntry']
  containerStyle?: StyleProp<ViewStyle>
}

const AuthInputField: FC<AuthInputFieldProps> = (props) => {
  const { handleChange, values, errors, handleBlur, touched } =
    useFormikContext<{
      [key: string]: string
    }>()

  const {
    label,
    name,
    placeholder,
    keyboardType,
    autoCapitalize,
    secureTextEntry,
    containerStyle,
  } = props

  const errorMessage = touched[name] && errors[name] ? errors[name] : ''

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
      <AppInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        onChangeText={handleChange(name)}
        value={values[name]}
        onBlur={handleBlur(name)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  label: {
    color: colors.CONTRAST,
  },
  errorMessage: {
    color: colors.ERROR,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
})

export default AuthInputField
