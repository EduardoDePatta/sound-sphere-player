import { FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import AuthInputField from '../../components/form/AuthInputField'
import * as yup from 'yup'
import Form from '../../components/form'
import SubmitButton from '../../components/form/SubmitBtn'
import PasswordVisibilityIcon from '../../ui/PasswordVisibilityIcon'
import AppLink from '../../ui/AppLink'
import AuthFormContainer from '../../components/containers/AuthFormContainer'

const initialValue = {
  email: '',
  password: '',
}

const signUpSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid email!')
    .required('Email is required!'),
  password: yup
    .string()
    .trim('Password is missing!')
    .min(8, 'Password is too short!')
    .required('Email is required!'),
})

const SignIn: FC = () => {
  const [secureEntry, setSecureEntry] = useState(true)

  return (
    <Form
      initialValues={initialValue}
      validationSchema={signUpSchema}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      <AuthFormContainer heading='Welcome back!'>
        <View style={styles.formContainer}>
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
          <SubmitButton title='Sign In' />
          <View style={styles.linkContainer}>
            <AppLink title='I Lost My Password' />
            <AppLink title='Sign Up' />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
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

export default SignIn
