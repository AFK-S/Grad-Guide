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

const CompletedTransaction = () => {
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
        Completed Transactions
      </Text>

      <FlatList
        style={{ padding: 30 }}
        data={transactions}
        renderItem={({ item }) => {
          return (
            <View style={{ ...CommonStyles.card, opacity: 0.7 }}>
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
                    color: "#000",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  ${item.amount}
                </Text>
              </View>
              <Text style={{ ...CommonStyles.silentText, fontSize: 13 }}>
                Due Date: {item.date}
              </Text>
              <TouchableOpacity disabled>
                <Text
                  style={{
                    color: "#8e8e8e",
                    padding: 10,
                    textAlign: "center",
                    borderRadius: 10,
                    marginTop: 20,
                    borderWidth: 1,
                    borderColor: "#8e8e8e",
                  }}
                >
                  Paid Successfully!
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default CompletedTransaction;

const styles = StyleSheet.create({});
