import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';
import theme from '../theme';
import SingleRepository from './SingleRepository';
import ReviewForm from './ReviewForm';
import SignUpForm from './SignUpForm';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.backgroundColors.bgMain,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/review' element={<ReviewForm />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/myreviews' element={<MyReviews />} />
        <Route path='/:repositoryId' element={<SingleRepository />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;