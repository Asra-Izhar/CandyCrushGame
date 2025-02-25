import React from 'react';
import { View, StyleSheet, Animated, Pressable } from 'react-native';
import { screenHeight } from '../../utils/Constants';
import { gestureHandlerRootHOC, State } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { getCandyImage } from '../../utils/data';
import useGameLogic from '../gameLogic/useGameLogic';
import { playSound } from '../../utils/SoundUtility';

const GameTile = (props) => {
    // const { data, setData, setCollectedCandies } = props;
    const { data, setData, setCollectedCandies } = props;

    const { handleGesture, animatedValues } = useGameLogic(data, setData);

    return (
        <View style={styles.flex2}>
            {data?.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row?.map((tile, colIndex) => (
                        <Pressable
                            key={`${rowIndex}-${colIndex}`}
                            onPressIn={(event) => {
                                playSound('candy_shuffle'); // Play sound on press
                                handleGesture(event, rowIndex, colIndex, State.ACTIVE, setCollectedCandies);
                            }}
                            onPressOut={(event) => {
                                handleGesture(event, rowIndex, colIndex, event?.nativeEvent?.state, setCollectedCandies);
                            }}
                            style={[
                                styles.tile,
                                tile === null ? styles.emptyTile : styles.activeTile
                            ]}
                        >
                            {tile !== null && (
                                <Animated.Image
                                    source={getCandyImage(tile)}
                                    style={[
                                        styles.candy,
                            
                                       animatedValues[rowIndex]?.[colIndex]
                                            ? {
                                                transform: [
                                                    { translateX: animatedValues[rowIndex][colIndex].x },
                                                    { translateY: animatedValues[rowIndex][colIndex].y }
                                                ]
                                            }
                                            : {}
                                    ]}
                                    resizeMode="contain"
                                />
                            )}
                        </Pressable>
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
        width: RFPercentage(5.5),
        height: RFPercentage(5.5),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    emptyTile: {
        backgroundColor: 'transparent',
    },
    activeTile: {
        backgroundColor: '#326E9A',
        borderWidth: 0.6,
        borderColor: '#666',
    },
    candy: {
        width: '80%',
        height: '80%',
    },
});

export default gestureHandlerRootHOC(GameTile);









