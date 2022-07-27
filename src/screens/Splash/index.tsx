import React from 'react';
import { Button, StyleSheet ,Dimensions} from 'react-native';
import Animated , {useSharedValue,useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {
  Container
} from './styles';


export function Splash(){
  const WIDTH = Dimensions.get('window').width
  const animation= useSharedValue(0)
  const animatedStyles= useAnimatedStyle(()=>{
    return {
        transform:[{translateX:withTiming(animation.value,{
          duration:3000
        })}]
    }
  })
  function handeAnimationPosition(){
    animation.value=Math.random() * (WIDTH - 100)
  }
  return (
    <Container>
        <Animated.View style={[styles.box,animatedStyles]}>

        </Animated.View>
        <Button title='Mover' onPress={handeAnimationPosition}/>
    </Container>
  );
}
const styles= StyleSheet.create({
    box:{
        width:100,
        height:100,
        backgroundColor:'red'
    }
})