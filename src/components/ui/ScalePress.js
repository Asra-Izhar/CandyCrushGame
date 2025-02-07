import React from "react";
import { Animated, TouchableOpacity } from "react-native";
import { playSound } from "../../utils/SoundUtility";

const ScalePress = ({ style, onPress, children }) => {
  const scaleValue = new Animated.Value(1);

  const onPressIn = () => {
    playSound('ui'); // Make sure playSound is defined and accessible
    Animated.spring(scaleValue, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={1}
      style={style}
    >
      <Animated.View style={[{ transform: [{ scale: scaleValue }], width: '100%' }]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ScalePress;