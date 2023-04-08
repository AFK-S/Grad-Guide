import {
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useContext } from 'react'
import axios from 'axios'
import Styles from '../CommonStyles'
import StateContext from '../context/StateContext'
import { SERVER_URL } from '../config'

const Register = ({ navigation }) => {
  const { setIsLogin, setLoading } = useContext(StateContext)
  const [register, setRegister] = useState({
    name: '',
    email_address: '',
    phone_number: '',
    age: '',
    dob: '',
    password: '',
  })

  const onSubmit = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/api/register/user`,
        register,
      )
      await AsyncStorage.setItem('user_id', data)
      setRegister({
        name: '',
        email_address: '',
        phone_number: '',
        age: '',
        dob: '',
        password: '',
      })
      setIsLogin(true)
    } catch (err) {
      console.error(err)
      if (err.response) return alert(err.response.data)
      alert(err)
    }
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView style={{ width: '100%', maxWidth: 500 }}>
        <Text style={[Styles.bold, styles.title]}>
          Tell us more about you :)
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setRegister({ ...register, name: text })}
          value={register.name}
          autoCapitalize="none"
          autoComplete="off"
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          onChangeText={(text) =>
            setRegister({ ...register, email_address: text })
          }
          value={register.email_address}
          autoCapitalize="none"
          autoComplete="off"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="numeric"
          onChangeText={(text) =>
            setRegister({ ...register, phone_number: text })
          }
          value={register.phone_number}
          autoCapitalize="none"
          autoComplete="off"
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          onChangeText={(text) => setRegister({ ...register, age: text })}
          value={register.age}
          autoCapitalize="none"
          autoComplete="off"
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          onChangeText={(text) => setRegister({ ...register, dob: text })}
          value={register.dob}
          autoCapitalize="none"
          autoComplete="off"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setRegister({ ...register, password: text })}
          autoCapitalize="none"
          autoComplete="off"
          value={register.password}
        />
        <TouchableOpacity
          onPress={onSubmit}
          style={{ ...Styles.button, marginTop: 10 }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => navigation.navigate('register')}
        >
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Styles.medium.fontFamily,
            }}
            autoCapitalize="none"
            autoComplete="off"
          >
            Back
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 100,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 50,
  },
  input: {
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: Styles.bold.fontFamily,
    fontSize: 18,
  },
})

export default Register
