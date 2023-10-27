import { Text } from "@rneui/themed";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
const CardMovie = (props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={props.action}>
      <Image source={props.url} style={styles.imgFilm}></Image>
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.nameFilm}>{props.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 106.67,
    marginLeft: 20,
    marginTop: 10,
    alignItems: "center"
  },
  imgFilm: {
    width: 106.67,
    height: 160,
    borderRadius: 20,
    
  },
  setting: {
    position: "absolute",
    top: 10,
    left: 84
  },
  nameFilm: {
    color: "#FFFFFF",
    textAlign: "center",
    width: "70%"
  },
})

export default CardMovie