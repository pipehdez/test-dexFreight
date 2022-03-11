import React from "react";
import { StyleSheet } from "react-native";
import { Box, Text } from 'native-base'

import { AntDesign } from '@expo/vector-icons';

const SplashScreen = () => {
  return (
      <Box style={styles.box}>
        <Text style={styles.text}>Api Tweeter App</Text>
        <AntDesign name="twitter" size={100} color="white" />
      </Box>
  )
};

export default SplashScreen;

const styles = StyleSheet.create({
  box: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: "#1da2d1"
  },
  text: { 
    color: "white", 
    fontSize: 25, 
    padding: 8 
  }
});
