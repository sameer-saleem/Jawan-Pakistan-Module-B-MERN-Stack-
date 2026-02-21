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
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

// ─── Inline Toast ─────────────────────────────────────────────────────────────
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

// ─── Main Screen ──────────────────────────────────────────────────────────────
const LoginScreen = () => {
  const router = useRouter();

  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors,       setErrors]       = useState<{ email?: string; password?: string }>({});
  const [loading,      setLoading]      = useState(false);
  const [toast,        setToast]        = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: null }), 4000);
  };

  const validate = () => {
    const e: { email?: string; password?: string } = {};
    if (!email.trim())    e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password)        e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Minimum 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    setToast({ message: '', type: null });

    try {
      const res = await api.post('/login', {
        email:    email.trim().toLowerCase(),
        password: password,
      });

      const { token, user } = res.data;

      // Save token & user info to AsyncStorage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      showToast(`Welcome back, ${user?.name || 'there'}!`, 'success');

      // Navigate to home after short delay
      setTimeout(() => router.replace('/dashboard'), 1500);

    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error   ||
        err?.message                 ||
        'Login failed. Please try again.';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <LinearGradient
          colors={['#0D9488', '#B2DFDB', '#E0F7F5']}
          locations={[0, 0.45, 1]}
          style={styles.gradient}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Logo Badge */}
            <View style={styles.logoBadge}>
              <Ionicons name="shield-checkmark" size={32} color="#0D9488" />
            </View>

            {/* Header */}
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Log in to manage your health journey.</Text>

            {/* Toast */}
            <Toast message={toast.message} type={toast.type} />

            {/* Email */}
            <Text style={styles.label}>Email Address</Text>
            <View style={[styles.inputRow, errors.email ? styles.inputError : null]}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#A0AEC0"
                value={email}
                onChangeText={t => { setEmail(t); if (errors.email) setErrors(p => ({ ...p, email: '' })); }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errors.email ? <Text style={styles.errText}>{errors.email}</Text> : null}

            {/* Password */}
            <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
            <View style={[styles.inputRow, errors.password ? styles.inputError : null]}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#A0AEC0"
                value={password}
                onChangeText={t => { setPassword(t); if (errors.password) setErrors(p => ({ ...p, password: '' })); }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(p => !p)} style={styles.eyeBtn}>
                <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="#0D9488" />
              </TouchableOpacity>
            </View>
            {errors.password ? <Text style={styles.errText}>{errors.password}</Text> : null}

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotWrap} onPress={() => {}}>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity onPress={handleLogin} disabled={loading} activeOpacity={0.88}>
              <LinearGradient
                colors={['#0D9488', '#0F766E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btn}
              >
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.btnText}>Login</Text>
                }
              </LinearGradient>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <Text style={styles.signupRow}>
              Don't have an account?{' '}
              <Text style={styles.link} onPress={() => router.push('/signup')}>Sign Up</Text>
            </Text>

          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe:     { flex: 1, backgroundColor: '#0D9488' },
  flex:     { flex: 1 },
  gradient: { flex: 1 },
  scroll:   { flexGrow: 1, paddingHorizontal: 28, paddingTop: 70, paddingBottom: 40 },

  // Logo
  logoBadge: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
    alignSelf: 'center', marginBottom: 24,
    shadowColor: '#0D9488', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 12, elevation: 5,
  },

  // Header
  title:    { fontSize: 26, fontWeight: '800', color: '#1A202C', textAlign: 'center', letterSpacing: -0.5, marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#4A5568', textAlign: 'center', marginBottom: 32 },

  // Fields
  label: { fontSize: 13, fontWeight: '600', color: '#2D3748', marginBottom: 7, marginLeft: 2 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 999,
    borderWidth: 1, borderColor: '#E2E8F0',
    paddingHorizontal: 20, height: 52,
  },
  inputError: { borderColor: '#FC8181' },
  input:   { flex: 1, fontSize: 14, color: '#2D3748' },
  eyeBtn:  { padding: 4 },
  errText: { fontSize: 11, color: '#E53E3E', marginTop: 4, marginLeft: 4 },

  // Forgot
  forgotWrap: { alignItems: 'flex-end', marginTop: 10, marginBottom: 28 },
  forgot:     { fontSize: 13, color: '#0D9488', fontWeight: '600' },

  // Button
  btn:     { borderRadius: 999, paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },

  // Footer
  signupRow: { fontSize: 13, color: '#4A5568', textAlign: 'center', marginTop: 24 },
  link:      { color: '#0D9488', fontWeight: '700' },
});

export default LoginScreen;