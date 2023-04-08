import { StyleSheet, Text, View,FlatList,TouchableOpacity, Alert,Modal,Button } from "react-native";
import React,{useState} from "react";
import { CommonStyles } from "../../CommonStyles";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';



const MyGigs = () => {
const [modalVisible, setModalVisible] = useState(false);
  
  const data = [
    {
      "title": "Gig 1",
      "description": "Guys please make your repo names as djcsi_ Make it a private repo and add djcsi-codeshastra-9 as collaboratorsThis is a gig",
      "price": 100,
      "location": "Bangalore",
      "user" : "userhere@gmail.com",
      "contact_number": "1234567890"
    },
  ]

  return (
    <>
    <TouchableOpacity style={{...CommonStyles.actionButton, zIndex: 1}}
    onPress={() => setModalVisible(true)} >
    <FontAwesomeIcon name="plus" size={30} color="#fff" />
    </TouchableOpacity>
     <FlatList 
          keyExtractor={(item,index)=>index.toString()}
          showsVerticalScrollIndicator={false}
          style={{padding:30}}
          data={data}
          renderItem={({item}) =>{
              return(
                <View style={CommonStyles.card}>
                <View style={CommonStyles.cardRow}>
                  <View>
                  <Text style={styles.title}>
                    {item.title}
                  </Text>
                  <Text style={CommonStyles.silentText}>
                    {item.location}
                  </Text>
                  </View>
                <View>
                  <Text style={styles.price}>
                  ₹ {item.price} /hr
                  </Text>
                </View>
                </View>
                <Text>
                {item.description}
                </Text>
                <View style={CommonStyles.divider}></View>
               
                <Text style={{...CommonStyles.silentText,marginTop:20,fontWeight:"bold"}}>Posted By : {item.user}</Text>
                <View>

                <TouchableOpacity style={{...CommonStyles.outlineRedBtn,width:"100%",marginTop:15}}
               onPress={() => setModalVisible(false)}
                >
                  <Text style={{textAlign:"center",fontWeight:"bold",color:"red"}}>Cancel</Text>
                </TouchableOpacity>
                </View>
               </View>
              )
          }}
     />
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: 'black', opacity: 0.7, }}>
          <Text>This is the modal content!</Text>
          <Button title="Close Modal"  onPress={() => setModalVisible(false)}/>
        </View>
      </Modal>
     </>
  );
};

export default MyGigs;

const styles = StyleSheet.create({
  title:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:7,
  },
  price:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:10,
  }
});
