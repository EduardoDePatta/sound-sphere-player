import { FC } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import colors from '../constants/colors'
import { useNavigation } from '@react-navigation/native'

interface AppHeaderProps {
  title: string
}

const AppHeader: FC<AppHeaderProps> = ({ title }) => {
  const { goBack, canGoBack } = useNavigation()

  if (!canGoBack()) return null

  return (
    <View style={styles.container}>
      <Pressable onPress={goBack}>
        <AntDesign name='arrowleft' size={24} color={colors.CONTRAST} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.PRIMARY,
    height: 45,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 18,
  },
})

export default AppHeader
