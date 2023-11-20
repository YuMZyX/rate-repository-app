import { useMutation, useApolloClient } from '@apollo/client'
import { AUTHENTICATE } from '../components/graphql/queries';
import useAuthStorage from './useAuthStorage'

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const credentials = { username, password };
    const payload = await mutate({ variables: { credentials } });
    const { data } = payload;

    if (data?.authenticate) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
    }
    
    return payload;
  };

  return [signIn, result];
};

export default useSignIn;