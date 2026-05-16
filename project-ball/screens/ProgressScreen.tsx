import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Storage } from '../lib/storage';
import { WorkoutLog } from '../types/workout';
import StatCard from '../components/StatCard';
import { Colors } from '../theme/colors';
import { Spacing, Radius, Shadow } from '../theme/spacing';

function computeStreak(logs: WorkoutLog[]): number {
  if (logs.length === 0) return 0;
  const dates = [...new Set(logs.map((l) => l.date))].sort().reverse();
  let streak = 0;
  let expected = new Date();
  expected.setHours(0, 0, 0, 0);
  for (const dateStr of dates) {
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    const diff = Math.round((expected.getTime() - d.getTime()) / 86400000);
    if (diff === 0 || diff === 1) {
      streak++;
      expected = d;
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

function SimpleBarChart({ data }: { data: { label: string; value: number }[] }) {
  if (data.length === 0) return <Text style={styles.emptyChart}>No data yet</Text>;
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <View style={styles.chartContainer}>
      {data.map((d, i) => (
        <View key={i} style={styles.barGroup}>
          <View style={styles.barBg}>
            <View style={[styles.barFill, { height: `${Math.round((d.value / max) * 100)}%` }]} />
          </View>
          <Text style={styles.barLabel}>{d.label}</Text>
          <Text style={styles.barValue}>{d.value}m</Text>
        </View>
      ))}
    </View>
  );
}

function ShootingChart({ data }: { data: { label: string; pct: number }[] }) {
  if (data.length === 0) return <Text style={styles.emptyChart}>Log shooting drills to see trends</Text>;
  return (
    <View style={styles.shootingRow}>
      {data.map((d, i) => (
        <View key={i} style={styles.shootingItem}>
          <Text style={[styles.shootingPct, d.pct >= 50 ? styles.pctGood : styles.pctBad]}>{d.pct}%</Text>
          <Text style={styles.shootingDate}>{d.label}</Text>
        </View>
      ))}
    </View>
  );
}

export default function ProgressScreen() {
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
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Progress</Text>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <StatCard label="Day Streak" value={streak} unit="days" accent />
          <StatCard label="Total Workouts" value={total} />
        </View>
        <View style={styles.statsRow}>
          <StatCard label="Total Volume" value={volume} unit="min" />
          <StatCard label="Avg RPE" value={rpe} />
        </View>

        {/* Weekly volume */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Volume (minutes)</Text>
          <SimpleBarChart data={weekly} />
        </View>

        {/* Shooting % */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Shooting % Trend</Text>
          <ShootingChart data={shooting} />
        </View>

        {/* Recent logs */}
        <Text style={styles.sectionTitle}>Recent Sessions</Text>
        {logs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No sessions logged yet</Text>
            <Text style={styles.emptyText}>Complete your first workout on the Home tab to see your progress here.</Text>
          </View>
        ) : (
          <View style={styles.logList}>
            {[...logs].reverse().slice(0, 10).map((log) => (
              <View key={log.id} style={styles.logItem}>
                <View style={styles.logLeft}>
                  <Text style={styles.logDate}>{log.date}</Text>
                  <Text style={styles.logMeta}>{log.durationMinutes} min · {log.drillLogs.length} drills logged</Text>
                  {log.note ? <Text style={styles.logNote}>{log.note}</Text> : null}
                </View>
                <View style={[styles.rpeBadge, { backgroundColor: log.rpe >= 8 ? Colors.error : log.rpe <= 4 ? Colors.success : Colors.warning }]}>
                  <Text style={styles.rpeBadgeText}>RPE {log.rpe}</Text>
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
  safe: { flex: 1, backgroundColor: Colors.surface },
  scroll: { padding: Spacing.lg, gap: Spacing.md, paddingBottom: Spacing.xxl },
  title: { fontSize: 28, fontWeight: '800', color: Colors.textDark },
  statsRow: { flexDirection: 'row', gap: Spacing.md },
  card: {
    backgroundColor: Colors.background,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.textDark },
  chartContainer: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 120 },
  barGroup: { flex: 1, alignItems: 'center', gap: 4 },
  barBg: { flex: 1, width: '100%', backgroundColor: Colors.surface, borderRadius: 4, justifyContent: 'flex-end' },
  barFill: { backgroundColor: Colors.accent, borderRadius: 4, width: '100%', minHeight: 4 },
  barLabel: { fontSize: 10, color: Colors.textLight },
  barValue: { fontSize: 9, color: Colors.textLight },
  emptyChart: { color: Colors.textLight, fontSize: 14, textAlign: 'center', paddingVertical: Spacing.md },
  shootingRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  shootingItem: { alignItems: 'center', minWidth: 48 },
  shootingPct: { fontSize: 20, fontWeight: '800' },
  pctGood: { color: Colors.success },
  pctBad: { color: Colors.error },
  shootingDate: { fontSize: 11, color: Colors.textLight, marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.textDark },
  emptyState: {
    backgroundColor: Colors.background,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: Colors.textDark },
  emptyText: { fontSize: 14, color: Colors.textMid, textAlign: 'center', lineHeight: 20 },
  logList: { gap: Spacing.sm },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  logLeft: { flex: 1, gap: 2 },
  logDate: { fontSize: 14, fontWeight: '700', color: Colors.textDark },
  logMeta: { fontSize: 12, color: Colors.textMid },
  logNote: { fontSize: 12, color: Colors.textLight, fontStyle: 'italic', marginTop: 2 },
  rpeBadge: { borderRadius: Radius.full, paddingHorizontal: 10, paddingVertical: 4 },
  rpeBadgeText: { color: Colors.white, fontSize: 12, fontWeight: '700' },
});
