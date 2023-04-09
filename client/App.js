import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Mainscreen from './routes/Mainscreen'
import Auth from './Screens/auth/AuthScreen'
import React, { useContext } from 'react'
import StateContext, { StateProvider } from './context/StateContext'
import Loading from './components/Loading'

const Stack = createStackNavigator()
export default function App() {
  return (
    <StateProvider>
      <NavigationContainer>
        <Provider />
        <Loading />
      </NavigationContainer>
    </StateProvider>
  )
}

const Provider = () => {
  const { isLogin } = useContext(StateContext)
  return <>{isLogin ? <Mainscreen /> : <Auth />}</>
}
