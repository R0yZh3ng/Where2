import { Stack } from "expo-router"

export default function CasinoLayout() {
  return (
    <Stack>
      <Stack.Screen name = "CoinFlip" options= {{ headerShown: false }}/>
    </Stack>
  );
}
