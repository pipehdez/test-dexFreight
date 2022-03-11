import { AntDesign } from "@expo/vector-icons";
import { Box, Fab, Icon } from "native-base";

const CustomFab = ({ onPress }) => {

  /* Callback: return a function onPress */
  const handlePress = () => {
    onPress();
  };

  return (
    <Box position="relative" h={100} w="100%">
      <Fab
        position="absolute"
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        onPress={handlePress}
      />
    </Box>
  );
};

export default CustomFab;
