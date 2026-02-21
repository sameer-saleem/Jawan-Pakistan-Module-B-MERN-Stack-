import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import api from '../api/api';

// ─────────────────────────────────────────────────────────
//  TYPES
//  These match what your backend will send back as JSON
// ─────────────────────────────────────────────────────────
interface Doctor {
  _id: string;
  name: string;       // "Dr. Evelyn Reed"
  specialty: string;  // "Cardiologist"
  rating: number;     // 4.9
  reviews: number;    // 128
}

interface Slot {
  _id: string;
  time: string;       // "09:00 AM"
  period: 'Morning' | 'Afternoon';
  booked: boolean;    // true = grayed out, can't select
}

// ─────────────────────────────────────────────────────────
//  STEP INDICATOR  (Date → Doctor → Time at the top)
//  Shows which step the user is on
// ─────────────────────────────────────────────────────────
const StepBar = ({ currentStep }: { currentStep: number }) => {
  const steps = ['Date', 'Doctor', 'Time'];
  return (
    <View style={s.stepBar}>
      {steps.map((label, i) => {
        const active = i === currentStep;
        const done   = i < currentStep;
        return (
          <View key={label} style={s.stepItem}>
            <View style={[s.stepLine, (active || done) && s.stepLineActive]} />
            <Text style={[s.stepLabel, active && s.stepLabelActive]}>{label}</Text>
          </View>
        );
      })}
    </View>
  );
};

