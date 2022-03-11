import React from "react";

import RNTwitterSignIn from "@react-native-twitter-signin/twitter-signin";

import { Button, Box } from "native-base";

import { AuthContext } from "../context";

const SignIn = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);

  {/*  Twitter SignIn  */}
  const twitterSignIn = () => {
    RNTwitterSignIn.logIn()
      .then((loginData) => {
        const { authToken, authTokenSecret } = loginData;
        if (authToken && authTokenSecret) {
          signIn(loginData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box alignItems="center" justifyContent="center" flex={1}>
      <Button p={3} onPress={twitterSignIn}>
        LOGIN WITH TWITTER
      </Button>
    </Box>
  );
};

export default SignIn;
