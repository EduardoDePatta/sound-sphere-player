import { FC, useEffect, useRef, useState } from 'react'
import { Keyboard, StyleSheet, TextInput, View } from 'react-native'
import AppLink from '../../ui/AppLink'
import AuthFormContainer from '../../components/containers/AuthFormContainer'
import OTPField from '../../ui/OTPField'
import AppButton from '../../ui/AppButton'

const otpFields = new Array(6).fill('')

const Verification: FC = () => {
  const [otp, setOtp] = useState([...otpFields])
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)
  const inputRef = useRef<TextInput>(null)

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
      <AppButton title='Submit' />
      <View style={styles.linkContainer}>
        <AppLink title='Re-send OTP' />
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
  marginBottom: {
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  linkContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'flex-end',
  },
})

export default Verification
