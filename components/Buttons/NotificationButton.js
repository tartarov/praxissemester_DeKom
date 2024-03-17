import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Modal,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colorEnum from "../DeKomColors";
import AntragContext from "../../context/AntragContext";
import HoverCircle from "../animations/HoverCircle";

const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.95;
const ITEM_HEIGHT = height * 0.95;

function NotificationButton({ onPress }) {
  const { changedAntraege } = useContext(AntragContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [iconColor, setIconColor] = useState(colorEnum.accent);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setIconColor(colorEnum.accent);
  };

  const changeIconColor = () => {
    if (changedAntraege && changedAntraege.length) {
      setIconColor("red");
    } else {
      setIconColor(colorEnum.accent);
    }
  };

  useEffect(() => {
    changeIconColor();
  }, [changedAntraege]);

  const Item = ({ item, onPress, backgroundColor, textColor, statusColor }) => (
    <>
    <Text>Es gibt Statusneuigkeiten: </Text>
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>
        {item.ANTRAGSNAME + " => "}
      </Text>
      <Text style={{backgroundColor: statusColor, fontWeight:"600", textDecorationLine: "underline"}}>{item.STATUS}</Text>
    </TouchableOpacity>
    </>
  );

  const renderItem = ({ item }) => {
      const backgroundColor =
        item.SUBMISSION_ID === selectedId
          ? "white"
          : "white"
      const color =
        item.SUBMISSION_ID === selectedId
          ? "white"
          : colorEnum.primary;
      let statusColor;

      
  if ( item.STATUS === "SUBMITTED") {
    // Set red color for specific statuses
    statusColor = "brown";
  } else if (
    item.STATUS === "ACCEPTED"
  ) {
   
    statusColor = "green"; // Set default color for other statuses
  } else if (
    item.STATUS === "REJECTED"
  ) {
 
    statusColor = "red";
  }  else if (
    item.STATUS === "NOTIFIED"
  ) {
    statusColor = "gold";
  }

      return (
        <Item
          item={item}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
          statusColor = {{statusColor}}
        />
      );
  };

  return (
    <View>
      <Pressable
        onPress={toggleModal}
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        android_ripple={{ color: colorEnum.secondary }}
      >
         {iconColor === "red" && <HoverCircle />}
        <Ionicons
          name="notifications-outline"
          size={32}
          style={{ color:  iconColor, elevation: iconColor == "red" ? 9 : 2}}
        />
       
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {changedAntraege && changedAntraege.length ? (
              <FlatList
                style={styles.flatlist}
                data={changedAntraege}
                renderItem={renderItem}
                keyExtractor={(item) => item.SUBMISSION_ID}
                extraData={selectedId}
              />
            ) : (
              <Text>Keine Neuigkeiten</Text>
            )}
            <Pressable onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default NotificationButton;

const styles = StyleSheet.create({
  buttonInnerContainer: {
    // Your button styles
  },
  pressed: {
    // Your pressed styles
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    paddingHorizontal: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "blue",
  },
  closeButtonText: {
    color: "white",
  },
  flatlist: {
    maxHeight: ITEM_HEIGHT / 3,
    overflow: "hidden",
  },
  item: {
    paddingVertical: 10,
    marginVertical: 1,
    marginHorizontal: 0,
    borderRadius: 1,
    elevation: 1,
  },
});
