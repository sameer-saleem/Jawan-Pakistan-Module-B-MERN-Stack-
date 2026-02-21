import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import api from '../api/api';

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  iconName: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  rightIcon?: React.ReactNode;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label, placeholder, value, onChangeText, iconName,
  secureTextEntry = false, keyboardType = 'default', rightIcon, error,
}) => (
  <View style={iStyles.wrapper}>
    <Text style={iStyles.label}>{label}</Text>
    <View style={[iStyles.row, error ? iStyles.rowError : null]}>
      <Ionicons name={iconName} size={18} color="#A0AEC0" style={iStyles.icon} />
      <TextInput
        style={iStyles.input}
        placeholder={placeholder}
        placeholderTextColor="#A0AEC0"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
      {rightIcon && <View style={iStyles.right}>{rightIcon}</View>}
    </View>
    {error ? <Text style={iStyles.err}>{error}</Text> : null}
  </View>
);

const iStyles = StyleSheet.create({
  wrapper: { marginBottom: 18 },
  label:   { fontSize: 13, fontWeight: '600', color: '#2D3748', marginBottom: 7, marginLeft: 2 },
  row: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F7FAFC', borderRadius: 12,
    borderWidth: 1, borderColor: '#E2E8F0',
    paddingHorizontal: 14, height: 52,
  },
  rowError: { borderColor: '#FC8181', backgroundColor: '#FFF5F5' },
  icon:  { marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: '#2D3748' },
  right: { marginLeft: 8 },
  err:   { fontSize: 11, color: '#E53E3E', marginTop: 4, marginLeft: 2 },
});

const Toast = ({ message, type }: { message: string; type: 'success' | 'error' | null }) => {
  if (!type) return null;
  return (
    <View style={[tStyles.box, type === 'success' ? tStyles.success : tStyles.error]}>
      <Ionicons
        name={type === 'success' ? 'checkmark-circle' : 'alert-circle'}
        size={18}
        color={type === 'success' ? '#22C55E' : '#EF4444'}
      />
      <Text style={tStyles.text}>{message}</Text>
    </View>
  );
};

const tStyles = StyleSheet.create({
  box:     { flexDirection: 'row', alignItems: 'center', padding: 13, borderRadius: 10, marginBottom: 16, gap: 10 },
  success: { backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#86EFAC' },
  error:   { backgroundColor: '#FFF5F5', borderWidth: 1, borderColor: '#FC8181' },
  text:    { flex: 1, fontSize: 13, fontWeight: '500', color: '#1A202C', lineHeight: 18 },
});

const SignUpScreen = () => {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [errors,  setErrors]  = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [toast,   setToast]   = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: null }), 4000);
  };

  const update = (key: string, value: string) => {
    setForm(p => ({ ...p, [key]: value }));
    if (errors[key]) setErrors(p => ({ ...p, [key]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())                e.name = 'Full name is required';
    else if (form.name.trim().length < 2) e.name = 'Minimum 2 characters';
    if (!form.email.trim())               e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password)                   e.password = 'Password is required';
    else if (form.password.length < 6)    e.password = 'Minimum 6 characters';
    if (!form.confirmPassword)            e.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;
    setLoading(true);
    setToast({ message: '', type: null });
    try {
      const res = await api.post('/register', {
        name:     form.name.trim(),
        email:    form.email.trim().toLowerCase(),
        password: form.password,
      });
      showToast(res.data?.message || 'Account created! Please sign in.', 'success');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error   ||
        err?.message                 ||
        'Something went wrong. Please try again.';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Text style={styles.title}>Create Your Account</Text>
          <Text style={styles.subtitle}>Manage your health effortlessly</Text>

          {/* Toast */}
          <Toast message={toast.message} type={toast.type} />

          {/* Fields */}
          <InputField
            label="Full Name" placeholder="Enter your full name"
            value={form.name} onChangeText={v => update('name', v)}
            iconName="person-outline" error={errors.name}
          />
          <InputField
            label="Email Address" placeholder="Enter your email"
            value={form.email} onChangeText={v => update('email', v)}
            iconName="mail-outline" keyboardType="email-address" error={errors.email}
          />
          <InputField
            label="Password" placeholder="Enter your password"
            value={form.password} onChangeText={v => update('password', v)}
            iconName="lock-closed-outline" secureTextEntry={!showPassword} error={errors.password}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(p => !p)}>
                <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="#A0AEC0" />
              </TouchableOpacity>
            }
          />
          <InputField
            label="Confirm Password" placeholder="Confirm your password"
            value={form.confirmPassword} onChangeText={v => update('confirmPassword', v)}
            iconName="lock-closed-outline" secureTextEntry={!showConfirm} error={errors.confirmPassword}
            rightIcon={
              <TouchableOpacity onPress={() => setShowConfirm(p => !p)}>
                <Ionicons name={showConfirm ? 'eye-outline' : 'eye-off-outline'} size={20} color="#A0AEC0" />
              </TouchableOpacity>
            }
          />

          {/* Button */}
          <TouchableOpacity onPress={handleSignUp} disabled={loading} activeOpacity={0.88} style={styles.btnWrap}>
            <LinearGradient colors={['#38BDF8', '#0D9488']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.btn}>
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.btnText}>Sign Up</Text>
              }
            </LinearGradient>
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.terms}>
            By creating an account, you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text>
            {' '}and <Text style={styles.link}>Privacy Policy</Text>.
          </Text>
          <Text style={styles.loginRow}>
            Already have an account?{' '}
            <Text style={styles.link} onPress={() => router.push('/login')}>Log In</Text>
          </Text>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#FFFFFF' },
  flex:   { flex: 1 },
  scroll: { flexGrow: 1, padding: 24, paddingTop: 48 },
  title:    { fontSize: 26, fontWeight: '800', color: '#1A202C', textAlign: 'center', letterSpacing: -0.5, marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#718096', textAlign: 'center', marginBottom: 32 },
  btnWrap:  { marginTop: 6, marginBottom: 20 },
  btn:      { borderRadius: 999, paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  btnText:  { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
  terms:    { fontSize: 11, color: '#718096', textAlign: 'center', lineHeight: 18, marginBottom: 14 },
  loginRow: { fontSize: 13, color: '#718096', textAlign: 'center' },
  link:     { color: '#0D9488', fontWeight: '600' },
});

export default SignUpScreen;
