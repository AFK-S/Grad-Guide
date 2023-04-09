import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { CommonStyles } from "../CommonStyles";

const Borrow = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      name: "John Doe",
      amount: 100,
      date: "2020-01-01",
    },
    {
      id: 2,
      name: "Yolo Doe",
      amount: 80,
      date: "2023-01-01",
    },
  ]);
  return (
    <SafeAreaView style={{ ...CommonStyles.container }}>
      <Text
        style={{
          ...CommonStyles.silentText,
          fontSize: 20,
          fontWeight: "bold",
          padding: 30,
          paddingBottom: 0,
        }}
      >
        Pending to be Paid
      </Text>

      <FlatList
        style={{ padding: 30 }}
        data={transactions}
        renderItem={({ item }) => {
          return (
            <View style={CommonStyles.card}>
              <View style={{ ...CommonStyles.cardRow, marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: "red",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  ₹{item.amount}
                </Text>
              </View>
              <Text style={{ ...CommonStyles.silentText, fontSize: 13 }}>
                Due Date: {item.date}
              </Text>
              <View style={CommonStyles.divider} />
              <TouchableOpacity>
                <Text
                  style={{
                    ...CommonStyles.outlineGreenBtn,
                    textAlign: "center",
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  Mark as Paid
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Borrow;

const styles = StyleSheet.create({});
