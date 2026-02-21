import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

// ─── Upcoming Card ──────────────────────────────
const UpcomingCard = ({ doctor, specialty, date, time }: { doctor: string; specialty: string; date: string; time: string }) => (
  <View style={s.upcomingCard}>
    <View style={s.upcomingTop}>
      <View style={s.doctorAvatar}>
        <Ionicons name="person" size={22} color="#fff" />
      </View>
      <View style={s.upcomingInfo}>
        <Text style={s.upcomingSpecialty}>{specialty}</Text>
        <Text style={s.upcomingDoctor}>{doctor}</Text>
      </View>
      <TouchableOpacity style={s.optionsBtn}>
        <Ionicons name="ellipsis-vertical" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
    <View style={s.upcomingBottom}>
      <View style={s.timePill}>
        <Ionicons name="calendar-outline" size={13} color="#fff" />
        <Text style={s.timePillText}>{date}</Text>
      </View>
      <View style={s.timePill}>
        <Ionicons name="time-outline" size={13} color="#fff" />
        <Text style={s.timePillText}>{time}</Text>
      </View>
    </View>
  </View>
);

// ─── Past Card ──────────────────────────────
type Status = 'Completed' | 'Cancelled' | 'Confirmed';

const PastCard = ({ doctor, specialty, date, status }: { doctor: string; specialty: string; date: string; status: Status }) => {
  const isCompleted = status === 'Completed' || status === 'Confirmed';
  return (
    <View style={s.pastCard}>
      <View style={[s.pastIcon, { backgroundColor: isCompleted ? '#F0FDF4' : '#FFF5F5' }]}>
        <Ionicons
          name={isCompleted ? 'checkmark-circle' : 'close-circle'}
          size={22}
          color={isCompleted ? '#10B981' : '#EF4444'}
        />
      </View>
      <View style={s.pastInfo}>
        <Text style={s.pastDoctor}>{doctor}</Text>
        <Text style={s.pastSpecialty}>{specialty}</Text>
        <Text style={s.pastDate}>{date}</Text>
      </View>
      <View style={[
        s.statusBadge,
        { backgroundColor: isCompleted ? '#F0FDF4' : '#FFF5F5', borderColor: isCompleted ? '#86EFAC' : '#FCA5A5' }
      ]}>
        <Ionicons name={isCompleted ? 'checkmark-circle' : 'close-circle'} size={13} color={isCompleted ? '#10B981' : '#EF4444'} />
        <Text style={[s.statusText, { color: isCompleted ? '#10B981' : '#EF4444' }]}>{status}</Text>
      </View>
    </View>
  );
};

// ─── Main Screen ──────────────────────────────
const AppointmentsScreen = () => {
  const router = useRouter();

  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [past, setPast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Please login first');

        const [upcomingRes, pastRes] = await Promise.all([
          api.get('/appointments/upcoming', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/appointments/history', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        // Map backend response to our card props
        setUpcoming(
          upcomingRes.data.map((a: any) => ({
            id: a._id,
            doctor: a.doctor?.name,
            specialty: a.doctor?.specialty,
            date: a.date,
            time: a.time,
          }))
        );

        setPast(
          pastRes.data.map((a: any) => ({
            id: a._id,
            doctor: a.doctor?.name,
            specialty: a.doctor?.specialty,
            date: a.date,
            status: a.status,
          }))
        );

      } catch (err: any) {
        console.error(err);
        setError(err?.message || 'Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <SafeAreaView style={[s.safe, {justifyContent:'center', alignItems:'center'}]}><ActivityIndicator size="large" color="#0D9488" /></SafeAreaView>;

  if (error) return <SafeAreaView style={[s.safe, {justifyContent:'center', alignItems:'center'}]}><Text style={{color:'red'}}>{error}</Text></SafeAreaView>;

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity style={s.iconBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Appointments</Text>
        <TouchableOpacity style={s.iconBtn}>
          <Ionicons name="notifications-outline" size={22} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* Upcoming */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Upcoming</Text>
          <TouchableOpacity style={s.scheduleBtn} onPress={() => router.push('/book-appointment')}>
            <Ionicons name="add" size={14} color="#0D9488" />
            <Text style={s.scheduleBtnText}>Schedule New</Text>
          </TouchableOpacity>
        </View>

        {upcoming.length === 0 ? <Text>No upcoming appointments</Text> :
          upcoming.map(item => (
            <UpcomingCard key={item.id} {...item} />
          ))
        }

        {/* Past */}
        <Text style={[s.sectionTitle, { marginTop: 24, marginBottom: 14 }]}>Past</Text>
        {past.length === 0 ? <Text>No past appointments</Text> :
          past.map(item => (
            <PastCard key={item.id} {...item} />
          ))
        }

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentsScreen;

// ─── Styles ───────────────────────────────────────────────
const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 },

  // Header
  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#F8FAFC' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A' },
  iconBtn:     { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },

  // Section
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  sectionTitle:  { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  scheduleBtn:   { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F0FDFA', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: '#99F6E4' },
  scheduleBtnText: { fontSize: 13, fontWeight: '600', color: '#0D9488' },

  // Cards styles remain the same as your original code...
  upcomingCard: { borderRadius: 16, padding: 16, marginBottom: 6, backgroundColor: '#0D9488', shadowColor: '#0D9488', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 5 },
  upcomingTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  doctorAvatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  upcomingInfo: { flex: 1 },
  upcomingSpecialty: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 3 },
  upcomingDoctor: { fontSize: 17, fontWeight: '800', color: '#fff' },
  optionsBtn: { padding: 4 },
  upcomingBottom: { flexDirection: 'row', gap: 10 },
  timePill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7 },
  timePillText: { fontSize: 13, color: '#fff', fontWeight: '600' },

  pastCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  pastIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  pastInfo: { flex: 1 },
  pastDoctor: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  pastSpecialty: { fontSize: 12, color: '#64748B', marginTop: 2 },
  pastDate: { fontSize: 11, color: '#94A3B8', marginTop: 3 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 999, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 },
  statusText: { fontSize: 12, fontWeight: '600' },
});