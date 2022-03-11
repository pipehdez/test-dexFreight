import React, { useEffect, useState } from "react";

import { ActivityIndicator } from "react-native";
import { Box, Heading, useToast } from "native-base";

import CustomFab from "../components/Fab";
import CustomModal from "../components/Modal";

import CustomList from "../components/List";

import { getUserTweets, sendTweet } from "../request";

const TweetsScreen = () => {
  const [tweets, setTweets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getTweets();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(false);
    getTweets();
  }, []);

  {/* Get user tweets */}
  const getTweets = () => {
    getUserTweets()
      .then((data) => {
        setTweets(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  {/* Message toasts */}
  const toast = useToast();

  {/* Send tweet */}
  const handleTweet = async () => {

    {/* Validate input of tweet */}
    if (text === "") {
      return toast.show({
        description: "Please enter a tweet",
        type: "danger",
      });
    }

    sendTweet(text)
      .then(
        (result) => console.log(result),
        setShowModal(false),
        setText(""),
        getTweets(),
        toast.show({ description: "Tweet sent successfully" })
      )
      .catch((error) => console.log("error", error));
  };

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Recent Tweets {tweets.length}
      </Heading>
      {refreshing ? <ActivityIndicator /> : null}

      {/* Swipe down to refresh the list of tweets */}
      <CustomList
        tweets={tweets}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />

      <CustomFab onPress={() => setShowModal(true)} />

      {/* Modal to send a tweet */}
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
