import { FC, ReactNode } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import CirclesBackground from '../background/CirclesBackground'
import colors from '../../constants/colors'

interface AuthFormContainerProps {
  heading?: string
  subHeading?: string
  children: ReactNode
}

const AuthFormContainer: FC<AuthFormContainerProps> = ({
  children,
  heading,
  subHeading,
}) => {
  return (
    <View style={styles.container}>
      <CirclesBackground />
      <View style={styles.headerContainer}>
        {/* <Image
          style={{
            width: 170,
            resizeMode: 'contain',
            position: 'absolute',
            top: -300,
          }}
          source={require('../../assets/sound-sphere-logo.png')}
        /> */}
        {/* <Text style={styles.logo}>SoundSphere</Text> */}
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e2838',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  headerContainer: { width: '100%', padding: 5 },
  logo: { color: colors.CONTRAST_2, fontSize: 30, fontWeight: 'bold' },
  heading: { color: colors.CONTRAST, fontSize: 20 },
  subHeading: { color: colors.CONTRAST, fontSize: 14 },
})

export default AuthFormContainer
