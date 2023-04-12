import React, { useState, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { Modal } from "../../components/Modal";
import { DataContext } from "../../context/DataContext";
import Button from "../../components/Button";

function ModalTester({ data }) {
  const [isModalVisible, setModalVisible] = useState(true);
  //const { data, getWalletData } =  useContext(DataContext);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Header title={"Guten Tag!"} />
          <Modal.Body>
            <Text style={styles.text}>
              Sie haben soweit keine neue Nachrichten.
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button label="Verstanden" onPress={toggleModal} />
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    </View>
  );
}

export default ModalTester;
