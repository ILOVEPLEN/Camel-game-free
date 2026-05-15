import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { generateRoutine } from './GenerateScreen';
import { colors } from '../theme';

const GOAL_OPTIONS = [
  { id: 'shooting', label: 'Improve Shooting', emoji: '🏀' },
  { id: 'handles', label: 'Ball Handling', emoji: '✋' },
  { id: 'strength', label: 'Build Strength', emoji: '💪' },
  { id: 'speed', label: 'Speed & Conditioning', emoji: '⚡' },
  { id: 'defense', label: 'Sharpen Defense', emoji: '🛡️' },
  { id: 'allaround', label: 'All-Around Game', emoji: '⭐' },
];

const AGE_GROUPS = [
  { id: 'u12',  label: 'Under 12',   emoji: '🌱' },
  { id: '13-15', label: '13 – 15',   emoji: '📈' },
  { id: '16-18', label: '16 – 18',   emoji: '🔥' },
  { id: '19-22', label: '19 – 22',   emoji: '💪' },
  { id: '23+',  label: '23 and over', emoji: '🏆' },
];

const WEEK_DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

export default function OnboardingScreen() {
  const { setProfile, setRoutine } = useApp();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [goals, setGoals] = useState([]);
  const [time, setTime] = useState(45);
  const [level, setLevel] = useState('Intermediate');
  const [gym, setGym] = useState(false);
  const [ageGroup, setAgeGroup] = useState('');
  const [gameDays, setGameDays] = useState([]);

  const toggleGoal = id => setGoals(p => p.includes(id) ? p.filter(g => g !== id) : [...p, id]);
  const toggleGameDay = d => setGameDays(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d]);

  const finish = () => {
    const profile = { goals, timePerDay: time, skillLevel: level, gymAccess: gym, equipment: [], ageGroup, gameDays };
    setProfile(profile);
    setRoutine(generateRoutine(profile));
  };

  const Steps = [WelcomeStep, GoalsStep, SetupStep, ScheduleStep, ReadyStep];
  const StepComponent = Steps[step];

  return (
    <View style={[s.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 24 }]}>
      <View style={s.dots}>
        {Steps.map((_, i) => (
          <View key={i} style={[s.dot, { width: i === step ? 24 : 8, backgroundColor: i <= step ? colors.blue500 : colors.gray200 }]} />
        ))}
      </View>

      <StepComponent
        goals={goals} onToggleGoal={toggleGoal}
        time={time} setTime={setTime}
        level={level} setLevel={setLevel}
        gym={gym} setGym={setGym}
        ageGroup={ageGroup} setAgeGroup={setAgeGroup}
        gameDays={gameDays} onToggleGameDay={toggleGameDay}
        onNext={() => setStep(s => s + 1)}
        onFinish={finish}
      />
    </View>
  );
}

