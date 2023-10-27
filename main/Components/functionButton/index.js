import { Text } from "@rneui/themed";
import React from "react";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";

const FunctionButton = (props) => {
  return (
    <View style={{
      alignItems: "center"
    }}>
      <TouchableOpacity style={stylesBtn.btn} onPress={props.action}>
        <Image source={props.url}></Image>
      </TouchableOpacity>
      <Text style={{
        fontSize: 14,
        fontWeight: 400,
        color: "#9DA0A8"
      }}>{props.name}</Text>
    </View>
  )
}
const stylesBtn = StyleSheet.create({
  btn: {
    width: 46,
    height: 46,
    borderRadius: 15,
    borderColor: "#161C33",
    borderWidth: 3,
    backgroundColor: "#10121B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginLeft: 12
  }
})
export default FunctionButton