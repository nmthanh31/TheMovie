import {Text} from '@rneui/themed';
import TagItem from 'main/Components/TagItem';
import {SyncedRealmContext} from 'main/Model/Realm/RealmConfig';
import {default as TagRealm} from 'main/Model/Realm/Tag';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';

const Tag = ({navigation}: any) => {
  const {useRealm, useQuery} = SyncedRealmContext;
  const realm = useRealm();
  const query: Realm.Results<TagRealm> = useQuery('Tag');
  const tagItems: TagRealm[] = Array.from(query);

  const handlePress = (id: string) => {
    try {
      const objectToDelete = realm.objectForPrimaryKey('Tag', id);
      realm.write(() => {
        realm.delete(objectToDelete);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.note} />
        <Text style={styles.title}> TAGS </Text>
      </View>
      {tagItems.length === 0 ? (
        <View style={stylesEmptyTag.container}>
          <Image
            source={require('../../Assets/Tag/icon.png')}
            style={stylesEmptyTag.image}
          />
          <Text style={stylesEmptyTag.text1}>No space</Text>
          <Text style={stylesEmptyTag.text2}>Create your own space</Text>
        </View>
      ) : (
        <View>
          {tagItems.map(item => (
            <TagItem handlePress={handlePress} tagItem={item} key={item._id} navigation={navigation}/>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 15,
    color: '#fff',
  },
  note: {
    backgroundColor: '#F7BE13',
    width: 5,
    height: 32,
  },
});

const stylesEmptyTag = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 25,
    flex: 1,
    marginTop: 70,
  },
  image: {
    marginTop: 30,
  },
  text1: {
    width: '100%',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 24,
    color: '#fff',
  },
  text2: {
    width: '100%',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 6,
    color: '#9DA0A8',
  },
});

export default Tag;
