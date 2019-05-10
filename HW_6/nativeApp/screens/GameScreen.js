import React, {Component} from 'react';
import {Button, StyleSheet, View, Text, Image} from 'react-native';
// import Story from '../assets/story';

class GameScreen extends Component {

    state = {
        page: story.pages[0],
        /*page: {
            id: 0,
            title: 'Page 0',
            story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            img: require('../assets/imgs/Whiterun.jpg'),
            options: [
                {id: 0, destination: 1, description: 'Excepteur sint occaecat cupidatat non proident'},
                {id: 1, destination: 2, description: 'Excepteur sint occaecat cupidatat non proident'},
                {id: 2, destination: 3, description: 'Excepteur sint occaecat cupidatat non proident'},
            ]
        }*/
    }

    render() {
        let page = this.state.page;
        return (
            <View>
                <Text style={styles.title}>{page.title}</Text>
                <Text style={styles.story}>{page.story}</Text>
                {
                    page.options.map((option, index) => (
                        <Button
                            key={option.id}
                            onPress={() => this.onOptionPress(option.destination)}
                            style={styles.option}
                            title={option.description}
                        />
                    ))
                }
                <Image
                    style={{
                        alignSelf: 'center',
                        height: 500,
                        width: 800,
                    }}
                    source={page.img}
                    resizeMode="stretch"
                />

            </View>
        );
    }

    onOptionPress(destination) {
        if (destination != 'end') {
            this.setState({
                page: story.pages[destination]
            });
        } else {
            this.props.navigation.navigate("EndScreen");
        }

    }
}

export default GameScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    story: {

    },
    option: {
        backgroundColor: '#222222',
        color: '#f0f0f0',
    }
});

const story = {
    pages: [
        {
            id: 0,
            title: 'The Beginning',
            story: 'Beginning your journey in the city of Whiterun is a good a place to start as any.',
            img: require('../assets/imgs/Whiterun.jpg'),
            options: [
                {id: 0, destination: 1, description: 'Go to the blacksmith'},
                {id: 1, destination: 2, description: 'Venture Outside'},
            ]
        },
        {
            id: 1,
            title: 'The blacksmith',
            story: 'The skyforge is home to the best steel in skyrim. Not a bad idea to armor up.',
            img: require('../assets/imgs/whiterun-forge.jpg'),
            options: [
                {id: 0, destination: 3, description: 'Equip armor and sword'},
                {id: 1, destination: 2, description: 'Wander off'},
            ]
        },
        {
            id: 2,
            title: 'The Gate',
            story: 'You are greeted by the guard at the gate, seeing as you arent fit for a fight he turns you away',
            img: require('../assets/imgs/Whiterun.jpg'),
            options: [
                {id: 0, destination: 0, description: 'Return home'},
            ]
        },
        {
            id: 3,
            title: 'Adventure awaits',
            story: 'Equipped to face the world you venture out',
            img: require('../assets/imgs/forest.jpg'),
            options: [
                {id: 0, destination: 4, description: 'Take the path North'},
                {id: 1, destination: 5, description: 'Take the path East'},
            ]
        },
        {
            id: 4,
            title: 'Dragon',
            story: 'A dragon is spotted overhead, though still distant.',
            img: require('../assets/imgs/Open-Landscape.jpg'),
            options: [
                {id: 0, destination: 3, description: 'Turn around'},
                {id: 1, destination: 5, description: 'Sneak by'},
                {id: 2, destination: 6, description: 'Step off the path into the forest'},
            ]
        },
        {
            id: 5,
            title: 'The road to Windhelm',
            story: 'A sign ahead shows the next city isnt too far off',
            img: require('../assets/imgs/forest.jpg'),
            options: [
                {id: 0, destination: 10, description: 'Continue to the city'},
                {id: 1, destination: 0, description: 'Return home'},
            ]
        },
        {
            id: 6,
            title: 'Entrance to a tomb',
            story: 'Safe beneath the trees you find a ancient markings and a path up a mountain',
            img: require('../assets/imgs/Tomb.jpg'),
            options: [
                {id: 0, destination: 7, description: 'Follow the path'},
                {id: 1, destination: 4, description: 'Turn around'},
            ]
        },
        {
            id: 7,
            title: 'Atop the mountain',
            story: 'At the top of a mountain you find a shield, and hear a loud noise.',
            img: require('../assets/imgs/Ruins.jpg'),
            options: [
                {id: 0, destination: 8, description: 'Continue'},
            ]
        },
        {
            id: 8,
            title: 'Frosttroll attacks',
            story: 'A frosttroll attacks you, you are well armored but not very experienced',
            img: require('../assets/imgs/Attacked-frost-troll.jpg'),
            options: [
                {id: 0, destination: 9, description: 'Fight'},
                {id: 1, destination: 5, description: 'Flight'},
            ]
        },
        {
            id: 9,
            title: 'Victory!',
            story: 'A tough fight, but a victory none the less. You climb down the stairs to the path road ahead.',
            img: require('../assets/imgs/Attacked-frost-troll.jpg'),
            options: [
                {id: 0, destination: 5, description: 'Continue'},
            ]
        },
        {
            id: 10,
            title: 'Windhelm',
            story: 'Welcome to Windhelm the writer says! If you wish to continue... well you may just have to wait till I come up with more things for you to do!',
            img: require('../assets/imgs/Windhelm.jpg'),
            options: [
                {id: 0, destination: 'end', description: 'The end'},
            ]
        },

    ]
}