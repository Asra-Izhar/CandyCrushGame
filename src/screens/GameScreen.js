import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React, { useState,useEffect } from 'react'; // Import useState
import { commonStyles } from '../styles/commonStyles';
import GameHeader from '../components/game/GameHeader';
import { useRoute } from '@react-navigation/native'; 
import { useSound } from '../navigation/SoundContext';
import GameFooter from '../components/game/GameFooter';
import GameTile from '../components/game/GameTile';


const GameScreen = () => {
  const route = useRoute(); // Assuming useRoute is defined or imported
  const item = route?.params; // Type casting removed for .js
  
  const { playSound } = useSound(); // Assuming useSound is defined or imported
  const [gridData, setGridData] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [time, setTime] = useState(null); // Corrected useState usage
  const [collectedCandies,setCollectedCandies] = useState(0);
  console.log('item=================================',item);
  

// useEffect(() => {
//   if (item?.levels) {
//     setGridData(item.levels.grid);
//     setTotalCount(item.levels.pass);
//     setTime(item.levels.time);
    

  

//   }
//  }, []); // item added to dependency array
useEffect(() => {
  if (route.params && route.params.levels) {
    const { levels } = route.params; // Destructure for cleaner code
    console.log("Received Level data:", levels);
    setGridData(levels.grid);
    setTotalCount(levels.pass);
    setTime(levels.time);
  }
}, [route.params]); // Dependency is now route.params


  return (
    <ImageBackground style={commonStyles.simpleContainer} source={require('../assets/images/b1.png')}>
      <GameHeader totalCount={totalCount} collectedCandies={collectedCandies} time={time} /> 
  

      
      { gridData &&(
          console.log("gridData:", gridData), // Check the value
        <GameTile 
      
                data={gridData}       // Passing 'gameData' as the 'data' prop
                setData={setGridData} // Passing 'setGameData' as 'setData'
                collectedCandies={setCollectedCandies} // Passing 'candies' as 'collectedCandies'
            />)}
      
        <GameFooter />

          </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // Add your styles here if needed
});

export default GameScreen;

