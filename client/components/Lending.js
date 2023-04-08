import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import LentTransaction from "./LentTransaction";
import Scholarship from "./Scholarship";
import CompletedTransactions from "./CompletedTransactions";

const Tab = createMaterialTopTabNavigator();
const Lending = () => {
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
        component={LentTransaction}
        name="LentTransaction"
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
        component={CompletedTransactions}
        name="Borrowed"
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
        component={CompletedTransactions}
        name="Completed"
      />
    </Tab.Navigator>
  );
};

export default Lending;

const styles = StyleSheet.create({});
