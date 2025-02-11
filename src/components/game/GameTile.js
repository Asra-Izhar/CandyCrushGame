import React from 'react';
import { View, StyleSheet } from 'react-native';
import { screenHeight } from '../../utils/Constants';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import RFPercentage from 'react-native-responsive-fontsize';

const GameTile = (props) => {
    const { data, setData } = props; // Destructure props

    return (
        <View style={styles.flex2}>
            {data?.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row?.map((tile, colIndex) => ( // Use 'tile' here, not 'title'
                        <View
                            key={`${rowIndex}-${colIndex}`}
                            style={[styles.tile, tile === null ? styles.emptyTile : styles.activeTile]}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    flex2: {
        height: screenHeight * 0.75,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    tile: {
        width: 50,
        height: 50,
        margin: 2,
        borderRadius: 5,
    },
    emptyTile: {
        backgroundColor: 'lightgray',
    },
    activeTile: {
        backgroundColor: 'blue',
    },
});

export default gestureHandlerRootHOC(GameTile);
