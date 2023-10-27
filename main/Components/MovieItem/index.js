import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
const MovieItem = (props) => {
  const imgPath = "https://image.tmdb.org/t/p/w500" + props.url
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={stylesMovieItem.container} onPress={()=>{
      navigation.navigate("DetailLineItem",{
        movieID: props.id,
        media_type: "movie"
      })
    }}>
      <View >
        <Image source={{ uri: imgPath }} style={stylesMovieItem.Image} />
      </View>
      <View style={stylesMovieItem.Info}>
        <Text style={{
          color: "#9DA0A8",
          fontSize: 13,
          fontFamily: "Open Sans"
        }}>
          Movie
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{
            color: "#FFF",
            fontSize: 15,
            fontFamily: "Open Sans",
            width: "80%"
          }}>
          {props.title}
        </Text>
        <Text style={{
          color: "#9DA0A8",
          fontSize: 13,
          fontFamily: "Open Sans"
        }}>
          {props.release_date}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const stylesMovieItem = StyleSheet.create({
  container: {
    width: "90%",
    marginLeft: 20,
    height: 105,
    backgroundColor: "#10121B",
    borderRadius: 18,
    flexDirection: 'row',
    marginTop: 10,
  },
  Info: {
    justifyContent: "center",
    marginLeft: 10,
    width: "90%"
  },
  Image: {
    height: 105,
    width: 70,
    borderRadius: 18,
  }
})

export default MovieItem