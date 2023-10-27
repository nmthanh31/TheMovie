import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Base_URL_GET_IMAGE } from 'main/Config/env';
import { SyncedRealmContext } from 'main/Model/Realm/RealmConfig';
import { findIconById } from 'main/Utils/SpaceUtil';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CombinedShape from '../../Assets/CombinedShape.png';
import Path3 from '../../Assets/Path3.png';
import Revert from '../../Assets/Revert.png';
import CardFilm from '../DetailSpace/CardFilm';
import CustomBackground from '../DetailSpace/ModalBackGround';
import { useNavigation, useRoute } from '@react-navigation/native';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

const DetailSpace = props => {
  const { idSpace } = props.route.params;
  const { useRealm, useObject } = SyncedRealmContext;
  const route = useRoute();
  const realm = useRealm();
  let detailSpace = useObject('Space', idSpace);
  const { color, name, icon } = detailSpace;
  const [fixSecret, setFixSecret] = useState(detailSpace.isSecret);
  let idLineItem = null;

  function Add() {
    props.navigation.navigate('SearchMovie', {
      idEditSpace: idSpace,
    });
  }
  function Notes() {
    props.navigation.navigate('Notes', {
      idNoteSpace: idSpace,
    });
  }
  function Edit() {
    props.navigation.navigate('EditSpace', {
      idEditSpace: idSpace,
    });
  }
  function Delete() {
    try {
      realm.write(() => {
        realm.delete(detailSpace);
      });
      props.navigation.replace("Home")
    } catch (ex) {
      console.log(ex);
    }
  }

  const handleGoBack = () => {
    if (fixSecret) {
      props.navigation.popToTop();
    } else {
      props.navigation.goBack();
    }
  };
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => [190], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);
  const bottomSheetModalSettingRef = useRef(null);
  const handlePresentModalSettingPress = useCallback(() => {
    bottomSheetModalSettingRef.current?.present();
  }, []);

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
      fromUrl: 'https://image.tmdb.org/t/p/w500' + imagesPath,
      toFile: `${RNFS.DocumentDirectoryPath}/filmSpace.png`,
    }).promise.then(async res => {
      RNFS.readFile(
        `${RNFS.DocumentDirectoryPath}/filmSpace.png`,
        'base64',
      ).then(base64String => {
        var imageUrl = 'data:image/png;base64,' + base64String;
        let shareImage = {
          message: 'check out amazing film',
          url: imageUrl,
        };
        Share.open(shareImage)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            err && console.log(err);
          });
      });
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <BottomSheetModalProvider>
        <View style={stylesTop.top}>
          <ImageBackground
            source={Path3}
            resizeMode="cover"
            style={stylesTop.topImgBg}>
            <TouchableOpacity style={stylesTop.topCombined} onPress={handlePresentModalPress}>
              <Image source={CombinedShape} />
            </TouchableOpacity>
            <TouchableOpacity style={stylesTop.topReverse} onPress={handleGoBack}>
              <Image source={Revert} />
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: "center", marginTop: 60 }}>
              <Image
                source={findIconById(icon)}
                style={[stylesTop.topLogo, { tintColor: color }]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <Text style={styles.Name}>{name}</Text>

        <View style={styles.action}>
          <View>
            <TouchableOpacity
              style={[styles.btnActionAdd, { backgroundColor: color }]}
              onPress={Add}>
              <Image
                source={require('../../Assets/search.png')}
                resizeMode="cover"
                style={styles.imgBtnActionAdd}
              />
            </TouchableOpacity>
            <Text style={styles.textActionAdd}>Add</Text>
          </View>
          <View style={{ width: 10 }}></View>
          <View>
            <TouchableOpacity
              style={[styles.btnActionNotes, { backgroundColor: color }]}
              onPress={Notes}>
              <Image
                source={require('../../Assets/notes.png')}
                resizeMode="cover"
                style={styles.imgBtnActionNotes}
              />
            </TouchableOpacity>
            <Text style={styles.textActionNotes}>Notes</Text>
          </View>
        </View>
        <View>
          <Text style={styles.title}>
            {detailSpace.lineItems.length} Movies & TV Show
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.containerFilm}>
              {detailSpace.lineItems.map(item => {
                return (
                  <CardFilm
                    url={{
                      uri: `${Base_URL_GET_IMAGE}/w500/${item.poster_path}`,
                    }}
                    name={item.name}
                    action={() => {
                      props.navigation.navigate('DetailLineItem', {
                        movieID: item.id,
                        media_type: item.media_type,
                      });
                    }}
                    settingFilm={() => {
                      idLineItem = item.id;
                      handlePresentModalSettingPress();
                    }}
                    key={item.id}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        <BottomSheetModal
          backgroundComponent={CustomBackground}
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}>
          <View style={stylesTop.containerModal}>
            <View>
              <Text style={stylesTop.title}>Space Option</Text>
            </View>
            <TouchableOpacity
              onPress={Edit}
            >
              <Text style={stylesTop.btnAction}>Edit Space</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={Delete}
            >
              <Text style={stylesTop.btnAction}>Delete</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
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
                ShareLineItem(
                  detailSpace.lineItems.filtered('$0 = id', idLineItem)[0]
                    .poster_path,
                );
              }}
            >
              <Text style={stylesTop.btnAction}>Share with friend</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const newData = detailSpace.lineItems.filter(item => {
                  return item.id != idLineItem;
                });
                realm.write(() => {
                  detailSpace.lineItems = newData;
                });
                bottomSheetModalSettingRef.current.close()
              }}
            >
              <Text style={stylesTop.btnAction}>Delete</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090B14',
  },
  action: {
    height: 103,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnActionAdd: {
    width: 54,
    height: 54,
    borderRadius: 15,
  },
  imgBtnActionAdd: {
    width: 24,
    height: 24,
    marginLeft: 15,
    marginTop: 15,
  },
  textActionAdd: {
    width: '100%',
    height: 19,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  btnActionNotes: {
    width: 54,
    height: 54,
    borderRadius: 15,
  },
  imgBtnActionNotes: {
    width: 20,
    height: 19.17,
    marginLeft: 17,
    marginTop: 18,
  },
  textActionNotes: {
    width: '100%',
    height: 19,
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19,

    textAlign: 'center',
  },
  title: {
    width: 168,
    height: 22,
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Open Sans',
    marginLeft: 20,
  },
  containerFilm: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    zIndex: 1,
    width: '100%',
  },
  Name: {
    width: '100%',
    height: 33,
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 33,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
});
const stylesTop = StyleSheet.create({
  top: {
    height: 139,
    width: "100%",
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
    top: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  topCombined: {
    position: 'absolute',
    width: 26,
    height: 6,
    top: 20,
    right: 30,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  topLogo: {
    width: 60,
    height: 60,
  },
  containerModal: {
    justifyContent: 'space-evenly',
    marginLeft: 25,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
  },
  btnAction: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFF',
    marginTop: 18,
  },
});
export default DetailSpace;
