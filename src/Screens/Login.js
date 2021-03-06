import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Dimensions } from "react-native";
import Home from "./Home";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
function Login({ navigation }) {
   React.useEffect(
     () =>
       navigation.addListener("beforeRemove", (e) => {
         e.preventDefault();
       }),
     [navigation]
   );
  const [name, onChangeText] = React.useState("Useless Placeholder");
  const [password, onChangePassword] = React.useState("Useless Placeholder");
  let token, id;
  async function getData() {
    await axios
      .post(
        "http://192.168.1.146:4000/users/authenticate",

        { username: name, password: password }
      )
      .then(async (res) => {
        console.log(res.data);
        token = res.data.token;
        const jsontoken = JSON.stringify(res.data.token);
        await AsyncStorage.setItem("token", jsontoken);
        const jsonid = JSON.stringify(res.data.id);
        await AsyncStorage.setItem("id", jsonid);
        navigation.navigate("home");
      })
      .catch((message) => {
        alert(message);
      });
  }

  const keyboardVerticalOffset =
    Platform.OS === "android" ? -ht * 0.038 : -ht * 0.1;
  const [col, setCol] = useState("#4D4F79");
  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        keyboardVerticalOffset={keyboardVerticalOffset}
        behavior="position"
        style={styles.container}
      >
        <View style={{ marginTop: ht * 0.01, marginBottom: ht * 0.06 }}>
          <Image style={styles.logo} source={require("../../assets/ipl.jpg")} />
          <Text
            style={{ color: "white", fontSize: ht * 0.03, textAlign: "center" }}
          >
            Login to your account
          </Text>
        </View>
        <View style={{ marginBottom: ht * 0.03 }}>
          <Text
            style={{ color: "white", fontSize: ht * 0.03, textAlign: "left" }}
          >
            UserName
          </Text>
          <TextInput
            placeholder="Enter username"
            placeholderTextColor="orange"
            style={{
              height: ht * 0.055,
              borderColor: "gray",
              borderWidth: 3,
              width: wd * 0.8,
              borderRadius: 10,
              paddingTop: ht * 0.01,
              paddingLeft: wd * 0.04,
              color: "white",
            }}
            onChangeText={(text) => onChangeText(text)}
            autoFocus={true}
            // clearTextOnFocus={true}
            // defaultValue="shubham"
            // editable={false}
          />
        </View>
        <View style={{ marginBottom: ht * 0.03 }}>
          <Text style={{ color: "white", fontSize: ht * 0.03 }}>Password</Text>
          <TextInput
            secureTextEntry
            placeholder="Enter Password"
            placeholderTextColor="orange"
            style={{
              height: ht * 0.055,
              borderColor: "gray",
              borderWidth: 3,
              width: wd * 0.8,
              borderRadius: 10,
              paddingTop: ht * 0.01,
              paddingLeft: wd * 0.04,
              color: "white",
            }}
            onChangeText={(text) => onChangePassword(text)}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              getData();
            }}
            style={styles.button}
          >
            <Text
              style={{
                color: "white",
                fontSize: ht * 0.04,
                textAlign: "center",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("registration");
            }}
            style={styles.button1}
          >
            <Text
              style={{
                color: "white",
                fontSize: ht * 0.04,
                textAlign: "center",
              }}
            >
              Registration
            </Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4D4F79",
    alignItems: "center",
    // justifyContent: "center",
  },
  logo: {
    width: wd * 0.35,
    height: wd * 0.35,
    borderRadius: 40,
    alignSelf: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#3EA03B",
    padding: ht * 0.002,
    width: wd * 0.8,
    height: ht * 0.07,
    borderRadius: 30,
    marginTop: ht * 0.03,
  },
  button1: {
    alignItems: "center",
    backgroundColor: "#19388A",
    padding: ht * 0.002,
    width: wd * 0.8,
    height: ht * 0.07,
    borderRadius: 30,
    marginTop: ht * 0.03,
  },
});
