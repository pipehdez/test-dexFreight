import { Modal, FormControl, Stack, Input, Button } from "native-base";

const CustomModal = ({
  text,
  setText,
  showModal,
  setShowModal,
  handleTweet
}) => {
  // Callback returns text value
  const handleChange = (text) => {
    setText(text);
  };

  const handlePress = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    handleTweet();
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>New Tweet</Modal.Header>
        <Modal.Body>
          <FormControl isRequired isInvalid>
            <Stack mx={4}>
              <Input
                value={text}
                onChangeText={handleChange}
                p={2}
                placeholder="What's happening?"
              />
            </Stack>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2} color="amber.100">
            <Button onPress={handlePress}>CANCEL</Button>
            <Button onPress={handleSubmit}>SEND</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default CustomModal;
