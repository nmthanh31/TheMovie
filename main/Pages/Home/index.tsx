import { Text } from '@rneui/themed';
import SpaceItem from 'main/Components/SpaceItem';
import { SyncedRealmContext } from 'main/Model/Realm/RealmConfig';
import Space from 'main/Model/Realm/Space';
import React, { useMemo } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SVGWatched from 'main/Assets/WatchList/folder_watched.svg';
import SVGUpcoming from 'main/Assets/WatchList/folder_upcoming.svg';
import IconCalenarCircle from 'main/Assets/WatchList/icon_calendar_circle.svg';
import IconFilmCircle from 'main/Assets/WatchList/icon_film_circle.svg';

const Home = ({ navigation }: any) => {
  const { useRealm, useQuery } = SyncedRealmContext;
  const realm = useRealm();
  const query: Realm.Results<Space> = useQuery('Space');
  const spaceItems: Space[] = useMemo(() => {
    return Array.from(query);
  }, [query]);

  const eventRightAction = (id: string) => {
    try {
      for (let i = 0; i < spaceItems.length; i++) {
        if (spaceItems[i]._id === id) {
          realm.write(() => {
            realm.delete(spaceItems[i]);
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={stylesWatchList.container}>
        <View style={styles.header}>
          <View style={styles.note} />
          <Text style={styles.title}> WATCH LIST </Text>
        </View>
        <View style={{ flexDirection: 'row', paddingLeft: 35, gap: 32 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Watched')}
            style={{
              width: 140,
              height: 140,
              paddingLeft: 15,
              paddingBottom: 14,
              justifyContent: 'flex-end',
            }}>
            <SVGWatched style={StyleSheet.absoluteFill} />
            <IconFilmCircle width={48} height={48} />
            <Text style={stylesWatchList.itemText}>Watched</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('UpComing')}
            style={{
              width: 140,
              height: 140,
              paddingLeft: 15,
              paddingBottom: 14,
              justifyContent: 'flex-end',
            }}>
            <SVGUpcoming style={StyleSheet.absoluteFill} />
            <IconCalenarCircle width={48} height={48} />
            <Text style={stylesWatchList.itemText}>Upcoming</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={stylesPersonalSpace.container}>
        <View style={styles.header}>
          <View style={styles.note} />
          <Text style={styles.title}> PERSONAL SPACE </Text>
        </View>
      </View>
      {spaceItems.length === 0 ? (
        <View style={stylesPersonalSpace.itemContainer}>
          <Image
            source={require('../../Assets/SpaceEmpty/img1.png')}
            style={stylesEmptySpace.image}
          />
          <Text style={stylesEmptySpace.text1}>No space</Text>
          <Text style={stylesEmptySpace.text2}>Create your own space</Text>
        </View>
      ) : (
        <SafeAreaView style={stylesPersonalSpace.itemContainer}>
          <ScrollView style={{ height: '100%' }}>
            {spaceItems.map(value => (
              <SpaceItem
                navigation={navigation}
                key={value._id}
                spaceItems={value}
                eventRightAction={eventRightAction}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  note: {
    backgroundColor: '#F7BE13',
    width: 5,
    height: 32,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 15,
    color: '#fff',
  },
  container: {
    flex: 1,
  },
});

const stylesWatchList = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
  itemContainer: {
    marginLeft: 3,
  },
  itemBackground: {
    width: 140,
    height: 140,
    marginLeft: 32,
  },
  itemText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 11,
  },
  itemIconWrap: {
    backgroundColor: '#fff',
    height: 48,
    width: 48,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
    marginLeft: 11,
  },
});

const stylesPersonalSpace = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginRight: 25,
    flex: 1,
  },
});

const stylesEmptySpace = StyleSheet.create({
  image: {
    marginTop: 30,
  },
  text1: {
    width: '100%',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 8,
    color: '#fff',
  },
  text2: {
    width: '100%',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: 6,
    color: '#9DA0A8',
  },
});

export default Home;
