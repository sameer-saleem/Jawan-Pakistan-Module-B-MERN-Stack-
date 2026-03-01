import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Logo from '../components/Logo';
import WelcomeCard from '../components/Card';

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#0D9488', '#B2DFDB', '#E0F7F5']}
      locations={[0, 0.45, 1]}
      style={styles.container}
    >
      {/* Logo sits in the upper portion of the gradient */}
      <View style={styles.logoArea}>
        <Logo />
      </View>

      {/* Card sits at the bottom */}
      <View style={styles.cardArea}>
        <WelcomeCard
          onSignUp={() => router.push('/signup')}
          onSignIn={() => router.push('/login')}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  cardArea: {
    paddingBottom: 48,
  },
});

export default WelcomeScreen;
