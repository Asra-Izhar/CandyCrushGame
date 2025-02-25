import { View, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import React, { useState,useEffect, useRef } from 'react'; // Import useState
import { commonStyles } from '../styles/commonStyles';
import GameHeader from '../components/game/GameHeader';
import { useRoute } from '@react-navigation/native'; 
import { useSound } from '../navigation/SoundContext';
import GameFooter from '../components/game/GameFooter';
import GameTile from '../components/game/GameTile';
import { useLevelStore } from '../state/UseLevelStore';
import { Animated } from 'react-native';
import { goBack } from '../utils/NavigationUtil';

import { screenHeight } from '../utils/Constants';
import LottieView from 'lottie-react-native';


const GameScreen = () => {
  const route = useRoute(); // Assuming useRoute is defined or imported
  const item = route?.params; // Type casting removed for .js
  
  const { playSound } = useSound(); // Assuming useSound is defined or imported
  const [gridData, setGridData] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [time, setTime] = useState(null); // Corrected useState usage
  const [collectedCandies,setCollectedCandies] = useState(0);
  console.log('item=================================',item);


  const [showAnimation, setShowAnimation] = useState(false);
const [firstAnimation, setFirstAnimation] = useState(false);
// const { completeLevel, unlockLevel } = useLevelStore();
const {completedLevel,unlockLevel} = useLevelStore();

// const fadeAnim = useRef(new Animated.Value(1)).current;
// const scalAnim = useRef(new Animated.Value(1)).current;

const fadeAnim = useRef(new (Animated?.Value || (() => {}))(1)).current;
const scalAnim = useRef(new (Animated?.Value || (() => {}))(1)).current;



  // const [showAnimation,setShowAnimation] =useState<boolean>(false);
  // const [firstAnimation,setFirstAnimation] = useState<boolean>(false);
  // const {completeLevel,unlockLevel} =useLevelStore();

  // const fadeAnim = useRef(new Animated.Value(1)).current;
  // const scalAnim= useRef(new Animated.Value(1)).current;
  


useEffect(() => {
  if (route.params && route.params.levels) {
    const { levels } = route.params; // Destructure for cleaner code
    console.log("Received Level data:", levels);
    setGridData(levels.grid);
    setTotalCount(levels.pass);
    setTime(levels.time);
  }
}, [route.params]); // Dependency is now route.params






// useEffect(()=>{
//   if(time === 0){
//     handleGameOver()
//   }
// },[time])


// handleGameOver=()=>{
//   if(collectedCandies >= totalCount)
//   {
//     completeLevel(item?.level?.id,collectedCandies)
//     unlockLevel(item?.level?.id+1);
//     Alert.alert("Congratulations",'level completed!',[
//       {
//         text: "Next Level",
//         onPress:()=>goBack()
//       }
//     ]
//   )
//   }
//   else{
//     Alert.alert("Gane Over",'You did not collect enough candies',[
//       {
//         text:'Phew! I will win next time',
//         onPress:()=>goBack() 
//       }
//     ])
//   }
// }



useEffect(() => {
  if (time === 0) {
    handleGameOver();
  }
}, [time]);

const handleGameOver = () => {
  if (collectedCandies >= totalCount) {
    completedLevel(item?.level?.id, collectedCandies);
    unlockLevel(item?.level?.id + 1);
     
    Alert.alert("Congratulations", "Level completed!", [
      {
        text: "Next Level",
        onPress: () => goBack(),
      },
    ]);
  } else {
    Alert.alert("Game Over", "You did not collect enough candies", [
      {
        text: "Phew! I will win next time",
        onPress: () => goBack(),
      },
    ]);
  }
};








useEffect(() => {
  if (time && time > 0) {
    const timeInterval = setInterval(() => {
      setTime((prev) => {
        if (prev === 1000) {
          clearInterval(timeInterval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
    return () => clearInterval(timeInterval);
  }
}, [time]);

useEffect(() => {
  if (collectedCandies >= totalCount && totalCount > 0 && !firstAnimation) {
    setShowAnimation(true);
    StartHeartBeatAnimation();
  }
}, [collectedCandies, totalCount]);

const StartHeartBeatAnimation = () => {
  playSound('cheer', false);
  Animated.loop(
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scalAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scalAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]),
    {
      iterations: 2,
    }
  ).start(() => {
    setFirstAnimation(true);
    setShowAnimation(false);
  });
};

  return (
    <ImageBackground style={commonStyles.simpleContainer} source={require('../assets/images/b1.png')}>
      <GameHeader totalCount={totalCount} collectedCandies={collectedCandies} time={time} /> 
  

      
      { gridData &&(
          console.log("gridData:", gridData), // Check the value
        <GameTile 
      
                data={gridData}       // Passing 'gameData' as the 'data' prop
                setData={setGridData} // Passing 'setGameData' as 'setData'
                // collectedCandies={setCollectedCandies} // Passing 'candies' as 'collectedCandies'
                setCollectedCandies={setCollectedCandies} 
            />)}



{/* 
             {
              showAnimation && (
                <>
                <Animated.Image 
                source={require('../assets/text/t2.png')}
                style={[
                  styles.centerImage,
                  {
                  opacity:fadeAnim,
                  transform:[{scale:scaleAnim}]
 } ]}/>
              </>
              )
            }  */}

      

{
  showAnimation && (
    <>
      <Animated.Image
        source={require('../assets/text/t2.png')}
        style={[
          styles.centerImage,
          {
            opacity: fadeAnim,
            transform: [{ scale: scalAnim }],
          },
        ]}
      />
      <LottieView 
      source={require('../assets/animations/confetti_2.json')}
      style={styles.lottie}
      autoPlay
      loop/>
    </>
  )
}


        <GameFooter />

          </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // Add your styles here if needed

  centerImage:{
    position:'absolute',
    width:screenHeight * 0.8,
    height:100,
    resizeMode:'contain',
    alignSelf: 'center',
  top:'15%',  },
  lottie:{
    position:'absolute',
    width:screenHeight * 0.8,
    height:180,
    resizeMode:'contain',
    alignSelf:'center',
    top:'10%',
  }
});

export default GameScreen;





























