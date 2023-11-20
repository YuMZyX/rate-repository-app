import { useQuery } from "@apollo/client";
import { ME } from "./graphql/queries";
import { FlatList, StyleSheet, View } from 'react-native';
import ReviewItem from "./ReviewItem";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  noReviews: {
    padding: 15
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { loading, data, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return null;
  const reviewNodes = data.me
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  if (reviewNodes.length === 0) {
    return (
      <Text style={styles.noReviews}>You don&apos;t have any reviews yet...</Text>
    )
  }

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} myReview={true} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
};

export default MyReviews;