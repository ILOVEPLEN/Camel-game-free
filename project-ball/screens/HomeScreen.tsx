import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Modal,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../theme/ThemeContext';
import { Spacing, Radius, Shadow } from '../theme/spacing';
import { WorkoutSession, SessionDrill, WorkoutLog, DrillLog } from '../types/workout';
import { PlayerProfile } from '../types/profile';
import { Storage } from '../lib/storage';
import { generateSession, shortenSession } from '../lib/workoutGenerator';
import { computeVolumeMultiplier } from '../lib/adaptiveEngine';
import { PROGRAMS } from '../data/programs';
import WorkoutItem from '../components/WorkoutItem';
import ProgressRing from '../components/ProgressRing';
import RPESlider from '../components/RPESlider';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export default function HomeScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [rpe, setRpe] = useState(5);
  const [note, setNote] = useState('');
  const [drillLogs, setDrillLogs] = useState<DrillLog[]>([]);
  const [streak, setStreak] = useState(0);

  const loadSession = useCallback(async () => {
    try {
      const p = await Storage.getProfile();
      if (!p) return;
      setProfile(p);

      const s = await Storage.getStreak();
      setStreak(s);

      const enrollment = await Storage.getEnrollment();
      if (enrollment) {
        const program = PROGRAMS.find((x) => x.id === enrollment.programId);
        if (program) {
          const week = program.schedule.find((w) => w.week === enrollment.currentWeek);
          const day = week?.days.find((d) => d.day === enrollment.currentDay);
          if (day) {
            const sess: WorkoutSession = {
              id: `prog-${enrollment.programId}-${enrollment.currentDay}`,
              date: new Date().toISOString().slice(0, 10),
              drills: day.drills,
              estimatedMinutes: day.estimatedMinutes,
              programId: enrollment.programId,
              programDay: enrollment.currentDay,
            };
            setSession(sess);
            return;
          }
        }
      }

      const existing = await Storage.getCurrentSession();
      if (existing && existing.date === new Date().toISOString().slice(0, 10)) {
        setSession(existing);
        return;
      }

      const multiplier = await computeVolumeMultiplier();
      const newSession = generateSession(p, multiplier);
      await Storage.setCurrentSession(newSession);
      setSession(newSession);
    } catch (e) {
      console.error('loadSession failed', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadSession(); }, [loadSession]);

  const handleShorten = () => {
    if (!session) return;
    const shortened = shortenSession(session);
    setSession(shortened);
  };

  const markComplete = (drillId: string) => {
    setCompletedIds((prev) => new Set([...prev, drillId]));
  };

  const openDrillDetail = (sd: SessionDrill) => {
    navigation.navigate('DrillDetail', { drill: sd.drill });
  };

  const progress = session ? completedIds.size / session.drills.length : 0;

  const finishWorkout = async () => {
    if (!session) return;
    const log: WorkoutLog = {
      id: `log-${Date.now()}`,
      sessionId: session.id,
      date: session.date,
      drillLogs,
      rpe,
      note,
      durationMinutes: session.estimatedMinutes,
    };
    await Storage.appendLog(log);

    const enrollment = await Storage.getEnrollment();
    if (enrollment && session.programId) {
      const updated = {
        ...enrollment,
        currentDay: enrollment.currentDay + 1,
        completedDays: [...enrollment.completedDays, enrollment.currentDay],
      };
      await Storage.setEnrollment(updated);
    }

    await Storage.setCurrentSession({ ...session, date: 'done' });
    setLogModalVisible(false);
    setCompletedIds(new Set());
    setRpe(5);
    setNote('');
    setDrillLogs([]);
    Alert.alert('Workout logged!', 'Nice work. See you next session.', [
      { text: 'Done', onPress: () => loadSession() },
    ]);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <View style={styles.loading}>
          <Text style={[styles.loadingText, { color: colors.textMid }]}>Building your session…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!session) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <View style={styles.loading}>
          <Text style={[styles.loadingText, { color: colors.textMid }]}>Couldn't build a session.</Text>
          <TouchableOpacity onPress={loadSession} style={{ marginTop: 16 }}>
            <Text style={{ color: colors.accent, fontSize: 15, fontWeight: '600' }}>Try again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const bbBlocks = ['warmup', 'skill', 'conditioning', 'cooldown'];
  const gymBlocks = ['lift'];

  const bbDrills = [...session.drills]
    .filter((sd) => bbBlocks.includes(sd.block))
    .sort((a, b) => bbBlocks.indexOf(a.block) - bbBlocks.indexOf(b.block));

  const gymDrills = [...session.drills]
    .filter((sd) => gymBlocks.includes(sd.block));

  const firstName = profile?.name?.split(' ')[0] ?? '';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView
        contentContainerStyle={[styles.scroll, { gap: Spacing.md, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.headerCard, { backgroundColor: colors.primary }]}>
          <View style={styles.headerTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greetingText}>
                {greeting()}{firstName ? `, ${firstName}` : ''} 👋
              </Text>
              <Text style={styles.headerDate}>{formatDate()}</Text>
            </View>
            {streak > 0 && (
              <View style={styles.streakBadge}>
                <Text style={styles.streakText}>🔥 {streak} day{streak !== 1 ? 's' : ''}</Text>
              </View>
            )}
          </View>
          {session.programId && (
            <View style={styles.programBadge}>
              <Text style={styles.programBadgeText}>📅 Program Active</Text>
            </View>
          )}
        </View>

        {/* Progress card */}
        <View style={[styles.progressCard, { backgroundColor: colors.background }]}>
          <ProgressRing
            progress={progress}
            size={110}
            label={`${Math.round(progress * 100)}%`}
            sublabel="done"
          />
          <View style={styles.progressMeta}>
            <Text style={[styles.progressTitle, { color: colors.textDark }]}>
              {completedIds.size} / {session.drills.length} drills
            </Text>
            <Text style={[styles.progressSub, { color: colors.textMid }]}>≈ {session.estimatedMinutes} min total</Text>
            <TouchableOpacity style={styles.shortenBtn} onPress={handleShorten}>
              <Text style={[styles.shortenText, { color: colors.accent }]}>Shorten workout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Basketball section */}
        <View style={[styles.sectionHeader, { backgroundColor: colors.primary }]}>
          <Text style={styles.sectionIcon}>🏀</Text>
          <Text style={styles.sectionTitle}>Basketball</Text>
          <Text style={styles.sectionCount}>{bbDrills.length} drills</Text>
        </View>
        <View style={styles.list}>
          {bbDrills.map((sd) => (
            <WorkoutItem
              key={sd.drill.id}
              item={sd}
              completed={completedIds.has(sd.drill.id)}
              onPress={() => {
                markComplete(sd.drill.id);
                openDrillDetail(sd);
              }}
            />
          ))}
        </View>

        {/* Gym section — only shown if there are gym drills */}
        {gymDrills.length > 0 && (
          <>
            <View style={[styles.sectionHeader, { backgroundColor: '#5B21B6' }]}>
              <Text style={styles.sectionIcon}>🏋️</Text>
              <Text style={styles.sectionTitle}>Gym</Text>
              <Text style={styles.sectionCount}>{gymDrills.length} drills</Text>
            </View>
            <View style={styles.list}>
              {gymDrills.map((sd) => (
                <WorkoutItem
                  key={sd.drill.id}
                  item={sd}
                  completed={completedIds.has(sd.drill.id)}
                  onPress={() => {
                    markComplete(sd.drill.id);
                    openDrillDetail(sd);
                  }}
                />
              ))}
            </View>
          </>
        )}

        {completedIds.size > 0 && (
          <TouchableOpacity
            style={[styles.finishBtn, { backgroundColor: colors.primary }]}
            onPress={() => setLogModalVisible(true)}
            activeOpacity={0.85}
          >
            <Text style={[styles.finishText, { color: colors.white }]}>Log Workout</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Log modal */}
      <Modal visible={logModalVisible} animationType="slide" presentationStyle="pageSheet">
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView contentContainerStyle={[styles.modalScroll, { gap: Spacing.md }]}>
              <Text style={[styles.modalTitle, { color: colors.textDark }]}>Log Workout</Text>
              <Text style={[styles.modalSub, { color: colors.textMid }]}>How hard was today's session?</Text>
              <RPESlider value={rpe} onChange={setRpe} />

              <Text style={[styles.modalSub, { color: colors.textMid, marginTop: Spacing.lg }]}>Notes (optional)</Text>
              <TextInput
                style={[
                  styles.noteInput,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.surfaceBorder,
                    color: colors.textDark,
                  },
                ]}
                placeholder="What went well? What to improve?"
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={4}
                placeholderTextColor={colors.textLight}
              />

              <TouchableOpacity
                style={[styles.submitBtn, { backgroundColor: colors.accent }]}
                onPress={finishWorkout}
                activeOpacity={0.85}
              >
                <Text style={[styles.submitText, { color: colors.white }]}>Save & Finish</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLogModalVisible(false)} style={styles.cancelBtn}>
                <Text style={[styles.cancelText, { color: colors.textMid }]}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: Spacing.lg },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { fontSize: 16 },
  headerCard: {
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.sm,
    ...Shadow.md,
  },
  headerTop: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  greetingText: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  headerDate: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  streakBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  streakText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  programBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  programBadgeText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  progressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.lg,
    ...Shadow.md,
  },
  progressMeta: { flex: 1, gap: 4 },
  progressTitle: { fontSize: 18, fontWeight: '800' },
  progressSub: { fontSize: 13 },
  shortenBtn: { marginTop: Spacing.sm },
  shortenText: { fontSize: 13, fontWeight: '600' },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    gap: Spacing.sm,
  },
  sectionIcon: { fontSize: 18 },
  sectionTitle: { flex: 1, color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  sectionCount: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
  list: { gap: Spacing.sm },
  finishBtn: {
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: Spacing.md,
    ...Shadow.md,
  },
  finishText: { fontSize: 17, fontWeight: '700' },
  modalScroll: { padding: Spacing.lg },
  modalTitle: { fontSize: 24, fontWeight: '800' },
  modalSub: { fontSize: 15, fontWeight: '600' },
  noteInput: {
    borderRadius: Radius.md,
    padding: Spacing.md,
    fontSize: 15,
    borderWidth: 1,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitBtn: {
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: Spacing.md,
    ...Shadow.md,
  },
  submitText: { fontSize: 17, fontWeight: '700' },
  cancelBtn: { alignItems: 'center', paddingVertical: Spacing.md },
  cancelText: { fontSize: 15 },
});
