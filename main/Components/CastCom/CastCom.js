import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native'
import { Text } from '@rneui/themed';
import CastItem from '../CastItem';
const CastCom = (props) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.note} />
        <Text style={styles.title}> Cast </Text>
      </View>
      <View style={styles.cast}>
        <ScrollView
          horizontal={true}
        >
          {props.castMovie.map((item, index) => {
            if (index % 2 === 0) {
              return (
                <View
                  key={item.id}
                >
                  <CastItem

                    url={props.castMovie[index].profile_path}
                    name={props.castMovie[index].name}
                    character={props.castMovie[index].character}
                  ></CastItem>
                  {index + 1 < props.castMovie.length ?
                    <CastItem
                      url={props.castMovie[index + 1].profile_path}
                      name={props.castMovie[index + 1].name}
                      character={props.castMovie[index + 1].character}
                    ></CastItem> : null}
                </View>
              )
            }
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
  cast: {
    paddingLeft: 5
  },
});



export default CastCom