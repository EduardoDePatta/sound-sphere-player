import { FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import AuthInputField from '../../components/form/AuthInputField'
import * as yup from 'yup'
import Form from '../../components/form'
import SubmitButton from '../../components/form/SubmitBtn'
import PasswordVisibilityIcon from '../../ui/PasswordVisibilityIcon'
import AppLink from '../../ui/AppLink'
import AuthFormContainer from '../../components/containers/AuthFormContainer'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AuthStackParamList } from '../../@types/navigation'
import { FormikHelpers } from 'formik'
import client from '../../api/client'

interface SignInUserInfo {
  email: string
  password: string
}

const initialValue = {
  email: '',
  password: '',
}

const signInSchema = yup.object({
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
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()

  const handleSubmit = async (
    values: SignInUserInfo,
    actions: FormikHelpers<SignInUserInfo>
  ) => {
    try {
      setLoading(true)
      const { data } = await client.post('/auth/sign-in', { ...values })
    } catch (error) {
      console.log('bla bla: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      initialValues={initialValue}
      validationSchema={signInSchema}
      onSubmit={handleSubmit}
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
          <SubmitButton loading={loading} title='Sign In' />
          <View style={styles.linkContainer}>
            <AppLink
              title='I Lost My Password'
              onPress={() => {
                navigation.navigate('LostPassword')
              }}
            />
            <AppLink
              title='Sign Up'
              onPress={() => {
                navigation.navigate('SignUp')
              }}
            />
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
