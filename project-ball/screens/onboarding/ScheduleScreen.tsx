import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Spacing, Radius, Shadow } from '../../theme/spacing';

const DAYS_OPTIONS = [2, 3, 4, 5, 6];
const DURATION_OPTIONS = [30, 45, 60, 75, 90];

interface Props {
  onNext: (daysPerWeek: number, minutesPerSession: number) => void;
  stepLabel?: string;
}

export default function ScheduleScreen({ onNext, stepLabel = '5 of 5' }: Props) {
  const { colors } = useTheme();
  const [days, setDays] = useState<number | null>(null);
  const [mins, setMins] = useState<number | null>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.step, { color: colors.accent }]}>{stepLabel}</Text>
          <Text style={[styles.title, { color: colors.textDark }]}>How much time can you commit?</Text>
          <Text style={[styles.subtitle, { color: colors.textMid }]}>We'll build sessions that fit your schedule, not the other way around.</Text>
        </View>

        <View style={styles.sections}>
          <View>
            <Text style={[styles.sectionLabel, { color: colors.textDark }]}>Days per week</Text>
            <View style={styles.row}>
              {DAYS_OPTIONS.map((d) => {
                const active = days === d;
                return (
                  <TouchableOpacity
                    key={d}
                    style={[
                      styles.chip,
                      { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
                      active && { backgroundColor: colors.primary, borderColor: colors.primary },
                    ]}
                    onPress={() => setDays(d)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, { color: colors.textDark }, active && { color: colors.white }]}>{d}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View>
            <Text style={[styles.sectionLabel, { color: colors.textDark }]}>Minutes per session</Text>
            <View style={styles.row}>
              {DURATION_OPTIONS.map((m) => {
                const active = mins === m;
                return (
                  <TouchableOpacity
                    key={m}
                    style={[
                      styles.chip,
                      { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
                      active && { backgroundColor: colors.primary, borderColor: colors.primary },
                    ]}
                    onPress={() => setMins(m)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, { color: colors.textDark }, active && { color: colors.white }]}>{m}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {days && mins ? (
            <View style={[styles.summary, { backgroundColor: colors.accentLight, borderLeftColor: colors.accent }]}>
              <Text style={[styles.summaryText, { color: colors.textDark }]}>
                That's <Text style={[styles.summaryHighlight, { color: colors.primary }]}>{days * mins} minutes</Text> of training per week.{'\n'}
                Serious players are built on consistency.
              </Text>
            </View>
          ) : null}
        </View>

        <TouchableOpacity
          style={[
            styles.btn,
            { backgroundColor: days && mins ? colors.accent : colors.surfaceBorder },
          ]}
          onPress={() => days && mins && onNext(days, mins)}
          disabled={!days || !mins}
          activeOpacity={0.85}
        >
          <Text style={[styles.btnText, { color: colors.white }]}>Let's Build Your Program</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl, justifyContent: 'space-between' },
  header: { marginBottom: Spacing.xl },
  step: { fontSize: 13, fontWeight: '600', marginBottom: Spacing.sm },
  title: { fontSize: 28, fontWeight: '800', marginBottom: Spacing.sm },
  subtitle: { fontSize: 15, lineHeight: 22 },
  sections: { flex: 1, gap: Spacing.xl, justifyContent: 'center' },
  sectionLabel: { fontSize: 16, fontWeight: '700', marginBottom: Spacing.md },
  row: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
  chip: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: Radius.full,
    borderWidth: 2,
    ...Shadow.sm,
  },
  chipText: { fontSize: 16, fontWeight: '700' },
  summary: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderLeftWidth: 4,
  },
  summaryText: { fontSize: 14, lineHeight: 22 },
  summaryHighlight: { fontWeight: '800' },
  btn: {
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadow.md,
  },
  btnText: { fontSize: 17, fontWeight: '700' },
});
