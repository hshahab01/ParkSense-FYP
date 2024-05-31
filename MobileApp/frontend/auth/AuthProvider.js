import { useState, useCallback, useEffect } from "react";

import * as SecureStore from 'expo-secure-store';
import * as Keychain from "react-native-keychain";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    // setUserId(uid);

    //local variable, not the one in state above
    // const tokenExpirationDate =
    //   expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    // setTokenExpirationDate(tokenExpirationDate);

    SecureStore.setItem("user", token)
  }, []);

  const logout = useCallback(async () => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    await SecureStore.deleteItemAsync("user")
  }, []);

  useEffect(() => {
    const storedData = SecureStore.getItem("user");
    if (storedData) {
      login(null,
        storedData,
        null,
      );
    }
  }, [login]);

  return { token, login, logout, userId };
};
