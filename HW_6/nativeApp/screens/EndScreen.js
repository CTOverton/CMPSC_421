import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';

class EndScreen extends Component {

    render() {
        return (
            <View>
                <Text style={styles.welcome}>You have reached the end of your journey</Text>
                <Text style={styles.welcome}>Until next time feel free to play again</Text>
                <Button onPress={() => this.onNavigatePress()} title="Click here to begin your adventure anew"/>
                <Image
                    style={{
                        alignSelf: 'center',
                        height: 500,
                        width: 800,
                    }}
                    source={require('../assets/imgs/dwemer.jpg')}
                    resizeMode="stretch"
                />
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

export default EndScreen;