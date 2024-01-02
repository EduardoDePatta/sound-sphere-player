import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { FC, useEffect, useRef, useState } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import AppLink from '../../ui/AppLink'
import AuthFormContainer from '../../components/containers/AuthFormContainer'
import OTPField from '../../ui/OTPField'
import AppButton from '../../ui/AppButton'
import {
  AuthStackParamList,
  ProfileNavigatorStackParamList,
} from '../../@types/navigation'
import { getClient } from '../../api/client'
import colors from '../../constants/colors'
import catchAsyncError from '../../api/catchError'
import { Notification } from '../../utils/notification'
import ReVerificationLink from '../../components/ReVerificationLink'

type VerificationProps = NativeStackScreenProps<
  AuthStackParamList | ProfileNavigatorStackParamList,
  'Verification'
>

type PossibleScreens = {
  ProfileSettings: undefined
  SignIn: undefined
}

const otpFields = new Array(6).fill('')

const Verification: FC<VerificationProps> = ({ route }) => {
  const { userInfo } = route.params
  const [otp, setOtp] = useState([...otpFields])
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<TextInput>(null)
  const navigation = useNavigation<NavigationProp<PossibleScreens>>()

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp]

    if (value === 'Backspace') {
      if (!newOtp[index]) setActiveOtpIndex(index - 1)
      newOtp[index] = ''
    } else {
      setActiveOtpIndex(index + 1)
      newOtp[index] = value
    }
    setOtp([...newOtp])
  }

  const handlePaste = (value: string) => {
    if (value.length === 6) {
      Keyboard.dismiss()
      const newOtp = value.split('')
      setOtp([...newOtp])
    }
  }

  const isValidOtp = otp.every((value) => {
    return value.trim()
  })

  const handleSubmit = async () => {
    if (!isValidOtp) return Notification.info('Invalid OTP!')
    try {
      const client = await getClient()
      const { data } = await client.post('/auth/verify-email', {
        userId: userInfo._id,
        token: otp.join(''),
      })
      Notification.success(data.message)
      const { routeNames } = navigation.getState()
      if (routeNames.includes('SignIn')) {
        navigation.navigate('SignIn')
      }
      if (routeNames.includes('ProfileSettings')) {
        navigation.navigate('ProfileSettings')
      }
    } catch (error) {
      const errorMessage = catchAsyncError(error)
      Notification.error(errorMessage)
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOtpIndex])

  return (
    <AuthFormContainer heading='Please look at your email.'>
      <View style={styles.inputContainer}>
        {otpFields.map((_, index) => {
          return (
            <OTPField
              ref={activeOtpIndex === index ? inputRef : null}
              placeholder='*'
              key={index}
              onKeyPress={({ nativeEvent }) => {
                handleChange(nativeEvent.key, index)
              }}
              onChangeText={handlePaste}
              keyboardType='numeric'
              value={otp[index] || ''}
            />
          )
        })}
      </View>
      <AppButton loading={loading} title='Submit' onPress={handleSubmit} />
      <View style={styles.linkContainer}>
        <ReVerificationLink linkTitle='Re-send OTP' userId={userInfo._id} />
      </View>
    </AuthFormContainer>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  linkContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'flex-end',
  },
  countDown: {
    color: colors.SECONDARY,
    marginRight: 7,
  },
})

export default Verification
