import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { drills, DRILL_CATEGORIES } from '../data/drills';
import { exercises, MUSCLE_GROUPS } from '../data/exercises';
import { useApp } from '../context/AppContext';
import WorkoutLogger from '../components/WorkoutLogger';
import { colors, shadow } from '../theme';

const DIFF_BADGE = { Beginner: { bg: '#DCFCE7', text: '#16A34A' }, Intermediate: { bg: '#FEF3C7', text: '#D97706' }, Advanced: { bg: '#FEE2E2', text: '#DC2626' } };
const CAT_BADGE = { Shooting: { bg: colors.blue100, text: colors.blue700 }, Conditioning: { bg: '#FEF3C7', text: '#D97706' }, Defense: { bg: '#FEE2E2', text: '#DC2626' }, default: { bg: '#DCFCE7', text: '#16A34A' } };
const MUSCLE_EMOJI = { Chest: '🫀', Back: '💪', Shoulders: '🏋️', Arms: '💪', Legs: '🦵', Core: '⚡', Calves: '🦶' };

export default function TrainScreen() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState('drills');
  const [drillView, setDrillView] = useState(null);
  const [exerciseView, setExerciseView] = useState(null);
  const [logger, setLogger] = useState({ visible: false, type: null, id: null });

  if (drillView) return (
    <DrillDetail drill={drillView} insets={insets}
      onBack={() => setDrillView(null)}
      onStart={() => { setLogger({ visible: true, type: 'drill', drillId: drillView.id }); setDrillView(null); }}
      logger={logger} setLogger={setLogger} />
  );
  if (exerciseView) return (
    <ExerciseDetail exercise={exerciseView} insets={insets}
      onBack={() => setExerciseView(null)}
      onStart={() => { setLogger({ visible: true, type: 'gym', exerciseId: exerciseView.id }); setExerciseView(null); }}
      logger={logger} setLogger={setLogger} />
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.blue50 }}>
      <View style={[s.header, { paddingTop: insets.top + 12 }]}>
        <Text style={s.title}>Train</Text>
        <Text style={s.subtitle}>Drills & gym workouts</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 14 }}>
          {['drills', 'gym'].map(t => (
            <TouchableOpacity key={t} onPress={() => setTab(t)} activeOpacity={0.7}
              style={[s.tabBtn, tab === t && s.tabBtnActive]}>
              <Text style={[s.tabBtnText, tab === t && { color: colors.white }]}>
                {t === 'drills' ? '🏀 Drills' : '🏋️ Gym'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {tab === 'drills'
        ? <DrillsTab onSelect={setDrillView} />
        : <GymTab onSelect={setExerciseView} />
      }

      <WorkoutLogger visible={logger.visible} type={logger.type}
        drillId={logger.drillId} exerciseId={logger.exerciseId}
        onClose={() => setLogger({ visible: false, type: null })} />
    </View>
  );
}

function DrillsTab({ onSelect }) {
  const { state, toggleFavorite } = useApp();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showFavs, setShowFavs] = useState(false);

  const filtered = drills.filter(d => {
    if (showFavs && !state.favorites.includes(d.id)) return false;
    if (category !== 'All' && d.category !== category) return false;
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 20 }}>
      <TextInput value={search} onChangeText={setSearch} placeholder="Search drills..."
        placeholderTextColor={colors.gray400}
        style={s.searchInput} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}
        contentContainerStyle={{ gap: 8, paddingRight: 4 }}>
        <TouchableOpacity onPress={() => setShowFavs(!showFavs)}
          style={[s.chip, showFavs ? s.chipActive : s.chipInactive]}>
          <Text style={[s.chipText, showFavs && { color: colors.white }]}>❤️ Favs</Text>
        </TouchableOpacity>
        {DRILL_CATEGORIES.map(c => (
          <TouchableOpacity key={c} onPress={() => setCategory(c)}
            style={[s.chip, category === c ? s.chipActive : s.chipInactive]}>
            <Text style={[s.chipText, category === c && { color: colors.white }]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filtered.length === 0 ? (
        <Text style={{ textAlign: 'center', color: colors.gray400, marginTop: 40 }}>No drills found</Text>
      ) : filtered.map(drill => (
        <TouchableOpacity key={drill.id} onPress={() => onSelect(drill)} activeOpacity={0.7}
          style={[s.card, { marginBottom: 10 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                <Badge label={drill.category} style={CAT_BADGE[drill.category] || CAT_BADGE.default} />
                <Badge label={drill.difficulty} style={DIFF_BADGE[drill.difficulty]} />
              </View>
              <Text style={s.drillName}>{drill.name}</Text>
              <Text style={s.drillDesc} numberOfLines={2}>{drill.description}</Text>
              <View style={{ flexDirection: 'row', gap: 14, marginTop: 8 }}>
                <Text style={s.drillMeta}>⏱ {drill.duration} min</Text>
                {drill.equipment.length > 0 && <Text style={s.drillMeta}>🏀 {drill.equipment.join(', ')}</Text>}
              </View>
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(drill.id)} style={{ padding: 4 }}>
              <Text style={{ fontSize: 20 }}>{state.favorites.includes(drill.id) ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function GymTab({ onSelect }) {
  const [group, setGroup] = useState('All');
  const filtered = exercises.filter(e => group === 'All' || e.muscleGroup === group);
  const grouped = MUSCLE_GROUPS.filter(g => g !== 'All').reduce((acc, g) => {
    const items = filtered.filter(e => e.muscleGroup === g);
    if (items.length) acc[g] = items;
    return acc;
  }, {});

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 20 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}
        contentContainerStyle={{ gap: 8, paddingRight: 4 }}>
        {MUSCLE_GROUPS.map(g => (
          <TouchableOpacity key={g} onPress={() => setGroup(g)}
            style={[s.chip, group === g ? s.chipActive : s.chipInactive]}>
            <Text style={[s.chipText, group === g && { color: colors.white }]}>{g}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {Object.entries(grouped).map(([grp, exs]) => (
        <View key={grp} style={{ marginBottom: 20 }}>
          <Text style={s.groupTitle}>{MUSCLE_EMOJI[grp] || '💪'} {grp}</Text>
          {exs.map(ex => (
            <TouchableOpacity key={ex.id} onPress={() => onSelect(ex)} activeOpacity={0.7}
              style={[s.card, { marginBottom: 8 }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', gap: 6, marginBottom: 5, flexWrap: 'wrap' }}>
                    <Badge label={ex.difficulty} style={DIFF_BADGE[ex.difficulty]} />
                    <Badge label={ex.equipment} style={{ bg: colors.gray100, text: colors.gray500 }} />
                  </View>
                  <Text style={s.drillName}>{ex.name}</Text>
                  <Text style={s.drillMeta}>{ex.sets} sets × {ex.reps}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.gray300} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

function Badge({ label, style }) {
  return (
    <View style={{ backgroundColor: style.bg, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 }}>
      <Text style={{ fontSize: 10, fontWeight: '600', color: style.text, textTransform: 'uppercase', letterSpacing: 0.3 }}>{label}</Text>
    </View>
  );
}

function DrillDetail({ drill, insets, onBack, onStart }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.blue50 }}>
      <View style={[s.detailHero, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={onBack} style={s.backBtn}>
          <Text style={s.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
          <Badge label={drill.category} style={CAT_BADGE[drill.category] || CAT_BADGE.default} />
          <Badge label={drill.difficulty} style={DIFF_BADGE[drill.difficulty]} />
        </View>
        <Text style={s.detailTitle}>{drill.name}</Text>
        <View style={{ flexDirection: 'row', gap: 16, marginTop: 8, opacity: 0.7 }}>
          <Text style={{ color: colors.white, fontSize: 14 }}>⏱ {drill.duration} min</Text>
          {drill.equipment.length > 0 && <Text style={{ color: colors.white, fontSize: 14 }}>🏀 {drill.equipment.join(', ')}</Text>}
        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <View style={[s.card, { marginBottom: 14 }]}>
          <Text style={s.cardSectionTitle}>Overview</Text>
          <Text style={{ color: colors.gray700, fontSize: 15, lineHeight: 24 }}>{drill.description}</Text>
        </View>
        <View style={[s.card, { marginBottom: 14 }]}>
          <Text style={s.cardSectionTitle}>How To Do It</Text>
          {drill.instructions.map((inst, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 12, paddingVertical: 8, borderBottomWidth: i < drill.instructions.length - 1 ? 1 : 0, borderBottomColor: colors.gray100 }}>
              <View style={s.stepNum}><Text style={{ color: colors.blue500, fontSize: 12, fontWeight: '700' }}>{i + 1}</Text></View>
              <Text style={{ fontSize: 14, color: colors.gray700, flex: 1, lineHeight: 21 }}>{inst}</Text>
            </View>
          ))}
        </View>
        {drill.tips && (
          <View style={s.tipBox}>
            <Text style={s.tipTitle}>💡 PRO TIP</Text>
            <Text style={{ fontSize: 14, color: '#78350F', lineHeight: 21 }}>{drill.tips}</Text>
          </View>
        )}
        <TouchableOpacity style={s.btnStart} onPress={onStart}>
          <Text style={s.btnStartText}>▶  Start This Drill</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function ExerciseDetail({ exercise, insets, onBack, onStart }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.blue50 }}>
      <View style={[s.detailHero, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={onBack} style={s.backBtn}>
          <Text style={s.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
          <Badge label={exercise.muscleGroup} style={{ bg: colors.blue100, text: colors.blue700 }} />
          <Badge label={exercise.difficulty} style={DIFF_BADGE[exercise.difficulty]} />
        </View>
        <Text style={s.detailTitle}>{exercise.name}</Text>
        <View style={{ flexDirection: 'row', gap: 16, marginTop: 8, opacity: 0.7 }}>
          <Text style={{ color: colors.white, fontSize: 14 }}>📋 {exercise.sets}×{exercise.reps}</Text>
          <Text style={{ color: colors.white, fontSize: 14 }}>🏋️ {exercise.equipment}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <View style={[s.card, { marginBottom: 14 }]}>
          <Text style={s.cardSectionTitle}>Why This Exercise</Text>
          <Text style={{ color: colors.gray700, fontSize: 15, lineHeight: 24 }}>{exercise.description}</Text>
        </View>
        <View style={[s.card, { marginBottom: 14 }]}>
          <Text style={s.cardSectionTitle}>Instructions</Text>
          {exercise.instructions.map((inst, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 12, paddingVertical: 8, borderBottomWidth: i < exercise.instructions.length - 1 ? 1 : 0, borderBottomColor: colors.gray100 }}>
              <View style={s.stepNum}><Text style={{ color: colors.blue500, fontSize: 12, fontWeight: '700' }}>{i + 1}</Text></View>
              <Text style={{ fontSize: 14, color: colors.gray700, flex: 1, lineHeight: 21 }}>{inst}</Text>
            </View>
          ))}
        </View>
        {exercise.progression && (
          <View style={[s.tipBox, { backgroundColor: '#F0FDF4', borderColor: '#86EFAC' }]}>
            <Text style={[s.tipTitle, { color: '#16A34A' }]}>📈 PROGRESSION</Text>
            <Text style={{ fontSize: 14, color: '#14532D', lineHeight: 21 }}>{exercise.progression}</Text>
          </View>
        )}
        <TouchableOpacity style={s.btnStart} onPress={onStart}>
          <Text style={s.btnStartText}>▶  Log This Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  header: { backgroundColor: colors.white, paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: colors.gray100 },
  title: { fontSize: 28, fontWeight: '800', color: colors.black, letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: colors.gray500, marginTop: 4 },
  tabBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, backgroundColor: colors.gray100 },
  tabBtnActive: { backgroundColor: colors.black },
  tabBtnText: { fontSize: 14, fontWeight: '700', color: colors.gray500 },
  searchInput: { backgroundColor: colors.white, borderRadius: 12, borderWidth: 1.5, borderColor: colors.gray200, padding: 12, fontSize: 15, marginBottom: 12, color: colors.black },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, borderWidth: 1.5 },
  chipActive: { backgroundColor: colors.black, borderColor: colors.black },
  chipInactive: { backgroundColor: colors.white, borderColor: colors.gray200 },
  chipText: { fontSize: 13, fontWeight: '500', color: colors.gray500 },
  card: { backgroundColor: colors.white, borderRadius: 14, padding: 14, ...shadow },
  drillName: { fontSize: 16, fontWeight: '700', color: colors.black },
  drillDesc: { fontSize: 13, color: colors.gray500, marginTop: 4, lineHeight: 19 },
  drillMeta: { fontSize: 12, color: colors.gray400 },
  groupTitle: { fontSize: 16, fontWeight: '800', color: colors.black, marginBottom: 10 },
  detailHero: { backgroundColor: colors.black, paddingHorizontal: 20, paddingBottom: 24 },
  backBtn: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8, alignSelf: 'flex-start', marginBottom: 14 },
  backBtnText: { color: colors.white, fontSize: 14, fontWeight: '600' },
  detailTitle: { fontSize: 26, fontWeight: '900', color: colors.white, letterSpacing: -0.5 },
  cardSectionTitle: { fontSize: 15, fontWeight: '700', color: colors.black, marginBottom: 10 },
  stepNum: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.blue50, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  tipBox: { backgroundColor: '#FFFBEB', borderRadius: 14, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#FDE68A' },
  tipTitle: { fontSize: 12, fontWeight: '700', color: '#D97706', marginBottom: 6 },
  btnStart: { backgroundColor: colors.blue500, borderRadius: 12, padding: 16, alignItems: 'center' },
  btnStartText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
