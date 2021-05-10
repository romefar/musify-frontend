import { useCallback, useEffect, useRef, useState } from 'react';
import decode from 'jwt-decode';

import storageService from '../services/StorageService';

export const useAuthToken = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const intervalId = useRef<number | undefined>();

  const isAuthorized = !!authToken;

  const setToken = useCallback((userToken: string) => {
    setAuthToken(userToken);
    storageService.saveToken(userToken);
  }, []);

  const clearToken = useCallback(() => {
    storageService.removeToken();
    setAuthToken(null);
    clearInterval(intervalId.current);
  }, []);

  const getUserId = () => {
    if (authToken) {
      // @ts-ignore
      const id = decode(authToken).id;

      return id;
    }

    return null;
  };

  useEffect(() => {
    const token = storageService.getToken();

    if (token) {
      const isTokenExpired = storageService.checkTokenValidity(token);
      if (!isTokenExpired) {
        setToken(token);

        return;
      }

      setAuthToken(null);
      storageService.removeToken();
    }
  }, [setToken]);

  useEffect(() => {
    if (authToken) {
      // @ts-ignore
      const expiration = decode(authToken).exp;

      // if (!intervalId) {
      //   const isTokenInvalid = storageService.checkTokenValidity(expiration);
      //   console.log(`isTokenInvalid useEffect onload ${isTokenInvalid}`);
      //   if (isTokenInvalid) {
      //     clearToken();
      //   }
      // }

      // @ts-ignore
      intervalId.current = setInterval(() => {
        const isTokenInvalid = storageService.checkTokenValidity(expiration);
        console.log(`isTokenInvalid useEffect onload ${isTokenInvalid}`);
        if (isTokenInvalid) {
          clearToken();
          clearInterval(intervalId.current);
        }
      }, 15000);
    }

    return () => clearInterval(intervalId.current);
  }, [authToken, clearToken]);

  return { authToken, isAuthorized, setToken, clearToken, getUserId };
};
