import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Storage } from '../lib/storage';
import { WorkoutLog } from '../types/workout';
import { useTheme } from '../theme/ThemeContext';
import { Spacing, Radius, Shadow } from '../theme/spacing';

function computeStreak(logs: WorkoutLog[]): number {
  if (logs.length === 0) return 0;
  const dates = [...new Set(logs.map((l) => l.date))].sort().reverse();
  let streak = 0;
  const expected = new Date();
  expected.setHours(0, 0, 0, 0);
  let expectedTime = expected.getTime();
  for (const dateStr of dates) {
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    const diff = Math.round((expectedTime - d.getTime()) / 86400000);
    if (diff === 0 || diff === 1) {
      streak++;
      expectedTime = d.getTime();
    } else break;
  }
  return streak;
}

function avgRpe(logs: WorkoutLog[]): string {
  if (logs.length === 0) return '—';
  return (logs.reduce((s, l) => s + l.rpe, 0) / logs.length).toFixed(1);
}

function totalVolume(logs: WorkoutLog[]): number {
  return logs.reduce((s, l) => s + l.durationMinutes, 0);
}

function weeklyData(logs: WorkoutLog[]): { label: string; value: number }[] {
  const weeks: Record<string, number> = {};
  logs.forEach((l) => {
    const date = new Date(l.date);
    const week = `W${Math.ceil(date.getDate() / 7)}`;
    weeks[week] = (weeks[week] ?? 0) + l.durationMinutes;
  });
  return Object.entries(weeks)
    .slice(-6)
    .map(([label, value]) => ({ label, value }));
}

function shootingData(logs: WorkoutLog[]): { label: string; pct: number }[] {
  const byDate: Record<string, { makes: number; attempts: number }> = {};
  logs.forEach((l) => {
    l.drillLogs.forEach((dl) => {
      if (dl.makes != null && dl.attempts != null && dl.attempts > 0) {
        if (!byDate[l.date]) byDate[l.date] = { makes: 0, attempts: 0 };
        byDate[l.date].makes += dl.makes;
        byDate[l.date].attempts += dl.attempts;
      }
    });
  });
  return Object.entries(byDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-7)
    .map(([date, { makes, attempts }]) => ({
      label: date.slice(5),
      pct: Math.round((makes / attempts) * 100),
    }));
}

function SimpleBarChart({ data, barColor, bgColor, labelColor }: {
  data: { label: string; value: number }[];
  barColor: string;
  bgColor: string;
  labelColor: string;
}) {
  if (data.length === 0) return <Text style={[styles.emptyChart, { color: labelColor }]}>No data yet</Text>;
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <View style={styles.chartContainer}>
      {data.map((d, i) => (
        <View key={i} style={styles.barGroup}>
          <View style={[styles.barBg, { backgroundColor: bgColor }]}>
            <View style={[styles.barFill, { height: `${Math.round((d.value / max) * 100)}%`, backgroundColor: barColor }]} />
          </View>
          <Text style={[styles.barLabel, { color: labelColor }]}>{d.label}</Text>
          <Text style={[styles.barValue, { color: labelColor }]}>{d.value}m</Text>
        </View>
      ))}
    </View>
  );
}

function ShootingChart({ data, goodColor, badColor, labelColor }: {
  data: { label: string; pct: number }[];
  goodColor: string;
  badColor: string;
  labelColor: string;
}) {
  if (data.length === 0) return <Text style={[styles.emptyChart, { color: labelColor }]}>Log shooting drills to see trends</Text>;
  return (
    <View style={styles.shootingRow}>
      {data.map((d, i) => (
        <View key={i} style={styles.shootingItem}>
          <Text style={[styles.shootingPct, { color: d.pct >= 50 ? goodColor : badColor }]}>{d.pct}%</Text>
          <Text style={[styles.shootingDate, { color: labelColor }]}>{d.label}</Text>
        </View>
      ))}
    </View>
  );
}

