import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native'
import { Text } from '@rneui/themed';
import CardMovie from '../CardMovie';
import { useNavigation } from '@react-navigation/native';
const RecommendationCom = (props) => {
  const imgPath = "https://image.tmdb.org/t/p/w500"
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.note} />
        <Text style={styles.title}> Recommendations </Text>
      </View>
      <View style={styles.recommend}>
        <ScrollView
          horizontal={true}
        >
          {props.RecommendMovie.map((item, index) => {
            return (
              <View key={index}>
                <CardMovie
                  action={() => {
                    navigation.navigate("DetailLineItem", {
                      movieID: item.id,
                      media_type: props.mediaType
                    })
                  }}
                  url={{ uri: imgPath + item.poster_path }}
                  name={item.title}
                ></CardMovie>
              </View>

            )
          })}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  note: {
    backgroundColor: '#F7BE13',
    width: 5,
    height: 24,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 15,
    color: '#fff',
    fontFamily: "Open Sans",
  },
  container: {
    flex: 1
  },
  recommend: {
    paddingLeft: 10
  },
  stylesBackdrops: {
    width: 304,
    height: 157,
    borderRadius: 20,
    marginRight: 10
  }
});



export default RecommendationCom