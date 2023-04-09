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
  TextInput,
} from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { CommonStyles } from '../CommonStyles'
import axios from 'axios'
import { SERVER_URL } from '../config'
import StateContext from '../context/StateContext'
import * as DocumentPicker from 'expo-document-picker'
import RadioGroup from 'react-native-radio-buttons-group'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const Tracker = () => {
  const { User, setLoading } = useContext(StateContext)
  const [userData, setUserData] = useState([])
  const [expenseData, setExpenseData] = useState([])
  const [predictExpenseData, setPredictExpenseData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [expense, setExpense] = useState({
    amount: '',
    type_of_transaction: '',
    user_id: User,
  })

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`${SERVER_URL}/api/user/${User}`)
        setUserData(data)
        const { data: expenseData } = await axios.get(
          `${SERVER_URL}/api/transactions/predict/${User}`,
        )
        setPredictExpenseData(expenseData)
      } catch (err) {
        console.error(err)
        if (err.response) return alert(err.response.data)
        alert(err)
      }
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `${SERVER_URL}/api/transaction/${User}`,
        )
        setExpenseData(data)
      } catch (err) {
        console.error(err)
        if (err.response) return alert(err.response.data)
        alert(err)
      }
      setLoading(false)
    })()
  }, [])

  const handleFileUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/vnd.ms-excel',
      copyToCacheDirectory: true,
    })

    if (result.type === 'success') {
      // Handle the selected file here
      console.log(result.uri, result.name, result.size)
    }
  }

  const [radioButtons, setRadioButtons] = useState([
    {
      id: '1',
      label: 'Food',
      value: 'food',
    },
    {
      id: '2',
      label: 'Travel',
      value: 'travel',
    },
    {
      id: '3',
      label: 'Entertainment',
      value: 'entertainment',
    },
    {
      id: '4',
      label: 'Miscellaneous',
      value: 'miscellaneous',
    },
  ])

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray)
    radioButtonsArray.map((radioButton) => {
      if (radioButton.selected) {
        setExpense({
          ...expense,
          type_of_transaction: radioButton.value,
        })
      }
    })
  }

  const handleSubmit = async (type) => {
    setLoading(true)
    expense.type = type
    try {
      await axios.post(`${SERVER_URL}/api/register/transaction`, expense)
      setExpense({
        amount: '',
        user_id: User,
      })
      Alert.alert('Expense Added Successfully')
      setModalVisible(false)
    } catch (err) {
      console.error(err)
      if (err.response) return alert(err.response.data)
      alert(err)
    }
    setLoading(false)
  }

  return (
    <SafeAreaView style={{ ...CommonStyles.container }}>
      <ScrollView>
        <View style={{ padding: 30 }}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <Text style={{ ...CommonStyles.title }}>Hello {userData.name}</Text>
            <TouchableOpacity onPress={() => Alert.alert('logout')}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={{ fontWeight: 'bold', color: 'blue' }}>
              {`Set Budget  `}
              <FontAwesomeIcon name="plus" size={10} color="blue" />
            </Text>
          </TouchableOpacity>

          <View style={{ ...CommonStyles.card, padding: 30, marginTop: 35 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Your Next Month Plan is :
            </Text>
            <View>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 20,
                }}
              >
                <View>
                  <Text style={styles.mainData}>
                    ₹
                    {predictExpenseData.food
                      ? predictExpenseData.food[0].amount
                      : 0}
                  </Text>
                  <Text style={styles.minorTitle}>Food</Text>
                </View>
                <View>
                  <Text style={styles.mainData}>
                    ₹
                    {predictExpenseData.travel
                      ? predictExpenseData.travel[0].amount
                      : 0}
                  </Text>
                  <Text style={styles.minorTitle}>Transport</Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 30,
                }}
              >
                <View>
                  <Text style={styles.mainData}>
                    ₹
                    {predictExpenseData.entertainment
                      ? predictExpenseData.entertainment[0].amount
                      : 0}
                  </Text>
                  <Text style={styles.minorTitle}>Entertainment</Text>
                </View>
                <View>
                  <Text style={styles.mainData}>
                    ₹
                    {predictExpenseData.miscellaneous
                      ? predictExpenseData.miscellaneous[0].amount
                      : 0}
                  </Text>
                  <Text style={styles.minorTitle}>Miscellaneous</Text>
                </View>
              </View>
            </View>
            <Text style={{ marginTop: 30, fontWeight: 'bold' }}>
              Your Total Saving for next month will be : ₹
              {predictExpenseData.pocket_money &&
              predictExpenseData.food &&
              predictExpenseData.travel &&
              predictExpenseData.entertainment &&
              predictExpenseData.miscellaneous
                ? predictExpenseData.pocket_money[0] -
                  (predictExpenseData.food[0].amount +
                    predictExpenseData.travel[0].amount +
                    predictExpenseData.entertainment[0].amount +
                    predictExpenseData.miscellaneous[0].amount)
                : 0}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              ...CommonStyles.blueBtn,
              alignItems: 'center',
              marginBottom: 20,
            }}
            onPress={handleFileUpload}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', padding: 5 }}>
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
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Your Recent Transactions :
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={expenseData}
              style={{ marginTop: 10 }}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => (
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 20,
                    backgroundColor: '#f2f2f2',
                    padding: 12,
                    borderRadius: 10,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        ...CommonStyles.transactionSub,
                        textAlign: 'left',
                        marginBottom: 5,
                      }}
                    >
                      {item.type_of_transaction}
                    </Text>
                    <Text style={CommonStyles.transactionTitle}>
                      {item.date}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        ...CommonStyles.transactionTitle,
                        fontSize: 25,
                      }}
                    >
                      ₹{item.amount}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
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
            justifyContent: 'center',
            backgroundColor: '#00000080',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              width: '85%',
              borderRadius: 20,
              elevation: 5,
              shadowColor: '#c6c6c678',
              marginVertical: 5,
              shadowOffset: {
                width: 0,
                height: 2,
              },
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                width: '100%',
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
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
            <View style={{ alignItems: 'flex-start' }}>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={onPressRadioButton}
                containerStyle={{ alignItems: 'flex-start', marginTop: 5 }}
                value={expense.category}
              />
            </View>

            <TouchableOpacity
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
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...CommonStyles.redBtn,
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() => handleSubmit('debit')}
            >
              <Text style={{ fontWeight: 'bold', color: '#fff', padding: 2 }}>
                Debit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default Tracker

const styles = StyleSheet.create({
  mainData: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  minorTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
})
