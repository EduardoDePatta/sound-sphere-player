import * as yup from 'yup'
import { FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { FormikHelpers } from 'formik'
import AuthInputField from '../../components/form/AuthInputField'
import Form from '../../components/form'
import SubmitButton from '../../components/form/SubmitBtn'
import PasswordVisibilityIcon from '../../ui/PasswordVisibilityIcon'
import AppLink from '../../ui/AppLink'
import AuthFormContainer from '../../components/containers/AuthFormContainer'
import { AuthStackParamList } from '../../@types/navigation'
import client from '../../api/client'
import { Notification } from '../../utils/notification'
import { isAxiosError } from 'axios'
import catchAsyncError from '../../api/catchError'

interface NewUser {
  name: string
  email: string
  password: string
}

const initialValue: NewUser = {
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
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()

  const handleSubmit = async (values: NewUser) => {
    try {
      setLoading(true)
      const { data } = await client.post('/auth/create', { ...values })
      navigation.navigate('Verification', { userInfo: data.user })
      Notification.error('Profile created successfully!')
    } catch (error) {
      const errorMessage = catchAsyncError(error)
      Notification.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      initialValues={initialValue}
      validationSchema={signUpSchema}
      onSubmit={handleSubmit}
    >
      <AuthFormContainer
        heading='Welcome!'
        subHeading="Let's get started by creating your account."
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
          <SubmitButton loading={loading} title='Sign up' />
          <View style={styles.linkContainer}>
            <AppLink
              title='I Lost My Password'
              onPress={() => {
                navigation.navigate('LostPassword')
              }}
            />
            <AppLink
              title='Sign In'
              onPress={() => {
                navigation.navigate('SignIn')
              }}
            />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  )
}

const styles = StyleSheet.create({
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
