import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Mainscreen from "./routes/Mainscreen";
import News from "./components/News";
import Social from "./components/Social";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Mainscreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
