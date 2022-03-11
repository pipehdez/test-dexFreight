import { Box, HStack, VStack, Text, Spacer, FlatList } from "native-base";
import { RefreshControl } from "react-native";

const CustomList = ({ tweets, onRefresh, refreshing }) => {
  
  /* Render list item */
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

  return (
    /* List of tweets */
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={tweets}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default CustomList;
