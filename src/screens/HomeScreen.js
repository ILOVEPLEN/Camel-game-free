import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import WorkoutLogger from '../components/WorkoutLogger';
import { colors, shadow } from '../theme';

const MOTIVATIONS = [
  "Champions train when no one's watching.",
  "Every rep is a step closer to the player you want to be.",
  "Hard work beats talent when talent doesn't work hard.",
  "Your only competition is who you were yesterday.",
  "Greatness is earned one drill at a time.",
  "Today's training is tomorrow's highlight reel.",
  "Pain is temporary. Skill is permanent.",
  "Show up. Put in work. Repeat.",
];
const DAYS = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
const DAY_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

function getTodayWorkout(routine) {
  if (!routine) return null;
  return routine[DAYS[new Date().getDay()]] || null;
}

export default function HomeScreen({ onNavigate }) {
  const { state, trainedToday } = useApp();
  const insets = useSafeAreaInsets();
  const { streak, workoutLog, routine } = state;
  const [loggerOpen, setLoggerOpen] = useState(false);
  const todayWorkout = getTodayWorkout(routine);
  const motivation = MOTIVATIONS[new Date().getDate() % MOTIVATIONS.length];

  const thisWeek = workoutLog.filter(w => (new Date() - new Date(w.date)) / 86400000 < 7).length;
  const thisMonth = workoutLog.filter(w => {
    const d = new Date(w.date), now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const nextMilestone = [7, 30, 50, 100, 365].find(m => m > streak.current);

  return (
    <View style={{ flex: 1, backgroundColor: colors.blue50 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header hero */}
        <View style={[s.hero, { paddingTop: insets.top + 12 }]}>
          <View style={s.heroTop}>
            <View>
              <Text style={s.heroGreeting}>{greeting()}</Text>
              <Text style={s.heroDay}>{['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()]}</Text>
            </View>
            <View style={s.heroBadge}>
              <Text style={{ fontSize: 20 }}>🔥</Text>
              <Text style={s.heroBadgeNum}>{streak.current}</Text>
            </View>
          </View>
          <View style={s.heroStreak}>
            <View style={{ flex: 1 }}>
              <Text style={s.heroStreakLabel}>Current Streak</Text>
              <Text style={s.heroStreakNum}>{streak.current} {streak.current === 1 ? 'day' : 'days'} 🔥</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={s.heroStreakBestLabel}>Best</Text>
              <Text style={s.heroStreakBestNum}>{streak.longest}d</Text>
            </View>
          </View>
          {trainedToday && (
            <View style={s.trainedTodayBadge}>
              <Text style={s.trainedTodayText}>✅  Trained today!</Text>
            </View>
          )}
        </View>

        <View style={s.body}>
          {/* Quote */}
          <Text style={s.quote}>"{motivation}"</Text>

          {/* Today's workout */}
          {todayWorkout ? (
            <View style={s.card}>
              <View style={s.cardRow}>
                <View style={{ flex: 1 }}>
                  <View style={s.badgeBlue}><Text style={s.badgeBlueText}>Today's Workout</Text></View>
                  <Text style={s.cardTitle}>{todayWorkout.name}</Text>
                </View>
                <Text style={{ fontSize: 32 }}>{todayWorkout.type === 'gym' ? '🏋️' : '🏀'}</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 20, marginBottom: 14 }}>
                <View>
                  <Text style={s.metaLabel}>DURATION</Text>
                  <Text style={s.metaValue}>{todayWorkout.duration} min</Text>
                </View>
                <View>
                  <Text style={s.metaLabel}>FOCUS</Text>
                  <Text style={s.metaValue}>{todayWorkout.focus}</Text>
                </View>
              </View>
              {todayWorkout.items?.slice(0, 3).map((item, i) => (
                <Text key={i} style={s.workoutItem}>• {item}</Text>
              ))}
              {(todayWorkout.items?.length || 0) > 3 && (
                <Text style={s.workoutItemMore}>+{todayWorkout.items.length - 3} more</Text>
              )}
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
                <TouchableOpacity style={[s.btnPrimary, { flex: 1, opacity: trainedToday ? 0.6 : 1 }]} onPress={() => setLoggerOpen(true)}>
                  <Text style={s.btnPrimaryText}>{trainedToday ? '✅  Done Today' : '▶  Start Workout'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.btnOutline} onPress={() => onNavigate('train')}>
                  <Text style={s.btnOutlineText}>Swap</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : !routine ? (
            <TouchableOpacity style={s.generateCard} onPress={() => onNavigate('generate')}>
              <Text style={{ fontSize: 32, marginBottom: 10 }}>🤖</Text>
              <Text style={s.generateTitle}>No routine yet</Text>
              <Text style={s.generateSub}>Let AI build your personalized weekly training plan.</Text>
              <View style={s.generateBtn}><Text style={s.generateBtnText}>Generate My Plan →</Text></View>
            </TouchableOpacity>
          ) : (
            <View style={[s.card, { alignItems: 'center', paddingVertical: 28 }]}>
              <Text style={{ fontSize: 40 }}>😴</Text>
              <Text style={[s.cardTitle, { marginTop: 10 }]}>Rest Day</Text>
              <Text style={{ color: colors.gray500, fontSize: 14, marginTop: 6 }}>Recovery is part of training.</Text>
            </View>
          )}

          {/* Quick Actions */}
          <Text style={s.sectionTitle}>Quick Start</Text>
          <View style={s.grid2}>
            {[
              { label: 'Drills', emoji: '🏀', sub: 'Skill work', page: 'train' },
              { label: 'Gym', emoji: '🏋️', sub: 'Strength', page: 'train' },
              { label: 'AI Plan', emoji: '🤖', sub: 'Generate', page: 'generate' },
              { label: 'Progress', emoji: '📈', sub: 'Your stats', page: 'progress' },
            ].map(a => (
              <TouchableOpacity key={a.label} style={s.quickCard} onPress={() => onNavigate(a.page)} activeOpacity={0.7}>
                <Text style={{ fontSize: 26 }}>{a.emoji}</Text>
                <Text style={s.quickLabel}>{a.label}</Text>
                <Text style={s.quickSub}>{a.sub}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Stats */}
          <Text style={s.sectionTitle}>Stats</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
            {[
              { v: thisWeek, l: 'This Week' },
              { v: thisMonth, l: 'This Month' },
              { v: workoutLog.length, l: 'All Time' },
            ].map(s2 => (
              <View key={s2.l} style={[s.statCard, { flex: 1 }]}>
                <Text style={s.statNum}>{s2.v}</Text>
                <Text style={s.statLabel}>{s2.l}</Text>
              </View>
            ))}
          </View>

          {/* Milestone progress */}
          {nextMilestone && (
            <View style={s.card}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Text style={s.cardTitle}>Next Milestone 🏆</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ color: colors.gray500, fontSize: 13 }}>{streak.current} / {nextMilestone} day streak</Text>
                <Text style={{ color: colors.blue500, fontWeight: '700', fontSize: 13 }}>{nextMilestone - streak.current} days away</Text>
              </View>
              <View style={s.progressTrack}>
                <View style={[s.progressFill, { width: `${Math.min(100, (streak.current / nextMilestone) * 100)}%` }]} />
              </View>
            </View>
          )}

          {/* Recent */}
          {workoutLog.length > 0 && (
            <>
              <Text style={s.sectionTitle}>Recent Activity</Text>
              {workoutLog.slice(0, 4).map((w, i) => (
                <View key={i} style={[s.recentItem, { marginBottom: 8 }]}>
                  <Text style={{ fontSize: 20 }}>{w.type === 'gym' ? '🏋️' : '🏀'}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={s.recentName}>{w.name || 'Workout'}</Text>
                    <Text style={s.recentDate}>{w.date}{w.duration ? ` · ${w.duration}m` : ''}</Text>
                  </View>
                  {w.rating && <Text style={{ fontSize: 12 }}>{'⭐'.repeat(w.rating)}</Text>}
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>

      <WorkoutLogger visible={loggerOpen} type={todayWorkout?.type} workout={todayWorkout}
        onClose={() => setLoggerOpen(false)} />
    </View>
  );
}

const s = StyleSheet.create({
  hero: { backgroundColor: colors.blue500, paddingHorizontal: 20, paddingBottom: 32 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  heroGreeting: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: '500' },
  heroDay: { fontSize: 26, fontWeight: '900', color: colors.white, letterSpacing: -0.5 },
  heroBadge: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 6 },
  heroBadgeNum: { fontSize: 22, fontWeight: '900', color: colors.white },
  heroStreak: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center' },
  heroStreakLabel: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: '500' },
  heroStreakNum: { fontSize: 26, fontWeight: '900', color: colors.white, lineHeight: 32 },
  heroStreakBestLabel: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },
  heroStreakBestNum: { fontSize: 20, fontWeight: '700', color: colors.white },
  trainedTodayBadge: { backgroundColor: 'rgba(34,197,94,0.25)', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start', marginTop: 10 },
  trainedTodayText: { color: '#86EFAC', fontWeight: '600', fontSize: 13 },
  body: { padding: 20 },
  quote: { fontSize: 14, color: colors.gray500, fontStyle: 'italic', marginBottom: 20, lineHeight: 22 },
  card: { backgroundColor: colors.white, borderRadius: 16, padding: 18, marginBottom: 20, ...shadow },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  cardTitle: { fontSize: 20, fontWeight: '800', color: colors.black, marginTop: 6 },
  badgeBlue: { backgroundColor: colors.blue100, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  badgeBlueText: { fontSize: 11, color: colors.blue700, fontWeight: '600' },
  metaLabel: { fontSize: 10, color: colors.gray400, fontWeight: '600', letterSpacing: 0.5, marginBottom: 2 },
  metaValue: { fontSize: 15, fontWeight: '700', color: colors.black },
  workoutItem: { fontSize: 13, color: colors.gray500, paddingVertical: 2 },
  workoutItemMore: { fontSize: 13, color: colors.gray400, marginTop: 2 },
  btnPrimary: { backgroundColor: colors.blue500, borderRadius: 10, padding: 13, alignItems: 'center' },
  btnPrimaryText: { color: colors.white, fontWeight: '700', fontSize: 14 },
  btnOutline: { borderWidth: 1.5, borderColor: colors.gray200, borderRadius: 10, padding: 13, paddingHorizontal: 16, alignItems: 'center' },
  btnOutlineText: { color: colors.black, fontWeight: '600', fontSize: 14 },
  generateCard: { backgroundColor: colors.blue600, borderRadius: 16, padding: 22, marginBottom: 20, alignItems: 'flex-start' },
  generateTitle: { fontSize: 18, fontWeight: '700', color: colors.white },
  generateSub: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 6, marginBottom: 16 },
  generateBtn: { backgroundColor: colors.white, borderRadius: 10, paddingHorizontal: 18, paddingVertical: 10 },
  generateBtnText: { color: colors.blue600, fontWeight: '700', fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.black, marginBottom: 12 },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  quickCard: { width: '47%', backgroundColor: colors.white, borderRadius: 14, padding: 16, gap: 4, ...shadow },
  quickLabel: { fontSize: 15, fontWeight: '700', color: colors.black },
  quickSub: { fontSize: 12, color: colors.gray400 },
  statCard: { backgroundColor: colors.white, borderRadius: 12, padding: 14, alignItems: 'center', ...shadow },
  statNum: { fontSize: 28, fontWeight: '900', color: colors.black },
  statLabel: { fontSize: 11, color: colors.gray400, fontWeight: '500', marginTop: 2 },
  progressTrack: { backgroundColor: colors.gray100, borderRadius: 999, height: 8, overflow: 'hidden' },
  progressFill: { height: 8, backgroundColor: colors.blue500, borderRadius: 999 },
  recentItem: { backgroundColor: colors.white, borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, ...shadow },
  recentName: { fontWeight: '600', fontSize: 14, color: colors.black },
  recentDate: { fontSize: 12, color: colors.gray400, marginTop: 1 },
});
