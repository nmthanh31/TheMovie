import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native'
import { Text } from '@rneui/themed';
const MediaCom = (props) => {
  const imgPath = "https://image.tmdb.org/t/p/w500"
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.note} />
        <Text style={styles.title}> Media </Text>
      </View>
      <View style={styles.media}>
        <ScrollView
          horizontal={true}
        >
          {props.backdrops.map((item, index) => {
            return (
              <View key={index}>
                <Image style={styles.stylesBackdrops} source={{ uri: imgPath + item.file_path }}></Image>
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
  },
  container: {
    flex: 1
  },
  media: {
    paddingLeft: 25
  },
  stylesBackdrops: {
    width: 304,
    height: 157,
    borderRadius: 20,
    marginRight: 10
  }
});



export default MediaCom