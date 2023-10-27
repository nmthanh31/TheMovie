import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

const Trash = ({handlePress, id}: {handlePress: Function; id: string}) => {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.button} onPress={() => handlePress(id)}>
        <Image source={require('../../Assets/SpaceItem/trash.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: 50,
    backgroundColor: '#15192D',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 15,
  },
});

export default Trash;
