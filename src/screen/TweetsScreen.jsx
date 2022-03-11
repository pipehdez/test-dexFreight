import React, { useEffect, useState } from "react";

import { ActivityIndicator } from "react-native";
import { Box, Heading, useToast } from "native-base";

import CustomFab from "../components/Fab";
import CustomModal from "../components/Modal";

import CustomList from "../components/List";

import AsyncStorage from "@react-native-async-storage/async-storage";

const TweetsScreen = () => {
  const [tweets, setTweets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getUserTweets();
  }, [getUserTweets]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(false);
    getUserTweets();
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
    if (text === "") {
      return toast.show({
        description: "Please enter a tweet",
        type: "danger",
      });
    }

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
      .then(
        (result) => console.log(result),
        setShowModal(false),
        setText(""),
        getUserTweets(),
        toast.show({ description: "Tweet sent successfully" })
      )
      .catch((error) => console.log("error", error));
  };

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Recent Tweets { tweets.length }
      </Heading>
      {refreshing ? <ActivityIndicator /> : null}

      <CustomList
        tweets={tweets}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />

      <CustomFab onPress={() => setShowModal(true)} />

      <CustomModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleTweet={handleTweet}
        text={text}
        setText={setText}
      />
    </Box>
  );
};

export default TweetsScreen;
