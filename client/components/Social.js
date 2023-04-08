import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

import Community from "./Community";
import Scholarship from "./Scholarship";

const Tab = createMaterialTopTabNavigator();
const Social = () => {
  return (
    <Tab.Navigator
      style={{ paddingTop: StatusBar.currentHeight }}
      tabBarOptions={{
        tabBarStyle: ({ focused }) => ({
          backgroundColor: focused ? "grey" : "transparent",
        }),
      }}
    >
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? "people" : "people-outline"}
              color={focused ? "black" : "#272727"}
            />
          ),
        }}
        component={Community}
        name="Community"
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? "book" : "book-outline"}
              color={focused ? "black" : "#272727"}
            />
          ),
        }}
        component={Scholarship}
        name="Scholarship"
      />
    </Tab.Navigator>
  );
};

export default Social;

const styles = StyleSheet.create({});
