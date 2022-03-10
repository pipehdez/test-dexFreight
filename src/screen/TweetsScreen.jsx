import React, { useEffect, useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import { RefreshControl, ActivityIndicator } from "react-native";
import {
  Box,
  Text,
  FlatList,
  Heading,
  HStack,
  VStack,
  Spacer,
  Fab,
  Icon,
  Modal,
  Button,
  FormControl,
  Input,
  Stack,
  useToast
} from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";

const TweetsScreen = () => {
  const [tweets, setTweets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getUserTweets();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(false);
    getUserTweets()
  }, []);

  const toast = useToast();

  const getUserTweets = async () => {
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    fetch(`https://api.twitter.com/2/users/${user.userID}/tweets`, {
      method: "GET",
      headers: {
        Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAABg0aAEAAAAAPwYFG%2F50gD71fc5eGthG7yaJ1N4%3DA7UwijwFaUI3LvK1vUdX1sFUE0Dr5LCv3TWiL9YYTaUKaSplY8`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTweets(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTweet = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      'OAuth oauth_consumer_key="hHa9BYwPBZU4gbrBqOx5Q4bfK",oauth_token="1501630349436239880-YwVdZHoiMGHMFrGpY7lE3dvOIiJfRh",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1646938988",oauth_nonce="X0LzymGtRpb",oauth_version="1.0",oauth_signature="E1z3CR8aaiyQdl5YSzFXUaQLo6o%3D"'
    );

    let raw = JSON.stringify({
      text: text,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api.twitter.com/2/tweets", requestOptions)
      .then((response) => response.text())
      .then((result) => 
        console.log(result), 
        setShowModal(false),
        setText(""),
        getUserTweets(),
        toast.show({ description: "Tweet sent successfully" })
      )
      .catch((error) => console.log("error", error));
  };

  const renderItem = ({ item }) => {
    return (
      <Box
        borderBottomWidth="1"
        _dark={{ borderColor: "gray.600" }}
        backgroundColor="blue.300"
        borderColor="blue.200"
        pl="4"
        pr="5"
        py="2"
      >
        <HStack space={3} justifyContent="space-between">
          <VStack>
            <Text _dark={{ color: "warmGray.50" }} color="white" bold>
              {item.text}
            </Text>
          </VStack>
          <Spacer />
        </HStack>
      </Box>
    );
  };
  console.log(text);
  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Tweets
      </Heading>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={tweets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Box position="relative" h={100} w="100%">
        <Fab
          position="absolute"
          size="sm"
          icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
          onPress={() => setShowModal(true)}
        />
      </Box>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>New Tweet</Modal.Header>
          <Modal.Body>
            <FormControl isRequired isInvalid>
              <Stack mx={4}>
                <Input
                  value={text}
                  onChangeText={setText}
                  p={2}
                  placeholder="What's happening?"
                />
              </Stack>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2} color="amber.100">
              <Button
                onPress={() => {
                  setShowModal(false);
                }}
              >
                CANCEL
              </Button>
              <Button onPress={handleTweet} >SEND</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default TweetsScreen;
