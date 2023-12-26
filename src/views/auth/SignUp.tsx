import { FC, useState } from 'react'
import { Button, SafeAreaView, StyleSheet, View } from 'react-native'
import colors from '../../constants/colors'
import AuthInputField from '../../components/AuthInputField'

const SignUp: FC = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <AuthInputField
          placeholder='Enter your name'
          label='Name'
          containerStyle={styles.marginBottom}
          onChangeText={(name) => setUserInfo({ ...userInfo, name })}
        />
        <AuthInputField
          keyboardType='email-address'
          placeholder='Enter your email'
          label='Email'
          autoCapitalize='none'
          containerStyle={styles.marginBottom}
          onChangeText={(email) => setUserInfo({ ...userInfo, email })}
        />
        <AuthInputField
          autoCapitalize='none'
          secureTextEntry
          placeholder='********'
          label='Password'
          onChangeText={(password) => setUserInfo({ ...userInfo, password })}
          containerStyle={styles.marginBottom}
        />
        <Button
          title='Sign up'
          onPress={() => {
            console.log(userInfo)
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  marginBottom: {
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
})

export default SignUp
