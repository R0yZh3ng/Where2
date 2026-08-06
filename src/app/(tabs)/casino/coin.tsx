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

const headsImage = require('../../../../assets/images/goofy_coin_heads.png');
const tailsImage = require('../../../../assets/images/goofy_coin_tails.png');

export default function CoinFlip() {
  const [face, setFace] = useState('heads');
  const rotation = useSharedValue(0);
  const translateY = useSharedValue(0);

  const flip = () => {
    console.log('clicked');
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    const extraSpins = 10;
    const finalRotation = rotation.value + extraSpins * 360 + (result === 'tails' ? 180 : 0) - (rotation.value % 360);

    rotation.value = withTiming(
      finalRotation,
      { duration: 1000, easing: Easing.out(Easing.cubic) },
      () => {
        runOnJS(setFace)(result);
      }
    );
  };

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { scaleX: Math.abs(Math.cos((rotation.value * Math.PI) / 180)) },
    ]
  }));

  const headStyle = useAnimatedStyle(() => {
    const normalized = ((rotation.value % 360) + 360) % 360;
    const showingHeads = normalized < 90 || normalized > 270;
    return { opacity: showingHeads ? 1 : 0};
  });

  const tailStyle = useAnimatedStyle(() => {
    const normalized = ((rotation.value % 360) + 360) % 360;
    const showingHeads = normalized < 90 || normalized > 270;
    return { opacity: showingHeads ? 0 : 1};
  });

  return (
    <View style = {styles.container}>
      <Pressable onPress={flip} style={styles.button}> 
        <Animated.View style = {[styles.coin, containerStyle]}>
          <Animated.Image source={headsImage} style={[styles.coinImage, headStyle]}/>
          <Animated.Image source={tailsImage} style={[styles.coinImage, tailStyle]}/>
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

