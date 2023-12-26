import { FC } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import colors from '../../constants/colors'
import AuthInputField from '../../components/form/AuthInputField'
import * as yup from 'yup'
import Form from '../../components/form'
import SubmitButton from '../../components/form/SubmitBtn'

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
  return (
    <SafeAreaView style={styles.container}>
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
            secureTextEntry
            name='password'
            placeholder='********'
            label='Password'
          />
          <SubmitButton title='Sign up' />
        </View>
      </Form>
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
