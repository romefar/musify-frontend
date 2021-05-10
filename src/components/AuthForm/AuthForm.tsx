import { useContext, useState } from "react";
import { Input, Button, Divider } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";

import { signInSchema, signUpSchema } from "./schemaValidation";
import { FormFields } from "./fields";

import styles from './AuthForm.module.scss';
import { useMutation } from "@apollo/client";
import { CreatedUser } from "../../models";
import { CREATE_USER } from "../../graphql/mutations/user";
import { useHistory } from "react-router";
import { useLogin } from "../../hooks/useLogin";
import { AuthContext } from "../AuthContext";

interface AuthFormState {
  [FormFields.email]: string;
  [FormFields.userName]?: string;
  [FormFields.password]: string;
  [FormFields.repeatPassword]?: string;
}

interface CreateUserVars {
  userInput: {
    name?: string;
    image?: string;
    password: string;
    email: string;
  }
}

export const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { setToken } = useContext(AuthContext);
  const { login, isLoading } = useLogin({ redirect: true })
  const history = useHistory();

  const [createUser, { loading }] = useMutation<CreatedUser, CreateUserVars>(CREATE_USER, {
    errorPolicy: 'all',
    onCompleted: (data: CreatedUser) => {
      if (data) {
        const token = data.createUser.token;
        setToken(token);

        history.replace('/');
      }
    }
  });

  const resolver = isSignUp
    ? yupResolver(signUpSchema)
    : yupResolver(signInSchema);

  const { control, handleSubmit, formState: { errors } } = useForm<AuthFormState>({
    resolver,
  });

  const onSubmit = handleSubmit(data => {
    if (isSignUp) {
      createUser({
        variables: {
          userInput: {
            email: data.email,
            name: data.userName,
            password: data.password
          }
        }
      });

      return;
    }

    login({
      email: data['email'],
      password: data['password']
    });

  });

  return (
    <section className={styles.authContainer}>
      <form onSubmit={onSubmit}>
        <Divider orientation='center'>{isSignUp ? 'Sign up' : 'Sign in'}</Divider>
        <div className={styles.formContent}>
          {isSignUp && (
            <div>
              <Controller
                control={control}
                name={FormFields.userName}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    placeholder='Name'
                  />
                )}
              />
              {errors[FormFields.userName] && (
                <p className={styles.errorLabel}>{errors[FormFields.userName]?.message}</p>
              )}
            </div>
          )}
          <div>
            <Controller
              control={control}
              name={FormFields.email}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  placeholder='Email'
                />
              )}
            />
            {errors[FormFields.email] && (
              <p className={styles.errorLabel}>{errors[FormFields.email]?.message}</p>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name={FormFields.password}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input.Password
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  placeholder='Password'
                />
              )}
            />
            {errors[FormFields.password] && (
              <p className={styles.errorLabel}>{errors[FormFields.password]?.message}</p>
            )}
          </div>
          {isSignUp && (
            <div>
              <Controller
                control={control}
                name={FormFields.repeatPassword}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.Password
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    placeholder='Repeat password'
                  />
                )}
              />
              {errors[FormFields.repeatPassword] && (
                <p className={styles.errorLabel}>{errors[FormFields.repeatPassword]?.message}</p>
              )}
            </div>
          )}
          <Button type='primary' onClick={() => onSubmit()} disabled={loading} loading={loading || isLoading}>
            {isSignUp ? 'Sing up' : 'Login'}
           </Button>
          <Button type='default' onClick={() => setIsSignUp(p => !p)} disabled={loading}>
           {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
          </Button>
        </div>
      </form>
    </section>
  )
};
