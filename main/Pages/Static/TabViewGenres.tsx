import {Text} from '@rneui/themed';
import {typeArrayGenres} from 'main/Utils/Stat';
import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {VictoryAxis, VictoryChart, VictoryPie} from 'victory-native';

const TabViewGenres = ({
  dataGenresMovie,
  dataGenresSeason,
}: {
  dataGenresMovie: typeArrayGenres[];
  dataGenresSeason: typeArrayGenres[];
}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'tab1', title: 'Movie Genres'},
    {key: 'tab2', title: 'TV Show Genres'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      tabStyle={{width: 'auto'}}
      style={styles.tabBar}
      renderLabel={({route, focused}) => (
        <Text style={[styles.tabLabel, {color: focused ? '#F7BE13' : '#FFF'}]}>
          {route.title}
        </Text>
      )}
    />
  );

  const TabMovie = () => (
    <View>
      {dataGenresMovie.length === 0 ? (
        <View style={stylesGenres.itemContainer}>
          <Image
            source={require('../../Assets/SpaceEmpty/img1.png')}
            style={stylesGenres.image}
          />
          <Text style={stylesGenres.text1}>No data</Text>
        </View>
      ) : (
        <View>
          <VictoryChart
            height={250}
            style={{
              parent: {
                marginLeft: -20,
                marginTop: -35,
                marginBottom: -30,
              },
            }}>
            <VictoryPie
              labels={() => null}
              colorScale={dataGenresMovie.map(item => item.color)}
              data={dataGenresMovie.map(item => {
                return {y: item.count};
              })}
            />
            <VictoryAxis crossAxis={false} tickFormat={() => null} />
          </VictoryChart>
          <View>
            {dataGenresMovie.map((item, index) => (
              <ComponentGenres
                key={item.id}
                color={item.color}
                name={item.name}
                count={item.count}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );

  const TabTVShow = () => (
    <View>
      {dataGenresSeason.length === 0 ? (
        <View style={stylesGenres.itemContainer}>
          <Image
            source={require('../../Assets/SpaceEmpty/img1.png')}
            style={stylesGenres.image}
          />
          <Text style={stylesGenres.text1}>No data</Text>
        </View>
      ) : (
        <View>
          <VictoryChart
            height={250}
            style={{
              parent: {
                marginLeft: -20,
                marginTop: -35,
                marginBottom: -30,
              },
            }}>
            <VictoryPie
              labels={() => null}
              colorScale={dataGenresSeason.map(item => item.color)}
              data={dataGenresSeason.map(item => {
                return {y: item.count, x: ''};
              })}
            />
            <VictoryAxis crossAxis={false} tickFormat={() => null} />
          </VictoryChart>
          <View>
            {dataGenresSeason.map((item, index) => (
              <ComponentGenres
                key={item.id}
                color={item.color}
                name={item.name}
                count={item.count}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );

  const renderScene = SceneMap({
    tab1: TabMovie,
    tab2: TabTVShow,
  });

  return (
    <TabView
      style={{
        width: 300,
        height:
          Math.max(dataGenresMovie.length, dataGenresSeason.length) * 30 + 250,
        marginBottom: 10,
      }}
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
    />
  );
};

const ComponentGenres = ({
  color,
  name,
  count,
}: {
  color: string;
  name: string;
  count: number;
}) => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 12,
      height: 20,
      transform: [{translateX: Dimensions.get('window').width / 4}],
    },
    color: {
      height: 20,
      width: 20,
      borderRadius: 5,
      backgroundColor: color,
      marginRight: 13,
    },
    text: {
      color: '#9DA0A8',
      fontSize: 14,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.color} />
      <Text style={styles.text}>
        {name} - {count} movie
      </Text>
    </View>
  );
};

const stylesGenres = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    marginHorizontal: -20,
  },
  image: {
    marginTop: 30,
  },
  text1: {
    width: '100%',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 10,
    color: '#fff',
  },
});

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  tabIndicator: {
    backgroundColor: '#F7BE13',
    height: 3,
  },
  tabBar: {
    backgroundColor: '#15192D',
    padding: 0,
    margin: 0,
    marginLeft: 10,
    borderWidth: 0,
  },
});

export default TabViewGenres;
