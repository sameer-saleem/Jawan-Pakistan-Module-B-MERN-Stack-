import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface WelcomeCardProps {
  onSignUp: () => void;
  onSignIn: () => void;
}

const WelcomeCard = ({ onSignUp, onSignIn }: WelcomeCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your Health,{'\n'}Simplified</Text>
      <Text style={styles.subtitle}>
        Manage appointments and track your{'\n'}well-being with ease.
      </Text>

      <TouchableOpacity style={styles.primaryBtn} onPress={onSignUp} activeOpacity={0.85}>
        <Text style={styles.primaryBtnText}>Create Your Account</Text>
      </TouchableOpacity>

      <Text style={styles.signInRow}>
        Already have an account?{' '}
        <Text style={styles.signInLink} onPress={onSignIn}>
          Sign In
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderRadius: 24,
    marginHorizontal: 20,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 32,
    alignItems: 'center',
    shadowColor: '#0D9488',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 36,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#0D9488',
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#0D9488',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 18,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  signInRow: {
    fontSize: 13,
    color: '#64748B',
  },
  signInLink: {
    color: '#0D9488',
    fontWeight: '700',
  },
});

export default WelcomeCard;
