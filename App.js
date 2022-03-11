import React, { useReducer, useEffect, useMemo, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider } from "native-base";

import HomeScreen from "./src/screen/HomeScreen";
import TweetsScreen from "./src/screen/TweetsScreen";
import SignInScreen from "./src/screen/SignInScreen";
import SplashScreen from "./src/screen/SplashScreen";

import RNTwitterSignIn from "@react-native-twitter-signin/twitter-signin";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContext } from "./src/context";

const Stack = createNativeStackNavigator();

const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: "qWPj1TXbreMX1SsDvdiQTaF7Y",
  TWITTER_CONSUMER_SECRET: "4t0cRfGWXZvySIa5sS0M38AnT8a8B8hwcX2lZiaStSWStD4B4Z",
};

RNTwitterSignIn.init(
  Constants.TWITTER_COMSUMER_KEY,
  Constants.TWITTER_CONSUMER_SECRET
).then(() => console.log("RNTwitterSignIn is ready"));

const App = () => {
  /* Reducer for state management */
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            user: action.user,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            user: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null,
    }
  );

  useEffect(() => {
    /* Fetch the token from storage then navigate to our appropriate place */
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
        user = await AsyncStorage.getItem("user");
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
    return () => { // This code runs when component is unmounted
      componentMounted.current = false; // (4) set it to false when we leave the page
  }
  }, []);

  /* Auth Context for state management */
  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        await AsyncStorage.setItem("userToken", data.authToken);
        await AsyncStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "SIGN_IN", token: data.authToken, user: data });
      },
      signOut: async () => {
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("user");

        dispatch({ type: "SIGN_OUT" });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {state.isLoading ? (
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
              />
            ) : state.userToken == null ? (
              // No token found, user isn't signed in
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: "Sign in",
                  /* When logging out, a pop animation feels intuitive */
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                }}
              />
            ) : (
              /* User is signed in */
              <>
                <Stack.Screen name="Profile" component={HomeScreen} />
                <Stack.Screen name="Tweets" component={TweetsScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthContext.Provider>
  );
};

export default App;
