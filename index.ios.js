/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  MapView,
  StyleSheet,
  Text,
  View,
} = React;

var MOCKED_PLACES_DATA = [
  {title: '중평빌딩', year: '2015', posters: {thumbnail: 'https://a0.muscache.com/ic/discover/397?interpolation=lanczos-none&output-format=jpg&output-quality=70&v=33b4f2&downsize=655px:326px'}},
  {title: '숙대입구', year: '2014', posters: {thumbnail: 'https://a0.muscache.com/ic/pictures/3064396/5bd2de9c_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70'}},
];

var REQUEST_URL = 'https://gist.github.com/eces/a34efb6e87506ac24486/raw/15286c6ce910748f11b9ad601a76fd1febd26634/MoviesExample.json'

var AwesomeProject = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      defaultRegion: {
        latitude: 37.5717931,
        longitude: 126.9766249,
        latitudeDelta: 0,
        longtitudeDelta: 0,
      },
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(REQUEST_URL)
      .then( (response) => response.json() )
      .then( (responseData) => {
        this.setState({
          dataSource: 
            this.state.dataSource.cloneWithRows(responseData.places),
          loaded: true,
        });
      })
      .done();
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>
        <MapView 
          style={styles.map}
          region={this.state.defaultRegion}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPlace}
          style={styles.listView}
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          contentInset={{
            bottom: 150,
          }}
        />
      </View>
    );
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          기다려.
        </Text>
      </View>
    );
  },
  renderPlace: function(place) {
    return (
      <View style={styles.container}>
        <Image 
          source={{uri: place.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.year}>{place.year}</Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  map: {
    height: 200,
    paddingTop: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 200,
    height: 200,
  },
  listView: {
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
