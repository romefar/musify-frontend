import { useApolloClient } from '@apollo/client';
import { useContext } from 'react';

import { AuthContext } from '../components/AuthContext';

export const useLogout = () => {
  const { clearToken } = useContext(AuthContext);
  const apolloClient = useApolloClient();

  const logout = async () => {
    await apolloClient.clearStore();
    clearToken();
  };

  return logout;
};
