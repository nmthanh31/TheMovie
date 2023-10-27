
import React from 'react';
import { View, TouchableOpacity, Image, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { Text } from '@rneui/themed';
import MovieItem from 'main/Components/MovieItem';
import dayjs from 'dayjs'
import useSWR from 'swr'
import axios from 'axios';
import { mvdbkey } from 'main/Config/env';
const UpComing = (props) => {
  const API_URL = "https://api.themoviedb.org/3/movie/upcoming"
  const fetchMovie = async () => {
    const { data: { results } } = await axios.get(API_URL, {
      params: {
        api_key: mvdbkey,
      }
    })
    return results
  }
  const { data, isLoading } = useSWR(API_URL, fetchMovie)
  if (isLoading) return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#090B14"
    }}>
      <View style={stylesHeader.top}>
        <View>
          <Text style={stylesHeader.title}>Upcoming</Text>
        </View>
        <TouchableOpacity
          style={stylesHeader.revert}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <Image source={require('../../Assets/Revert.png')} />
        </TouchableOpacity>
      </View>
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <View style={[stylesLoading.container, stylesLoading.horizontal]}>
          <ActivityIndicator size="large" color="#F7BE13" />
        </View>
      </View>
    </SafeAreaView >)
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#090B14"
    }}>
      <View style={stylesHeader.top}>
        <TouchableOpacity
          style={stylesHeader.revert}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <Image source={require('../../Assets/Revert.png')} />
        </TouchableOpacity>

        <View>
          <Text style={stylesHeader.title}>Upcoming</Text>
        </View>
      </View>
      <View style={{
        flex: 1
      }}>
        <ScrollView>
          {data.map((item) => {
            return (
              <MovieItem
                key={item.id}
                id={item.id}
                url={
                  item.poster_path
                }
                title={item.title}
                release_date={dayjs(item.release_date).format('MMM DD, YYYY')}
              />
            )
          })}
        </ScrollView>
      </View>
    </SafeAreaView >
  )
}

const stylesHeader = StyleSheet.create({
  top: {
    width: "100%",
    height: 55,
    alignItems: 'center'
  },
  revert: {
    position: "absolute",
    top: 5,
    left: 20,
    padding: 15
  },
  title: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Open Sans",
    fontWeight: 700,
    marginTop: 17
  },
})
const stylesLoading = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default UpComing