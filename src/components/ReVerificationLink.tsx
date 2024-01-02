import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppLink from '../ui/AppLink'
import colors from '../constants/colors'
import { getClient } from '../api/client'
import catchAsyncError from '../api/catchError'
import { Notification } from '../utils/notification'
import { useSelector } from 'react-redux'
import { getAuthState } from '../store/auth'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { ProfileNavigatorStackParamList } from '../@types/navigation'

interface ReVerificationLinkProps {
  time?: number
  activeAtFirst?: boolean
  linkTitle: string
  userId?: string
}

const ReVerificationLink: FC<ReVerificationLinkProps> = ({
  linkTitle,
  activeAtFirst = false,
  time = 60,
  userId,
}) => {
  const [countDown, setCountDown] = useState(time)
  const [canSendOTPRequest, setCanSendOTPRequest] = useState(activeAtFirst)
  const { navigate } =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>()

  const { profile } = useSelector(getAuthState)

  const requestForOTP = async () => {
    setCountDown(60)
    setCanSendOTPRequest(false)
    try {
      const client = await getClient()
      await client.post('/auth/re-verify-email', {
        userId: userId ?? profile?.id,
      })
      navigate('Verification', {
        userInfo: {
          email: profile?.email ?? '',
          name: profile?.name ?? '',
          _id: userId || profile?.id || '',
        },
      })
    } catch (error) {
      const errorMessage = catchAsyncError(error)
      Notification.error(errorMessage)
    }
  }

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
    <View style={styles.container}>
      {countDown > 0 ? (
        <Text style={styles.countDown}>{countDown} sec</Text>
      ) : null}
      <AppLink
        active={canSendOTPRequest}
        title={linkTitle}
        onPress={requestForOTP}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countDown: {
    color: colors.SECONDARY,
    marginRight: 7,
  },
})

export default ReVerificationLink
