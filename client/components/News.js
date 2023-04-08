import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { CommonStyles } from "../CommonStyles";

const News = () => {
  const data = [
    {
      title: "News 1",
      description: "This is news 1",
    },
    {
      title: "News 2",
      description: "This is news 2",
    },
    {
      title: "News 3",
      description: "This is news 3",
    },
  ];

  return (
    <SafeAreaView style={CommonStyles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={{ padding: 30 }}
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={CommonStyles.card}>
              <View style={CommonStyles.cardRow}>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={CommonStyles.divider}></View>
                </View>
                <View>
                  <TouchableOpacity style={{ width: 100 }}>
                    <Text
                      style={{
                        color: "#007bff",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Read More
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text>{item.description}</Text>
              <View>
                <View
                  style={{
                    marginTop: 15,
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                ></View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default News;

const styles = StyleSheet.create({});
