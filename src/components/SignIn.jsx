import { View, StyleSheet, Pressable } from 'react-native'
import FormikTextInput from './FormikTextInput'
import { Formik } from 'formik'
import * as yup from 'yup'
import theme from '../theme'
import Text from './Text'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: theme.backgroundColors.bgWhite,
  },
  input: {
    padding: 15,
    borderRadius: 10 / 2,
    marginTop: 15,
    height: 55,
  },
  signIn: {
    backgroundColor: theme.backgroundColors.bgPrimary,
    borderRadius: 10 / 2,
    marginTop: 15,
    marginBottom: 15,
    height: 55,
    textAlign: 'center',
    textAlignVertical: 'center',
  }
})

const validationSchema = yup.object().shape({
  username: yup
    .string().required('Username is required'),
  password: yup
    .string().required('Password is required'),
})

export const SignInContainer = ({ onSubmit, error }) => {
  return (
    <Formik initialValues={{ username: '', password: ''}} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => (
      <View style={styles.container}>
        <FormikTextInput style={styles.input} name='username' 
          placeholder='Username' placeholderTextColor='grey' />
        <FormikTextInput style={styles.input} name='password' placeholder='Password' 
          secureTextEntry placeholderTextColor='grey' />
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <Pressable onPress={handleSubmit} >
          <Text color='white' style={styles.signIn}
            fontWeight='bold' fontSize='subheading'>Sign in</Text>
        </Pressable>
      </View>)}
    </Formik>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
      setError("Invalid username or password")
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  return (
    <SignInContainer onSubmit={onSubmit} error={error} />
  )
};

export default SignIn