function WelcomeStep({ onNext }) {
  return (
    <ScrollView contentContainerStyle={s.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={{ fontSize: 80, textAlign: 'center', marginTop: 20 }}>🏀</Text>
      <Text style={s.welcomeTitle}>Project Ball</Text>
      <Text style={s.welcomeSub}>Your personal basketball training system. Build skills, track progress, never miss a day.</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 32, marginBottom: 40 }}>
        {['Drill Library', 'AI Routines', 'Streak Tracking', 'Gym Workouts'].map(f => (
          <View key={f} style={s.featureChip}><Text style={s.featureChipText}>{f}</Text></View>
        ))}
      </View>
      <TouchableOpacity style={s.btnBlack} onPress={onNext}>
        <Text style={s.btnBlackText}>Let's Get Started →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function GoalsStep({ goals, onToggleGoal, onNext }) {
  return (
    <ScrollView contentContainerStyle={s.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={s.stepTitle}>What's your focus?</Text>
      <Text style={s.stepSub}>Select all that apply.</Text>
      <View style={s.grid2}>
        {GOAL_OPTIONS.map(g => {
          const sel = goals.includes(g.id);
          return (
            <TouchableOpacity key={g.id} onPress={() => onToggleGoal(g.id)} activeOpacity={0.7}
              style={[s.goalCard, sel && s.goalCardActive]}>
              <Text style={{ fontSize: 28 }}>{g.emoji}</Text>
              <Text style={[s.goalLabel, sel && { color: colors.white }]}>{g.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity style={[s.btnBlue, goals.length === 0 && { opacity: 0.4 }]} onPress={onNext} disabled={goals.length === 0}>
        <Text style={s.btnBlueText}>Continue →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function SetupStep({ time, setTime, level, setLevel, gym, setGym, ageGroup, setAgeGroup, onNext }) {
  const TIME_OPTIONS = [20, 30, 45, 60, 90];
  return (
    <ScrollView contentContainerStyle={s.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={s.stepTitle}>About you</Text>
      <Text style={s.stepSub}>Quick setup so we can personalise your plan.</Text>

      <Text style={s.sectionLabel}>How old are you?</Text>
      <View style={{ gap: 8, marginBottom: 20 }}>
        {AGE_GROUPS.map(a => (
          <TouchableOpacity key={a.id} onPress={() => setAgeGroup(a.id)}
            style={[s.rowBtn, ageGroup === a.id && s.rowBtnActive]}>
            <Text style={{ fontSize: 20 }}>{a.emoji}</Text>
            <Text style={[s.rowBtnText, ageGroup === a.id && { color: colors.white }]}>{a.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.sectionLabel}>Daily training time</Text>
      <View style={s.row}>
        {TIME_OPTIONS.map(t => (
          <TouchableOpacity key={t} onPress={() => setTime(t)} style={[s.optionBtn, time === t && s.optionBtnActive]}>
            <Text style={[s.optionText, time === t && { color: colors.white }]}>{t}m</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.sectionLabel}>Skill level</Text>
      <View style={s.row}>
        {['Beginner', 'Intermediate', 'Advanced'].map(l => (
          <TouchableOpacity key={l} onPress={() => setLevel(l)} style={[s.optionBtn, { flex: 1 }, level === l && s.optionBtnActive]}>
            <Text style={[s.optionText, level === l && { color: colors.white }]}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.sectionLabel}>Gym access?</Text>
      <View style={s.row}>
        {[{ v: true, label: '🏋️ Yes' }, { v: false, label: '🏠 No gym' }].map(({ v, label }) => (
          <TouchableOpacity key={String(v)} onPress={() => setGym(v)} style={[s.optionBtn, { flex: 1 }, gym === v && s.optionBtnActive]}>
            <Text style={[s.optionText, gym === v && { color: colors.white }]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={[s.btnBlue, { marginTop: 8, opacity: !ageGroup ? 0.4 : 1 }]} onPress={onNext} disabled={!ageGroup}>
        <Text style={s.btnBlueText}>Continue →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function ScheduleStep({ gameDays, onToggleGameDay, onNext }) {
  return (
    <ScrollView contentContainerStyle={s.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={s.stepTitle}>Game days</Text>
      <Text style={s.stepSub}>Which days do you usually play games? We'll keep those light so you're fresh to compete.</Text>
      <Text style={[s.stepSub, { fontSize: 13, color: colors.gray400, marginTop: -12 }]}>Skip if you don't play in a league.</Text>

      <View style={{ gap: 8, marginBottom: 24 }}>
        {WEEK_DAYS.map(day => {
          const sel = gameDays.includes(day);
          return (
            <TouchableOpacity key={day} onPress={() => onToggleGameDay(day)} activeOpacity={0.7}
              style={[s.rowBtn, sel && s.rowBtnActive, { justifyContent: 'space-between' }]}>
              <Text style={[s.rowBtnText, sel && { color: colors.white }]}>{day}</Text>
              {sel && <Text style={{ fontSize: 18 }}>🏀</Text>}
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={s.btnBlue} onPress={onNext}>
        <Text style={s.btnBlueText}>{gameDays.length === 0 ? 'Skip →' : 'Continue →'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function ReadyStep({ onFinish }) {
  return (
    <ScrollView contentContainerStyle={[s.stepContent, { alignItems: 'center' }]} showsVerticalScrollIndicator={false}>
      <Text style={{ fontSize: 72, marginTop: 24, marginBottom: 20 }}>🚀</Text>
      <Text style={s.stepTitle}>You're all set!</Text>
      <Text style={[s.stepSub, { textAlign: 'center' }]}>Your personalised routine is ready. Game days are blocked off. Train daily and build that streak.</Text>
      <View style={s.readySummary}>
        {['📅 7-day personalised routine', '🏀 Drills matched to your goals', '🎮 Game days kept light', '🔥 Daily streak tracking', '🏆 Achievement badges'].map((item, i) => (
          <Text key={i} style={s.readyItem}>{item}</Text>
        ))}
      </View>
      <TouchableOpacity style={s.btnBlack} onPress={onFinish}>
        <Text style={s.btnBlackText}>Start Training 🏀</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, paddingVertical: 12 },
  dot: { height: 8, borderRadius: 4 },
  stepContent: { paddingHorizontal: 24, paddingBottom: 40, flexGrow: 1 },
  welcomeTitle: { fontSize: 38, fontWeight: '900', color: colors.black, textAlign: 'center', letterSpacing: -1, marginTop: 16 },
  welcomeSub: { fontSize: 17, color: colors.gray500, textAlign: 'center', marginTop: 14, lineHeight: 26 },
  featureChip: { backgroundColor: colors.gray100, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 7 },
  featureChipText: { fontSize: 13, fontWeight: '500', color: colors.gray700 },
  stepTitle: { fontSize: 26, fontWeight: '800', color: colors.black, marginTop: 8 },
  stepSub: { fontSize: 15, color: colors.gray500, marginTop: 6, marginBottom: 20 },
  sectionLabel: { fontSize: 14, fontWeight: '700', color: colors.black, marginBottom: 10 },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  goalCard: { width: '47%', backgroundColor: colors.gray100, borderRadius: 14, padding: 18, alignItems: 'center', gap: 8, borderWidth: 2, borderColor: colors.gray200 },
  goalCardActive: { backgroundColor: colors.black, borderColor: colors.black },
  goalLabel: { fontSize: 13, fontWeight: '600', color: colors.gray700, textAlign: 'center' },
  row: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  optionBtn: { flex: 1, paddingVertical: 12, paddingHorizontal: 8, borderRadius: 12, borderWidth: 2, borderColor: colors.gray200, backgroundColor: colors.gray100, alignItems: 'center' },
  optionBtnActive: { backgroundColor: colors.black, borderColor: colors.black },
  optionText: { fontSize: 13, fontWeight: '600', color: colors.gray500 },
  rowBtn: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, borderWidth: 2, borderColor: colors.gray200, backgroundColor: colors.gray100 },
  rowBtnActive: { backgroundColor: colors.black, borderColor: colors.black },
  rowBtnText: { fontSize: 15, fontWeight: '600', color: colors.gray700 },
  readySummary: { backgroundColor: colors.blue50, borderRadius: 16, padding: 20, width: '100%', marginTop: 28, marginBottom: 32, gap: 10 },
  readyItem: { fontSize: 15, color: colors.gray700 },
  btnBlack: { backgroundColor: colors.black, borderRadius: 14, padding: 18, alignItems: 'center', width: '100%' },
  btnBlackText: { color: colors.white, fontWeight: '700', fontSize: 17 },
  btnBlue: { backgroundColor: colors.blue500, borderRadius: 14, padding: 16, alignItems: 'center', width: '100%' },
  btnBlueText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
