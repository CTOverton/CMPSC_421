import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';

class HomeScreen extends Component {

    render() {
        return (
            <View>
                <Text style={styles.welcome}>Welcome to a choose your own adventure story!</Text>
                <Button onPress={() => this.onNavigatePress()} title="Click here to begin your adventure"/>
                <Image source={require('../assets/imgs/Whiterun.jpg')} style={{width: '100%',}}/>
            </View>
        );
    }

    onNavigatePress() {
        this.props.navigation.navigate("GameScreen");
    }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default HomeScreen;