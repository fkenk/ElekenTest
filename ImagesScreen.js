import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator, ListView, Text, View, Dimensions} from 'react-native';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';


export default class ImagesScreen extends Component {
    static navigationOptions = {
        title: 'ImagesScreen',
    };

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {
            isLoading: true,
            searchText: params.searchText,
            columns: params.columns,
        }
    }

    componentDidMount() {

        const params = {
            q: this.state.searchText,
            cx: '016112608554864737764:od_nuhbjoqs',
            key: 'AIzaSyBVgDwgHXBqmzy3oq3EvtcAgCt1t1Beq6k',
            searchType: 'image',
            start: 1
        };

        const esc = encodeURIComponent;
        const query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');

        return fetch('https://www.googleapis.com/customsearch/v1?' + query)
            .then((response) => response.json())
            .then((responseJson) => {
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson.items),
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }

        const columns = this.state.columns;
        const width = Dimensions.get('window').width;

        return (
            <ListView
                contentContainerStyle={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <View><Image source={{uri: data.link}}
                                                  indicator={Progress.Pie}
                                                  indicatorProps={{
                                                      size: 80,
                                                      borderWidth: 0,
                                                      color: 'rgba(150, 150, 150, 1)',
                                                      unfilledColor: 'rgba(200, 200, 200, 0.2)'
                                                  }}
                                                  style={{
                                                      margin: 3,
                                                      get width() {
                                                          return (width / columns) - 2 * this.margin
                                                      },
                                                      get height() {
                                                          return this.width
                                                      }
                                                  }}/></View>}
            />
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});