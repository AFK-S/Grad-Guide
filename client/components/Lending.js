import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Image,
} from "react-native";
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
            <Image
              source={require("../assets/icons/money.png")}
              resizeMode="contain"
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
        component={LentTransaction}
        name="LentTransaction"
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Image
              source={require("../assets/icons/wall-clock.png")}
              resizeMode="contain"
              style={{ height: 25, width: 25 }}
            />
          ),
        }}
        component={Borrow}
        name="Completed"
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Image
              source={require("../assets/icons/checked.png")}
              resizeMode="contain"
              style={{ height: 25, width: 25 }}
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
