import { useContext } from 'react';
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import { AuthContext } from "../components/AuthContext";
import { LOGIN_USER } from "../graphql/mutations/auth";
import { UserLogin } from "../models";

interface LoginUserVars {
  password: string;
  email: string;
}

interface LoginOptions {
  redirect?: boolean;
  to?: string;
}

export const useLogin = (options: LoginOptions) => {
  const { redirect, to } = options;
  const { setToken } = useContext(AuthContext);
  const history = useHistory();

  const [loginMutation, { loading: isLoading }] = useMutation<UserLogin, LoginUserVars>(LOGIN_USER, {
    errorPolicy: 'all',
    onCompleted: (data: UserLogin) => {
      if (data) {
        const token = data.login.token;
        setToken(token);

        if (redirect) {
          history.replace(to || '/')
        }
      }
    }
  });

  const login = (options: LoginUserVars) => {
    loginMutation({
      variables: {
        email: options.email,
        password: options.password,
      }
    })
  }

  return { login, isLoading };
}
