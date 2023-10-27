import {Text} from '@rneui/themed';
import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import {SafeAreaView, View} from 'react-native';
import {SyncedRealmContext} from 'main/Model/Realm/RealmConfig';
import WatchedItem from './MovieDay';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import LineItem from 'main/Model/Realm/LineItem';
const Watched = props => {
  const {useRealm, useQuery} = SyncedRealmContext;
  const realm = useRealm();
  const listWatchedRef = useQuery(LineItem);
  const listWatched = useMemo(
    () => listWatchedRef.filtered('watchedAt != null SORT(watchedAt ASC)'),
    [listWatchedRef],
  );
  const navigation = useNavigation();
  const dataGroup = useMemo(() => {
    const groupData = listWatched.reduce((acc, current) => {
      const a = dayjs(current.watchedAt).startOf('day').toISOString();
      if (!acc[a]) {
        acc[a] = [current];
      } else {
        acc[a].push(current);
      }
      return acc;
    }, {});
    return groupData;
  }, [listWatched]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={stylesHeader.top}>
        <View>
          <Text style={stylesHeader.title}>Watched</Text>
        </View>
        <TouchableOpacity
          style={stylesHeader.revert}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Image source={require('../../Assets/Revert.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{flex: 2}}>
          {Object.keys(dataGroup)?.map((key, index) => {
            const objects = dataGroup[key];
            return (
              <View id={key} style={{width: '100%', marginTop: 10}}>
                <View style={{flexDirection: 'row', marginLeft: 20}}>
                  <Text
                    style={{
                      fontFamily: 'Open Sans',
                      fontWeight: 'bold',
                      fontSize: 40,
                      color: '#F7BE13',
                    }}>
                    {dayjs(key).get('date').toString()}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Open Sans',
                      fontWeight: '400',
                      fontSize: 15,
                      color: '#FFFFFF',
                      marginTop: 25,
                    }}>
                    {dayjs(key).format('MMMM, YYYY').toString()}
                  </Text>
                </View>
                {objects.map(itemCur => {
                  return (
                    <WatchedItem
                      navigation={navigation}
                      LineItems={itemCur}
                      eventRightAction={() => {
                        realm.write(() => {
                          itemCur.watchedAt = null;
                        });
                      }}
                    />
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const stylesHeader = StyleSheet.create({
  top: {
    width: '100%',
    height: 55,
  },
  revert: {
    position: 'absolute',
    top: 5,
    left: 20,
    padding: 20,
    justifyContent: "center"
  },
  title: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Open Sans',
    fontWeight: 700,
    marginTop: 17,
  },
});
export default Watched;
