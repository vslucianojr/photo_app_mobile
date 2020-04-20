import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import CameraScreen from "../screens/CameraScreen";
import UploadsScreen from "../screens/UploadsScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Uploads";

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          title: "Take a Picture",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="camera" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Uploads"
        component={UploadsScreen}
        options={{
          title: "Uploaded Photos",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="camera-burst" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Camera":
      return "Take your Picture";
    case "Uploads":
      return "Uploaded Photos";
  }
}
