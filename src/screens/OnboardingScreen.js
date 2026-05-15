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

const TIME_OPTIONS = [20, 30, 45, 60, 90];

export default function OnboardingScreen() {
  const { setProfile, setRoutine } = useApp();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [goals, setGoals] = useState([]);
  const [time, setTime] = useState(45);
  const [level, setLevel] = useState('Intermediate');
  const [gym, setGym] = useState(false);

  const toggleGoal = id => setGoals(p => p.includes(id) ? p.filter(g => g !== id) : [...p, id]);

  const finish = () => {
    const profile = { goals, timePerDay: time, skillLevel: level, gymAccess: gym, equipment: [] };
    setProfile(profile);
    setRoutine(generateRoutine(profile));
  };

  const Steps = [WelcomeStep, GoalsStep, SetupStep, ReadyStep];
  const StepComponent = Steps[step];

  return (
    <View style={[s.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 24 }]}>
      {/* Progress dots */}
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

function SetupStep({ time, setTime, level, setLevel, gym, setGym, onNext }) {
  return (
    <ScrollView contentContainerStyle={s.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={s.stepTitle}>Quick setup</Text>
      <Text style={s.stepSub}>Tell us about your situation.</Text>

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

      <TouchableOpacity style={[s.btnBlue, { marginTop: 24 }]} onPress={onNext}>
        <Text style={s.btnBlueText}>Continue →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function ReadyStep({ onFinish }) {
  return (
    <ScrollView contentContainerStyle={[s.stepContent, { alignItems: 'center', textAlign: 'center' }]} showsVerticalScrollIndicator={false}>
      <Text style={{ fontSize: 72, marginTop: 24, marginBottom: 20 }}>🚀</Text>
      <Text style={s.stepTitle}>You're all set!</Text>
      <Text style={[s.stepSub, { textAlign: 'center' }]}>Your AI-personalized routine is ready. Train daily to build your streak.</Text>
      <View style={s.readySummary}>
        {['📅 7-day personalized routine', '🏀 Drills matched to your goals', '🔥 Daily streak tracking', '📈 Progress dashboard', '🏆 Achievement badges'].map((item, i) => (
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
  stepSub: { fontSize: 15, color: colors.gray500, marginTop: 6, marginBottom: 24 },
  sectionLabel: { fontSize: 14, fontWeight: '700', color: colors.black, marginBottom: 10, marginTop: 4 },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  goalCard: { width: '47%', backgroundColor: colors.gray100, borderRadius: 14, padding: 18, alignItems: 'center', gap: 8, borderWidth: 2, borderColor: colors.gray200 },
  goalCardActive: { backgroundColor: colors.black, borderColor: colors.black },
  goalLabel: { fontSize: 13, fontWeight: '600', color: colors.gray700, textAlign: 'center' },
  row: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  optionBtn: { paddingVertical: 12, paddingHorizontal: 8, borderRadius: 12, borderWidth: 2, borderColor: colors.gray200, backgroundColor: colors.gray100, alignItems: 'center' },
  optionBtnActive: { backgroundColor: colors.black, borderColor: colors.black },
  optionText: { fontSize: 13, fontWeight: '600', color: colors.gray500 },
  readySummary: { backgroundColor: colors.blue50, borderRadius: 16, padding: 20, width: '100%', marginTop: 28, marginBottom: 32, gap: 10 },
  readyItem: { fontSize: 15, color: colors.gray700 },
  btnBlack: { backgroundColor: colors.black, borderRadius: 14, padding: 18, alignItems: 'center', width: '100%' },
  btnBlackText: { color: colors.white, fontWeight: '700', fontSize: 17 },
  btnBlue: { backgroundColor: colors.blue500, borderRadius: 14, padding: 16, alignItems: 'center', width: '100%' },
  btnBlueText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
