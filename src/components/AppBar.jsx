import { View, StyleSheet, ScrollView } from 'react-native'
import { Link } from 'react-router-native'
import { useQuery, useApolloClient } from "@apollo/client"
import { ME } from './graphql/queries'
import useAuthStorage from '../hooks/useAuthStorage'
import Constants from 'expo-constants'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgroundColors.bgAppBar,
  },
  scrollView: {
    flexDirection: 'row'
  },
  tabs: {
    paddingTop: 15,
    paddingLeft: 20,
    paddingBottom: 15,
    paddingRight: 20,
  },
  fontColor: {
    color: 'white'
  },
  tabsFlex: {
    flexDirection: 'row'
  },
  user: {
    color: theme.colors.primary,
    paddingLeft: 20
  }
})

const AppBar = () => {
  const user = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  if (user.loading) {
    return null
  }

  return (
    <View style={styles.container}>
      {user.data.me && <Text style={styles.user}>{user.data.me.username} signed in</Text>}
      <ScrollView style={styles.scrollView} horizontal>
        <Link style={styles.tabs} to='/'>
          <Text fontSize='subheading' fontWeight='bold' style={styles.fontColor}>Repositories</Text>
        </Link>
        {user.data.me
        ?
        <View style={styles.tabsFlex}>
          <Link style={styles.tabs} to='/review'>
            <Text fontSize='subheading' fontWeight='bold' style={styles.fontColor}>Create a review</Text>
          </Link>
          <Link style={styles.tabs} to='/myreviews'>
            <Text fontSize='subheading' fontWeight='bold' style={styles.fontColor}>My reviews</Text>
          </Link>
          <Link style={styles.tabs} onPress={logout} to='/login'>
            <Text fontSize='subheading' fontWeight='bold' style={styles.fontColor}>Sign out</Text>
          </Link>
        </View>
        :
        <View style={styles.tabsFlex}>
          <Link style={styles.tabs} to='/login'>
            <Text fontSize='subheading' fontWeight='bold' style={styles.fontColor}>Sign in</Text>
          </Link>
          <Link style={styles.tabs} to='/signup'>
            <Text fontSize='subheading' fontWeight='bold' style={styles.fontColor}>Sign up</Text>
          </Link>
        </View>
        }
      </ScrollView>
    </View>
  )
}

export default AppBar