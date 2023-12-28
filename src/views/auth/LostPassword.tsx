import { FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as yup from 'yup'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import AuthInputField from '../../components/form/AuthInputField'
import Form from '../../components/form'
import SubmitButton from '../../components/form/SubmitBtn'
import AppLink from '../../ui/AppLink'
import AuthFormContainer from '../../components/containers/AuthFormContainer'
import { AuthStackParamList } from '../../@types/navigation'
import client from '../../api/client'

interface InitialValue {
  email: string
}

const initialValue = {
  email: '',
}

const lostPasswordSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid email!')
    .required('Email is required!'),
})

const LostPassword: FC = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (values: InitialValue) => {
    try {
      setLoading(true)
      console.log(loading)
      client.post('/auth/forget-password', {
        ...values,
      })
      console.log('deu certo?')
    } catch (error) {
      console.log('eeeeeeeeeeerrrorrrr: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      initialValues={initialValue}
      validationSchema={lostPasswordSchema}
      onSubmit={handleSubmit}
    >
      <AuthFormContainer
        heading='Forget Password?'
        subHeading="Oops, did you forget your password? Don't worry, we'll help you get back in."
      >
        <View style={styles.formContainer}>
          <AuthInputField
            keyboardType='email-address'
            placeholder='Enter your email'
            label='Email'
            name='email'
            autoCapitalize='none'
            containerStyle={styles.marginBottom}
          />
          <SubmitButton loading={loading} title='Send Link' />
          <View style={styles.linkContainer}>
            <AppLink
              title='Sign In'
              onPress={() => {
                navigation.navigate('SignIn')
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

export default LostPassword
