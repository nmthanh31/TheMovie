import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Text } from '@rneui/themed';

const CastItem = (props) => {
  const imgPath = "https://image.tmdb.org/t/p/w500" + props.url
  return (
    <TouchableOpacity style={stylesCastItem.container}>
      <View >
        <Image source={{ uri: imgPath }} style={stylesCastItem.Image} />
      </View>
      <View style={stylesCastItem.Info}>
        <Text

          style={{
            color: "#FFF",
            fontSize: 15,
            fontFamily: "Open Sans",
            width: "80%"
          }}
        >
          {props.name}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{
            color: "#9DA0A8",
            fontSize: 13,
            fontFamily: "Open Sans",
            width: "90%"
          }}
        >
          {props.character}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const stylesCastItem = StyleSheet.create({
  container: {
    width: 237,
    marginLeft: 10,
    height: 73,
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
    height: 65,
    width: 50,
    borderRadius: 12,
    marginLeft: 4,
    marginTop: 4
  }
})

export default CastItem