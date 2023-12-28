import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { FC, useEffect, useRef, useState } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import AppLink from '../../ui/AppLink'
import AuthFormContainer from '../../components/containers/AuthFormContainer'
import OTPField from '../../ui/OTPField'
import AppButton from '../../ui/AppButton'
import { AuthStackParamList } from '../../@types/navigation'
import client from '../../api/client'
import colors from '../../constants/colors'

type VerificationProps = NativeStackScreenProps<
  AuthStackParamList,
  'Verification'
>

const otpFields = new Array(6).fill('')

const Verification: FC<VerificationProps> = ({ route }) => {
  const { userInfo } = route.params
  const [otp, setOtp] = useState([...otpFields])
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [countDown, setCountDown] = useState(60)
  const [canSendOTPRequest, setCanSendOTPRequest] = useState(false)
  const inputRef = useRef<TextInput>(null)
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()

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

  const requestForOTP = async () => {
    setCountDown(60)
    setCanSendOTPRequest(false)
    try {
      setLoading(true)
      await client.post('/auth/re-verify-email', { userId: userInfo._id })
    } catch (error) {
      console.log('error verif bla bla: ', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!isValidOtp) return
    try {
      const { data } = await client.post('/auth/verify-email', {
        userId: userInfo._id,
        token: otp.join(''),
      })
      navigation.navigate('SignIn')
    } catch (error) {
      console.log('verification error: ', error)
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOtpIndex])

  useEffect(() => {
    if (canSendOTPRequest) return
    const intervalId = setInterval(() => {
      setCountDown((oldCountDown) => {
        if (oldCountDown <= 0) {
          setCanSendOTPRequest(true)
          clearInterval(intervalId)
          return 0
        }
        return oldCountDown - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [canSendOTPRequest])

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
        {countDown > 0 ? (
          <Text style={styles.countDown}>{countDown} sec</Text>
        ) : null}
        <AppLink
          active={canSendOTPRequest}
          title='Re-send OTP'
          onPress={requestForOTP}
        />
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
    flexDirection: 'row',
  },
  countDown: {
    color: colors.SECONDARY,
    marginRight: 7,
  },
})

export default Verification
