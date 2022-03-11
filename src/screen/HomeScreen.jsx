import React, { useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Text,
  Box,
  Center,
  Stack,
  Button,
  Avatar,
} from "native-base";

import { AuthContext } from "../context";

const HomeScreen = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  const [user, setUser] = React.useState(null);

  const handleLogout = () => {
    console.log("logout");
    signOut();
  };

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const getUserInfo = async () => {
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    fetch(
      `https://api.twitter.com/2/users?ids=${user.userID}&user.fields=id,name,profile_image_url,username,withheld&expansions=pinned_tweet_id`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAABg0aAEAAAAAPwYFG%2F50gD71fc5eGthG7yaJ1N4%3DA7UwijwFaUI3LvK1vUdX1sFUE0Dr5LCv3TWiL9YYTaUKaSplY8`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        Object.values(data.data).map((user) => {
          setUser(user);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box flex={1} bg="#fff" alignItems="center" p={10}>
      <Center>
        <Avatar
          size="xl"
          source={{
            uri: user?.profile_image_url,
          }}
        >
          AK
        </Avatar>
      </Center>
      <Text>Name: {user?.name}</Text>
      <Text>Username: {user?.username}</Text>
      <Stack
        direction={{
          base: "row",
          md: "row",
        }}
        space={1}
        alignItems={{
          base: "center",
          md: "flex-start",
        }}
      >
        <Box>
          <Button size="lg" m={2} onPress={() => navigation.navigate("Tweets")}>
            Refresh Tweets
          </Button>

          <Button size="lg" m={2} variant="link" onPress={handleLogout}>
            Logout
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default HomeScreen;
