import { StyleSheet, Text, View,FlatList,TouchableOpacity, Alert,Modal,Button,SafeAreaView,TextInput } from "react-native";
import React,{useState,useContext} from "react";
import { CommonStyles } from "../../CommonStyles";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import StateContext from '../../context/StateContext'

const MyGigs = () => {
    const { User} = useContext(StateContext)
const [modalVisible, setModalVisible] = useState(false);
const [newGig, setNewGig] = useState({
    title: "",
    description: "",
    price:"",
    location:"",
    user_id: User,
});
const [data, setData] = useState([
    {
        "title": "Gig 1",
        "description": "Guys please make your repo names as djcsi_ Make it a private repo and add djcsi-codeshastra-9 as collaboratorsThis is a gig",
        "price": 100,
        "location": "Bangalore",
        "user" : "userhere@gmail.com",
        "contact_number": "1234567890"
    }
]);

  const handleSubmit = () => {
    console.log(newGig);
    setNewGig({
        title: "",
        description: "",
        price:"",
        location:"",
        user_id: User,
    });
    setData([...data, newGig]);
    Alert.alert("Gig Added Successfully");
    setTimeout(() => {
        setModalVisible(false);
    }, 1000);
    
    };

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
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
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
              <Text style={{fontSize:20,fontWeight:"bold"}}>Add a GIG</Text>
              <TouchableOpacity
                style={{ padding: 15, paddingTop: 0 }}
                onPress={() => setModalVisible(false)}
              >
                <FontAwesomeIcon name="close" size={30} color="#000" />
              </TouchableOpacity>
            </View>
            <View>
                <Text style={{...CommonStyles.inputTitle}}>Title</Text>
                <TextInput
                value={newGig.title}
                style={{...CommonStyles.input,marginTop:10}}
                placeholder="Enter Title"
                onChangeText={(value) => setNewGig({...newGig,title:value})}
                />
                <Text style={{...CommonStyles.inputTitle,marginTop:30}}>Location</Text>
                <TextInput
                value={newGig.location}
                style={{...CommonStyles.input,marginTop:10}}
                placeholder="Enter Location"
                onChangeText={(value) => setNewGig({...newGig,location:value})}
                />
                <Text style={{...CommonStyles.inputTitle,marginTop:30}}>Description</Text>
                <TextInput
                value={newGig.description}
                style={{...CommonStyles.input,marginTop:10}}
                placeholder="Enter Description"
                onChangeText={(value) => setNewGig({...newGig,description:value})}
                />
                <Text style={{...CommonStyles.inputTitle,marginTop:30}}>Price /hr</Text>
                <TextInput
                keyboardType="numeric"
                value={newGig.price}
                style={{...CommonStyles.input,marginTop:10}}
                placeholder="Enter Price/hr"
                onChangeText={(value) => setNewGig({...newGig,price:value})}
                />
            </View>
            <TouchableOpacity style={{...CommonStyles.blueBtn,alignItems:"center",marginTop:30}} onPress={handleSubmit}>
                <Text style={{fontWeight:"bold",color:"#fff",padding:2}}>
                    Add GIG
                </Text>
            </TouchableOpacity>
          </View>
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
