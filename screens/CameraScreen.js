import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Modal,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-simple-toast";
import api from "../services/api";
import Colors from "../constants/Colors";

export default function CameraScreen() {
  const camRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [photoModal, setPhotoModal] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [isFocused]);

  if (hasPermission === null) {
    return <Text>Bad Permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>Blocked Access</Text>;
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setPhotoModal(true);
    }
  }

  async function uploadPicture() {
    Toast.show("Uploading...", Toast.LONG);
    const file = new FormData();
    file.append("file", {
      uri: capturedPhoto,
      type: "image/jpeg",
      name: "uploadPhotoApp.jpeg",
    });
    await api
      .post("uploads", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {});
    Toast.show("Upload Completed", Toast.LONG);
    setPhotoModal(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      {isFocused ? ( //If tab be changed
        <Camera style={{ flex: 1 }} type={type} ref={camRef}>
          <View style={styles.takeButton}>
            <TouchableOpacity
              style={{ position: "absolute", bottom: 10, right: 25 }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <MaterialCommunityIcons
                name="camera-party-mode"
                size={35}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <Text>Please Reload you App</Text>
      )}
      <TouchableOpacity style={styles.tabBarPickImage} onPress={takePicture}>
        <MaterialCommunityIcons name="camera-iris" size={40} color="#646464" />
      </TouchableOpacity>
      {capturedPhoto && (
        <Modal animationType="slide" transparent={false} visible={photoModal}>
          <View style={styles.modalDisplay}>
            <Image
              style={{ width: "100%", height: "90%", borderRadius: 20 }}
              source={{ uri: capturedPhoto }}
            />
            <View style={styles.pictureFooter}>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => setPhotoModal(false)}
              >
                <MaterialCommunityIcons
                  name="close-circle"
                  size={40}
                  color="#ccc"
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ margin: 10 }} onPress={uploadPicture}>
                <MaterialCommunityIcons
                  name="cloud-upload"
                  size={40}
                  color="#ccc"
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

CameraScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  tabBarPickImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingVertical: 10,
  },
  pictureFooter: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  takeButton: {
    flex: 0.9,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  modalDisplay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
