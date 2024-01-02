import { FC } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { UserProfile } from '../../store/auth'
import AvatarField from '../../ui/AvatarField'
import colors from '../../constants/colors'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { ProfileNavigatorStackParamList } from '../../@types/navigation'

interface ProfileContainerProps {
  profile?: UserProfile | null
}

const ProfileContainer: FC<ProfileContainerProps> = ({ profile }) => {
  const { navigate } =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>()

  if (!profile) return null

  return (
    <View style={styles.container}>
      <AvatarField source={profile.avatar} />
      <View style={styles.profileInfoContainer}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <View style={styles.flexRow}>
          <Text style={styles.email}>{profile.email}</Text>
          <MaterialIcons name='verified' size={15} color={colors.SECONDARY} />
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.profileActionLink}>
            {profile.followers} Followers
          </Text>
          <Text style={styles.profileActionLink}>
            {profile.followings} Followings
          </Text>
        </View>
      </View>
      <Pressable
        onPress={() => navigate('ProfileSettings')}
        style={styles.settingsButton}
      >
        <AntDesign name='setting' size={22} color={colors.CONTRAST} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfoContainer: {
    paddingLeft: 10,
  },
  profileName: {
    color: colors.CONTRAST,
    fontSize: 18,
    fontWeight: '700',
  },
  email: {
    color: colors.CONTRAST,
    marginRight: 5,
  },
  profileActionLink: {
    backgroundColor: colors.SECONDARY,
    color: colors.PRIMARY,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 5,
  },
  settingsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ProfileContainer
