import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../components/graphql/queries';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, rating, repositoryName, text }) => {
    const ratingInt = parseInt(rating);
    const review = { ownerName, rating: ratingInt, repositoryName, text };
    const payload = await mutate({ variables: { review } });
    const { data } = payload;
    
    return data;
  };

  return [createReview, result];
};

export default useCreateReview;