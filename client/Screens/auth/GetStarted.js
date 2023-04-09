import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Styles from '../../CommonStyles'

const GetStarted = ({ navigation }) => {
  return (
    <View style={styles.mainCon}>
      <View style={styles.upperPattern}></View>
      <View style={styles.textCon}>
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: '#f7f7f7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('../../assets/logo.jpg')}
            style={{ width: 150, height: 150, borderRadius: 30 }}
          />
        </View>
        <Text
          style={[
            {
              fontWeight: '600',
            },
            styles.title,
          ]}
        >
          GradGuide
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('login')}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: '600',
              fontSize: 18,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainCon: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f7f7f7',
  },
  upperPattern: {
    backgroundColor: '#007bff',
    height: '40%',
    borderBottomEndRadius: 100,
    borderBottomStartRadius: 100,
  },
  textCon: {
    display: 'flex',
    alignItems: 'center',
    marginTop: -80,
  },
  title: {
    fontSize: 50,
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 12,
    position: 'absolute',
    top: '180%',
    paddingHorizontal: 50,
  },
})

export default GetStarted
