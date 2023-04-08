import { StyleSheet, Text, View,SafeAreaView,FlatList,TouchableOpacity,Linking } from "react-native";
import React from "react";
import { CommonStyles } from "../../CommonStyles";

const AllGigs = () => {
  // const [gigs, setGigs] = React.useState([]);
  
  const data = [
    {
      "title": "Gig 1",
      "description": "Guys please make your repo names as djcsi_ Make it a private repo and add djcsi-codeshastra-9 as collaboratorsThis is a gig",
      "price": 100,
      "location": "Bangalore",
      "user" : "userhere@gmail.com",
      "contact_number": "1234567890"
    },
    {
      "title": "Gig 2",
      "description": "Guys please make your repo names as djcsi_ Make it a private repo and add djcsi-codeshastra-9 as collaboratorsThis is a gig",
      "price": 90,
      "location": "Bangalore",
      "user" : "userhere@gmail.com",
      "contact_number": "987654375"
    },
    {
      "title": "Gig 2",
      "description": "Guys please make your repo names as djcsi_ Make it a private repo and add djcsi-codeshastra-9 as collaboratorsThis is a gig",
      "price": 90,
      "location": "Bangalore",
      "user" : "userhere@gmail.com",
      "contact_number": "1234567890"
    },
  ]

  return (
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

                <TouchableOpacity style={{...CommonStyles.outlineBlueBtn,width:"100%",marginTop:15}}
                onPress={()=>{
                  Linking.openURL(`tel:${item.contact_number}`);
                }}
                >
                  <Text style={{...CommonStyles.blue,textAlign:"center",fontWeight:"bold"}}>Contact</Text>
                </TouchableOpacity>
                </View>
               </View>
              )
          }}
     />
  );
};

export default AllGigs;

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
