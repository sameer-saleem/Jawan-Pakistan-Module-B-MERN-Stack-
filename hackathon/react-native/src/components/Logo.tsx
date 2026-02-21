import React from 'react';
import { View, StyleSheet } from 'react-native';

const Logo = () => {
  return (
    <View style={styles.outerCircle}>
      <View style={styles.innerDot} />
    </View>
  );
};

const styles = StyleSheet.create({
  outerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0D9488',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  innerDot: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#0D9488',
  },
});

export default Logo;
