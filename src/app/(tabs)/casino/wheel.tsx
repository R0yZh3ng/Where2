import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withRepeat,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

export default function WheelSpin() {
  const [numSlices, setNumSlices] = useState(1);
  const [slice, setSlice] = useState(0);
  const rotation = useSharedValue(0);

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  const spin = () => {
    console.log('spinned');
    const result = getRandomIntInclusive(1, numSlices);
    const extraSpins = 20;
    const finalRotation = rotation.value + extraSpins * 360;
    
    rotation.value = withTiming(
      finalRotation,
      { duration: 1000, easing: Easing.out(Easing.cubic) },
      () => {
        runOnJS(setSlice)(result);
      }
    );
  };

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { scaleX: Math.abs(Math.cos((rotation.value * Math.PI) / 180)) },
    ]
  }));

  return (
    <View style = {styles.container}>
      <Pressable onPress={spin} style={styles.button}>
        <Animated.View style = { [styles.wheel, containerStyle] }>
          <Text>Just testing if this works</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  wheel: {
    width: 100,
    height: 100,
  },
  coinImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  coinText: { fontSize: 32, fontWeight: '700' },
  button: { padding: 16 },
  buttonText: { color: '#fff', fontSize: 18 },
});
