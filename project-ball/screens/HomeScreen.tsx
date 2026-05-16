import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Modal,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Colors } from '../theme/colors';
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

export default function HomeScreen({ navigation }: any) {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [rpe, setRpe] = useState(5);
  const [note, setNote] = useState('');
  const [drillLogs, setDrillLogs] = useState<DrillLog[]>([]);

  const loadSession = useCallback(async () => {
    const p = await Storage.getProfile();
    if (!p) return;
    setProfile(p);

    const enrollment = await Storage.getEnrollment();
    if (enrollment) {
      const program = PROGRAMS.find((x) => x.id === enrollment.programId);
      if (program) {
        const week = program.schedule.find((w) => w.week === enrollment.currentWeek);
        const day = week?.days.find((d) => d.day === enrollment.currentDay);
        if (day) {
          const s: WorkoutSession = {
            id: `prog-${enrollment.programId}-${enrollment.currentDay}`,
            date: new Date().toISOString().slice(0, 10),
            drills: day.drills,
            estimatedMinutes: day.estimatedMinutes,
            programId: enrollment.programId,
            programDay: enrollment.currentDay,
          };
          setSession(s);
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

  if (!session) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Building your session…</Text>
        </View>
      </SafeAreaView>
    );
  }

  const blockOrder = ['warmup', 'skill', 'lift', 'conditioning', 'cooldown'];
  const sorted = [...session.drills].sort(
    (a, b) => blockOrder.indexOf(a.block) - blockOrder.indexOf(b.block)
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerBar}>
          <View>
            <Text style={styles.greeting}>{greeting()}</Text>
            <Text style={styles.headerTitle}>Today's Session</Text>
          </View>
          {session.programId && (
            <View style={styles.programBadge}>
              <Text style={styles.programBadgeText}>Program</Text>
            </View>
          )}
        </View>

        {/* Progress card */}
        <View style={styles.progressCard}>
          <ProgressRing
            progress={progress}
            size={110}
            label={`${Math.round(progress * 100)}%`}
            sublabel="done"
          />
          <View style={styles.progressMeta}>
            <Text style={styles.progressTitle}>
              {completedIds.size} / {session.drills.length} drills
            </Text>
            <Text style={styles.progressSub}>≈ {session.estimatedMinutes} min total</Text>
            <TouchableOpacity style={styles.shortenBtn} onPress={handleShorten}>
              <Text style={styles.shortenText}>Shorten workout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Drill list */}
        <View style={styles.list}>
          {sorted.map((sd) => (
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

        {completedIds.size > 0 && (
          <TouchableOpacity style={styles.finishBtn} onPress={() => setLogModalVisible(true)} activeOpacity={0.85}>
            <Text style={styles.finishText}>Log Workout</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Log modal */}
      <Modal visible={logModalVisible} animationType="slide" presentationStyle="pageSheet">
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <SafeAreaView style={styles.modalSafe}>
            <ScrollView contentContainerStyle={styles.modalScroll}>
              <Text style={styles.modalTitle}>Log Workout</Text>
              <Text style={styles.modalSub}>How hard was today's session?</Text>
              <RPESlider value={rpe} onChange={setRpe} />

              <Text style={[styles.modalSub, { marginTop: Spacing.lg }]}>Notes (optional)</Text>
              <TextInput
                style={styles.noteInput}
                placeholder="What went well? What to improve?"
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={4}
                placeholderTextColor={Colors.textLight}
              />

              <TouchableOpacity style={styles.submitBtn} onPress={finishWorkout} activeOpacity={0.85}>
                <Text style={styles.submitText}>Save & Finish</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLogModalVisible(false)} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.surface },
  scroll: { padding: Spacing.lg, gap: Spacing.md, paddingBottom: Spacing.xxl },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: Colors.textMid, fontSize: 16 },
  headerBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.sm },
  greeting: { fontSize: 13, color: Colors.textMid, fontWeight: '500' },
  headerTitle: { fontSize: 26, fontWeight: '800', color: Colors.textDark },
  programBadge: { backgroundColor: Colors.accentLight, borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 4 },
  programBadgeText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  progressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.lg,
    ...Shadow.md,
  },
  progressMeta: { flex: 1, gap: 4 },
  progressTitle: { fontSize: 18, fontWeight: '800', color: Colors.textDark },
  progressSub: { fontSize: 13, color: Colors.textMid },
  shortenBtn: { marginTop: Spacing.sm },
  shortenText: { fontSize: 13, color: Colors.accent, fontWeight: '600' },
  list: { gap: Spacing.sm },
  finishBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: Spacing.md,
    ...Shadow.md,
  },
  finishText: { color: Colors.white, fontSize: 17, fontWeight: '700' },
  modalSafe: { flex: 1, backgroundColor: Colors.background },
  modalScroll: { padding: Spacing.lg, gap: Spacing.md },
  modalTitle: { fontSize: 24, fontWeight: '800', color: Colors.textDark },
  modalSub: { fontSize: 15, color: Colors.textMid, fontWeight: '600' },
  noteInput: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    fontSize: 15,
    color: Colors.textDark,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: Spacing.md,
    ...Shadow.md,
  },
  submitText: { color: Colors.white, fontSize: 17, fontWeight: '700' },
  cancelBtn: { alignItems: 'center', paddingVertical: Spacing.md },
  cancelText: { color: Colors.textMid, fontSize: 15 },
});
