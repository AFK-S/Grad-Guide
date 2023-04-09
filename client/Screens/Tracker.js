import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
  Modal,
  Image,
  TextInput,
  RefreshControl,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { CommonStyles } from "../CommonStyles";
import axios from "axios";
import { SERVER_URL } from "../config";
import StateContext from "../context/StateContext";
import * as DocumentPicker from "expo-document-picker";
import RadioGroup from "react-native-radio-buttons-group";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tracker = () => {
  const { User, setLoading, Logout } = useContext(StateContext);
  const [userData, setUserData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [expenseData, setExpenseData] = useState([]);
  const [predictExpenseData, setPredictExpenseData] = useState({
    food: 0,
    travel: 0,
    entertainment: 0,
    miscellaneous: 0,
    saving: 560,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [expense, setExpense] = useState({
    amount: "",
    type_of_transaction: "",
    user_id: User,
  });

  useEffect(() => {
    // (async () => {
    //   try {
    // const user_id = await AsyncStorage.getItem('user_id')
    //     const { data } = await axios.get(
    //       `${SERVER_URL}/api/left_amount/${user_id}`
    //     );
    //     setPredictExpenseData({
    //       ...predictExpenseData,
    //       saving: data.credit_response[0].total - data.debit_response[0].total,
    //     });
    //     console.log(data);
    //   } catch (err) {
    //     console.error(err);
    //     if (err.response) return alert(err.response.data);
    //     alert(err);
    //   }
    // })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const user_id = await AsyncStorage.getItem("user_id");
        const { data } = await axios.get(`${SERVER_URL}/api/user/${user_id}`);
        setUserData(data);
        const { data: expenseData } = await axios.get(
          `${SERVER_URL}/api/transactions/predict/${user_id}`
        );
        setPredictExpenseData({
          ...predictExpenseData,
          food: expenseData.food ? expenseData.food[0].amount : 0,
          travel: expenseData.travel ? expenseData.travel[0].amount : 0,
          entertainment: expenseData.entertainment
            ? expenseData.entertainment[0].amount
            : 0,
          miscellaneous: expenseData.miscellaneous
            ? expenseData.miscellaneous[0].amount
            : 0,
          pocket_money: expenseData.pocket_money
            ? expenseData.pocket_money[0]
            : 0,
        });
      } catch (err) {
        console.error(err);
        if (err.response) return alert(err.response.data);
        alert(err);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const user_id = await AsyncStorage.getItem("user_id");
        const { data } = await axios.get(
          `${SERVER_URL}/api/transaction/${user_id}`
        );
        setExpenseData(data);
      } catch (err) {
        console.error(err);
        if (err.response) return alert(err.response.data);
        alert(err);
      }
      setLoading(false);
    })();
  }, []);

  const handleFileUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/vnd.ms-excel",
      copyToCacheDirectory: true,
    });

    if (result.type === "success") {
      // Handle the selected file here
      console.log(result.uri, result.name, result.size);
    }
  };

  const [radioButtons, setRadioButtons] = useState([
    {
      id: "1",
      label: "Food",
      value: "food",
    },
    {
      id: "2",
      label: "Travel",
      value: "travel",
    },
    {
      id: "3",
      label: "Entertainment",
      value: "entertainment",
    },
    {
      id: "4",
      label: "Miscellaneous",
      value: "miscellaneous",
    },
  ]);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    radioButtonsArray.map((radioButton) => {
      if (radioButton.selected) {
        setExpense({
          ...expense,
          type_of_transaction: radioButton.value,
        });
      }
    });
  }

  const handleSubmit = async (type) => {
    setLoading(true);
    expense.type = type;
    try {
      const user_id = await AsyncStorage.getItem("user_id");
      await axios.post(`${SERVER_URL}/api/register/transaction`, expense);
      setExpense({
        amount: "",
        user_id: user_id,
      });
      Alert.alert("Expense Added Successfully");
      setModalVisible(false);
    } catch (err) {
      console.error(err);
      if (err.response) return alert(err.response.data);
      alert(err);
    }
    setLoading(false);
  };
  const [modalVisible2, setModalVisible2] = useState(false);
  const [budget, setBudget] = useState({
    amount: "",
    user_id: User,
  });
  const SubmitBudget = async () => {
    setLoading(true);
    try {
      const user_id = await AsyncStorage.getItem("user_id");
      await axios.post(`${SERVER_URL}/api/register/income`, budget);
      setBudget({
        amount: "",
        user_id: user_id,
      });
      Alert.alert("Budget Added Successfully");
      setModalVisible2(false);
    } catch (err) {
      console.error(err);
      if (err.response) return alert(err.response.data);
      alert(err);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ ...CommonStyles.container }}>
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
          <View>
            <TouchableOpacity onPress={Logout}>
              <Image
                source={require("../assets/icons/logout.png")}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                (async () => {
                  setLoading(true);
                  try {
                    const { data } = await axios.get(
                      `${SERVER_URL}/api/transaction/${User}`
                    );
                    setExpenseData(data);
                  } catch (err) {
                    console.error(err);
                    if (err.response) return alert(err.response.data);
                    alert(err);
                  }
                  setLoading(false);
                })();
              }}
            >
              <Image
                source={require("../assets/icons/wall-clock.png")}
                style={{ width: 20, height: 20 }}
                marginTop={25}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => setModalVisible2(true)}>
          <Text style={{ fontWeight: "bold", color: "blue" }}>
            {`Set Budget`}
            <FontAwesomeIcon name="plus" size={10} color="blue" />
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequeModalstClose={() => setModalVisible2(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "#00000080",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                padding: 20,
                width: "85%",
                borderRadius: 20,
                elevation: 5,
                shadowColor: "#c6c6c678",
                marginVertical: 5,
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
                  backgroundColor: "#fff",
                  width: "100%",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Enter Your Monthly Budget
                </Text>
                <TouchableOpacity
                  style={{ padding: 15, paddingTop: 0 }}
                  onPress={() => setModalVisible2(false)}
                >
                  <FontAwesomeIcon name="close" size={30} color="#000" />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{ ...CommonStyles.inputTitle }}>Budget</Text>
                <TextInput
                  value={budget.amount}
                  style={{
                    ...CommonStyles.input,
                    marginTop: 10,
                    marginBottom: 0,
                  }}
                  placeholder="Enter Amount"
                  onChangeText={(value) =>
                    setBudget({ ...budget, amount: value })
                  }
                />
              </View>

              <TouchableOpacity
                style={{
                  ...CommonStyles.blueBtn,
                  alignItems: "center",
                  marginTop: 30,
                }}
                onPress={() => {
                  SubmitBudget();
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#fff", padding: 2 }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={{ ...CommonStyles.card, padding: 30, marginTop: 35 }}>
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
                <Text style={styles.mainData}>₹{predictExpenseData.food}</Text>
                <Text style={styles.minorTitle}>Food</Text>
              </View>
              <View>
                <Text style={styles.mainData}>
                  ₹{predictExpenseData.travel}
                </Text>
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
                <Text style={styles.mainData}>
                  ₹{predictExpenseData.entertainment}
                </Text>
                <Text style={styles.minorTitle}>Entertainment</Text>
              </View>
              <View>
                <Text style={styles.mainData}>
                  ₹{predictExpenseData.miscellaneous}
                </Text>
                <Text style={styles.minorTitle}>Miscellaneous</Text>
              </View>
            </View>
          </View>
          <Text style={{ marginTop: 30, fontWeight: "bold" }}>
            Your Savings are ₹
            {predictExpenseData.pocket_money -
              (predictExpenseData.food +
                predictExpenseData.travel +
                predictExpenseData.entertainment +
                predictExpenseData.miscellaneous)}
          </Text>
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>
            Your Budget is set to ₹{predictExpenseData.pocket_money}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            ...CommonStyles.blueBtn,
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={handleFileUpload}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", padding: 5 }}>
            Uplaod your monthly statement
          </Text>
        </TouchableOpacity>
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
            RefreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => {
                  (async () => {
                    setLoading(true);
                    try {
                      const { data } = await axios.get(
                        `${SERVER_URL}/api/user/${User}`
                      );
                      setUserData(data);
                      const { data: expenseData } = await axios.get(
                        `${SERVER_URL}/api/transactions/predict/${User}`
                      );
                      setPredictExpenseData({
                        food: expenseData.food ? expenseData.food[0].amount : 0,
                        travel: expenseData.travel
                          ? expenseData.travel[0].amount
                          : 0,
                        entertainment: expenseData.entertainment
                          ? expenseData.entertainment[0].amount
                          : 0,
                        miscellaneous: expenseData.miscellaneous
                          ? expenseData.miscellaneous[0].amount
                          : 0,
                      });
                    } catch (err) {
                      console.error(err);
                      if (err.response) return alert(err.response.data);
                      alert(err);
                    }
                    setLoading(false);
                  })();
                }}
              />
            }
            showsVerticalScrollIndicator={false}
            data={expenseData}
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
                  <Text
                    style={{
                      ...CommonStyles.transactionSub,
                      textAlign: "left",
                      marginBottom: 5,
                    }}
                  >
                    {item.type_of_transaction}
                  </Text>
                  <Text style={CommonStyles.transactionTitle}>{item.date}</Text>
                </View>
                <View>
                  <Text
                    style={{
                      ...CommonStyles.transactionTitle,
                      fontSize: 25,
                    }}
                  >
                    {item.type === "debit" && "-"}₹{item.amount}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{ ...CommonStyles.actionButton, zIndex: 1, bottom: 10 }}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesomeIcon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequeModalstClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#00000080",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              width: "85%",
              borderRadius: 20,
              elevation: 5,
              shadowColor: "#c6c6c678",
              marginVertical: 5,
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
                backgroundColor: "#fff",
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Add a Transaction
              </Text>
              <TouchableOpacity
                style={{ padding: 15, paddingTop: 0 }}
                onPress={() => setModalVisible(false)}
              >
                <FontAwesomeIcon name="close" size={30} color="#000" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ ...CommonStyles.inputTitle }}>Amount</Text>
              <TextInput
                value={expense.amount}
                style={{
                  ...CommonStyles.input,
                  marginTop: 10,
                  marginBottom: 20,
                }}
                placeholder="Enter Amount"
                onChangeText={(value) =>
                  setExpense({ ...expense, amount: value })
                }
              />
            </View>
            <View style={{ alignItems: "flex-start" }}>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={onPressRadioButton}
                containerStyle={{ alignItems: "flex-start", marginTop: 5 }}
                value={expense.category}
              />
            </View>

            {/* <TouchableOpacity
              style={{
                ...CommonStyles.blueBtn,
                backgroundColor: 'green',
                alignItems: 'center',
                marginTop: 30,
              }}
              onPress={() => handleSubmit('credit')}
            >
              <Text style={{ fontWeight: 'bold', color: '#fff', padding: 2 }}>
                Credit
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{
                ...CommonStyles.redBtn,
                alignItems: "center",
                marginTop: 10,
              }}
              onPress={() => handleSubmit("debit")}
            >
              <Text style={{ fontWeight: "bold", color: "#fff", padding: 2 }}>
                Debit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
