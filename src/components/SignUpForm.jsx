import { View, StyleSheet, Pressable } from 'react-native'
import FormikTextInput from './FormikTextInput'
import { Formik } from 'formik'
import * as yup from 'yup'
import theme from '../theme'
import Text from './Text'
import { useNavigate } from "react-router-dom";
import useSignIn from '../hooks/useSignIn'
import useSignUp from '../hooks/useSignUp'

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
  multilineInput: {
    padding: 15,
    borderRadius: 10 / 2,
    marginTop: 15,
    textAlignVertical: 'top',
  },
  button: {
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
    .string().min(4).max(20).required('Username is required'),
  password: yup
    .string().min(6).max(20).required('Password is required'),
  passwordCheck: yup
    .string().oneOf([yup.ref('password'), 'passwords do not match']).required('Password confirmation is required'),
})

const SignUpForm = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const user = await signUp({ username, password })
      if (user.createUser.username) {
        await signIn({ username, password });
      }
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Formik initialValues={{ username: '', password: '', passwordCheck: '' }} 
      onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => (
      <View style={styles.container}>
        <FormikTextInput style={styles.input} name='username' 
          placeholder='Username' placeholderTextColor='grey' />
        <FormikTextInput style={styles.input} name='password' secureTextEntry
          placeholder='Password' placeholderTextColor='grey' />
        <FormikTextInput style={styles.input} name='passwordCheck' secureTextEntry
          placeholder='Password confirmation' placeholderTextColor='grey' />
        <Pressable onPress={handleSubmit} >
          <Text color='white' style={styles.button}
            fontWeight='bold' fontSize='subheading'>Sign up</Text>
        </Pressable>
      </View>)}
    </Formik>
  )
};

export default SignUpForm