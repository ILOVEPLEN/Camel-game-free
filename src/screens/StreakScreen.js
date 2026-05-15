import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { colors, shadow } from '../theme';

const MILESTONES = [
  { days: 7, emoji: '🔥', label: '1 Week', reward: "You're building a habit!" },
  { days: 30, emoji: '💪', label: '1 Month', reward: 'Real commitment unlocked.' },
  { days: 50, emoji: '⚡', label: '50 Days', reward: "You're on another level." },
  { days: 100, emoji: '🏆', label: '100 Days', reward: 'Elite dedication.' },
  { days: 365, emoji: '👑', label: '1 Year', reward: 'Legendary status.' },
];

const DAY_LETTERS = ['S','M','T','W','T','F','S'];

function getLast35Days() {
  return Array.from({ length: 35 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (34 - i)); return d.toDateString();
  });
}

export default function StreakScreen() {
  const { state, useStreakFreeze } = useApp();
  const { streak } = state;
  const insets = useSafeAreaInsets();
  const [freezeConfirm, setFreezeConfirm] = useState(false);

  const trainedToday = streak.lastTrainedDate === new Date().toDateString();
  const days35 = getLast35Days();
  const firstDay = new Date(days35[0]).getDay();
  const padded = [...Array(firstDay).fill(null), ...days35];
  const nextMilestone = MILESTONES.find(m => m.days > streak.current);
  const loggedDays = Object.keys(streak.history || {}).length;

  const handleFreeze = () => {
    if (freezeConfirm) { useStreakFreeze(); setFreezeConfirm(false); }
    else setFreezeConfirm(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.blue50 }}>
      {/* Hero */}
      <View style={[s.hero, { paddingTop: insets.top + 8 }]}>
        <Text style={{ fontSize: 56, textAlign: 'center', lineHeight: 64 }}>🔥</Text>
        <Text style={s.heroNum}>{streak.current}</Text>
        <Text style={s.heroSub}>day streak</Text>
        {trainedToday && (
          <View style={s.trainedBadge}>
            <Text style={s.trainedBadgeText}>✅  Trained today!</Text>
          </View>
        )}
        <View style={s.heroStats}>
          {[
            { v: streak.longest, l: 'Best streak' },
            { v: streak.freezesAvailable, l: 'Freezes left' },
            { v: loggedDays, l: 'Days logged' },
          ].map((item, i) => (
            <React.Fragment key={item.l}>
              {i > 0 && <View style={s.heroStatDivider} />}
              <View style={s.heroStat}>
                <Text style={s.heroStatNum}>{item.v}</Text>
                <Text style={s.heroStatLabel}>{item.l}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Calendar */}
        <Text style={s.sectionTitle}>Activity Calendar</Text>
        <View style={[s.card, { marginBottom: 20 }]}>
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            {DAY_LETTERS.map((d, i) => (
              <Text key={i} style={{ flex: 1, textAlign: 'center', fontSize: 11, color: colors.gray400, fontWeight: '600' }}>{d}</Text>
            ))}
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {padded.map((d, i) => {
              if (!d) return <View key={`p-${i}`} style={{ width: '14.28%', aspectRatio: 1 }} />;
              const entry = (streak.history || {})[d];
              const isToday = d === new Date().toDateString();
              const bg = entry === 'freeze' ? colors.warning
                : entry === 'gym' ? colors.purple
                : entry ? colors.blue500
                : colors.gray100;
              return (
                <View key={d} style={{ width: '14.28%', aspectRatio: 1, padding: 1.5 }}>
                  <View style={{ flex: 1, borderRadius: 4, backgroundColor: bg, borderWidth: isToday ? 2 : 0, borderColor: colors.blue500, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 9, color: entry ? colors.white : colors.gray400, fontWeight: isToday ? '700' : '400' }}>
                      {new Date(d).getDate()}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 10, flexWrap: 'wrap' }}>
            {[[colors.blue500,'Trained'],[colors.purple,'Gym'],[colors.warning,'Freeze'],[colors.gray100,'Rest']].map(([c, l]) => (
              <View key={l} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <View style={{ width: 10, height: 10, backgroundColor: c, borderRadius: 2 }} />
                <Text style={{ fontSize: 10, color: colors.gray400 }}>{l}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Next milestone */}
        {nextMilestone && (
          <>
            <Text style={s.sectionTitle}>Next Milestone</Text>
            <View style={[s.card, { marginBottom: 20 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                <Text style={{ fontSize: 36 }}>{nextMilestone.emoji}</Text>
                <View>
                  <Text style={{ fontSize: 18, fontWeight: '800', color: colors.black }}>{nextMilestone.label} Streak</Text>
                  <Text style={{ fontSize: 14, color: colors.gray500 }}>{nextMilestone.reward}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ color: colors.gray500, fontSize: 13 }}>{streak.current} / {nextMilestone.days} days</Text>
                <Text style={{ color: colors.blue500, fontWeight: '700', fontSize: 13 }}>{nextMilestone.days - streak.current} to go</Text>
              </View>
              <View style={{ backgroundColor: colors.gray100, borderRadius: 999, height: 10, overflow: 'hidden' }}>
                <View style={{ width: `${Math.min(100,(streak.current/nextMilestone.days)*100)}%`, height: 10, backgroundColor: colors.blue500, borderRadius: 999 }} />
              </View>
            </View>
          </>
        )}

        {/* All milestones */}
        <Text style={s.sectionTitle}>All Milestones</Text>
        {MILESTONES.map(m => {
          const reached = streak.current >= m.days;
          return (
            <View key={m.days} style={[s.milestoneRow, reached && s.milestoneRowEarned]}>
              <Text style={{ fontSize: 28, opacity: reached ? 1 : 0.3 }}>{m.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '700', fontSize: 15, color: colors.black }}>{m.label}</Text>
                <Text style={{ fontSize: 12, color: colors.gray400 }}>{m.reward}</Text>
              </View>
              <Text style={{ fontWeight: '700', fontSize: 14, color: reached ? colors.success : colors.gray300 }}>
                {reached ? '✓ Done' : `${m.days}d`}
              </Text>
            </View>
          );
        })}

        {/* Streak Freeze */}
        <Text style={[s.sectionTitle, { marginTop: 24 }]}>Streak Freeze</Text>
        <View style={s.card}>
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 14 }}>
            <Text style={{ fontSize: 36 }}>🧊</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '700', fontSize: 16, color: colors.black }}>Streak Freeze</Text>
              <Text style={{ fontSize: 13, color: colors.gray500, marginTop: 4, lineHeight: 20 }}>
                Protect your streak when life gets busy.{' '}
                <Text style={{ color: colors.blue500, fontWeight: '700' }}>{streak.freezesAvailable} freeze{streak.freezesAvailable !== 1 ? 's' : ''}</Text>
                {' '}available.
              </Text>
            </View>
          </View>
          {trainedToday ? (
            <View style={s.alreadyDoneBox}>
              <Text style={{ color: '#16A34A', fontWeight: '600', fontSize: 13 }}>✅ Already trained today!</Text>
            </View>
          ) : streak.freezesAvailable > 0 ? (
            <TouchableOpacity style={[s.freezeBtn, freezeConfirm && s.freezeBtnConfirm]} onPress={handleFreeze}>
              <Text style={[s.freezeBtnText, freezeConfirm && { color: colors.danger }]}>
                {freezeConfirm ? '⚠️  Confirm — Use Freeze?' : '🧊  Use Streak Freeze Today'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={s.noFreezeBox}>
              <Text style={{ color: colors.danger, fontWeight: '600', fontSize: 13 }}>No freezes remaining this month.</Text>
            </View>
          )}
        </View>

        {/* Tips */}
        <View style={s.tipsBox}>
          <Text style={s.tipsTitle}>🔥 STREAK TIPS</Text>
          {[
            'Even a 10-min drill session counts — consistency beats perfection.',
            'Set a daily reminder at the same time each day.',
            'The longer the streak, the more you want to protect it.',
            'Rest days are scheduled in — no guilt needed.',
          ].map((tip, i) => (
            <Text key={i} style={s.tipItem}>• {tip}</Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  hero: { backgroundColor: colors.black, paddingHorizontal: 20, paddingBottom: 28, alignItems: 'center' },
  heroNum: { fontSize: 80, fontWeight: '900', color: colors.white, lineHeight: 88, letterSpacing: -2 },
  heroSub: { fontSize: 20, fontWeight: '600', color: 'rgba(255,255,255,0.6)', marginTop: 2, marginBottom: 12 },
  trainedBadge: { backgroundColor: 'rgba(34,197,94,0.2)', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 6, marginBottom: 16 },
  trainedBadgeText: { color: '#86EFAC', fontWeight: '600', fontSize: 14 },
  heroStats: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 20, gap: 24, alignItems: 'center' },
  heroStat: { alignItems: 'center', flex: 1 },
  heroStatNum: { fontSize: 24, fontWeight: '800', color: colors.white },
  heroStatLabel: { fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  heroStatDivider: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.15)' },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: colors.black, marginBottom: 12 },
  card: { backgroundColor: colors.white, borderRadius: 16, padding: 18, marginBottom: 20, ...shadow },
  milestoneRow: { backgroundColor: colors.white, borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 8, opacity: 0.4, borderWidth: 2, borderColor: 'transparent', ...shadow },
  milestoneRowEarned: { opacity: 1, borderColor: colors.blue500 },
  alreadyDoneBox: { backgroundColor: '#F0FDF4', borderRadius: 10, padding: 12, alignItems: 'center' },
  freezeBtn: { borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1.5, borderColor: colors.gray200 },
  freezeBtnConfirm: { borderColor: colors.danger },
  freezeBtnText: { fontWeight: '600', fontSize: 14, color: colors.black },
  noFreezeBox: { backgroundColor: '#FEF2F2', borderRadius: 10, padding: 12, alignItems: 'center' },
  tipsBox: { backgroundColor: colors.blue50, borderRadius: 16, padding: 18 },
  tipsTitle: { fontSize: 12, fontWeight: '700', color: colors.blue700, marginBottom: 10 },
  tipItem: { fontSize: 13, color: colors.gray700, lineHeight: 22 },
});
