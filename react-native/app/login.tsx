import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function Login() {
  return (
    <View>
      <Text>Login Screen</Text>

      <Pressable onPress={() => router.push('/signup')}>
        <Text>Go to Signup</Text>
      </Pressable>
    </View>
  );
}