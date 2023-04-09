import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Image,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CommonStyles } from "../CommonStyles";
import axios from "axios";

const News = () => {
  const [newsdata, setNewsdata] = useState([
    {
      title: "Tesla (TSLA) Stock Sinks As Market Gains: What You Should Know",
      description:
        "Tesla (TSLA) closed the most recent trading day at $1,000.00, moving -0.5% from the previous trading session.",
      url: "https://www.nasdaq.com/articles/tesla-tsla-stock-sinks-as-market-gains-what-you-should-know-2021-09-17",
      image:
        "https://cdn.snapi.dev/images/v1/0/tesla-tsla-stock-sinks-as-market-gains-what-you-should-know-2021-09-17.jpg",
    },
    {
      title: "Tesla (TSLA) Stock Sinks As Market Gains: What You Should Know",
      description:
        "Tesla (TSLA) closed the most recent trading day at $1,000.00, moving -0.5% from the previous trading session.",
      url: "https://www.nasdaq.com/articles/tesla-tsla-stock-sinks-as-market-gains-what-you-should-know-2021-09-17",
      image:
        "https://cdn.snapi.dev/images/v1/0/tesla-tsla-stock-sinks-as-market-gains-what-you-should-know-2021-09-17.jpg",
    },
  ]);

  const getNews = async () => {
    // const getnews = {
    //   method: "GET",
    //   url: "https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token=1lhXR65E6XOUm3cZZCfj1yWKycd5WdKtgpgWztLY",
    // };
    // try {
    //   const response = await axios.request(getnews);
    //   setNewsdata(response.data.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    // getNews();
  }, []);

  return (
    <SafeAreaView style={{ ...CommonStyles.container }}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getNews} />
        }
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={{ padding: 30 }}
        data={newsdata}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                marginBottom: 30,
                backgroundColor: "white",
                padding: 15,
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // height: 150,
                  // overflow: 'hidden',
                }}
              >
                <View style={{ width: "100%", padding: 5 }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        marginBottom: 4,
                      }}
                    >
                      {item.title}
                    </Text>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: "#e0e0e0",
                        marginBottom: 10,
                        marginTop: 10,
                      }}
                    ></View>
                  </View>
                  <Text>{item.description}</Text>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      marginTop: 10,
                    }}
                  >
                    <TouchableOpacity>
                      <Text
                        style={{
                          color: "#007bff",
                          fontWeight: "bold",
                        }}
                        onPress={() => {
                          Linking.openURL(`${item.url}`);
                        }}
                      >
                        Read More
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
