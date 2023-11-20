import Button from './Button'
import theme from "../theme";
import * as Linking from 'expo-linking';
import RepositoryItem from './RepositoryItem';
import { View, StyleSheet } from "react-native";

const RepositoryInfo = ({ repository }) => {
  
  const openURL = () => {
    Linking.openURL(repository.url);
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColors.bgWhite,
      padding: 15,
      marginBottom: 10,
    },
  })

  return (
    <View>
      <RepositoryItem repository={repository} button={true} />
      <View style={styles.container}>
        <Button onPress={openURL}>Open in GitHub</Button>
      </View>
    </View>
  )
};

export default RepositoryInfo