export default function ProgressScreen() {
  const { colors, isDark } = useTheme();
  const [logs, setLogs] = useState<WorkoutLog[]>([]);

  useEffect(() => {
    Storage.getLogs().then(setLogs);
  }, []);

  const streak = computeStreak(logs);
  const total = logs.length;
  const volume = totalVolume(logs);
  const weekly = weeklyData(logs);
  const shooting = shootingData(logs);
  const rpe = avgRpe(logs);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={[styles.scroll, { gap: Spacing.md }]} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: colors.textDark }]}>Progress</Text>

        {/* Summary stats row */}
        <View style={styles.statsRow}>
          <View style={[styles.summaryCard, { backgroundColor: colors.primary }]}>
            <Text style={styles.summaryValue}>{total}</Text>
            <Text style={styles.summaryLabel}>Workouts</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: colors.background, borderColor: colors.surfaceBorder, borderWidth: 1 }]}>
            <Text style={[styles.summaryValue, { color: colors.textDark }]}>{volume}<Text style={[styles.summaryUnit, { color: colors.textMid }]}> min</Text></Text>
            <Text style={[styles.summaryLabel, { color: colors.textMid }]}>Total Volume</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: colors.background, borderColor: colors.surfaceBorder, borderWidth: 1 }]}>
            <Text style={[styles.summaryValue, { color: colors.textDark }]}>{rpe}</Text>
            <Text style={[styles.summaryLabel, { color: colors.textMid }]}>Avg RPE</Text>
          </View>
        </View>

        {streak > 0 && (
          <View style={[styles.streakBanner, { backgroundColor: colors.primary }]}>
            <Text style={styles.streakBannerText}>🔥 {streak} day streak — keep it going!</Text>
          </View>
        )}

        {/* Weekly volume */}
        <View style={[styles.card, { backgroundColor: colors.background }]}>
          <Text style={[styles.cardTitle, { color: colors.textDark }]}>Weekly Volume (minutes)</Text>
          <SimpleBarChart
            data={weekly}
            barColor={colors.accent}
            bgColor={colors.surface}
            labelColor={colors.textLight}
          />
        </View>

        {/* Shooting % */}
        <View style={[styles.card, { backgroundColor: colors.background }]}>
          <Text style={[styles.cardTitle, { color: colors.textDark }]}>Shooting % Trend</Text>
          <ShootingChart
            data={shooting}
            goodColor={colors.easy}
            badColor={colors.hard}
            labelColor={colors.textLight}
          />
        </View>

        {/* Recent logs */}
        <Text style={[styles.sectionTitle, { color: colors.textDark }]}>Recent Sessions</Text>
        {logs.length === 0 ? (
          <View style={[styles.emptyState, { backgroundColor: colors.background }]}>
            <Text style={[styles.emptyTitle, { color: colors.textDark }]}>No sessions logged yet</Text>
            <Text style={[styles.emptyText, { color: colors.textMid }]}>Complete your first workout on the Home tab to see your progress here.</Text>
          </View>
        ) : (
          <View style={styles.logList}>
            {[...logs].reverse().slice(0, 10).map((log) => (
              <View key={log.id} style={[styles.logItem, { backgroundColor: colors.background }]}>
                <View style={styles.logLeft}>
                  <Text style={[styles.logDate, { color: colors.textDark }]}>{log.date}</Text>
                  <Text style={[styles.logMeta, { color: colors.textMid }]}>{log.durationMinutes} min · {log.drillLogs.length} drills logged</Text>
                  {log.note ? <Text style={[styles.logNote, { color: colors.textLight }]}>{log.note}</Text> : null}
                </View>
                <View style={[
                  styles.rpeBadge,
                  { backgroundColor: log.rpe >= 8 ? colors.hard : log.rpe <= 4 ? colors.easy : colors.medium },
                ]}>
                  <Text style={[styles.rpeBadgeText, { color: colors.white }]}>RPE {log.rpe}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  title: { fontSize: 28, fontWeight: '800' },
  statsRow: { flexDirection: 'row', gap: Spacing.sm },
  summaryCard: {
    flex: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: 2,
    ...Shadow.sm,
  },
  summaryValue: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  summaryUnit: { fontSize: 14, fontWeight: '500' },
  summaryLabel: { fontSize: 11, fontWeight: '500', color: 'rgba(255,255,255,0.8)', textAlign: 'center' },
  streakBanner: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
  },
  streakBannerText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  card: {
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  chartContainer: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 120 },
  barGroup: { flex: 1, alignItems: 'center', gap: 4 },
  barBg: { flex: 1, width: '100%', borderRadius: 4, justifyContent: 'flex-end' },
  barFill: { borderRadius: 4, width: '100%', minHeight: 4 },
  barLabel: { fontSize: 10 },
  barValue: { fontSize: 9 },
  emptyChart: { fontSize: 14, textAlign: 'center', paddingVertical: Spacing.md },
  shootingRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  shootingItem: { alignItems: 'center', minWidth: 48 },
  shootingPct: { fontSize: 20, fontWeight: '800' },
  shootingDate: { fontSize: 11, marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  emptyState: {
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  emptyTitle: { fontSize: 17, fontWeight: '700' },
  emptyText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  logList: { gap: Spacing.sm },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  logLeft: { flex: 1, gap: 2 },
  logDate: { fontSize: 14, fontWeight: '700' },
  logMeta: { fontSize: 12 },
  logNote: { fontSize: 12, fontStyle: 'italic', marginTop: 2 },
  rpeBadge: { borderRadius: Radius.full, paddingHorizontal: 10, paddingVertical: 4 },
  rpeBadgeText: { fontSize: 12, fontWeight: '700' },
});
