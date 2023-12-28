import { FC, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import AuthInputField from '../../components/form/AuthInputField'
import * as yup from 'yup'
import Form from '../../components/form'
import SubmitButton from '../../components/form/SubmitBtn'
import PasswordVisibilityIcon from '../../ui/PasswordVisibilityIcon'
import AppLink from '../../ui/AppLink'
import CirclesBackground from '../../components/background/CirclesBackground'

const initialValue = {
  name: '',
  email: '',
  password: '',
}

const signUpSchema = yup.object({
  name: yup
    .string()
    .trim('Name is missing!')
    .min(3, 'Invalid name!')
    .required('Name is required!'),
  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid email!')
    .required('Email is required!'),
  password: yup
    .string()
    .trim('Password is missing!')
    .min(8, 'Password is too short!')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      'Password is too simple!'
    )
    .required('Email is required!'),
})

const SignUp: FC = () => {
  const [secureEntry, setSecureEntry] = useState(true)

  return (
    <SafeAreaView style={styles.container}>
      <CirclesBackground />
      <Form
        initialValues={initialValue}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        <View style={styles.formContainer}>
          <AuthInputField
            placeholder='Enter your name'
            label='Name'
            name='name'
            containerStyle={styles.marginBottom}
          />
          <AuthInputField
            keyboardType='email-address'
            placeholder='Enter your email'
            label='Email'
            name='email'
            autoCapitalize='none'
            containerStyle={styles.marginBottom}
          />
          <AuthInputField
            autoCapitalize='none'
            secureTextEntry={secureEntry}
            name='password'
            placeholder='********'
            label='Password'
            containerStyle={styles.marginBottom}
            rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
            onRightIconPress={() => setSecureEntry(!secureEntry)}
          />
          <SubmitButton title='Sign up' />
          <View style={styles.linkContainer}>
            <AppLink title='I Lost My Password' />
            <AppLink title='Sign In' />
          </View>
        </View>
      </Form>
    </SafeAreaView>
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
  marginBottom: {
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
})

export default SignUp
