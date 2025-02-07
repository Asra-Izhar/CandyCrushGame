import { View, Text, StyleSheet, ImageBackground ,Image} from 'react-native'
import React, { useEffect } from 'react'
import { commonStyles } from '../styles/commonStyles'
import {  screenHeight, screenWidth } from '../utils/Constants'
import { useIsFocused } from '@react-navigation/native'

import LottieView from 'lottie-react-native';
import  Animated ,{
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { useSound } from '../navigation/SoundContext'
import ScalePress from '../components/ui/ScalePress'
import { navigate } from '../utils/NavigationUtil'
import Footer from '../components/ui/Footer'

const HomeScreen = () => {
  const {playSound} =useSound()
  const isFocused=useIsFocused()
  const translateY= useSharedValue(-200)
  
   useEffect(()=>{
        if(isFocused){
       playSound('bg',true)
      }
  },[isFocused])      // is ko baad mein on kr lain ge



  useEffect(()=>{
    translateY.value= withTiming(0,{duration:3000})
  },[isFocused])
  
  const animatedStyle=useAnimatedStyle(()=>({
    transform:[{translateY:translateY.value}],
  }))
  return (
    
      <ImageBackground  source={require('../assets/images/b2.png')} style={commonStyles.container}>
        <Animated.Image 
        source={require('../assets/images/banner.png')}
        style={[styles.img,animatedStyle]} />
        <LottieView
        source={require('../assets/animations/bird.json')}
        speed={1}
        loop
        autoPlay
        hardwareAccelerationAndroid
        style={styles.LottieView}
        
        />
        <ScalePress style={styles.playButtonContainer}
        onPress={()=>{
          navigate('LevelScreen')
        }}
        >
          <Image 
          source={require('../assets/icons/play.png')}
          style={styles.playButton}/>

        </ScalePress>
        <Footer />
        
      </ImageBackground>
      

    
  )
}
const styles=StyleSheet.create({
  img:{
    width:screenWidth,
    height:screenWidth*0.8,
    position: 'absolute',
    resizeMode:'contain',
    
    top:-20,
  
  },
  LottieView:{
    width:200,
    height:200,
    position:'absolute',
    left:-20,
    top:'30%',
    transform:[{scaleX:-1}],
  },
  playButton:
  {
    resizeMode:'contain',
    width:screenWidth *0.5,
    height:screenWidth * 0.2,

  },
  playButtonContainer:{
    marginTop:screenHeight * 0.35,
  }
})

export default HomeScreen