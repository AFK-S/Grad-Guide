import { View, Text,SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CommonStyles } from '../CommonStyles'
import AllGigs from '../components/GIGS/AllGigs'
import MyGigs from '../components/GIGS/MyGigs';
import { Ionicons } from "@expo/vector-icons";


const Gigs = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    
    <SafeAreaView style={CommonStyles.container}>
      <Tab.Navigator
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Text
            style={{
              fontWeight: focused ? "bold":"normal",
              paddingHorizontal:15
           }}
           >
              All Gigs
           </Text>
          ),
        }}
        component={AllGigs}
        name="LentTransaction"
      />
      <Tab.Screen
        options={{
          title: ({  focused ,fontWeight}) => (
           <Text
           style={{
              fontWeight: focused ? "bold":"normal"
           }}
           >
              My Gigs
           </Text>
          ),
        }}
        component={MyGigs}
        name="Borrowed"
      />
    </Tab.Navigator>
    </SafeAreaView>
  )
}

export default Gigs