import { View, Text ,StyleSheet, TouchableOpacity, Linking} from 'react-native'
import React from 'react'
import { FONTS } from '../../utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize';

const Footer = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={()=>Linking.openURL('https://www.youtube.com/@user-vv5kf1nw9j')} >
        <Text style={styles.text}>
            Made with 🤍
        </Text>
        <Text style={styles.text2}>
            by - Asra Izhar
        </Text>

      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        position:'absolute',
        bottom:20,
        alignSelf: 'center',
      
    },
    text:{
        fontFamily:FONTS.Twinkle,
        fontSize:RFValue(12),
        color:'white',
        textAlign:'center',
        textShadowColor:'rgba(0,0,0,0.75)',
        textShadowOffset:{width:2, height:2},
        textShadowRadius:2,

    },
    text2:{
        fontFamily:FONTS.Twinkle,
        fontSize:RFValue(16),
        color:'white',
        textAlign:'center',
        textShadowColor:'rgba(0,0,0,0.75)',
        textShadowOffset:{width:2, height:2},
        textShadowRadius:3,

    },
})

export default Footer