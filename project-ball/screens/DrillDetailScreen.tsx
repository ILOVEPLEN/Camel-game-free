import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert,
} from 'react-native';
import { Drill } from '../types/drill';
import { Colors } from '../theme/colors';
import { Spacing, Radius, Shadow } from '../theme/spacing';

const DIFFICULTY_LABELS = ['', 'Beginner', 'Intermediate', 'Advanced'];
const DIFFICULTY_COLORS = ['', Colors.easy, Colors.medium, Colors.hard];

const CATEGORY_LABELS: Record<string, string> = {
  shooting: 'Shooting',
  'ball-handling': 'Ball Handling',
  finishing: 'Finishing',
  footwork: 'Footwork',
  defense: 'Defense',
  conditioning: 'Conditioning',
  strength: 'Strength',
};

interface Props {
  route: { params: { drill: Drill } };
  navigation: any;
}

export default function DrillDetailScreen({ route, navigation }: Props) {
  const { drill } = route.params;
  const [timerActive, setTimerActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalSeconds = drill.duration * 60;

  useEffect(() => {
    if (timerActive) {
      intervalRef.current = setInterval(() => {
        setElapsed((e) => {
          if (e >= totalSeconds) {
            clearInterval(intervalRef.current!);
            setTimerActive(false);
            Alert.alert('Time\'s up!', `${drill.name} complete.`);
            return totalSeconds;
          }
          return e + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [timerActive]);

  const mins = String(Math.floor((totalSeconds - elapsed) / 60)).padStart(2, '0');
  const secs = String((totalSeconds - elapsed) % 60).padStart(2, '0');
  const timerProgress = elapsed / totalSeconds;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero image placeholder */}
        <Image
          source={{ uri: drill.videoPlaceholder }}
          style={styles.hero}
          resizeMode="cover"
        />

        <View style={styles.body}>
          {/* Badges */}
          <View style={styles.badges}>
            <View style={styles.catBadge}>
              <Text style={styles.catText}>{CATEGORY_LABELS[drill.category] ?? drill.category}</Text>
            </View>
            <View style={[styles.diffBadge, { backgroundColor: DIFFICULTY_COLORS[drill.difficulty] }]}>
              <Text style={styles.diffText}>{DIFFICULTY_LABELS[drill.difficulty]}</Text>
            </View>
          </View>

          <Text style={styles.name}>{drill.name}</Text>
          <Text style={styles.desc}>{drill.description}</Text>

          {/* Meta row */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaValue}>{drill.duration}</Text>
              <Text style={styles.metaLabel}>minutes</Text>
            </View>
            {drill.targetSets && (
              <View style={styles.metaItem}>
                <Text style={styles.metaValue}>{drill.targetSets}</Text>
                <Text style={styles.metaLabel}>sets</Text>
              </View>
            )}
            {drill.targetReps && (
              <View style={styles.metaItem}>
                <Text style={styles.metaValue}>{drill.targetReps}</Text>
                <Text style={styles.metaLabel}>reps</Text>
              </View>
            )}
          </View>

          {/* Cues */}
          <Text style={styles.sectionTitle}>Coaching Cues</Text>
          <View style={styles.cuesList}>
            {drill.cues.map((cue, i) => (
              <View key={i} style={styles.cueItem}>
                <View style={styles.cueDot} />
                <Text style={styles.cueText}>{cue}</Text>
              </View>
            ))}
          </View>

          {/* Equipment */}
          <Text style={styles.sectionTitle}>Equipment</Text>
          <View style={styles.equipRow}>
            {drill.equipment.map((e) => (
              <View key={e} style={styles.equipChip}>
                <Text style={styles.equipText}>{e.replace(/-/g, ' ')}</Text>
              </View>
            ))}
          </View>

          {/* Timer */}
          <View style={styles.timerCard}>
            <Text style={styles.timerLabel}>Session Timer</Text>
            <Text style={styles.timerDisplay}>{mins}:{secs}</Text>
            <View style={styles.timerBar}>
              <View style={[styles.timerFill, { flex: timerProgress }]} />
              <View style={{ flex: 1 - timerProgress }} />
            </View>
            <View style={styles.timerButtons}>
              <TouchableOpacity
                style={[styles.timerBtn, timerActive && styles.timerBtnStop]}
                onPress={() => setTimerActive((v) => !v)}
                activeOpacity={0.85}
              >
                <Text style={styles.timerBtnText}>{timerActive ? 'Pause' : elapsed > 0 ? 'Resume' : 'Start'}</Text>
              </TouchableOpacity>
              {elapsed > 0 && (
                <TouchableOpacity
                  style={styles.resetBtn}
                  onPress={() => { setElapsed(0); setTimerActive(false); }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: Spacing.xxl },
  hero: { width: '100%', height: 220, backgroundColor: Colors.accentLight },
  body: { padding: Spacing.lg, gap: Spacing.md },
  badges: { flexDirection: 'row', gap: Spacing.sm },
  catBadge: { backgroundColor: Colors.accentLight, borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 4 },
  catText: { fontSize: 12, fontWeight: '700', color: Colors.accent },
  diffBadge: { borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 4 },
  diffText: { fontSize: 12, fontWeight: '700', color: Colors.white },
  name: { fontSize: 26, fontWeight: '800', color: Colors.textDark },
  desc: { fontSize: 15, color: Colors.textMid, lineHeight: 22 },
  metaRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  metaItem: { alignItems: 'center', flex: 1 },
  metaValue: { fontSize: 24, fontWeight: '800', color: Colors.primary },
  metaLabel: { fontSize: 12, color: Colors.textMid, marginTop: 2 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.textDark },
  cuesList: { gap: Spacing.sm },
  cueItem: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'flex-start' },
  cueDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.accent, marginTop: 6 },
  cueText: { flex: 1, fontSize: 15, color: Colors.textDark, lineHeight: 22 },
  equipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  equipChip: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  equipText: { fontSize: 13, color: Colors.textMid, fontWeight: '500', textTransform: 'capitalize' },
  timerCard: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.md,
    alignItems: 'center',
    ...Shadow.md,
  },
  timerLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '600' },
  timerDisplay: { color: Colors.white, fontSize: 52, fontWeight: '800', fontVariant: ['tabular-nums'] },
  timerBar: {
    flexDirection: 'row',
    height: 6,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  timerFill: { backgroundColor: Colors.accent, borderRadius: 3 },
  timerButtons: { flexDirection: 'row', gap: Spacing.md, alignItems: 'center' },
  timerBtn: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.md,
    paddingVertical: 12,
    paddingHorizontal: 32,
    ...Shadow.sm,
  },
  timerBtnStop: { backgroundColor: Colors.error },
  timerBtnText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
  resetBtn: { paddingVertical: 12, paddingHorizontal: 16 },
  resetText: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
});
