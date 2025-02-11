// import { View, Text,StyleSheet } from 'react-native'
// import React from 'react'
// import { screenHeight } from '../../utils/Constants';
// import {PanGestureHandler} from 'react-native-gesture-handler'
// import { RFPercentage } from 'react-native-responsive-fontsize';

// const GameTile = () => {
//     interface GameTileProps{
//         data:any[][];
//         setData:(data:any)=> any
//     }
//     const GameTileProps:FC<GameTileProps>= () =>{
//   return (
//     <View>
//       {data?.map((row,rowIndex)=>(
//         <View key={rowIndex} style={styles.row}>
//           {row?.map(title,colIndex)=>(
//             <PanGestureHandler
//             key={`${rowIndex}-${colIndex}`}
//             onGestureEvent={(event)=>{

//             }}
//             onHandlerStateChange={(event)=>{

//             }}>
//               <View style={styles.tile,
//                 tile===null ? styles.emptyTile : styles.activeTile}></View>
            
//             </PanGestureHandler>

//           )}
//         </View> 
//       ))}
//     </View>
//   )
// }
// }
// const styles = StyleSheet.create({
//     flex2:{
//         height:screenHeight *0.75,
//         width:'100%',
//         justifyContent:"center",
//         alignItems:'center',
//         alignSelf:'center',
    
//     },
//     row:{
//       flexDirection:'row',
//     },
//     tile:{
//       width:RFPercentage(5,5),
//       height:RFPercentage(5,5),
//       justifyContent:'center',
//       alignItems:'center',
//       alignSelf:'center',
//       backgroundColor:'transparent',
//     },
//     emptyTile:{
//       backgroundColor:'transparent',
//     },
//     activeTile:{
//       backgroundColor:'326E9A',
//       borderWidth:0.6,
//       borderColor:'#666',
//     }
// })

// export default gestureHandlerRootHOC(GameTile)





import React from 'react';
import { View, StyleSheet } from 'react-native';
import { screenHeight } from '../../utils/Constants';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler' // Import HOC

const GameTile = (props) => {
    const { data, setData } = props; // Destructure props

    return (
        <View>
            {data?.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row?.map((tile, colIndex) => ( // Use 'tile' here, not 'title'
                        <PanGestureHandler
                            key={`${rowIndex}-${colIndex}`}
                            onGestureEvent={(event) => {
                                // Your gesture event logic here
                            }}
                            onHandlerStateChange={(event) => {
                                // Your handler state change logic here
                            }}
                        >
                            <View style={[styles.tile, tile === null ? styles.emptyTile : styles.activeTile]} />
                        </PanGestureHandler>
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
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center',

    },
    row: {
        flexDirection: 'row',
    },
    tile: {
        width: RFPercentage(5.5), // Corrected typo here (5,5)
        height: RFPercentage(5.5), // Corrected typo here (5,5)
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
    emptyTile: {
        backgroundColor: 'transparent',
    },
    activeTile: {
        backgroundColor: '#326E9A', // Added # for color
        borderWidth: 0.6,
        borderColor: '#666',
    }
});

export default gestureHandlerRootHOC(GameTile); // Wrap with HOC

