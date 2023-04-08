import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React,{useEffect,useContext,useState} from "react";
import { CommonStyles } from "../CommonStyles";
import axios from "axios";
import { SERVER_URL } from "../config";
import StateContext from "../context/StateContext";

const Tracker = () => {
  const { User, setLoading } = useContext(StateContext)
  const [userData, setUserData] = useState([])
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`${SERVER_URL}/api/user/${User}`)
        setUserData(data)
      } catch (err) {
        console.error(err)
        if (err.response) return alert(err.response.data)
        alert(err)
      }
      setLoading(false)
    })()
  }, [])
  return (
    <SafeAreaView style={{...CommonStyles.container}}>
      <View style={{padding:20}}>
      <Text style={{...CommonStyles.title}}>
        Hello {userData.name}
      </Text>
      </View>
    </SafeAreaView>
  );
};

export default Tracker;

const styles = StyleSheet.create({});
