
import React from 'react';
import { View, Text, ImageBackground, Image, FlatList } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { levelStyles } from '../styles/levelStyles';
import ScalePress from '../components/ui/ScalePress';
import { goBack, navigate } from '../utils/NavigationUtil';
import { useLevelStore } from '../state/UseLevelStore';

const LevelScreen = () => {
  const { levels } = useLevelStore();
  

  const levelPressHandler = (id) => {
    const levelKey = `level ${id}`; // No need for "as keyof GameLevels" in JavaScript
    navigate('GameScreen', {
      level: {...levels, id: id }, // Assuming 'level' is defined somewhere accessible
    });
  };

  const renderItem = ({ item }) => {
    const opacity = item?.unlocked ? 1 : 0.5;
    const emoji = item.completed ? '✅' : item?.unlocked ? '🍬' : '🔐';
    return (
      <ScalePress
        style={levelStyles.levelItem}
        onPress={() => {
          if (item?.unlocked) {
            // Navigate or perform action for unlocked level
            levelPressHandler(item?.id)
            console.log("Navigating to level:", item.id); // Example: Replace with your navigation logic
          }
        }}
      >
        <View style={{ opacity }}>
          <Text style={levelStyles.levelText}>{emoji}</Text>
          <Text style={levelStyles.levelText}>Level {item?.id}</Text>
          {item?.highScore > 0 && ( // Corrected conditional check
            <Text style={levelStyles.highScoreText}>HS: {item?.highScore}</Text>
          )}
        </View>
      </ScalePress>
    );
  };

  return (
    <ImageBackground
      style={commonStyles.container}
      source={require('../assets/images/forest.jpeg')}
    >
      <SafeAreaView />
      <View style={levelStyles.flex1}>
        <ScalePress onPress={() => goBack()}>
          <Image
            source={require('../assets/icons/back.png')}
            style={levelStyles.backIcon}
          />
        </ScalePress>
        <ImageBackground
          source={require('../assets/images/lines.jpg')}
          style={levelStyles.levelContainer}
        >
          <View style={levelStyles.subLevelContainer}>
            <FlatList
              data={levels}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={levelStyles.columnWrapper}
              ListFooterComponent={
                <View style={levelStyles.comingSoonContainer}>
                  <Image
                    source={require('../assets/images/doddle.png')}
                    style={levelStyles.doddle}
                  />
                  <Text style={levelStyles.comingSoonText}> Coming Soon! Dev Cooking</Text>
                </View>
              }
            />
          </View>
        </ImageBackground>
        <View style={levelStyles.flex2}>
          <Text style={levelStyles.text}>
            Rule: Collect the minimum amount of candy before time runs out!
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LevelScreen;