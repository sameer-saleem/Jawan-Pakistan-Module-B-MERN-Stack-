import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function Signup() {
  return (
    <View>
      <Text>Signup Screen</Text>

      <Pressable onPress={() => router.back()}>
        <Text>Go Back</Text>
      </Pressable>
    </View>
  );
}
