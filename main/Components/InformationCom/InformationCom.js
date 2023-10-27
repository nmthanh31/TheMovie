import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Text } from '@rneui/themed';
const InformationCom = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.note} />
        <Text style={styles.title}> Information </Text>
      </View>
      <View style={styles.information}>
        <Text style={styles.overview}>{props.overview}</Text>
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
  information: {
    paddingLeft: 25
  },
  overview: {
    width: "95%",
    fontWeight: 400,
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 24,
    fontFamily: "Open Sans",
  },
});
export default InformationCom