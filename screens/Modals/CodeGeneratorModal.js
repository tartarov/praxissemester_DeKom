import React, { useState, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { Modal } from "../../components/Modal";
import Button from "../../components/Buttons/Button";

function CodeGenerator(bool) {
  const [isModalVisible, setModalVisible] = useState(true);

  console.log("ICH BIN IM MODAL")

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  console.log(bool)
  if (bool == true){
    setModalVisible(isModalVisible);
  }


  if(data.length){
  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Header title={{number}} />
          <Modal.Footer>
            <Button label="Verstanden" onPress={toggleModal} />
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    </View>
  );
}
}

export default CodeGenerator;