// ─────────────────────────────────────────────────────────
//  CALENDAR  (Choose a Date section)
//  Renders a mini monthly calendar; highlights today in teal
//  and lets user tap any day to select it
// ─────────────────────────────────────────────────────────
const Calendar = ({
  selectedDate, onSelect,
}: { selectedDate: Date; onSelect: (d: Date) => void }) => {

  const [viewMonth, setViewMonth] = useState(new Date());

  // Move to previous or next month
  const changeMonth = (dir: number) => {
    const d = new Date(viewMonth);
    d.setMonth(d.getMonth() + dir);
    setViewMonth(d);
  };

  // Build list of day numbers for the current month view
  // Padded with nulls so first day aligns to correct weekday column
  const getDays = () => {
    const year  = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();  // 0=Sun
    const total    = new Date(year, month + 1, 0).getDate(); // days in month
    const days: (number | null)[] = Array(firstDay).fill(null);
    for (let i = 1; i <= total; i++) days.push(i);
    return days;
  };

  const today    = new Date();
  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const monthName = viewMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <View style={s.calendar}>
      {/* Month navigation */}
      <View style={s.calHeader}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Ionicons name="chevron-back" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={s.calMonth}>{monthName}</Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Ionicons name="chevron-forward" size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* Weekday headers */}
      <View style={s.calRow}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <Text key={i} style={s.calDayLabel}>{d}</Text>
        ))}
      </View>

      {/* Day cells */}
      <View style={s.calGrid}>
        {getDays().map((day, i) => {
          if (!day) return <View key={i} style={s.calCell} />;

          const cellDate  = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
          const isToday   = isSameDay(cellDate, today);
          const isSelected = isSameDay(cellDate, selectedDate);

          return (
            <TouchableOpacity
              key={i}
              style={[s.calCell, isSelected && s.calCellSelected]}
              onPress={() => onSelect(cellDate)}
            >
              <Text style={[
                s.calDayNum,
                isToday    && !isSelected && s.calToday,
                isSelected && s.calDaySelected,
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// ─────────────────────────────────────────────────────────
//  DOCTOR CARD  (Select Your Doctor section)
//  Teal border when selected
// ─────────────────────────────────────────────────────────
const DoctorCard = ({
  doctor, selected, onPress,
}: { doctor: Doctor; selected: boolean; onPress: () => void }) => (
  <TouchableOpacity
    style={[s.doctorCard, selected && s.doctorCardSelected]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    {/* Avatar placeholder */}
    <View style={s.doctorAvatarCircle}>
      <Ionicons name="person" size={28} color="#0D9488" />
    </View>
    <Text style={s.doctorName}>{doctor.name}</Text>
    <Text style={s.doctorSpec}>{doctor.specialty}</Text>
    <View style={s.doctorRating}>
      <Ionicons name="star" size={12} color="#F59E0B" />
      <Text style={s.doctorRatingText}>
        {doctor.rating} ({doctor.reviews} reviews)
      </Text>
    </View>
  </TouchableOpacity>
);

// ─────────────────────────────────────────────────────────
//  TIME SLOT CHIP
//  Teal fill = selected, gray text = booked (unavailable)
// ─────────────────────────────────────────────────────────
const TimeChip = ({
  slot, selected, onPress,
}: { slot: Slot; selected: boolean; onPress: () => void }) => (
  <TouchableOpacity
    style={[
      s.timeChip,
      selected  && s.timeChipSelected,
      slot.booked && s.timeChipBooked,
    ]}
    onPress={onPress}
    disabled={slot.booked}   // can't tap booked slots
    activeOpacity={0.75}
  >
    <Text style={[
      s.timeChipText,
      selected    && s.timeChipTextSelected,
      slot.booked && s.timeChipTextBooked,
    ]}>
      {slot.time}
    </Text>
  </TouchableOpacity>
);

// ─────────────────────────────────────────────────────────
//  MAIN SCREEN
// ─────────────────────────────────────────────────────────
const BookAppointmentScreen = () => {
  const router = useRouter();

  // ── State ───────────────────────────────────────────────
  const [selectedDate,   setSelectedDate]   = useState(new Date());
  const [doctors,        setDoctors]        = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [slots,          setSlots]          = useState<Slot[]>([]);
  const [selectedSlot,   setSelectedSlot]   = useState<Slot | null>(null);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingSlots,   setLoadingSlots]   = useState(false);
  const [booking,        setBooking]        = useState(false);
  const [toast,          setToast]          = useState<{ msg: string; type: 'success'|'error' } | null>(null);

  // ── Step indicator: auto-advances based on selections ───
  const currentStep = !selectedDoctor ? 0 : !selectedSlot ? 1 : 2;

  // ── Show inline toast and auto-dismiss ──────────────────
  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // ── 1. Fetch doctors on mount ────────────────────────────
  //  GET /api/users/doctors
  //  Expected response: [ { _id, name, specialty, rating, reviews }, ... ]
  useEffect(() => {
    api.get('/doctors')
      .then(res => setDoctors(res.data))
      .catch(() => showToast('Failed to load doctors', 'error'))
      .finally(() => setLoadingDoctors(false));
  }, []);

  // ── 2. Fetch available slots when doctor OR date changes ─
  //  GET /api/users/slots?doctorId=xxx&date=2024-12-05
  //  Expected response: [ { _id, time, period, booked }, ... ]
  useEffect(() => {
    if (!selectedDoctor) return;

    setLoadingSlots(true);
    setSelectedSlot(null);  // reset slot when doctor/date changes

    const dateStr = selectedDate.toISOString().split('T')[0]; // "2024-12-05"

    api.get('/slots', {
      params: { doctorId: selectedDoctor._id, date: dateStr }
    })
      .then(res => setSlots(res.data))
      .catch(() => showToast('Failed to load time slots', 'error'))
      .finally(() => setLoadingSlots(false));

  }, [selectedDoctor, selectedDate]);

  // ── 3. Book the appointment ──────────────────────────────
  //  POST /api/users/appointments/book
  //  Body: { doctorId, date, slotId, time }
  //  Response: { message: 'Appointment booked' }
  const handleConfirm = async () => {
  if (!selectedDoctor || !selectedSlot) {
    showToast('Please select a doctor and time slot', 'error');
    return;
  }

  setBooking(true);
  try {
    // Format selected date in YYYY-MM-DD format (ISO format for consistent comparison)
    const dateStr = selectedDate.toISOString().split('T')[0];  // "2024-12-05"

    const res = await api.post('/appointments/book', {
      doctorId: selectedDoctor._id,
      date:     dateStr,
      slotId:   selectedSlot._id,
      time:     selectedSlot.time,
    });

    showToast('Appointment booked successfully!', 'success');
    router.replace(`/appointment-confirm?appointmentId=${res.data.appointment._id}`);

  } catch (err: any) {
    showToast(err?.response?.data?.message || 'Booking failed', 'error');
  } finally {
    setBooking(false);
  }
};

  // ── Split slots into Morning / Afternoon groups ──────────
  const morning   = slots.filter(s => s.period === 'Morning');
  const afternoon = slots.filter(s => s.period === 'Afternoon');

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* ── Header ── */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Schedule Appointment</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* ── Step Indicator ── */}
      <StepBar currentStep={currentStep} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scroll}
      >
        {/* ── Inline Toast ── */}
        {toast && (
          <View style={[s.toast, toast.type === 'success' ? s.toastSuccess : s.toastError]}>
            <Ionicons
              name={toast.type === 'success' ? 'checkmark-circle' : 'alert-circle'}
              size={16}
              color={toast.type === 'success' ? '#10B981' : '#EF4444'}
            />
            <Text style={s.toastText}>{toast.msg}</Text>
          </View>
        )}

        {/* ════════════════════════════════════
            SECTION 1 — CHOOSE A DATE
            Uses the Calendar component above
        ════════════════════════════════════ */}
        <Text style={s.sectionTitle}>Choose a Date</Text>
        <Calendar selectedDate={selectedDate} onSelect={setSelectedDate} />

        {/* ════════════════════════════════════
            SECTION 2 — SELECT YOUR DOCTOR
            Fetched from GET /doctors
        ════════════════════════════════════ */}
        <Text style={[s.sectionTitle, { marginTop: 24 }]}>Select Your Doctor</Text>

        {loadingDoctors ? (
          <ActivityIndicator color="#0D9488" style={{ marginVertical: 20 }} />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.doctorScroll}>
            {doctors.map(doc => (
              <DoctorCard
                key={doc._id}
                doctor={doc}
                selected={selectedDoctor?._id === doc._id}
                onPress={() => setSelectedDoctor(doc)}
              />
            ))}
          </ScrollView>
        )}

        {/* ════════════════════════════════════
            SECTION 3 — AVAILABLE TIME SLOTS
            Fetched from GET /slots?doctorId&date
            Only shown after doctor is selected
        ════════════════════════════════════ */}
        {selectedDoctor && (
          <>
            <Text style={[s.sectionTitle, { marginTop: 24 }]}>Available Time Slots</Text>

            {loadingSlots ? (
              <ActivityIndicator color="#0D9488" style={{ marginVertical: 20 }} />
            ) : slots.length === 0 ? (
              <Text style={s.noSlots}>No available slots for this date.</Text>
            ) : (
              <>
                {/* Morning slots */}
                {morning.length > 0 && (
                  <View style={s.slotGroup}>
                    <View style={s.slotGroupHeader}>
                      <Ionicons name="sunny-outline" size={16} color="#F59E0B" />
                      <Text style={s.slotGroupTitle}>Morning</Text>
                    </View>
                    <View style={s.slotsRow}>
                      {morning.map(slot => (
                        <TimeChip
                          key={slot._id}
                          slot={slot}
                          selected={selectedSlot?._id === slot._id}
                          onPress={() => setSelectedSlot(slot)}
                        />
                      ))}
                    </View>
                  </View>
                )}

                {/* Afternoon slots */}
                {afternoon.length > 0 && (
                  <View style={s.slotGroup}>
                    <View style={s.slotGroupHeader}>
                      <Ionicons name="partly-sunny-outline" size={16} color="#F59E0B" />
                      <Text style={s.slotGroupTitle}>Afternoon</Text>
                    </View>
                    <View style={s.slotsRow}>
                      {afternoon.map(slot => (
                        <TimeChip
                          key={slot._id}
                          slot={slot}
                          selected={selectedSlot?._id === slot._id}
                          onPress={() => setSelectedSlot(slot)}
                        />
                      ))}
                    </View>
                  </View>
                )}
              </>
            )}
          </>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Confirm Button (fixed at bottom) ── */}
      <View style={s.footer}>
        <TouchableOpacity
          style={[s.confirmBtn, (!selectedDoctor || !selectedSlot) && s.confirmBtnDisabled]}
          onPress={handleConfirm}
          disabled={booking || !selectedDoctor || !selectedSlot}
          activeOpacity={0.85}
        >
          {booking
            ? <ActivityIndicator color="#fff" />
            : <Text style={s.confirmText}>Confirm Appointment</Text>
          }
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ─────────────────────────────────────────────────────────
//  STYLES
// ─────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { paddingHorizontal: 20, paddingTop: 8 },

  // Header
  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A' },
  backBtn:     { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },

  // Step bar
  stepBar:          { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 4 },
  stepItem:         { flex: 1, alignItems: 'center' },
  stepLine:         { height: 3, width: '100%', backgroundColor: '#E2E8F0', borderRadius: 2, marginBottom: 4 },
  stepLineActive:   { backgroundColor: '#0D9488' },
  stepLabel:        { fontSize: 11, color: '#94A3B8', fontWeight: '500' },
  stepLabelActive:  { color: '#0D9488', fontWeight: '700' },

  // Toast
  toast:        { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 10, marginBottom: 16 },
  toastSuccess: { backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#86EFAC' },
  toastError:   { backgroundColor: '#FFF5F5', borderWidth: 1, borderColor: '#FCA5A5' },
  toastText:    { flex: 1, fontSize: 13, fontWeight: '500', color: '#0F172A' },

  // Section
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 14 },

  // Calendar
  calendar:    { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  calHeader:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  calMonth:    { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  calRow:      { flexDirection: 'row', marginBottom: 6 },
  calDayLabel: { flex: 1, textAlign: 'center', fontSize: 12, color: '#94A3B8', fontWeight: '600' },
  calGrid:     { flexDirection: 'row', flexWrap: 'wrap' },
  calCell:     { width: '14.28%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
  calCellSelected: { backgroundColor: '#0D9488', borderRadius: 999 },
  calDayNum:   { fontSize: 13, color: '#0F172A', fontWeight: '500' },
  calToday:    { color: '#0D9488', fontWeight: '800' },
  calDaySelected: { color: '#fff', fontWeight: '700' },

  // Doctor
  doctorScroll: { marginBottom: 4 },
  doctorCard:   { width: 130, backgroundColor: '#fff', borderRadius: 14, padding: 14, alignItems: 'center', marginRight: 12, borderWidth: 2, borderColor: 'transparent', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  doctorCardSelected: { borderColor: '#0D9488', backgroundColor: '#F0FDFA' },
  doctorAvatarCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#CCFBF1', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  doctorName:   { fontSize: 13, fontWeight: '700', color: '#0F172A', textAlign: 'center', marginBottom: 3 },
  doctorSpec:   { fontSize: 11, color: '#64748B', textAlign: 'center', marginBottom: 6 },
  doctorRating: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  doctorRatingText: { fontSize: 11, color: '#64748B' },

  // Slots
  slotGroup:       { marginBottom: 16 },
  slotGroupHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  slotGroupTitle:  { fontSize: 14, fontWeight: '600', color: '#475569' },
  slotsRow:        { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  timeChip:        { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#fff' },
  timeChipSelected:    { backgroundColor: '#0D9488', borderColor: '#0D9488' },
  timeChipBooked:      { backgroundColor: '#F8FAFC', borderColor: '#F1F5F9' },
  timeChipText:        { fontSize: 13, fontWeight: '600', color: '#0F172A' },
  timeChipTextSelected:{ color: '#fff' },
  timeChipTextBooked:  { color: '#CBD5E1' },
  noSlots:         { fontSize: 13, color: '#94A3B8', textAlign: 'center', marginVertical: 20 },

  // Footer
  footer:           { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#F8FAFC', borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  confirmBtn:       { backgroundColor: '#0D9488', borderRadius: 999, paddingVertical: 16, alignItems: 'center' },
  confirmBtnDisabled: { backgroundColor: '#99E6DF' },
  confirmText:      { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default BookAppointmentScreen;