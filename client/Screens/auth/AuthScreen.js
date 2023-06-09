import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import GetStarted from './GetStarted'
import Register from './Register'
import Login from './Login'

const AuthScreen = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="home"
        component={GetStarted}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
        component={Login}
      />
    </Stack.Navigator>
  )
}

export default AuthScreen
