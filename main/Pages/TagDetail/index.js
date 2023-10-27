import React, { useRef, useMemo, useCallback, useState } from 'react';
import { View, TouchableOpacity, Image, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { Text } from '@rneui/themed';
import { SyncedRealmContext } from 'main/Model/Realm/RealmConfig';
import CardFilm from '../DetailSpace/CardFilm';
import { Base_URL_GET_IMAGE } from 'main/Config/env';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import CustomBackground from '../DetailSpace/ModalBackGround';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

const TagDetail = (props) => {
  const { useRealm, useObject, useQuery } = SyncedRealmContext;
  const { idTag } = props.route.params;
  const realm = useRealm();
  const tagById = useObject("Tag", idTag);
  const [LineItemInTag, setLineItemInTag] = useState(tagById?.linkingObjects("LineItem", "tags"))
  let idLineItem=null;
  const bottomSheetModalSettingRef = useRef(null);
  const handlePresentModalSettingPress = useCallback(() => {
    bottomSheetModalSettingRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);
  const snapPoints = useMemo(() => [190], []);
  const renderBackdrop = useCallback(
    backdropProps => (
      <BottomSheetBackdrop
        {...backdropProps}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );
  async function ShareLineItem(imagesPath) {
    RNFS.downloadFile({
      fromUrl: "https://image.tmdb.org/t/p/w500" + imagesPath,
      toFile: `${RNFS.DocumentDirectoryPath}/filmSpace.png`
    }).promise.then(async (res) => {
      RNFS.readFile(`${RNFS.DocumentDirectoryPath}/filmSpace.png`,
        "base64").then(base64String => {
          var imageUrl = 'data:image/png;base64,' + base64String;
          let shareImage = {
            message:
              "check out amazing film",
            url: imageUrl,
          };
          Share.open(shareImage)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              err && console.log(err);
            });
        })
    })
  }
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#090B14"
    }}>
      <BottomSheetModalProvider>
        <View style={stylesHeader.top}>

          <View>
            <Text style={[stylesHeader.title, { color: tagById.color }]}>#{tagById.name}</Text>
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
        <View style={{ flex: 1, marginTop: 20 }}>
          <ScrollView>
            <View style={styles.containerFilm}>
              {
                (LineItemInTag.length > 0) ? LineItemInTag.map(item => {
                  return (
                    <CardFilm
                      url={{
                        uri: `${Base_URL_GET_IMAGE}/w500/${item.poster_path}`,
                      }}
                      name={item.name}
                      action={() => {
                        props.navigation.navigate("DetailLineItem", {
                          movieID: item.id,
                          media_type: item.media_type,
                        });
                      }}
                      key={item.id}
                      settingFilm={()=>{
                        idLineItem = item.id;
                        handlePresentModalSettingPress();
                      }}
                    />
                  );
                }):null
              }
            </View>
          </ScrollView>
        </View>
        <BottomSheetModal
          backgroundComponent={CustomBackground}
          ref={bottomSheetModalSettingRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}>
          <View style={stylesTop.containerModal}>
            <View>
              <Text style={stylesTop.title}>Option</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                ShareLineItem(LineItemInTag.filtered("$0 = id",idLineItem).poster_path)
              }}
              style={{
                width: 150,
              }}>
              <Text style={stylesTop.btnAction}>Share with friend</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const newData = LineItemInTag.filtered("$0 = id",idLineItem)[0].tags.filter((item)=>{
                  return item._id != idTag;
                });
                const newLineItemInTag = LineItemInTag.filter((item)=>{
                  return item.id != idLineItem;
                });
                setLineItemInTag(newLineItemInTag)
                realm.write(()=>{
                  LineItemInTag.filtered("$0 = id",idLineItem)[0].tags = newData;
                })
              }}
              style={{
                width: 50,
              }}>
              <Text style={stylesTop.btnAction}>Delete</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView >
  )
}
const stylesHeader = StyleSheet.create({
  top: {
    width: "100%",
    height: 65,
  },
  revert: {
    position: "absolute",
    top: 17,
    left: 20
  },
  title: {
    marginTop: 35,
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Open Sans",
    fontWeight: 700,
    alignItems: 'center'
  }
})
const styles = StyleSheet.create({
  containerFilm: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    zIndex: 1,
  },
})
const stylesTop = StyleSheet.create({
  top: {
    height: 139,
  },
  topImgBg: {
    width: '100%',
    height: '100%',
  },
  topReverse: {
    position: 'absolute',
    width: 11.65,
    height: 20,
    left: 20,
    top: 64,
  },
  topCombined: {
    position: 'absolute',
    width: 26,
    height: 6,
    left: 347,
    top: 65,
  },
  topLogo: {
    position: 'absolute',
    width: 60,
    height: 60,
    left: 170,
    top: 71,
  },
  containerModal: {
    justifyContent: 'space-evenly',
    marginLeft: 25,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 22,
  },
  btnAction: {
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFF',
    marginTop: 18,
  },
});
export default TagDetail