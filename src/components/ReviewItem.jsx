import Text from "./Text";
import theme from "../theme";
import { View, StyleSheet, Alert } from "react-native";
import { format, parseISO } from 'date-fns'
import Button from "./Button";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "./graphql/queries";
import { useMutation } from "@apollo/client";

const ReviewItem = ({ review, myReview, refetch }) => {
  const {
    id,
    text,
    rating,
    createdAt,
    user,
    repository
  } = review

  const [mutate, result] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();

  const formattedCreatedAt = format(parseISO(createdAt), 'dd.MM.yyy')

  const deleteAlert = () => 
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'CANCEL',
        style: 'cancel',
      },
      {text: 'DELETE', onPress:() => deleteReview(id)},
    ]);

  const deleteReview = async (deleteReviewId) => {
    mutate({ variables: { deleteReviewId } })
    if (!result.loading) {
      refetch();
    }
  }

  const itemStyles = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColors.bgWhite,
      padding: 15,
      flex: 1
    },
  })
  const reviewStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'stretch',
    },
    rating: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      justifyContent: 'center',
    },
    infoContainer: {
      flexGrow: 1,
      paddingLeft: 15,
      paddingRight: 50,
    },
    creationDate: {
      marginTop: 2,
      marginBottom: 8,
    }
  })
  const buttonsStyles = StyleSheet.create({
    container: {
      flex: 2,
      paddingTop: 15,
      paddingLeft: 5,
      paddingRight: 5
    },
    row: {
      flexDirection: 'row'
    },
    redButton: {
      backgroundColor: 'red',
    },
    buttonView: {
      flex: 1,
    },
    buttonSpace: {
      paddingRight: 15
    }
  })

  return (
    <View style={itemStyles.container}>
      <View style={reviewStyles.container}>
        <View style={reviewStyles.rating}>
          <Text color='primary' textAlign='center' fontWeight='bold' fontSize='subheading'>{rating}</Text>
        </View>
        <View style={reviewStyles.infoContainer}>
          {myReview 
          ? <Text fontWeight='bold'>{repository.fullName}</Text>
          : <Text fontWeight='bold'>{user.username}</Text>
          }
          <Text style={reviewStyles.creationDate} color='textSecondary'>{formattedCreatedAt}</Text>
          <Text>{text}</Text>
        </View>
      </View>
      {myReview &&
        <View style={buttonsStyles.container}>
          <View style={buttonsStyles.row}>
            <View style={buttonsStyles.buttonView}>
              <Button style={buttonsStyles.blueButton} 
                onPress={() => navigate(`/${repository.id}`)}>View repository</Button>
            </View>
            <View style={buttonsStyles.buttonSpace}></View>
            <View style={buttonsStyles.buttonView}>
              <Button style={buttonsStyles.redButton} 
                onPress={deleteAlert}>Delete review</Button>
            </View>
          </View>
        </View>
        }
    </View>
  )
};

export default ReviewItem;