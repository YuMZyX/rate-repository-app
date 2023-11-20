import { View, Image, StyleSheet, Pressable } from "react-native"
import Text from "./Text"
import { useNavigate } from "react-router-native"
import theme from "../theme"

const repositoryStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 15,
    backgroundColor: theme.backgroundColors.bgWhite,
  },
})
const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 4,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
    marginLeft: 3,
    flexShrink: 1,
  },
})
const infoStyles = StyleSheet.create({
  containerRow: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
    marginTop: 12,
  },
  containerColumn: {
    flexDirection: 'column',
  }
})
const descriptionStyles = StyleSheet.create({
  description: {
    marginTop: 7,
  }
})

const RepositoryItem = ({ repository }) => {
  const {
    id,
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = repository;

  const checkAmount = (amount) => {
    if (amount >= 1000) {
      return (amount / 1000).toFixed(1) + 'k';
    } else {
      return amount;
    }
  }
  const starsChecked = checkAmount(stargazersCount);
  const forksChecked = checkAmount(forksCount);
  const reviewsChecked = checkAmount(reviewCount);

  const navigate = useNavigate();

  const toRepositoryView = () => {
    navigate(`/${id}`)
  }

  return (
    <Pressable onPress={toRepositoryView}>
      <View style={repositoryStyles.container} testID='repositoryItem'>
        <View style={headerStyles.container}>
          <View style={headerStyles.avatarContainer}>
            <Image style={headerStyles.avatar} source={{ uri: ownerAvatarUrl }}></Image>
          </View>
          <View style={headerStyles.infoContainer}>
            <Text fontSize='subheading' fontWeight='bold'>{fullName}</Text>
            <Text style={descriptionStyles.description}>{description}</Text>
            {language && <Text color='white' backgroundColor='primary'>{language}</Text>}
          </View>
        </View>
        <View style={infoStyles.containerRow}>
          <View style={infoStyles.containerColumn}>
            <Text fontWeight='bold' textAlign='center'>{starsChecked}</Text>
            <Text textAlign='center' style={{ marginTop: 4 }}>Stars</Text>
          </View>
          <View style={infoStyles.containerColumn}>
            <Text fontWeight='bold' textAlign='center'>{forksChecked}</Text>
            <Text textAlign='center' style={{ marginTop: 4 }}>Forks</Text>
          </View>
          <View style={infoStyles.containerColumn}>
            <Text fontWeight='bold' textAlign='center'>{reviewsChecked}</Text>
            <Text textAlign='center' style={{ marginTop: 4 }}>Reviews</Text>
          </View>
          <View style={infoStyles.containerColumn}>
            <Text fontWeight='bold' textAlign='center'>{ratingAverage}</Text>
            <Text textAlign='center' style={{ marginTop: 4 }}>Rating</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default RepositoryItem;