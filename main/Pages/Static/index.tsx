import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {Text} from '@rneui/themed';
import Genres from 'main/Model/Realm/Genres';
import LineItem from 'main/Model/Realm/LineItem';
import {SyncedRealmContext} from 'main/Model/Realm/RealmConfig';
import {randomColor} from 'main/Utils';
import {initArrayStat, typeArrayGenres} from 'main/Utils/Stat';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {LinearGradient, Stop} from 'react-native-svg';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
} from 'victory-native';
import TabViewGenres from './TabViewGenres';
import dayjs from 'dayjs';

const Static = () => {
  const [yearSelect, setYearSelect] = useState(dayjs());
  const [dataWatchedMovie, setDataWatchedMovie] = useState(initArrayStat());
  const [dataWatchedSeason, setDataWatchedSeason] = useState(initArrayStat());
  const [dataGenresMovie, setDataGenresMovie] = useState<typeArrayGenres[]>([]);
  const [dataGenresSeason, setDataGenresSeason] = useState<typeArrayGenres[]>(
    [],
  );
  const [totalWatched, setTotalWatched] = useState<number>(0);
  const [totalGenres, setTotalGenres] = useState<number>(0);

  const {useQuery} = SyncedRealmContext;
  const query: Realm.Results<LineItem> = useQuery('LineItem');
  const data: Realm.Results<LineItem> = useMemo(() => {
    return query.filtered(
      'watchedAt != null && watchedAt >= $0 && watchedAt <= $1',
      yearSelect.startOf('year').toDate(),
      yearSelect.endOf('year').toDate(),
    );
  }, [query, yearSelect]);

  const handleDataGenres = (
    map: Map<string, typeArrayGenres>,
    genres: Genres,
  ) => {
    let item = map.get(genres.id);
    if (item == undefined) {
      item = {
        id: genres.id,
        name: genres.name,
        color: randomColor(),
        count: 1,
      };
    } else {
      item.count += 1;
    }
    map.set(item.id, item);
  };

  useEffect(() => {
    try {
      const arrayStatMovie = initArrayStat();
      const arrayStatTV = initArrayStat();

      const dataGenresMovieState: Map<string, typeArrayGenres> = new Map();
      const dataGenresTVState: Map<string, typeArrayGenres> = new Map();

      let countTotalWatched = 0;
      let countTotalGenres = 0;
      data.forEach(item => {
        if (item.watchedAt) {
          countTotalWatched++;
          if (item.media_type === 'movie') {
            arrayStatMovie[item?.watchedAt?.getUTCMonth() + 1 - 1].y++;
            const genres: Genres[] = Array.from(item.genres);
            countTotalGenres += genres.length;
            genres.forEach(itemGenres => {
              handleDataGenres(dataGenresMovieState, itemGenres);
            });
          } else if (item.media_type === 'tv') {
            arrayStatTV[item?.watchedAt?.getUTCMonth() + 1 - 1].y++;
            const genres: Genres[] = Array.from(item.genres);
            countTotalGenres += genres.length;
            genres.forEach(itemGenres => {
              handleDataGenres(dataGenresTVState, itemGenres);
            });
          }
        }
      });
      setDataWatchedMovie(arrayStatMovie);
      setDataWatchedSeason(arrayStatTV);
      setDataGenresMovie(Array.from(dataGenresMovieState.values()));
      setDataGenresSeason(Array.from(dataGenresTVState.values()));
      setTotalWatched(countTotalWatched);
      setTotalGenres(countTotalGenres);
    } catch (err) {
      console.log('STAT ERROR', err);
    }
  }, [data]);

  // BottomSheetModal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['30%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);
  // BottomSheetModal

  const Gradient = ({gradientColors}: {gradientColors: string[]}) => (
    <LinearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="100%">
      {gradientColors.map((color, index) => (
        <Stop
          key={index}
          offset={`${(index * 100) / (gradientColors.length - 1)}%`}
          stopColor={color}
        />
      ))}
    </LinearGradient>
  );

  const handleSelectYear = (year: number) => {
    setYearSelect(yearSelect.set('year', year));
    // setYearSelect(year);
    bottomSheetModalRef.current?.close();
  };

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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.note} />
          <Text style={styles.title}> STATICS </Text>
          <TouchableOpacity
            style={styles.select}
            onPress={handlePresentModalPress}>
            <Text style={select.text}> {yearSelect.get('year')} </Text>
            <Image
              source={require('../../Assets/Static/Select.png')}
              style={select.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styleStat.container}>
          <ImageBackground
            style={styleStat.background}
            source={require('../../Assets/Static/TotalWatched.png')}>
            <Text style={styleStat.title}>Total watched</Text>
            <Text style={styleStat.text}> {totalWatched} </Text>
          </ImageBackground>
          <ImageBackground
            style={styleStat.background}
            source={require('../../Assets/Static/Genres.png')}>
            <Text style={styleStat.title}>Genres</Text>
            <Text style={styleStat.text}> {totalGenres} </Text>
          </ImageBackground>
        </View>
        <View style={styleWatched.container}>
          <Text style={styleWatched.title}>Watched Movie</Text>
          <VictoryChart
            height={250}
            style={{
              parent: {
                marginLeft: -20,
                marginTop: -35,
              },
            }}>
            <Gradient gradientColors={['#134ED4', '#10B7BD']} />
            <VictoryBar
              barWidth={14}
              cornerRadius={{topLeft: 3, topRight: 3}}
              data={dataWatchedMovie}
              style={{
                data: {fill: 'url(#gradient)'},
              }}
            />
            <VictoryAxis
              crossAxis
              tickLabelComponent={
                <VictoryLabel style={{fill: '#9DA0A8', fontSize: 10}} />
              }
            />
          </VictoryChart>
        </View>
        <View style={styleWatched.container}>
          <Text style={styleWatched.title}>Watched TV Show</Text>
          <VictoryChart
            height={250}
            style={{
              parent: {
                marginLeft: -20,
                marginTop: -35,
              },
            }}>
            <Gradient gradientColors={['#A713D4', '#4504A7']} />
            <VictoryBar
              barWidth={14}
              cornerRadius={{topLeft: 3, topRight: 3}}
              data={dataWatchedSeason}
              style={{
                data: {fill: 'url(#gradient)'},
              }}
            />
            <VictoryAxis
              crossAxis
              tickLabelComponent={
                <VictoryLabel style={{fill: '#9DA0A8', fontSize: 10}} />
              }
            />
          </VictoryChart>
        </View>
        <View style={styleGenres.container}>
          <TabViewGenres
            dataGenresMovie={dataGenresMovie}
            dataGenresSeason={dataGenresSeason}
          />
        </View>
      </ScrollView>
      <BottomSheetModal
        backdropComponent={renderBackdrop}
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View>
          {[2020, 2021, 2022, 2023].map((item: number, index: number) => (
            <TouchableOpacity
              key={index}
              style={select.rowSelect}
              onPress={() => {
                handleSelectYear(item);
              }}>
              <Text style={select.rowTextSelect}> {item} </Text>
              {item === yearSelect.get('year') && (
                <Image
                  style={select.rowIconSelect}
                  source={require('../../Assets/Static/check.png')}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheetModal>
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
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 15,
    color: '#fff',
  },
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  select: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    text: {
      fontSize: 16,
      fontWeight: '700',
      color: '#F7BE13',
    },
    icon: {
      marginLeft: 10,
      marginRight: 20,
    },
  },
});

const select = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F7BE13',
  },
  icon: {
    marginLeft: 10,
    marginRight: 20,
  },
  rowSelect: {
    marginVertical: 5,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTextSelect: {
    fontSize: 16,
    fontWeight: '700',
  },
  rowIconSelect: {
    marginLeft: 'auto',
    marginRight: 10,
  },
});

const styleStat = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 25,
  },
  background: {
    width: 170,
    height: 90,
  },
  title: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 15,
    marginLeft: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: 20,
    marginTop: 10,
  },
});

const styleWatched = StyleSheet.create({
  container: {
    backgroundColor: '#15192D',
    borderRadius: 16,
    marginTop: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: 20,
    paddingTop: 20,
  },
});

const styleGenres = StyleSheet.create({
  container: {
    backgroundColor: '#15192D',
    borderRadius: 16,
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 20
  },
});

export default Static;
