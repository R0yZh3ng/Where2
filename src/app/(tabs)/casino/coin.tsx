import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue, 
  useAnimatedStyle,
  withSequence,
  withTiming,
  withRepeat,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

export default function CoinFlip() {
  const [face, setFace] = useState('heads');
  const rotation = useSharedValue(0);
  const translateY = useSharedValue(0);

  const flip = () => {
    console.log('clicked');
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    const extraSpins = 6;
    const finalRotation = extraSpins * 360 + (result === 'tails' ? 180 : 0)

    rotation.value = withTiming(
      finalRotation,
      { duration: 1000, easing: Easing.out(Easing.cubic) },
      () => {
        runOnJS(setFace)(result);
        rotation.value = 0;
      }
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotateY: `${rotation.value}deg` },
      { scaleX: Math.abs(Math.cos((rotation.value * Math.PI) / 180)) },
    ]
  }));

  return (
    <View style = {styles.container}>
      <Pressable onPress={flip} style={styles.button}>      
        <Animated.View style = {[styles.coin, animatedStyle]}>
          <Text style={styles.coinText}>{face === "heads" ? 'H':'T'}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  coin: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ffd33d',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  coinText: { fontSize: 32, fontWeight: '700' },
  button: { padding: 16 },
  buttonText: { color: '#fff', fontSize: 18 },
});

