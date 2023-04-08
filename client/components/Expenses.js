import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Ionicons } from '@expo/vector-icons'

import Tracker from './Tracker'
import Statistics from './Statistics'

const Tab = createMaterialTopTabNavigator()
const Expenses = () => {
  return (
    <Tab.Navigator
      style={{
        paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
      }}
    >
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? 'pie-chart' : 'pie-chart-outline'}
              color={focused ? 'black' : '#272727'}
            />
          ),
        }}
        component={Tracker}
        name="Tracker"
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? 'stats-chart' : 'stats-chart-outline'}
              color={focused ? 'black' : '#272727'}
            />
          ),
        }}
        component={Statistics}
        name="Statistics"
      />
    </Tab.Navigator>
  )
}

export default Expenses

const styles = StyleSheet.create({})
