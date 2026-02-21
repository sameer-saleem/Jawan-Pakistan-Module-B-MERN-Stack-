import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
}

const AppButton: React.FC<Props> = ({ label, onPress, variant = 'primary' }) => (
  <TouchableOpacity
    style={[styles.btn, variant === 'primary' ? styles.primary : styles.outline]}
    onPress={onPress}
  >
    <Text style={[styles.text, variant === 'primary' ? styles.primaryText : styles.outlineText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
  },
  primary: { backgroundColor: '#0D9488' },
  outline: { borderWidth: 1.5, borderColor: '#0D9488', backgroundColor: '#fff' },
  text: { fontSize: 16, fontWeight: '600' },
  primaryText: { color: '#fff' },
  outlineText: { color: '#0D9488' },
});

export default AppButton;