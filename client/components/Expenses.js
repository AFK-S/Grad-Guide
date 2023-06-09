import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
} from "react-native";
import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import { CommonStyles } from "../CommonStyles";
import Tracker from "../Screens/Tracker";
import Statistics from "./Statistics";

const Tab = createMaterialTopTabNavigator();
const Expenses = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        style={{
          paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 0,
        }}
      >
        <Tab.Screen
          options={{
            title: ({ color, focused }) => (
              <Ionicons
                size={25}
                name={focused ? "pie-chart" : "pie-chart-outline"}
                color={focused ? "black" : "#272727"}
              />
            ),
          }}
          component={Tracker}
          name="Tracker"
        />
        <Tab.Screen
          options={{
            title: ({ color, focused }) => (
              <Ionicons
                size={25}
                name={focused ? "stats-chart" : "stats-chart-outline"}
                color={focused ? "black" : "#272727"}
              />
            ),
          }}
          component={Statistics}
          name="Statistics"
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Expenses;

const styles = StyleSheet.create({});
