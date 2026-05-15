import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { drills } from '../data/drills';
import { exercises } from '../data/exercises';
import { colors, shadow } from '../theme';

const DAYS = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
const DAY_LABELS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const TIME_OPTIONS = [20, 30, 45, 60, 90];

const GOAL_OPTIONS = [
  { id: 'shooting', label: 'Improve Shooting', emoji: '🏀' },
  { id: 'handles', label: 'Ball Handling', emoji: '✋' },
  { id: 'strength', label: 'Build Strength', emoji: '💪' },
  { id: 'speed', label: 'Speed & Conditioning', emoji: '⚡' },
  { id: 'defense', label: 'Sharpen Defense', emoji: '🛡️' },
  { id: 'allaround', label: 'All-Around Game', emoji: '⭐' },
];

export function generateRoutine(profile) {
  const { goals = [], timePerDay = 45, skillLevel = 'Intermediate', gymAccess = false } = profile;
  const dMap = { Beginner: 0, Intermediate: 1, Advanced: 2 };
  const lvl = dMap[skillLevel] ?? 1;

  const getDrills = (cat, n) => drills
    .filter(d => (!cat || d.category === cat) && (dMap[d.difficulty] ?? 1) <= lvl + 1)
    .sort(() => Math.random() - 0.5).slice(0, n).map(d => d.name);

  const getExs = (grp, n) => exercises
    .filter(e => (!grp || e.muscleGroup === grp) && !(!gymAccess && ['Barbell','Cable Machine'].includes(e.equipment)) && (dMap[e.difficulty] ?? 1) <= lvl + 1)
    .sort(() => Math.random() - 0.5).slice(0, n).map(e => `${e.name} — ${e.sets}×${e.reps}`);

  const mk = (type, name, focus, items) => ({ type, name, focus, duration: timePerDay, items });
  const shooting = mk('drill','Shooting Session','Shooting', getDrills('Shooting', 3));
  const handles = mk('drill','Ball Handling Session','Ball Handling', getDrills('Ball Handling', 3));
  const defense = mk('drill','Defense Session','Defense', getDrills('Defense', 3));
  const finishing = mk('drill','Finishing Session','Finishing', getDrills('Finishing', 3));
  const conditioning = mk('drill','Conditioning Session','Conditioning', getDrills('Conditioning', 3));
  const full = mk('drill','Full Skill Session','All Skills', [...getDrills('Shooting',2),...getDrills('Ball Handling',1)]);
  const upper = mk('gym','Upper Body','Chest/Back/Shoulders', [...getExs('Chest',2),...getExs('Back',2),...getExs('Shoulders',1)]);
  const lower = mk('gym','Lower Body','Legs/Core', [...getExs('Legs',3),...getExs('Core',2)]);
  const rest = mk('rest','Rest Day','Recovery', ['Light stretching','Foam roll','Stay hydrated']);

  const h = goals.includes, s = goals.includes('strength'), g = gymAccess, sp = goals.includes('speed');

  if (s && g) return {
    monday: goals.includes('shooting') ? shooting : full,
    tuesday: upper, wednesday: goals.includes('handles') ? handles : full,
    thursday: lower, friday: goals.includes('defense') ? defense : finishing,
    saturday: sp ? conditioning : mk('gym','Full Body','Full Body',[...getExs('Chest',1),...getExs('Legs',2),...getExs('Core',1)]),
    sunday: rest,
  };
  if (sp) return { monday: goals.includes('shooting') ? shooting : full, tuesday: conditioning, wednesday: goals.includes('handles') ? handles : full, thursday: rest, friday: goals.includes('defense') ? defense : finishing, saturday: conditioning, sunday: rest };
  return {
    monday: goals.includes('shooting') || goals.includes('allaround') ? shooting : full,
    tuesday: rest,
    wednesday: goals.includes('handles') || goals.includes('allaround') ? handles : full,
    thursday: goals.includes('defense') || goals.includes('allaround') ? defense : rest,
    friday: finishing, saturday: conditioning, sunday: rest,
  };
}

