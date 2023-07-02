import React from "react";

const EventModal = () => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ticket for event #{._id}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src="https://ipfs.io/ipfs/Qme1E49DEyeGRmT2CDeSCZRcNiLyeAQiDq7SAxDHACiivi/" />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
