import React from 'react';
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image, TextInput } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withRepeat,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

import WheelSvg from '../../../components/wheelSvg';


export default function WheelSpin() {
  const [numSlices, setNumSlices] = useState(1);
  const [slice, setSlice] = useState(0);
  const rotation = useSharedValue(0);

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [sliceInput, setSliceInput] = useState('2');

  const handleSetSlices = () => {
    const parsed = parseInt(sliceInput, 10);
    if (!isNaN(parsed) && parsed >= 2 && parsed <= 12) {
      setNumSlices(parsed);
    }
  };
  
  const spin = () => {
    console.log('spinned');
    const result = getRandomIntInclusive(1, numSlices);
    const sliceAngle = 360/numSlices;
    const sliceCenter = (result - 1) * sliceAngle + sliceAngle / 2;
    const targetInCycle = (360 - sliceCenter) % 360;
    const currentNormalized = rotation.value % 360;
    let delta = targetInCycle - currentNormalized;
    if (delta < 0) delta += 306;

    const extraSpins = 20;
    const finalRotation = rotation.value + extraSpins * 360 + delta;
    
    rotation.value = withTiming(
      finalRotation,
      { duration: 4000, easing: Easing.out(Easing.cubic) },
      () => {
        runOnJS(setSlice)(result);
      }
    );
  };

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate:`${rotation.value}deg` },
    ]
  }));

  return (
    <View style = {styles.container}>
      <Pressable onPress={spin} style={styles.button}>
        <View style={styles.wheelContainer}>
          <Animated.View style = { [styles.wheel, containerStyle] }>
            <WheelSvg numSlices={numSlices} size={250}/>
          </Animated.View>
          <View style={styles.pointer} />
        </View>
      </Pressable>
      <TextInput
        style={styles.input}
        value={sliceInput}
        onChangeText={setSliceInput}
        onSubmitEditing={handleSetSlices}
        onBlur={handleSetSlices}
        keyboardType="num-pad"
        maxLength={2}
      />
      <Text styles={styles.inputLabel}>Slices</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
 wheel: {
  width: 250,
  height: 250,
  borderRadius: 125,
  overflow: 'hidden',   // add this to clip anything that overflows the bounds
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 4,
  borderColor: '#B8860B',
  },

  button: { padding: 16 },
  buttonText: { color: '#fff', fontSize: 18 },
  
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 8 },
  input: {
    backgroundColor: '#2a2e35',
    color: '#fff',
    fontSize: 18,
    width: 60,
    textAlign: 'center',
    borderRadius: 8,
    paddingVertical: 8,
  },
  inputLabel: { color: '#9aa0a6', fontSize: 16 },

  wheelContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  },
});
