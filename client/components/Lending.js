import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import LentTransaction from "./LentTransaction";
import Scholarship from "./Scholarship";
import CompletedTransactions from "./CompletedTransactions";
import Borrow from "./Borrow";

const Tab = createMaterialTopTabNavigator();
const Lending = () => {
  return (
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
        component={Borrow}
        name="Completed"
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
    </Tab.Navigator>
  );
};

export default Lending;

const styles = StyleSheet.create({});
