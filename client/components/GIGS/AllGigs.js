import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Linking,
  RefreshControl
} from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { CommonStyles } from '../../CommonStyles'
import StateContext from '../../context/StateContext'
import axios from 'axios'
import { SERVER_URL } from '../../config'

const AllGigs = () => {
  const { setLoading } = useContext(StateContext)
  const [data, setData] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`${SERVER_URL}/api/gigs`)
        setData(data)
      } catch (err) {
        console.error(err)
        if (err.response) return alert(err.response.data)
        alert(err)
      }
      setLoading(false)
    })()
  }, [])

  return (
    <FlatList
    refreshControl={
      <RefreshControl
        refreshing={false}
        onRefresh={() => {
          ;(async () => {
            setLoading(true)
            try {
              const { data } = await axios.get(`${SERVER_URL}/api/gigs`)
              setData(data)
            } catch (err) {
              console.error(err)
              if (err.response) return alert(err.response.data)
              alert(err)
            }
            setLoading(false)
          })()
        }}
      />

    }
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      style={{ padding: 30 }}
      data={data}
      renderItem={({ item }) => {
        return (
          <View style={CommonStyles.card}>
            <View style={CommonStyles.cardRow}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={CommonStyles.silentText}>{item.location}</Text>
              </View>
              <View>
                <Text style={styles.price}>₹ {item.price} /hr</Text>
              </View>
            </View>
            <Text>{item.description}</Text>
            <View style={CommonStyles.divider}></View>

            <Text
              style={{
                ...CommonStyles.silentText,
                marginTop: 20,
                fontWeight: 'bold',
              }}
            >
              Posted By : {item.user.email_address}
            </Text>
            <View>
              <TouchableOpacity
                style={{
                  ...CommonStyles.outlineBlueBtn,
                  width: '100%',
                  marginTop: 15,
                }}
                onPress={() => {
                  Linking.openURL(`tel:${item.user.phone_number}`)
                }}
              >
                <Text
                  style={{
                    ...CommonStyles.blue,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Contact
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }}
    />
  )
}

export default AllGigs

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})
