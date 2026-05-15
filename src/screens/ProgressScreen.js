import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { exercises } from '../data/exercises';
import { colors, shadow } from '../theme';

const ACHIEVEMENTS = [
  { id: 'streak_7', label: '7 Day Streak', emoji: '🔥', desc: 'Train 7 days in a row' },
  { id: 'streak_30', label: '30 Day Streak', emoji: '💪', desc: '30 consecutive days' },
  { id: 'streak_50', label: '50 Day Streak', emoji: '⚡', desc: '50 consecutive days' },
  { id: 'streak_100', label: '100 Day Streak', emoji: '🏆', desc: 'Elite dedication' },
  { id: 'streak_365', label: '365 Day Streak', emoji: '👑', desc: 'One full year' },
  { id: 'w10', label: '10 Workouts', emoji: '🌟', desc: 'Complete 10 workouts' },
  { id: 'w50', label: '50 Workouts', emoji: '🎯', desc: 'Complete 50 workouts' },
];

const DAY_SHORT = ['S','M','T','W','T','F','S'];

function getLast28Days() {
  return Array.from({ length: 28 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (27 - i)); return d.toDateString();
  });
}

function getLast7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i)); return d.toDateString();
  });
}

export default function ProgressScreen() {
  const { state } = useApp();
  const insets = useSafeAreaInsets();
  const { streak, workoutLog, achievements, gymProgress } = state;
  const [section, setSection] = useState('overview');

  const thisWeek = workoutLog.filter(w => (new Date() - new Date(w.date)) / 86400000 < 7).length;
  const thisMonth = workoutLog.filter(w => {
    const d = new Date(w.date), n = new Date();
    return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
  }).length;
  const totalMins = workoutLog.reduce((s, w) => s + (w.duration || 0), 0);

  return (
    <View style={{ flex: 1, backgroundColor: colors.blue50 }}>
      <View style={[s.header, { paddingTop: insets.top + 12 }]}>
        <Text style={s.title}>Progress</Text>
        <Text style={s.subtitle}>Your training story</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 14 }}
          contentContainerStyle={{ gap: 8, paddingRight: 4 }}>
          {[['overview','📊 Overview'],['activity','📅 Activity'],['gym','🏋️ Gym'],['badges','🏆 Badges']].map(([id, label]) => (
            <TouchableOpacity key={id} onPress={() => setSection(id)} style={[s.tabBtn, section === id && s.tabBtnActive]}>
              <Text style={[s.tabBtnText, section === id && { color: colors.white }]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {section === 'overview' && <OverviewSection streak={streak} workoutLog={workoutLog} thisWeek={thisWeek} thisMonth={thisMonth} totalMins={totalMins} />}
        {section === 'activity' && <ActivitySection workoutLog={workoutLog} />}
        {section === 'gym' && <GymSection gymProgress={gymProgress} />}
        {section === 'badges' && <BadgesSection achievements={achievements} />}
      </ScrollView>
    </View>
  );
}

function OverviewSection({ streak, workoutLog, thisWeek, thisMonth, totalMins }) {
  const logDates = new Set(workoutLog.map(w => w.date));
  const last7 = getLast7Days();
  const drillCount = workoutLog.filter(w => w.type === 'drill').length;
  const gymCount = workoutLog.filter(w => w.type === 'gym').length;

  return (
    <>
      <View style={s.grid2}>
        {[
          { v: `${streak.current}🔥`, l: 'Streak', s2: `Best: ${streak.longest}d` },
          { v: workoutLog.length, l: 'Total Workouts', s2: 'all time' },
          { v: thisWeek, l: 'This Week', s2: 'sessions' },
          { v: thisMonth, l: 'This Month', s2: 'sessions' },
          { v: `${Math.floor(totalMins/60)}h ${totalMins%60}m`, l: 'Total Time', s2: null },
          { v: drillCount + gymCount > 0 ? Math.round((drillCount/(drillCount+gymCount))*100)+'%' : '—', l: 'Drills', s2: `${gymCount} gym` },
        ].map((item, i) => (
          <View key={i} style={[s.statCard, { flex: 1, minWidth: '45%' }]}>
            <Text style={s.statNum}>{item.v}</Text>
            <Text style={s.statLabel}>{item.l}</Text>
            {item.s2 && <Text style={s.statSub}>{item.s2}</Text>}
          </View>
        ))}
      </View>

      <Text style={s.sectionTitle}>Last 7 Days</Text>
      <View style={[s.card, { marginBottom: 20 }]}>
        <View style={{ flexDirection: 'row', gap: 4, alignItems: 'flex-end', justifyContent: 'space-between' }}>
          {last7.map((d, i) => {
            const trained = logDates.has(d);
            const isToday = d === new Date().toDateString();
            return (
              <View key={d} style={{ flex: 1, alignItems: 'center', gap: 6 }}>
                <View style={{ width: '100%', maxWidth: 36, height: 44, borderRadius: 8, backgroundColor: trained ? colors.blue500 : colors.gray100, alignItems: 'center', justifyContent: 'center' }}>
                  {trained && <Text style={{ color: colors.white, fontSize: 14 }}>✓</Text>}
                </View>
                <Text style={{ fontSize: 11, color: isToday ? colors.blue500 : colors.gray400, fontWeight: isToday ? '700' : '400' }}>
                  {DAY_SHORT[new Date(d).getDay()]}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {workoutLog.length > 0 && (
        <>
          <Text style={s.sectionTitle}>Workout Split</Text>
          <View style={s.card}>
            {[['🏀 Drills', drillCount, colors.blue500], ['🏋️ Gym', gymCount, colors.purple]].map(([label, count, color]) => (
              <View key={label} style={{ marginBottom: 14 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={{ fontWeight: '600', fontSize: 14, color: colors.black }}>{label}</Text>
                  <Text style={{ fontWeight: '700', fontSize: 14, color }}>{count}</Text>
                </View>
                <View style={{ backgroundColor: colors.gray100, borderRadius: 999, height: 8, overflow: 'hidden' }}>
                  <View style={{ width: `${workoutLog.length ? (count/workoutLog.length)*100 : 0}%`, height: 8, backgroundColor: color, borderRadius: 999 }} />
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </>
  );
}

function ActivitySection({ workoutLog }) {
  const logDates = new Set(workoutLog.map(w => w.date));
  const days28 = getLast28Days();
  // pad start to align to Sunday
  const firstDay = new Date(days28[0]).getDay();
  const padded = [...Array(firstDay).fill(null), ...days28];

  return (
    <>
      <Text style={s.sectionTitle}>28-Day Calendar</Text>
      <View style={[s.card, { marginBottom: 20 }]}>
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          {['S','M','T','W','T','F','S'].map((d, i) => (
            <Text key={i} style={{ flex: 1, textAlign: 'center', fontSize: 11, color: colors.gray400, fontWeight: '600' }}>{d}</Text>
          ))}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {padded.map((d, i) => {
            if (!d) return <View key={`pad-${i}`} style={{ width: '14.28%', aspectRatio: 1 }} />;
            const trained = logDates.has(d);
            const isToday = d === new Date().toDateString();
            return (
              <View key={d} style={{ width: '14.28%', aspectRatio: 1, padding: 1.5 }}>
                <View style={{ flex: 1, borderRadius: 5, backgroundColor: isToday ? (trained ? colors.black : colors.blue50) : trained ? colors.blue500 : colors.gray100, borderWidth: isToday ? 2 : 0, borderColor: colors.blue500, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 10, color: trained || isToday ? (trained ? colors.white : colors.blue500) : colors.gray400 }}>
                    {new Date(d).getDate()}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{ flexDirection: 'row', gap: 14, marginTop: 10, flexWrap: 'wrap' }}>
          {[['#0EA5E9', 'Trained'], ['#F1F5F9', 'Rest']].map(([c, l]) => (
            <View key={l} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <View style={{ width: 10, height: 10, backgroundColor: c, borderRadius: 2 }} />
              <Text style={{ fontSize: 11, color: colors.gray400 }}>{l}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={s.sectionTitle}>Recent Sessions</Text>
      {workoutLog.length === 0 ? (
        <Text style={{ textAlign: 'center', color: colors.gray400, marginTop: 20 }}>No sessions yet. Get training!</Text>
      ) : workoutLog.slice(0, 15).map((w, i) => (
        <View key={i} style={[s.recentItem, { marginBottom: 8 }]}>
          <Text style={{ fontSize: 22 }}>{w.type === 'gym' ? '🏋️' : '🏀'}</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '600', fontSize: 14, color: colors.black }}>{w.name}</Text>
            <Text style={{ fontSize: 12, color: colors.gray400, marginTop: 1 }}>{w.date}{w.duration ? ` · ${w.duration}m` : ''}</Text>
            {w.notes ? <Text style={{ fontSize: 12, color: colors.gray500, fontStyle: 'italic', marginTop: 2 }}>"{w.notes}"</Text> : null}
          </View>
          {w.rating ? <Text style={{ fontSize: 12 }}>{'⭐'.repeat(w.rating)}</Text> : null}
        </View>
      ))}
    </>
  );
}

function GymSection({ gymProgress }) {
  const keys = Object.keys(gymProgress || {});
  if (!keys.length) return (
    <View style={{ alignItems: 'center', paddingTop: 60 }}>
      <Text style={{ fontSize: 48 }}>🏋️</Text>
      <Text style={{ fontSize: 17, fontWeight: '700', color: colors.gray700, marginTop: 14 }}>No gym data yet</Text>
      <Text style={{ color: colors.gray400, fontSize: 14, marginTop: 6, textAlign: 'center' }}>Log gym sessions to track strength progress.</Text>
    </View>
  );
  return (
    <>
      <Text style={s.sectionTitle}>Strength Progress</Text>
      {keys.map(id => {
        const ex = exercises.find(e => e.id === id);
        const logs = gymProgress[id] || [];
        if (!ex || !logs.length) return null;
        const latest = logs[0], prev = logs[1];
        return (
          <View key={id} style={[s.card, { marginBottom: 12 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <View>
                <Text style={{ fontWeight: '700', fontSize: 15, color: colors.black }}>{ex.name}</Text>
                <Text style={{ fontSize: 12, color: colors.gray400 }}>{ex.muscleGroup}</Text>
              </View>
              <View style={{ backgroundColor: colors.blue100, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' }}>
                <Text style={{ fontSize: 11, color: colors.blue700, fontWeight: '600' }}>{logs.length} sessions</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <View>
                <Text style={{ fontSize: 11, color: colors.gray400, marginBottom: 2 }}>Latest</Text>
                <Text style={{ fontWeight: '700', fontSize: 16, color: colors.black }}>{latest.weight ? `${latest.weight}lbs` : latest.reps}</Text>
              </View>
              {prev && <View>
                <Text style={{ fontSize: 11, color: colors.gray400, marginBottom: 2 }}>Previous</Text>
                <Text style={{ fontWeight: '600', fontSize: 16, color: colors.gray500 }}>{prev.weight ? `${prev.weight}lbs` : prev.reps}</Text>
              </View>}
              {prev && latest.weight && prev.weight && latest.weight > prev.weight && (
                <Text style={{ color: colors.success, fontWeight: '700', alignSelf: 'flex-end', marginBottom: 2 }}>↑ +{latest.weight - prev.weight}lbs</Text>
              )}
            </View>
          </View>
        );
      })}
    </>
  );
}

function BadgesSection({ achievements }) {
  const earned = new Set((achievements || []).map(a => a.id));
  return (
    <>
      <Text style={s.sectionTitle}>Achievements</Text>
      <View style={s.grid2}>
        {ACHIEVEMENTS.map(a => {
          const isEarned = earned.has(a.id);
          return (
            <View key={a.id} style={[s.badgeCard, isEarned && s.badgeCardEarned]}>
              <Text style={{ fontSize: 36, marginBottom: 8, opacity: isEarned ? 1 : 0.3 }}>{a.emoji}</Text>
              <Text style={{ fontWeight: '700', fontSize: 13, color: colors.black, textAlign: 'center' }}>{a.label}</Text>
              <Text style={{ fontSize: 11, color: colors.gray400, marginTop: 3, textAlign: 'center' }}>{a.desc}</Text>
              {isEarned && <Text style={{ fontSize: 10, color: colors.blue500, fontWeight: '700', marginTop: 6 }}>EARNED ✓</Text>}
            </View>
          );
        })}
      </View>
    </>
  );
}

const s = StyleSheet.create({
  header: { backgroundColor: colors.white, paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: colors.gray100 },
  title: { fontSize: 28, fontWeight: '800', color: colors.black, letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: colors.gray500, marginTop: 4 },
  tabBtn: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 10, backgroundColor: colors.gray100 },
  tabBtnActive: { backgroundColor: colors.black },
  tabBtnText: { fontSize: 13, fontWeight: '700', color: colors.gray500 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: colors.black, marginBottom: 12 },
  card: { backgroundColor: colors.white, borderRadius: 14, padding: 16, marginBottom: 20, ...shadow },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  statCard: { backgroundColor: colors.white, borderRadius: 12, padding: 14, alignItems: 'center', ...shadow, marginBottom: 10 },
  statNum: { fontSize: 26, fontWeight: '900', color: colors.black },
  statLabel: { fontSize: 12, fontWeight: '600', color: colors.gray500, marginTop: 2 },
  statSub: { fontSize: 11, color: colors.gray400, marginTop: 1 },
  recentItem: { backgroundColor: colors.white, borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, ...shadow },
  badgeCard: { width: '47%', backgroundColor: colors.white, borderRadius: 14, padding: 14, alignItems: 'center', ...shadow, borderWidth: 2, borderColor: 'transparent', opacity: 0.5 },
  badgeCardEarned: { borderColor: colors.blue500, opacity: 1 },
  purple: colors.purple,
});
