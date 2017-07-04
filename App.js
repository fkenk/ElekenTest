import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Slider, AsyncStorage} from 'react-native';
import ImagesScreen from "./ImagesScreen";
import {StackNavigator} from 'react-navigation';


class Main extends Component {
    static navigationOptions = {
        title: 'MainScreen',
    };

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            sliderValue: 2,
            sliderMaxValue: 5,
            sliderMinValue: 1,
            sliderStep: 1
        };
    }

    componentDidMount() {
        AsyncStorage.getItem("searchText").then((value) => {
            this.setState({'searchText': value});
        }).done();
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>Search Term:</Text>
                    <TextInput style={styles.searchText}
                               placeholder="Type here to search!"
                               onChangeText={(searchText) => this.saveData(searchText)}
                               value={this.state.searchText}/>
                </View>

                <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 20,}}>
                    <Text>Columns</Text>
                    <Slider style={styles.slider}
                            value={this.state.sliderValue}
                            minimumValue={this.state.sliderMinValue}
                            maximumValue={this.state.sliderMaxValue}
                            onValueChange={val => this.setState({sliderValue: val})}
                            step={this.state.sliderStep}/>
                    <Text>{this.state.sliderValue}</Text>
                </View>

                <Button title="search" onPress={() => navigate('ImagesScreen', {
                    searchText: this.state.searchText,
                    columns: this.state.sliderValue
                })}/>

            </View>
        );
    }

    saveData(value) {
        AsyncStorage.setItem('searchText', value);
        this.setState({'searchText': value});
    }
}


export default BasicApp = StackNavigator({
    Main: {screen: Main},
    ImagesScreen: {screen: ImagesScreen},
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    searchText: {
        height: 40,
        flex: 1,
        paddingLeft: 10,
    },
    slider: {
        flex: 1,
    }
});
