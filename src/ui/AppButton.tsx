import { FC } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import colors from '../constants/colors'

interface AppButtonProps {
  title: string
  loading?: boolean
  onPress?: () => void
  borderRadius?: number
}

const AppButton: FC<AppButtonProps> = ({
  title,
  onPress,
  loading = false,
  borderRadius,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          borderRadius: borderRadius ?? 15,
        },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      <Spinner
        visible={loading}
        textContent='Loading...'
        textStyle={styles.spinnerTextStyle}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 18,
  },
  spinnerTextStyle: {
    color: colors.CONTRAST,
  },
})

export default AppButton
