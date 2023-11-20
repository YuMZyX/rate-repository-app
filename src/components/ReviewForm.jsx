import { View, StyleSheet, Pressable } from 'react-native'
import FormikTextInput from './FormikTextInput'
import { Formik } from 'formik'
import * as yup from 'yup'
import theme from '../theme'
import Text from './Text'
import { useNavigate } from "react-router-dom";
import useCreateReview from '../hooks/useCreateReview'

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
  ownerName: yup
    .string().required('Repository owner name is required'),
  repositoryName: yup
    .string().required('Repository name is required'),
  rating: yup
    .number().required('Rating is required').min(0).max(100),
  text: yup
    .string().optional()
})

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const review = await createReview({ ownerName, rating, repositoryName, text })
      const repositoryId = review.createReview.repositoryId
      navigate(`/${repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Formik initialValues={{ ownerName: '', repositoryName: '', rating: '', text: '' }} 
      onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => (
      <View style={styles.container}>
        <FormikTextInput style={styles.input} name='ownerName' 
          placeholder='Repository owner name' placeholderTextColor='grey' />
        <FormikTextInput style={styles.input} name='repositoryName' 
          placeholder='Repository name' placeholderTextColor='grey' />
        <FormikTextInput style={styles.input} name='rating' 
          placeholder='Rating between 0 and 100' placeholderTextColor='grey' />
        <FormikTextInput style={styles.multilineInput} name='text' multiline
          numberOfLines={4} placeholder={'Review'} placeholderTextColor='grey' />
        <Pressable onPress={handleSubmit} >
          <Text color='white' style={styles.button}
            fontWeight='bold' fontSize='subheading'>Create a review</Text>
        </Pressable>
      </View>)}
    </Formik>
  )
};

export default ReviewForm