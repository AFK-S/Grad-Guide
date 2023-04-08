import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { CommonStyles } from "../CommonStyles";

const Tracker = () => {
  return (
    <SafeAreaView style={{...CommonStyles.container}}>
      <View style={{padding:20}}>
      <Text style={{...CommonStyles.title}}>
        Hello Karandeep
      </Text>
      </View>
    </SafeAreaView>
  );
};

export default Tracker;

const styles = StyleSheet.create({});
