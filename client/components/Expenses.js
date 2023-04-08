import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

import Social from "../components/Social";
import News from "../components/News";
import Tracker from "./Tracker";
import Statistics from "./Statistics";

const Tab = createMaterialTopTabNavigator();
const Expenses = () => {
  return (
    <Tab.Navigator style={{ paddingTop: StatusBar.currentHeight }}>
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? "home" : "home-outline"}
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
              name={focused ? "people-sharp" : "people-outline"}
              color={focused ? "black" : "#272727"}
            />
          ),
        }}
        component={Statistics}
        name="Statistics"
      />
    </Tab.Navigator>
  );
};

export default Expenses;

const styles = StyleSheet.create({});
