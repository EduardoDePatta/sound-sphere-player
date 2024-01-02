import { FC } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import colors from '../constants/colors'

interface AvatarFieldProps {
  source?: string
}

const avatarSize = 70

const AvatarField: FC<AvatarFieldProps> = ({ source }) => {
  return (
    <View>
      {source ? (
        <Image style={styles.avatarImage} source={{ uri: source }} />
      ) : (
        <View style={styles.avatarImage}>
          <Entypo name='mic' size={30} color={colors.PRIMARY} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  avatarImage: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.CONTRAST,
  },
})

export default AvatarField
