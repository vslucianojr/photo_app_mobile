import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-simple-toast";
import api from "../services/api";
import Pictures from "../components/Pictures";
import Colors from "../constants/Colors";

export default function UploadsScreen() {
  const [uploads, setUploads] = useState([]);
  const emtpyImage = require("../assets/images/empty.png");

  async function getUploadsList() {
    Toast.show("Refreshing List...", Toast.LONG);
    await api
      .get("uploads")
      .then((response) => {
        const uploadsData = response.data;
        setUploads(uploadsData);
      })
      .catch((error) => {
        Toast.show("Something Wrong", Toast.LONG);
      });
  }
  {
    if (uploads.length === 0) {
      return (
        <View style={styles.emptyPage}>
          <Image
            style={{
              width: 200,
              height: 200,
              opacity: 0.3,
            }}
            source={emtpyImage}
          />
          <Text style={styles.emptyText}>
            Ops.. Nothing on Server.. Please Reload
          </Text>
          <TouchableOpacity
            style={styles.reloadButton}
            onPress={getUploadsList}
          >
            <MaterialCommunityIcons
              name="cloud-download"
              size={35}
              color={Colors.noticeText}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            data={uploads}
            renderItem={({ item }) => (
              <Pictures
                createdAt={item.createdAt}
                name={item.key}
                size={item.size}
                url={item.url}
              />
            )}
            keyExtractor={(item) => item._id}
          />
          <TouchableOpacity
            style={styles.reloadButton}
            onPress={getUploadsList}
          >
            <MaterialCommunityIcons
              name="cloud-download"
              size={35}
              color={Colors.noticeText}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  reloadButton: {
    width: 50,
    height: 50,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 30,
    right: 30,
    borderRadius: 100,
    backgroundColor: Colors.noticeBackground,
  },
  emptyPage: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    margin: 10,
    fontWeight: "bold",
    color: Colors.emptyText,
  },
});
