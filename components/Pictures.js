import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import filesize from "filesize";
import moment from "moment";
import Toast from "react-native-simple-toast";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Pictures({ createdAt, name, size, url }) {
  const [photoModal, setPhotoModal] = useState(false);

  return (
    <TouchableOpacity onPress={() => setPhotoModal(true)}>
      <View style={styles.picturesList}>
        <View style={styles.pictureInfo}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}>Filename: </Text>
            <Text>{`${name}`}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}>Created At: </Text>
            <Text>{`${moment(createdAt).format("MMMM Do YYYY")}`}</Text>
            <Text style={{ fontWeight: "bold" }}> | </Text>
            <Text>{`${moment(createdAt).startOf("seconds").fromNow()}`}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}>Size: </Text>
            <Text>{`${filesize(size)}`}</Text>
          </View>
        </View>
      </View>
      <Modal animationType="slide" transparent={false} visible={photoModal}>
        <View style={styles.modalStyle}>
          <Image
            style={{ width: "100%", height: "90%", borderRadius: 20 }}
            source={{ uri: url }}
          />
          <TouchableOpacity
            style={styles.pictureView}
            onPress={() => setPhotoModal(false)}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={40}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  picturesList: {
    flex: 1,
    minHeight: 60,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5,
  },
  pictureInfo: {
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor: "#fff",
  },
  pictureView: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-around",
  },
  modalStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
