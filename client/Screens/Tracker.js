import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { CommonStyles } from "../CommonStyles";
import axios from "axios";
import { SERVER_URL } from "../config";
import StateContext from "../context/StateContext";

const Tracker = () => {
  const { User, setLoading } = useContext(StateContext);
  const [userData, setUserData] = useState([]);
  const transactions = [
    {
      _id: "1",
      amount: 500,
      category: "Food",
      date: "12/12/2020",
      description: "Bought food",
    },
    {
      _id: "1",
      amount: 500,
      category: "Food",
      date: "12/12/2020",
      description: "Bought food",
    },
  ];

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${SERVER_URL}/api/user/${User}`);
        setUserData(data);
      } catch (err) {
        console.error(err);
        if (err.response) return alert(err.response.data);
        alert(err);
      }
      setLoading(false);
    })();
  }, []);
  return (
    <SafeAreaView style={{ ...CommonStyles.container }}>
      <ScrollView>
        <View style={{ padding: 30 }}>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text style={{ ...CommonStyles.title }}>Hello {userData.name}</Text>
            <TouchableOpacity onPress={() => Alert.alert("logout")}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>

          <View style={{ ...CommonStyles.card, padding: 30, marginTop: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Your Next Month Plan is :
            </Text>
            <View>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginTop: 20,
                }}
              >
                <View>
                  <Text style={styles.mainData}>₹5000</Text>
                  <Text style={styles.minorTitle}>Food</Text>
                </View>
                <View>
                  <Text style={styles.mainData}>₹5000</Text>
                  <Text style={styles.minorTitle}>Transport</Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginTop: 30,
                }}
              >
                <View>
                  <Text style={styles.mainData}>₹5000</Text>
                  <Text style={styles.minorTitle}>Entertainment</Text>
                </View>
                <View>
                  <Text style={styles.mainData}>₹5000</Text>
                  <Text style={styles.minorTitle}>Miscellaneous</Text>
                </View>
              </View>
            </View>
            <Text style={{ marginTop: 30, fontWeight: "bold" }}>
              Your Total Saving for next month will be : ₹600
            </Text>
          </View>

          <View
            style={{
              ...CommonStyles.card,
              padding: 30,
              marginTop: 15,
              maxHeight: 600,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Your Recent Transactions :
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={transactions}
              style={{ marginTop: 10 }}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => (
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginTop: 20,
                    backgroundColor: "#f2f2f2",
                    padding: 12,
                    borderRadius: 10,
                  }}
                >
                  <View>
                    <Text style={CommonStyles.transactionTitle}>
                      {item.date}
                    </Text>
                    <Text style={CommonStyles.transactionSub}>
                      {item.description}
                    </Text>
                  </View>
                  <View>
                    <Text style={CommonStyles.transactionTitle}>
                      ₹{item.amount}
                    </Text>
                    <Text
                      style={{
                        ...CommonStyles.transactionSub,
                        textAlign: "right",
                      }}
                    >
                      {item.category}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tracker;

const styles = StyleSheet.create({
  mainData: {
    fontSize: 25,
    fontWeight: "bold",
  },
  minorTitle: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
});
