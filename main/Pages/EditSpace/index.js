import { Image } from '@rneui/base';
import { Text } from '@rneui/themed';
import { listIcon } from 'main/Config/AddSpace/listIcon';
import { MyContext } from 'main/Model/Context/MyContext';
import { SyncedRealmContext } from 'main/Model/Realm/RealmConfig';
import { findIconById } from 'main/Utils/SpaceUtil';
import React, { useContext, useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { listColor as listColorJson } from '../../Config/Space/listColor.json';

const EditSpace = (props) => {
  const { useRealm } = SyncedRealmContext;
  const realm = useRealm();
  const { spaceItems, setSpaceItems } = useContext(MyContext);
  const { idEditSpace } = props.route.params;
  const detailSpace = realm.objectForPrimaryKey('Space', idEditSpace);
  const [text, onChangeText] = useState(detailSpace.name);
  const [isSecret, setIsSecret] = useState(detailSpace.isSecret);
  const [idColor, setIdColor] = useState(detailSpace.color);
  const [idIcon, setIdIcon] = useState(detailSpace.icon);
  const listColor = listColorJson;
  const handlePickColor = (id) => {
    setIdColor(listColor[id]);
  };

  const handlePickIcon = (id) => {
    setIdIcon(id);
  };
  const handleEditSpace = () => {
    try {
      realm.write(() => {
        console.log('Edit space success !!');
        detailSpace.color = idColor;
        detailSpace.name = text;
        detailSpace.icon = idIcon;
        detailSpace.isSecret = isSecret;
        const spaceItemsNewState = [...spaceItems];
        for (let index = 0; index < spaceItemsNewState.length; index++) {
          if (spaceItemsNewState[index].id === detailSpace._id) {
            spaceItemsNewState[index].id = detailSpace._id
            spaceItemsNewState[index].color = idColor;
            spaceItemsNewState[index].name = text;
            spaceItemsNewState[index].icon = findIconById(idIcon);
            spaceItemsNewState[index].isSecret = isSecret;
          }
        }
        console.log(spaceItemsNewState);
        setSpaceItems(spaceItemsNewState);
        props.navigation.goBack();
        return
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: '#000',
          margin: 0,
        }}>
        <ScrollView>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image
              source={require('../../Assets/close_white.png')}
              style={[styles.iconClose]}
            />
          </TouchableOpacity>
          <TextInput
            style={[
              text.length == 0 ? styles.inputNameSpacePlaceHolder : {},
              styles.inputNameSpace,
            ]}
            value={text}
            placeholder="Enter name space"
            placeholderTextColor={'#fff'}
            onChangeText={onChangeText}
          />
          <View style={styles.divide}></View>
          <LinearGradient
            colors={['#2F3659', '#15192D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0.0384, 0.9896]}
            style={stylesSpaceSecret.container}>
            <View style={stylesSpaceSecret.col1}>
              <Text style={stylesSpaceSecret.text1}>Make is space secret</Text>
              <Text style={stylesSpaceSecret.text2}>
                You can set password in setting
              </Text>
            </View>
            <View style={stylesSpaceSecret.col2}>
              <Switch
                value={isSecret}
                onValueChange={setIsSecret}
                trackColor={{ false: '#767577', true: '#F7BE13' }}
                thumbColor={isSecret ? '#fff' : '#000'}
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
              />
            </View>
          </LinearGradient>
          <Text style={stylesColorPicker.title}>Color</Text>
          <View style={stylesColorPicker.pickerContainer}>
            <View style={stylesColorPicker.pickerList}>
              {listColor.map((item, index) => {
                return (
                  <View style={{ width: '20%' }} key={index}>
                    <View
                      style={[
                        { borderColor: listColor[index] == idColor ? listColor[index] : '#15192D' },
                        stylesColorPicker.pickerItemWrap,
                      ]}>
                      <TouchableOpacity
                        onPress={() => handlePickColor(index)}
                        style={[
                          { backgroundColor: item },
                          stylesColorPicker.pickerItem,
                        ]}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
            <Text style={stylesColorPicker.textCustom}> Custom Color </Text>
          </View>
          <Text style={stylesIconPicker.title}> Icon </Text>
          <View style={[stylesIconPicker.pickerContainer]}>
            <View style={stylesIconPicker.pickerList}>
              {listIcon.map((item, index) => {
                return (
                  <View style={{ width: '25%' }} key={index}>
                    <View
                      style={[
                        {
                          borderColor: index === idIcon ? idColor : '#15192D',
                        },
                        stylesIconPicker.pickerItemWrap,
                      ]}>
                      <TouchableOpacity
                        onPress={() => handlePickIcon(index)}
                        style={[stylesIconPicker.pickerItem]}>
                        <Image
                          style={[
                            stylesIconPicker.pickerImage,
                            {tintColor: index === idIcon ? idColor : "#FFFFFF"}
                          ]}
                          source={item.uri}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styleSubmit.container}>
            <TouchableOpacity onPress={handleEditSpace} style={styleSubmit.button}>
              <Text style={styleSubmit.text}>Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    zIndex: 100,
  },
  iconClose: {
    width: 20,
    height: 20,
    marginLeft: 25,
    marginTop: 40,
  },
  inputNameSpacePlaceHolder: {
    opacity: 0.13,
  },
  inputNameSpace: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  divide: {
    borderWidth: 1,
    borderColor: '#393939',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 30,
  },
});

const stylesSpaceSecret = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  col1: {
    marginLeft: 17,
  },
  col2: {
    marginLeft: 'auto',
    marginRight: 17,
  },
  text1: {
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFF',
  },
  text2: {
    fontSize: 13,
    lineHeight: 18,
    color: '#9DA0A8',
  },
});

const stylesColorPicker = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 35,
    marginBottom: 6,
  },
  pickerContainer: {
    backgroundColor: '#15192D',
    marginHorizontal: 20,
    borderRadius: 11,
  },
  pickerList: {
    paddingTop: 15,
    paddingBottom: 16,
    paddingHorizontal: 17,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  pickerItemWrap: {
    borderRadius: 13,
    borderWidth: 1,
    width: 52,
    height: 52,
    margin: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerItem: {
    height: 42,
    width: 42,
    borderRadius: 13,
  },
  textCustom: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: '#F7BE13',
    paddingBottom: 13,
  },
});

const stylesIconPicker = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 35,
    marginBottom: 6,
  },
  pickerContainer: {
    backgroundColor: '#15192D',
    marginHorizontal: 20,
    borderRadius: 11,
  },
  pickerList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  pickerItemWrap: {
    width: 52,
    height: 52,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 13,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 12.5,
  },
  pickerItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerImage: {
    width: 35,
    height: 35,
  },
});

const styleSubmit = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#F7BE13',
    borderRadius: 26,
    width: 130,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
export default EditSpace;
