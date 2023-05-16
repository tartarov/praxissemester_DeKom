import React, { useState, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { Modal } from "../../components/Modal";
import { DataContext } from "../../context/DataContext";
import Button from "../../components/Buttons/Button";
import Loader from "../../components/animations/Loader";

function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { data, getWalletData } = useContext(DataContext);

  useEffect(() => {
    setIsLoading(true)
    getWalletData()
    setIsLoading(false);
    }, []);

  console.log("ICH BIN IM MODAL")

  const toggleModal = () => {
    console.log("ICH BIN IM MODAL2")
    setModalVisible(!isModalVisible);
  };
  console.log("ICH BIN IM MODAL3")

  if(data.length){
    console.log("ICH BIN IM MODAL4")
  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Header title={"Hallo " + data[0].document.vorname + "!" } />
          <Modal.Body>
            <Text style={{alignItems:'center', paddingLeft: 15 , color: '#DCD7C9'}}>
            {isLoading ? <Loader/> :  "Du hast soweit keine neuen Aufgaben."}
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
}

export default ModalTester;
