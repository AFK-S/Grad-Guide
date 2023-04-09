import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BarChart, ProgressChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientTo: "#FFFFFF",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 6,
  barPercentage: 1,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
};

const Statistics = () => {
  const data2 = {
    labels: ["Swim", "Bike", "Run"],
    data: [0.4, 0.6, 0.8],
  };
  const data = {
    labels: ["Food", "Travel", "Entertainment", "Miscellaneous"],
    datasets: [
      {
        data: [32, 45, 22, 80],
      },
    ],
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator="false"
      style={{ paddingBottom: 30, marginBottom: 80 }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <BarChart
          style={(alignContent = "center")}
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
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          Your Carbon Footprint
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
  );
};

export default Statistics;

const styles = StyleSheet.create({});
