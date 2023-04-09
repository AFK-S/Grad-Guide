import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Expenses from '../components/Expenses'
import Gigs from '../Screens/Gigs'
import Lending from '../components/Lending'
import React from 'react'
import Social from '../components/Social'
import News from '../components/News'

const Mainscreen = () => {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator
      initialRouteName="Expenses"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          padding: 50,
          height: 100,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.07,
          shadowRadius: 20,
          elevation: 2,
        },
      }}
    >
      <Tab.Screen
        name="Gigs"
        options={{
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                top: Platform.OS === 'android' ? 0 : -15,
                padding: 20,
                borderRadius: 15,
                aspectRatio: 1,
                marginBottom: Platform.OS === 'ios' ? 0 : 45,
              }}
            >
              <Image
                source={require('../assets/icons/freelance.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          ),
        }}
        component={Gigs}
      />
      <Tab.Screen
        name="Social"
        options={{
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                top: Platform.OS === 'android' ? 0 : -15,
                padding: 20,
                borderRadius: 15,
                aspectRatio: 1,
                marginBottom: Platform.OS === 'ios' ? 0 : 45,
              }}
            >
              <Image
                source={require('../assets/icons/network.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          ),
        }}
        component={Social}
      />
      <Tab.Screen
        name="Expenses"
        options={{
          headerShown:true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                top: Platform.OS === 'android' ? 0 : -15,
                padding: 20,
                borderRadius: 15,
                aspectRatio: 1,
                marginBottom: Platform.OS === 'ios' ? 0 : 45,
              }}
            >
              <Image
                source={require('../assets/icons/budget.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          ),
        }}
        component={Expenses}
      />
      <Tab.Screen
        name="Finances"
        options={{
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                top: Platform.OS === 'android' ? 0 : -15,
                padding: 20,
                borderRadius: 15,
                aspectRatio: 1,
                marginBottom: Platform.OS === 'ios' ? 0 : 45,
              }}
            >
              <Image
                source={require('../assets/icons/creditor.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          ),
        }}
        component={Lending}
      />
      <Tab.Screen
        name="News"
        options={{
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                top: Platform.OS === 'android' ? 0 : -15,
                padding: 20,
                borderRadius: 15,
                aspectRatio: 1,
                marginBottom: Platform.OS === 'ios' ? 0 : 45,
              }}
            >
              <Image
                source={require('../assets/icons/news.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          ),
        }}
        component={News}
      />
    </Tab.Navigator>
  )
}

export default Mainscreen

const styles = StyleSheet.create({})
