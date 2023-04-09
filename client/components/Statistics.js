import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { BarChart, ProgressChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import axios from 'axios'
import { SERVER_URL } from '../config'
import StateContext from '../context/StateContext'

const screenWidth = Dimensions.get('window').width

const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#FFFFFF',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 6,
  barPercentage: 1,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
}

const Statistics = () => {
  const { User, setLoading } = useContext(StateContext)
  const [predictExpenseData, setPredictExpenseData] = useState([])
  const [carbonFootprint, setCarbonFootprint] = useState([])
  const data2 = {
    // labels: ['Swim', 'Bike', 'Run'],
    data: carbonFootprint,
  }
  const data = {
    labels: ['Food', 'Travel', 'Entertainment', 'Miscellaneous'],
    datasets: [
      {
        data: predictExpenseData,
      },
    ],
  }

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `${SERVER_URL}/api/transactions/predict/${User}`,
        )
        setPredictExpenseData([
          data.food[0].amount,
          data.travel[0].amount,
          data.entertainment[0].amount,
          data.miscellaneous[0].amount,
        ])
        setCarbonFootprint([
          data.food[0].amount / 100,
          data.travel[0].amount / 100,
          data.entertainment[0].amount / 100,
          data.miscellaneous[0].amount / 100,
        ])
      } catch (err) {
        console.error(err)
        if (err.response) return alert(err.response.data)
        alert(err)
      }
      setLoading(false)
    })()
  }, [])

  return (
    <ScrollView
      // showsVerticalScrollIndicator="false"
      style={{ paddingBottom: 30, marginBottom: 80 }}
    >
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <BarChart
          style={(alignContent = 'center')}
          data={data}
          width={screenWidth}
          height={500}
          yAxisLabel="₹"
          chartConfig={chartConfig}
          verticalLabelRotation={0}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          Your Track Percentage
        </Text>
        <ProgressChart
          data={data2}
          width={screenWidth}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
        />
      </View>
    </ScrollView>
  )
}

export default Statistics
