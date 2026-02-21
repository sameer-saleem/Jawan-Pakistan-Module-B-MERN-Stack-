import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../api/api'; // make sure this points to your axios instance
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppointmentConfirmScreen = () => {
  const router = useRouter();
  const { appointmentId } = useLocalSearchParams(); // booked appointment _id

  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!appointmentId) {
      setError('No appointment ID provided.');
      setLoading(false);
      return;
    }

    const fetchAppointment = async () => {
      try {
        // ✅ Get token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found. Please login again.');

        // ✅ Make API call with token
        const res = await api.get(`/appointments/${appointmentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Appointment:', res.data);
        setAppointment(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err?.response?.data?.message || err.message || 'Failed to load appointment.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  if (loading) {
    return (
      <SafeAreaView style={s.container}>
        <ActivityIndicator size="large" color="#0D9488" />
      </SafeAreaView>
    );
  }

  if (error || !appointment) {
    return (
      <SafeAreaView style={s.container}>
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>
          {error || 'Appointment not found.'}
        </Text>
      </SafeAreaView>
    );
  }

  // ✅ Dynamic data keys from your backend
  const { doctorName, specialty, date, time, location } = appointment;

  return (
    <SafeAreaView style={s.container}>
      {/* Success Icon */}
      <View style={s.iconBox}>
        <Ionicons name="checkmark" size={40} color="#0D9488" />
      </View>

      <Text style={s.title}>Appointment Confirmed</Text>

      <Text style={s.subtitle}>
        Your appointment with {doctorName} has been successfully booked.
      </Text>

      {/* Info Card */}
      <View style={s.card}>
        <Text style={s.doctor}>{doctorName}</Text>
        <Text style={s.spec}>{specialty}</Text>

        <View style={s.row}>
          <Ionicons name="calendar-outline" size={18} color="#0D9488" />
          <Text style={s.rowText}>
            {date} at {time}
          </Text>
        </View>

        <View style={s.row}>
          <Ionicons name="location-outline" size={18} color="#0D9488" />
          <Text style={s.rowText}>{location}</Text>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={s.btn}
        onPress={() => router.replace('/appointment')}
      >
        <Text style={s.btnText}>View All Appointments</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AppointmentConfirmScreen;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    padding: 20,
  },
  iconBox: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748B',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 30,
  },
  doctor: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  spec: {
    color: '#64748B',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  rowText: {
    fontSize: 14,
    color: '#334155',
  },
  btn: {
    backgroundColor: '#0D9488',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 999,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});