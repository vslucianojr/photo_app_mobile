import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-simple-toast";
import api from "../services/api";
import Pictures from "../components/Pictures";

export default function UploadsScreen() {
  const [uploads, setUploads] = useState([]);

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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {!!uploads &&
          uploads.map(({ createdAt, size, url, key }, index) => (
            <Pictures
              key={index}
              createdAt={createdAt}
              name={key}
              size={size}
              url={url}
            />
          ))}
      </ScrollView>
      <TouchableOpacity style={styles.reloadButton} onPress={getUploadsList}>
        <MaterialCommunityIcons name="cloud-download" size={35} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebebeb",
  },
  contentContainer: {
    padding: 10,
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
    backgroundColor: "#2f95dc",
  },
});