export default function GenerateScreen() {
  const { state, setRoutine } = useApp();
  const insets = useSafeAreaInsets();
  const [goals, setGoals] = useState(state.profile?.goals || []);
  const [time, setTime] = useState(state.profile?.timePerDay || 45);
  const [level, setLevel] = useState(state.profile?.skillLevel || 'Intermediate');
  const [gym, setGym] = useState(state.profile?.gymAccess || false);
  const [generated, setGenerated] = useState(state.routine || null);
  const [generating, setGenerating] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const toggleGoal = id => setGoals(p => p.includes(id) ? p.filter(g => g !== id) : [...p, id]);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const r = generateRoutine({ goals, timePerDay: time, skillLevel: level, gymAccess: gym });
      setGenerated(r);
      setRoutine(r);
      setGenerating(false);
    }, 1000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.blue50 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={[s.header, { paddingTop: insets.top + 12 }]}>
          <Text style={s.title}>AI Plan</Text>
          <Text style={s.subtitle}>Generate your personalized weekly routine</Text>
        </View>

        <View style={s.body}>
          <Text style={s.sectionTitle}>Your Goals</Text>
          <View style={s.grid2}>
            {GOAL_OPTIONS.map(g => {
              const sel = goals.includes(g.id);
              return (
                <TouchableOpacity key={g.id} onPress={() => toggleGoal(g.id)} activeOpacity={0.7}
                  style={[s.goalCard, sel && s.goalCardActive]}>
                  <Text style={{ fontSize: 22 }}>{g.emoji}</Text>
                  <Text style={[s.goalLabel, sel && { color: colors.white }]}>{g.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={s.sectionTitle}>Daily Time</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 24 }}>
            {TIME_OPTIONS.map(t => (
              <TouchableOpacity key={t} onPress={() => setTime(t)} style={[s.optBtn, time === t && s.optBtnActive]}>
                <Text style={[s.optText, time === t && { color: colors.white }]}>{t}m</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={s.sectionTitle}>Skill Level</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 24 }}>
            {['Beginner','Intermediate','Advanced'].map(l => (
              <TouchableOpacity key={l} onPress={() => setLevel(l)} style={[s.optBtn, { flex: 1 }, level === l && s.optBtnActive]}>
                <Text style={[s.optText, level === l && { color: colors.white }]}>{l}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={s.sectionTitle}>Gym Access</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 28 }}>
            {[{v:true,l:'🏋️ Yes'},{v:false,l:'🏠 Home'}].map(({v,l}) => (
              <TouchableOpacity key={String(v)} onPress={() => setGym(v)} style={[s.optBtn,{flex:1}, gym===v && s.optBtnActive]}>
                <Text style={[s.optText, gym===v && {color:colors.white}]}>{l}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={[s.btnGenerate, generating && { opacity: 0.7 }]} onPress={handleGenerate} disabled={generating}>
            {generating ? (
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <ActivityIndicator color={colors.white} size="small" />
                <Text style={s.btnGenerateText}>Building your plan...</Text>
              </View>
            ) : (
              <Text style={s.btnGenerateText}>🤖  Generate My Weekly Plan</Text>
            )}
          </TouchableOpacity>

          {generated && (
            <View style={{ marginTop: 8 }}>
              <Text style={s.sectionTitle}>Your Weekly Plan</Text>
              {DAYS.map((day, i) => {
                const w = generated[day];
                if (!w) return null;
                const isOpen = expanded === day;
                const typeColor = w.type === 'gym' ? colors.purple : w.type === 'rest' ? colors.gray400 : colors.blue500;
                return (
                  <View key={day} style={[s.dayCard, { borderColor: typeColor + '33' }]}>
                    <TouchableOpacity onPress={() => setExpanded(isOpen ? null : day)} activeOpacity={0.7}
                      style={[s.dayHeader, isOpen && { backgroundColor: typeColor + '11' }]}>
                      <View style={[s.dayIcon, { backgroundColor: typeColor + '18' }]}>
                        <Text style={{ fontSize: 18 }}>{w.type==='gym'?'🏋️':w.type==='rest'?'😴':'🏀'}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={s.dayName}>{DAY_LABELS[i]}  —  {w.name}</Text>
                        <Text style={s.dayFocus}>{w.focus}{w.duration > 0 ? `  ·  ${w.duration}m` : ''}</Text>
                      </View>
                      <Text style={[s.chevron, isOpen && { transform: [{ rotate: '90deg' }] }]}>›</Text>
                    </TouchableOpacity>
                    {isOpen && w.items?.map((item, idx) => (
                      <View key={idx} style={[s.dayItem, { backgroundColor: typeColor + '08' }]}>
                        <Text style={{ color: typeColor, fontSize: 12 }}>•</Text>
                        <Text style={s.dayItemText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                );
              })}
              <View style={s.aiNote}>
                <Text style={s.aiNoteTitle}>🤖 AI NOTES</Text>
                <Text style={s.aiNoteText}>This plan balances skill work and recovery. Complete any workout to maintain your streak. Regenerate every few weeks to prevent plateaus.</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  header: { backgroundColor: colors.white, paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: colors.gray100 },
  title: { fontSize: 28, fontWeight: '800', color: colors.black, letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: colors.gray500, marginTop: 4 },
  body: { padding: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: colors.black, marginBottom: 12 },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  goalCard: { width: '47%', backgroundColor: colors.gray100, borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 2, borderColor: colors.gray200 },
  goalCardActive: { backgroundColor: colors.black, borderColor: colors.black },
  goalLabel: { fontSize: 12, fontWeight: '600', color: colors.gray700, flex: 1 },
  optBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, borderWidth: 2, borderColor: colors.gray200, backgroundColor: colors.gray100, alignItems: 'center' },
  optBtnActive: { backgroundColor: colors.black, borderColor: colors.black },
  optText: { fontSize: 13, fontWeight: '600', color: colors.gray500 },
  btnGenerate: { backgroundColor: colors.blue500, borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 4 },
  btnGenerateText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  dayCard: { borderRadius: 14, borderWidth: 1.5, marginBottom: 10, overflow: 'hidden', backgroundColor: colors.white, ...shadow },
  dayHeader: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  dayIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  dayName: { fontSize: 15, fontWeight: '700', color: colors.black },
  dayFocus: { fontSize: 12, color: colors.gray400, marginTop: 2 },
  chevron: { color: colors.gray300, fontSize: 20 },
  dayItem: { paddingHorizontal: 14, paddingVertical: 6, flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  dayItemText: { fontSize: 13, color: colors.gray700, flex: 1 },
  aiNote: { backgroundColor: colors.blue50, borderRadius: 14, padding: 16, marginTop: 8 },
  aiNoteTitle: { fontSize: 12, fontWeight: '700', color: colors.blue700, marginBottom: 6 },
  aiNoteText: { fontSize: 13, color: colors.gray700, lineHeight: 20 },
});
