import { Text } from "@rneui/themed";
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import NoteItem from "main/Components/NoteItem";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput
} from '@gorhom/bottom-sheet';
import CustomBackground from "../DetailSpace/ModalBackGround";
import { SyncedRealmContext } from 'main/Model/Realm/RealmConfig';
import Note from "main/Model/Realm/Note";


const Notes = (props) => {
  const { useRealm, useObject } = SyncedRealmContext
  const { idNoteSpace } = props.route.params;
  const detailSpace = useObject('Space', idNoteSpace);
  const realm = useRealm();
  const [title, setTitle] = useState('')
  const [describe, setDescribe] = useState('')
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => [400], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
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
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#090B14"
    }}>
      <BottomSheetModalProvider>
        <View style={stylesHeader.top}>
          <View>
            <Text style={stylesHeader.title}>Notes</Text>
          </View>
          <TouchableOpacity
            style={stylesHeader.revert}
            onPress={() => {
              props.navigation.goBack()
            }}
          >
            <Image source={require('../../Assets/Revert.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={stylesHeader.create}
            onPress={handlePresentModalPress}
          >
            <Image source={require('../../Assets/Plus.png')} />
          </TouchableOpacity>
        </View>
        <View style={{
          flex: 1,
        }}>
          <ScrollView>
            {detailSpace.notes.map((item) => {
              return (
                <NoteItem
                  key={item._id}
                  title={item.title}
                  describe={item.describe}
                  id={item._id}
                  eventRightAction={() => {
                    realm.write(() => {
                      realm.delete(item);
                    })
                  }}
                ></NoteItem>
              )
            })}

          </ScrollView>
        </View>
        <BottomSheetModal
          backgroundComponent={CustomBackground}
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}>
          <View style={{
            width: "100%",
            alignItems: 'center'
          }}>
            <Text
              style={{
                color: '#FFF',
                fontFamily: "Open Sans",
                fontSize: 20,
                fontWeight: 700
              }}>Create Note</Text>
          </View>
          <BottomSheetTextInput
            placeholder="Enter title note"
            style={{
              marginLeft: 25,
              color: "#FFF",
              fontSize: 16,

            }}
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#FFFF"
          />
          <BottomSheetTextInput
            placeholder="Enter describe note"
            style={{
              marginLeft: 25,
              color: "#FFF",
              fontSize: 14,
              marginTop: 20,
              width: "90%"
            }}
            placeholderTextColor="#FFFF"
            multiline={true}
            value={describe}
            onChangeText={setDescribe}
          />
          <View style={{
            width: "100%",
            alignItems: "center",
            marginTop: 150
          }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#E02F99",
                width: 132,
                height: 46,
                borderRadius: 26,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                realm.write(() => {
                  if (title !== "" && describe !== "") {
                    const NewNote = new Note(realm, title, describe);
                    detailSpace.notes.push(NewNote)
                    bottomSheetModalRef.current?.close();
                  }
                })
                setDescribe(""),
                setTitle("")
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "Open Sans"
                }}
              >Done</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  )
}


const stylesHeader = StyleSheet.create({
  top: {
    width: "100%",
    height: 55,
  },
  revert: {
    position: 'absolute',
    width: 11.65,
    height: 20,
    left: 20,
    top: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Open Sans",
    fontWeight: 700,
    marginTop: 30
  },
  create: {
    position: 'absolute',
    width: 26,
    height: 6,
    top: 20,
    right: 30,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  }
})


export default Notes