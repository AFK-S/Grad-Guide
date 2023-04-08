import { StyleSheet, Text, View,SafeAreaView,FlatList,TouchableOpacity } from "react-native";
import React from "react";
import { CommonStyles } from "../CommonStyles";

const Gigs = () => {
  // const [gigs, setGigs] = React.useState([]);
  
  const data = [
    {
      "title": "Gig 1",
      "description": "Guys please make your repo names as djcsi_ Make it a private repo and add djcsi-codeshastra-9 as collaboratorsThis is a gig",
      "price": 100,
      "location": "Bangalore",
      "user" : "userhere@gmail.com"
    },
    {
      "title": "Gig 2",
      "description": "Guys please make your repo names as djcsi_ Make it a private repo and add djcsi-codeshastra-9 as collaboratorsThis is a gig",
      "price": 90,
      "location": "Bangalore",
      "user" : "userhere@gmail.com"
    },
    {
      "title": "Gig 2",
      "description": "Guys please make your repo names as djcsi_ Make it a private repo and add djcsi-codeshastra-9 as collaboratorsThis is a gig",
      "price": 90,
      "location": "Bangalore",
      "user" : "userhere@gmail.com"
    },
  ]

  return (
    <SafeAreaView style={CommonStyles.container}>
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

                <View style={{marginTop:15, display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-between"}}>
                <TouchableOpacity style={{...CommonStyles.outlineBlueBtn,width:"48%"}}>
                  <Text style={{color:"#007bff",textAlign:"center",fontWeight:"bold"}}>Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...CommonStyles.blueBtn,width:"48%"}}>
                  <Text style={{color:"white",textAlign:"center",fontWeight:"bold"}}>Apply</Text>
                </TouchableOpacity>
                </View>

                </View>
               </View>
              )
          }}
     />
    </SafeAreaView>
  );
};

export default Gigs;

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
