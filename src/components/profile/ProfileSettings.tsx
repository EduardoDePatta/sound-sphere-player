import { FC, useEffect, useState } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  PermissionsAndroid,
} from 'react-native'
import AppHeader from '../AppHeader'
import colors from '../../constants/colors'
import AvatarField from '../../ui/AvatarField'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import AppButton from '../../ui/AppButton'
import { getClient } from '../../api/client'
import catchAsyncError from '../../api/catchError'
import { Notification } from '../../utils/notification'
import { Keys, removeFromAsyncStorage } from '../../storage/asyncStorage'
import { useDispatch, useSelector } from 'react-redux'
import deepEqual from 'deep-equal'
import {
  getAuthState,
  updateLoggedInState,
  updateProfile,
} from '../../store/auth'
import * as ImagePicker from 'expo-image-picker'
import { getPermissionToReadImages } from '../../utils/helper'
import ReVerificationLink from '../ReVerificationLink'

interface ProfileSettingsProps {}

interface ProfileInfo {
  name: string
  avatar?: string
}

const ProfileSettings: FC<ProfileSettingsProps> = () => {
  const [userInfo, setUserInfo] = useState<ProfileInfo>({ name: '' })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { profile } = useSelector(getAuthState)

  const equal = deepEqual(userInfo, {
    name: profile?.name,
    avatar: profile?.avatar,
  })

  const handleLogout = async (fromAll?: boolean) => {
    try {
      setLoading(true)
      const endpoint = '/auth/log-out?fromAll=' + (fromAll ? 'yes' : '')
      const client = await getClient()
      await client.post(endpoint)
      await removeFromAsyncStorage(Keys.AUTH_TOKEN)
      dispatch(updateProfile(null))
      dispatch(updateLoggedInState(false))
    } catch (error) {
      const errorMessage = catchAsyncError(error)
      Notification.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      if (!userInfo.name.trim()) {
        return Notification.error('Profile name is required!')
      }
      const formData = new FormData()
      formData.append('name', userInfo.name)
      if (userInfo.avatar) {
        formData.append('avatar', {
          name: 'avatar',
          type: 'image/jpeg',
          uri: userInfo.avatar,
        } as any)
      }
      const client = await getClient({ 'Content-Type': 'multipart/form-data;' })
      const { data } = await client.post('/auth/update-profile', formData)
      dispatch(updateProfile(data.profile))
      Notification.success('Profile updated successfully!')
    } catch (error) {
      const errorMessage = catchAsyncError(error)
      Notification.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleImageSelect = async () => {
    try {
      await getPermissionToReadImages()
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
      if (!result.canceled) {
        setUserInfo({ ...userInfo, avatar: result.assets[0].uri })
      }
    } catch (error) {
      const errorMessage = catchAsyncError(error)
      Notification.error(errorMessage)
    }
  }

  useEffect(() => {
    if (profile) {
      setUserInfo({
        name: profile.name,
        avatar: profile.avatar,
      })
    }
  }, [profile])

  return (
    <View style={styles.container}>
      <AppHeader title='Settings' />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile Settings</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
        <View style={styles.avatarContainer}>
          <AvatarField source={userInfo.avatar} />
          <Pressable onPress={handleImageSelect} style={styles.paddingLeft}>
            <Text style={styles.linkText}>Update Profile Image</Text>
          </Pressable>
        </View>
        <TextInput
          onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
          style={styles.nameInput}
          value={userInfo.name}
        />
        <View style={styles.emailContainer}>
          <Text style={styles.email}>{profile?.email}</Text>
          {profile?.verified ? (
            <MaterialIcons name='verified' size={15} color={colors.SECONDARY} />
          ) : (
            <ReVerificationLink linkTitle='verify' activeAtFirst />
          )}
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Logout</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
        <Pressable
          onPress={() => handleLogout(true)}
          style={styles.logoutButton}
        >
          <AntDesign size={16} color={colors.CONTRAST} name='logout' />
          <Text style={styles.logoutButtonTitle}>Logout From All</Text>
        </Pressable>
        <Pressable onPress={() => handleLogout()} style={styles.logoutButton}>
          <AntDesign size={16} color={colors.CONTRAST} name='logout' />
          <Text style={styles.logoutButtonTitle}>Logout</Text>
        </Pressable>
      </View>

      {!equal ? (
        <View style={styles.marginTop}>
          <AppButton
            onPress={handleSubmit}
            loading={loading}
            borderRadius={7}
            title='Update'
          />
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.CONTRAST_2,
    paddingBottom: 5,
    marginTop: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.CONTRAST_2,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: colors.CONTRAST_2,
    fontStyle: 'italic',
  },
  settingOptionsContainer: {
    marginTop: 15,
    paddingLeft: 15,
  },
  paddingLeft: {
    paddingLeft: 15,
  },
  nameInput: {
    color: colors.CONTRAST,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.CONTRAST_2,
    borderRadius: 7,
    marginTop: 15,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
  },
  email: {
    color: colors.CONTRAST,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
  },
  logoutButtonTitle: {
    color: colors.CONTRAST,
    fontSize: 18,
  },
  marginTop: {
    marginTop: 15,
  },
})

export default ProfileSettings
