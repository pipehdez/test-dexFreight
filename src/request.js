import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserInfo = async () => {
  let user = await AsyncStorage.getItem("user");
  user = JSON.parse(user);

  let query = fetch(
    `https://api.twitter.com/2/users?ids=${user.userID}&user.fields=id,name,profile_image_url,username,withheld&expansions=pinned_tweet_id`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAABg0aAEAAAAAPwYFG%2F50gD71fc5eGthG7yaJ1N4%3DA7UwijwFaUI3LvK1vUdX1sFUE0Dr5LCv3TWiL9YYTaUKaSplY8`,
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());

  return query;
};

export const getUserTweets = async () => {
  let user = await AsyncStorage.getItem("user");
  user = JSON.parse(user);
  let query = fetch(
    `https://api.twitter.com/2/users/${user.userID}/tweets?tweet.fields=created_at&max_results=100`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAABg0aAEAAAAAPwYFG%2F50gD71fc5eGthG7yaJ1N4%3DA7UwijwFaUI3LvK1vUdX1sFUE0Dr5LCv3TWiL9YYTaUKaSplY8`,
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());

  return query;
};

export const sendTweet = async (text) => {
  let myHeaders = new Headers();
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

  let query = fetch("https://api.twitter.com/2/tweets", requestOptions).then(
    (response) => response.text()
  );

  return query;
};
