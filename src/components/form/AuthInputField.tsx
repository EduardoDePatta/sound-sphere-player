import { FC, ReactNode } from 'react'
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native'
import { useFormikContext } from 'formik'
import AppInput from '../../ui/AppInput'
import colors from '../../constants/colors'

interface AuthInputFieldProps {
  name: string
  label?: string
  placeholder?: string
  keyboardType?: TextInputProps['keyboardType']
  autoCapitalize?: TextInputProps['autoCapitalize']
  secureTextEntry?: TextInputProps['secureTextEntry']
  containerStyle?: StyleProp<ViewStyle>
  rightIcon?: ReactNode
  onRightIconPress?: () => void
}

const AuthInputField: FC<AuthInputFieldProps> = ({
  label,
  name,
  placeholder,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
  containerStyle,
  rightIcon,
  onRightIconPress,
}) => {
  const { handleChange, values, errors, handleBlur, touched } = useFormikContext<{
      [key: string]: string
    }>()

  const errorMessage = touched[name] && errors[name] ? errors[name] : ''

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
      <View>
        <AppInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          onChangeText={handleChange(name)}
          value={values[name]}
          onBlur={handleBlur(name)}
        />
        {rightIcon ? (
          <Pressable onPress={onRightIconPress} style={styles.rightIcon}>
            {rightIcon}
          </Pressable>
        ) : null}
      </View>
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
  rightIcon: {
    width: 45,
    height: 45,
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default AuthInputField
