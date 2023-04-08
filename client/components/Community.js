import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  Button,
  SafeAreaView,
  TextInput,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { CommonStyles } from "../CommonStyles";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import StateContext from "../context/StateContext";
import axios from "axios";
import { SERVER_URL } from "../config";

const Community = () => {
  const { User, setLoading } = useContext(StateContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    title: "",
    description: "",
    user_id: User,
  });
  const [refetch, setRefetch] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${SERVER_URL}/api/community`);
        setData(data);
      } catch (err) {
        console.error(err);
        if (err.response) return alert(err.response.data);
        alert(err);
      }
      setLoading(false);
    })();
  }, [refetch]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`${SERVER_URL}/api/register/community`, newCommunity);
      setNewCommunity({
        title: "",
        description: "",
        user_id: User,
      });
      Alert.alert("BLOG Added Successfully");
      setModalVisible(false);
      setRefetch(!refetch);
    } catch (err) {
      console.error(err);
      if (err.response) return alert(err.response.data);
      alert(err);
    }
    setLoading(false);
  };

  const DeleteCommunity = async (community_id) => {
    setLoading(true);
    try {
      await axios.delete(`${SERVER_URL}/api/community/${community_id}`);
      setRefetch(!refetch);
    } catch (err) {
      console.error(err);
      if (err.response) return alert(err.response.data);
      alert(err);
    }
    setLoading(false);
  };
  return (
    <>
      <TouchableOpacity
        style={{ ...CommonStyles.actionButton, zIndex: 1, marginBottom: 80 }}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesomeIcon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              (async () => {
                setLoading(true);
                try {
                  const { data } = await axios.get(
                    `${SERVER_URL}/api/community`
                  );
                  setData(data);
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
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={{ padding: 30, marginBottom: 105 }}
        data={data}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                ...CommonStyles.card,
                borderColor: "#007bff",
                borderWidth: "1",
                minHeight: 300,
                maxHeight: 400,
              }}
            >
              <View style={CommonStyles.cardRow}>
                <View>
                  <Text style={CommonStyles.title}>{item.title}</Text>
                  <Text style={CommonStyles.silentText}>
                    {item.description}
                  </Text>
                </View>
              </View>
              <View style={CommonStyles.divider}></View>
              <Text
                style={{
                  ...CommonStyles.silentText,
                  marginTop: 20,
                  fontWeight: "bold",
                }}
              >
                Posted By : {item.user.email_address}
              </Text>
              {User === item.user._id && (
                <View>
                  <TouchableOpacity
                    style={{
                      ...CommonStyles.outlineRedBtn,
                      width: "100%",
                      marginTop: 15,
                    }}
                    onPress={() => DeleteCommunity(item._id)}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
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
                Add a Blog / Review
              </Text>
              <TouchableOpacity
                style={{ padding: 15, paddingTop: 0 }}
                onPress={() => setModalVisible(false)}
              >
                <FontAwesomeIcon name="close" size={30} color="#000" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ ...CommonStyles.inputTitle }}>Title</Text>
              <TextInput
                value={newCommunity.title}
                style={{ ...CommonStyles.input, marginTop: 10 }}
                placeholder="Enter Title"
                onChangeText={(value) =>
                  setNewCommunity({ ...newCommunity, title: value })
                }
              />
              {/* <Text style={{ ...CommonStyles.inputTitle, marginTop: 30 }}>
                Location
              </Text>
              <TextInput
                value={newGig.location}
                style={{ ...CommonStyles.input, marginTop: 10 }}
                placeholder="Enter Location"
                onChangeText={(value) =>
                  setNewGig({ ...newGig, location: value })
                }
              /> */}
              <Text style={{ ...CommonStyles.inputTitle, marginTop: 30 }}>
                Description
              </Text>
              <TextInput
                value={newCommunity.description}
                style={{ ...CommonStyles.input, marginTop: 10 }}
                placeholder="Enter Description"
                onChangeText={(value) =>
                  setNewCommunity({ ...newCommunity, description: value })
                }
              />
            </View>
            <TouchableOpacity
              style={{
                ...CommonStyles.blueBtn,
                alignItems: "center",
                marginTop: 30,
              }}
              onPress={handleSubmit}
            >
              <Text style={{ fontWeight: "bold", color: "#fff", padding: 2 }}>
                Add BLOG
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Community;
