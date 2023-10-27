import { Text } from '@rneui/themed';
import Space from 'main/Model/Realm/Space';
import { findIconById } from 'main/Utils/SpaceUtil';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Trash from '../Trash';
import { MMKV } from 'react-native-mmkv';
import IconKey from "main/Assets/key.svg"

const storage = new MMKV();
const SpaceItem = ({
  spaceItems,
  eventRightAction,
  navigation,
}: {
  spaceItems: Space;
  eventRightAction: Function;
  navigation: any;
}) => {
  const handlePress = (): void => {
    if (spaceItems.isSecret) {
      navigation.navigate('SecretPass', {
        isOpenSpace: true,
        idSpace: spaceItems._id,
      });
    } else {
      navigation.navigate('DetailSpace', {
        idSpace: spaceItems._id,
      });
    }
  };

  return (
    <Swipeable
      renderRightActions={() =>
        Trash({ handlePress: eventRightAction, id: spaceItems._id })
      }
      containerStyle={{
        marginBottom: 15,
        width: '100%',
        paddingLeft: 25,
      }}>
      <TouchableOpacity
        style={[{ backgroundColor: spaceItems.color }, styles.imgBackground]}
        onPress={handlePress}>
        <View style={styles.row1}>
          {spaceItems.isSecret && (

            <IconKey width={20} height={20}></IconKey>
          )}
          <Text style={styles.text1}> {spaceItems.name} </Text>
        </View>
        <Text style={styles.text2}> {spaceItems.lineItems.length} Movies </Text>
      </TouchableOpacity>
      <Image source={findIconById(spaceItems.icon)} style={styles.icon} />
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: 90,
    borderRadius: 15,
  },
  row1: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
  },
  text1: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  text2: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 20,
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: '25%',
  },
});

export default SpaceItem;
