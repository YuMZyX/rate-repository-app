import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../components/graphql/queries';

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const user = { username, password };
    const payload = await mutate({ variables: { user } });
    const { data } = payload;
    
    return data;
  };

  return [signUp, result];
};

export default useSignUp;