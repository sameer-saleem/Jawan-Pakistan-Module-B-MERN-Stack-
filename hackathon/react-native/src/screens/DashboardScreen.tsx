import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

interface User { name: string; email: string; id: string; }

interface Appointment {
  _id: string;
  doctor: { name: string; specialty: string; };
  date: string;
  time: string;
  status: string;
}

const SectionTitle = ({ title }: { title: string }) => (
  <Text style={s.sectionTitle}>{title}</Text>
);

const QuickAction = ({
  icon, label, onPress,
}: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }) => (
  <TouchableOpacity style={s.quickCard} onPress={onPress} activeOpacity={0.8}>
    <View style={s.quickIcon}>
      <Ionicons name={icon} size={26} color="#0D9488" />
    </View>
    <Text style={s.quickLabel}>{label}</Text>
  </TouchableOpacity>
);

const StatCard = ({
  label, value, unit, trend, trendUp,
}: { label: string; value: string; unit: string; trend: string; trendUp: boolean }) => (
  <View style={s.statCard}>
    <Text style={s.statLabel}>{label}</Text>
    <Text style={s.statValue}>
      {value} <Text style={s.statUnit}>{unit}</Text>
    </Text>
    <Text style={[s.statTrend, { color: trendUp ? '#10B981' : '#EF4444' }]}>
      {trendUp ? '↑' : '↓'} {trend}
    </Text>
  </View>
);

const DashboardScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [upcoming, setUpcoming] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('user').then(data => {
      if (data) setUser(JSON.parse(data));
    });

    const fetchUpcoming = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Please login first');

        const res = await api.get('/appointments/upcoming', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Take the first upcoming appointment only
        if (res.data.length > 0) setUpcoming(res.data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcoming();
  }, []);

  const firstName = user?.name?.split(' ')[0] || '';

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Top Bar */}
        <View style={s.topBar}>
          <View style={s.avatar}>
            <Ionicons name="person" size={20} color="#0D9488" />
          </View>
          <TouchableOpacity style={s.bell} onPress={() => {}}>
            <Ionicons name="notifications-outline" size={24} color="#1A202C" />
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <Text style={s.greeting}>Hello, {firstName}</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0D9488" style={{ marginVertical: 20 }} />
        ) : upcoming ? (
          <View style={s.appointmentCard}>
            <View style={s.apptHeader}>
              <Ionicons name="time-outline" size={13} color="#0D9488" />
              <Text style={s.apptHeaderText}>Next Appointment</Text>
            </View>
            <View style={s.apptDoctor}>
              <View style={s.doctorAvatar}>
                <Ionicons name="person" size={22} color="#0D9488" />
              </View>
              <View>
                <Text style={s.doctorName}>{upcoming.doctor?.name}</Text>
                <Text style={s.doctorSpec}>{upcoming.doctor?.specialty}</Text>
              </View>
            </View>
            <View style={s.apptTime}>
              <Ionicons name="calendar-outline" size={14} color="#64748B" />
              <Text style={s.apptTimeText}>{upcoming.date} • {upcoming.time}</Text>
            </View>
            <View style={s.apptActions}>
              <TouchableOpacity style={s.rescheduleBtn} onPress={() => {}}>
                <Text style={s.rescheduleText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.detailsBtn} onPress={() => router.push(`/appointment-confirm?appointmentId=${upcoming._id}`)}>
                <Text style={s.detailsText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={{ color: '#64748B', marginVertical: 20 }}>No upcoming appointments</Text>
        )}

        {/* Quick Actions */}
        <View style={s.quickGrid}>
          <QuickAction icon="calendar-outline"      label="Book Visit"  onPress={() => {}} />
          <QuickAction icon="search-outline"        label="Find Doctor" onPress={() => {}} />
          <QuickAction icon="document-text-outline" label="My Records"  onPress={() => {}} />
          <QuickAction icon="chatbubble-outline"    label="Messages"    onPress={() => {}} />
        </View>

        {/* Health Stats */}
        <SectionTitle title="Health Statistics" />
        <StatCard label="Heart Rate"     value="72"     unit="BPM" trend="2%"  trendUp={false} />
        <StatCard label="Blood Pressure" value="120/80" unit=""    trend="1%"  trendUp={false} />
        <StatCard label="Steps"          value="8,450"  unit=""    trend="5%"  trendUp={true}  />
        <StatCard label="Sleep"          value="7h 30m" unit=""    trend="3%"  trendUp={true}  />

        <SectionTitle title="Next Medication" />
        <View style={s.medCard}>
          <View>
            <Text style={s.medName}>Metformin</Text>
            <Text style={s.medDose}>500mg • Take at 9:00 PM</Text>
          </View>
          <TouchableOpacity style={s.markBtn} onPress={() => {}}>
            <Ionicons name="checkmark" size={14} color="#fff" />
            <Text style={s.markText}>Mark as...</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={s.tabBar}>
        {[
          { icon: 'home',          label: 'Home',         route: '/dashboard' },
          { icon: 'calendar',      label: 'Appointment', route: '/appointment' },
          { icon: 'document-text', label: 'Records',      route: '/records' },
          { icon: 'person',        label: 'Profile',      route: '/profile' },
        ].map((tab) => {
          const isActive = tab.route === '/dashboard';
          return (
            <TouchableOpacity key={tab.label} style={s.tabItem} onPress={() => router.push(tab.route as any)}>
              <Ionicons name={tab.icon as keyof typeof Ionicons.glyphMap} size={22} color={isActive ? '#0D9488' : '#94A3B8'} />
              <Text style={[s.tabLabel, isActive && s.tabLabelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────
const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 16 },

  topBar:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  avatar:  { width: 40, height: 40, borderRadius: 20, backgroundColor: '#CCFBF1', alignItems: 'center', justifyContent: 'center' },
  bell:    { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },

  greeting: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginBottom: 16 },

  appointmentCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 3 },
  apptHeader:      { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 12 },
  apptHeaderText:  { fontSize: 11, fontWeight: '600', color: '#0D9488', textTransform: 'uppercase', letterSpacing: 0.5 },
  apptDoctor:      { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  doctorAvatar:    { width: 46, height: 46, borderRadius: 23, backgroundColor: '#CCFBF1', alignItems: 'center', justifyContent: 'center' },
  doctorName:      { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  doctorSpec:      { fontSize: 12, color: '#64748B', marginTop: 2 },
  apptTime:        { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14 },
  apptTimeText:    { fontSize: 13, color: '#64748B' },
  apptActions:     { flexDirection: 'row', gap: 10 },
  rescheduleBtn:   { flex: 1, paddingVertical: 10, borderRadius: 999, borderWidth: 1.5, borderColor: '#0D9488', alignItems: 'center' },
  rescheduleText:  { fontSize: 13, fontWeight: '600', color: '#0D9488' },
  detailsBtn:      { flex: 1, paddingVertical: 10, borderRadius: 999, backgroundColor: '#0D9488', alignItems: 'center' },
  detailsText:     { fontSize: 13, fontWeight: '600', color: '#fff' },

  quickGrid:  { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  quickCard:  { width: '47%', backgroundColor: '#fff', borderRadius: 14, padding: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  quickIcon:  { width: 52, height: 52, borderRadius: 26, backgroundColor: '#F0FDFA', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  quickLabel: { fontSize: 13, fontWeight: '600', color: '#0F172A' },

  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A', marginBottom: 12 },

  statCard:  { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  statLabel: { fontSize: 12, color: '#64748B', marginBottom: 4 },
  statValue: { fontSize: 28, fontWeight: '800', color: '#0F172A' },
  statUnit:  { fontSize: 14, fontWeight: '500', color: '#64748B' },
  statTrend: { fontSize: 12, fontWeight: '600', marginTop: 4 },

  medCard:  { backgroundColor: '#fff', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2, marginBottom: 8 },
  medName:  { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  medDose:  { fontSize: 12, color: '#64748B', marginTop: 3 },
  markBtn:  { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0D9488', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8, gap: 5 },
  markText: { fontSize: 12, fontWeight: '600', color: '#fff' },

  tabBar:         { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingBottom: 8, paddingTop: 10 },
  tabItem:        { flex: 1, alignItems: 'center', gap: 3 },
  tabLabel:       { fontSize: 10, color: '#94A3B8', fontWeight: '500' },
  tabLabelActive: { color: '#0D9488', fontWeight: '700' },
});

export default DashboardScreen;