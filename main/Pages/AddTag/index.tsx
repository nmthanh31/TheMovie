import {Image} from '@rneui/base';
import {Text} from '@rneui/themed';
import {SyncedRealmContext} from 'main/Model/Realm/RealmConfig';
import Tag from 'main/Model/Realm/Tag';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {listColor as listColorJson} from '../../Config/Space/listColor.json';

const AddTag = ({
  isVisibleAddTag,
  setVisibleAddTag,
  setVisibleCreate,
}: {
  isVisibleAddTag: boolean;
  setVisibleAddTag: Dispatch<SetStateAction<boolean>>;
  setVisibleCreate: Dispatch<SetStateAction<boolean>>;
}) => {
  const listColor: string[] = listColorJson;
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>(listColor[0]);
  const {useRealm} = SyncedRealmContext;
  const realm = useRealm();

  const handleAddTag = () => {
    try {
      realm.write(() => {
        console.log('Create tag successfully !!');
        const TagRealm = new Tag(realm, name, color);
        return TagRealm;
      });
      setVisibleCreate(false);
      setVisibleAddTag(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePickColor = (idx: number) => {
    setColor(listColor[idx]);
  };

  return (
    <SafeAreaView>
      <Modal
        isVisible={isVisibleAddTag}
        style={{
          backgroundColor: '#000',
          margin: 0,
        }}>
        <SafeAreaView style={{marginTop: 30, flex: 1}}>
          <ScrollView>
            <TouchableOpacity onPress={() => setVisibleAddTag(false)}>
              <Image
                source={require('../../Assets/close_white.png')}
                style={[styles.iconClose]}
              />
            </TouchableOpacity>
            <TextInput
              style={[
                name.length == 0 ? styles.inputNameTagPlaceHolder : {},
                styles.inputNameTag,
                {color},
              ]}
              value={name}
              placeholder="Enter tag"
              placeholderTextColor={'#fff'}
              onChangeText={setName}
            />
            <View style={styles.divide}></View>

            <Text style={stylesColorPicker.title}>Color</Text>
            <View style={stylesColorPicker.pickerContainer}>
              <View style={stylesColorPicker.pickerList}>
                {listColor.map((item, index) => {
                  return (
                    <View style={{width: '20%'}} key={index}>
                      <View
                        style={[
                          {borderColor: item == color ? '#F7BE13' : '#15192D'},
                          stylesColorPicker.pickerItemWrap,
                        ]}>
                        <TouchableOpacity
                          onPress={() => handlePickColor(index)}
                          style={[
                            {backgroundColor: item},
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
            <View style={styleSubmit.container}>
              <TouchableOpacity
                onPress={handleAddTag}
                style={styleSubmit.button}>
                <Text style={styleSubmit.text}>Done</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
  inputNameTagPlaceHolder: {
    opacity: 0.13,
  },
  inputNameTag: {
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

export default AddTag;
