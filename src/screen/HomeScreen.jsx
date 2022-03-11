import React, { useEffect } from "react";

import { Text, Box, Center, Stack, Button, Avatar } from "native-base";

import { AuthContext } from "../context";

import { getUserInfo } from "../request";

const HomeScreen = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  const [user, setUser] = React.useState(null);

  {/* Logout */}
  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    getUserInfo()
      .then((data) => {
        Object.values(data.data).map((user) => {
          setUser(user);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      <Text bold fontSize={15}>
        Name: {user?.name}
      </Text>
      <Text bold fontSize={15}>
        Username: {user?.username}
      </Text>
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
