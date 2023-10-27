import {Text} from '@rneui/themed';
import lodash from 'lodash';
import {findMovieAndTvShow} from 'main/Api/findMovieAndTvShowByName';
import {getMovie} from 'main/Api/getMovie';
import {getTV} from 'main/Api/getTV';
import LineItemComponent from 'main/Components/LineItem';
import LineItem from 'main/Model/Realm/LineItem';
import {SyncedRealmContext} from 'main/Model/Realm/RealmConfig';
import Space from 'main/Model/Realm/Space';
import {typeLineItem} from 'main/Type/LineItem';
import {typeMovie} from 'main/Type/Movie';
import {typeTV} from 'main/Type/TV';
import {
  convertTypeMovieToTypeLineItem,
  convertTypeTVShowToTypeLineItem,
  isExistLineItemInSpace,
} from 'main/Utils/LineItemUtil';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {List} from 'realm';

const SearchMovie = ({navigation, route}: {navigation: any; route: any}) => {
  const [movies, setMovies] = useState<typeLineItem[] | null>(null);
  const [tvs, setTvs] = useState<typeLineItem[] | null>(null);
  const [nameSearch, setNameSearch] = useState<string>('');
  const [lineItemSearch, setLineItemSearch] = useState<typeLineItem[] | null>(
    null,
  );
  const {useRealm, useObject} = SyncedRealmContext;
  const colorLoading = '#00ff00';
  const idSpace = route.params.idEditSpace;
  const realm = useRealm();
  const spaceItem: Space | null = useObject<Space>('Space', idSpace);
  const LineItemInSpace: List<LineItem> | undefined = spaceItem?.lineItems;

  const handleAddLineItem = (item: typeLineItem) => {
    try {
      if (spaceItem) {
        realm.write(() => {
          if (
            !isExistLineItemInSpace(spaceItem.lineItems, item.id.toString())
          ) {
            const lineItem = LineItem.make(
              realm,
              item.id.toString(),
              item.media_type,
              item.name,
              item.poster_path,
              item.backdrop_path,
              item.release_date,
            );
            spaceItem.lineItems.push(lineItem as LineItem);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFindMovieAndTvShow = async (name: string) => {
    try {
      setLineItemSearch(null);
      const response = (await findMovieAndTvShow(name)).data;
      const data: any[] = response.results;

      const lineItemState: typeLineItem[] = [];
      data.forEach(item => {
        if (item.media_type === 'movie') {
          lineItemState.push(convertTypeMovieToTypeLineItem(item));
        } else if (item.media_type === 'tv') {
          lineItemState.push(convertTypeTVShowToTypeLineItem(item));
        }
      });
      setLineItemSearch(lineItemState);
    } catch (err) {
      console.log(err);
    }
  };

  const debouncedSearch = useMemo(() => {
    return lodash.debounce((nameSearch: string) => {
      handleFindMovieAndTvShow(nameSearch);
    }, 300);
  }, []);

  const handleChangeNameSearch = (text: string) => {
    setNameSearch(text);
    debouncedSearch(text);
  };

  const handleRequestGetMovies = async () => {
    try {
      const response = (await getMovie()).data;
      const data: typeMovie[] = response.results;
      setMovies(data.map(item => convertTypeMovieToTypeLineItem(item)));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRequestGetTV = async () => {
    try {
      const response = (await getTV()).data;
      const data: typeTV[] = response.results;
      setTvs(data.map(item => convertTypeTVShowToTypeLineItem(item)));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleRequestGetMovies();
    handleRequestGetTV();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          source={require('../../Assets/Revert.png')}
          style={[styles.iconClose]}
        />
      </TouchableOpacity>
      <View style={styleSearch.container}>
        <Image source={require('../../Assets/search.png')} />
        <TextInput
          placeholder="Search Movies, TV Show"
          style={styleSearch.textInput}
          placeholderTextColor={'#fff'}
          value={nameSearch}
          onChangeText={e => handleChangeNameSearch(e)}
        />
      </View>
      <View style={styles.divide} />
      {nameSearch.length === 0 ? (
        <>
          <View style={styles.header}>
            <View style={styles.note} />
            <Text style={styles.title}> Movie suggest for you </Text>
          </View>
          <ScrollView style={styles.scrollViewLineItem}>
            {movies == null ? (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color={colorLoading} />
              </View>
            ) : (
              movies.map(item => (
                <LineItemComponent
                  item={item}
                  key={item.id}
                  handleAddLineItem={() => handleAddLineItem(item)}
                  isExistsInSpace={isExistLineItemInSpace(
                    LineItemInSpace,
                    item.id.toString(),
                  )}
                  navigation={navigation}
                />
              ))
            )}
          </ScrollView>
          <View style={styles.header}>
            <View style={styles.note} />
            <Text style={styles.title}> TV Show suggest for you </Text>
          </View>
          <ScrollView style={styles.scrollViewLineItem}>
            {tvs == null ? (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color={colorLoading} />
              </View>
            ) : (
              tvs?.map(item => (
                <LineItemComponent
                  item={item}
                  key={item.id}
                  handleAddLineItem={() => handleAddLineItem(item)}
                  isExistsInSpace={isExistLineItemInSpace(
                    LineItemInSpace,
                    item.id.toString(),
                  )}
                  navigation={navigation}
                />
              ))
            )}
          </ScrollView>
        </>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.title}> {lineItemSearch?.length} Results </Text>
          </View>
          <ScrollView style={styleSearch.scrollViewLineItemSearch}>
            {lineItemSearch == null ? (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color={colorLoading} />
              </View>
            ) : (
              lineItemSearch?.map(item => (
                <LineItemComponent
                  item={item}
                  key={item.id}
                  handleAddLineItem={() => handleAddLineItem(item)}
                  isExistsInSpace={isExistLineItemInSpace(
                    LineItemInSpace,
                    item.id.toString(),
                  )}
                  navigation={navigation}
                />
              ))
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconClose: {
    width: 12,
    height: 20,
    marginLeft: 25,
    marginTop: 60,
  },
  container: {
    flex: 1,
  },
  scrollViewLineItem: {
    height: 210,
  },
  loading: {
    width: '100%',
    height: 210,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 15,
    color: '#fff',
  },
  note: {
    backgroundColor: '#E02F99',
    width: 5,
    height: 32,
  },
  divide: {
    borderColor: '#E02F99',
    borderWidth: 1,
    marginHorizontal: 25,
    marginVertical: 5
  },
});

const styleSearch = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textInput: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    width: 200,
    marginLeft: 10,
  },
  scrollViewLineItemSearch: {
    flex: 1,
  },
});
export default SearchMovie;
