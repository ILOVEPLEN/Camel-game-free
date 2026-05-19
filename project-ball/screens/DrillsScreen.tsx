import React, { useMemo, useState } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import drillsRaw from '../data/drills.json';
import { Drill, DrillCategory } from '../types/drill';
import DrillCard from '../components/DrillCard';
import { useTheme } from '../theme/ThemeContext';
import { Spacing, Radius } from '../theme/spacing';

const allDrills = drillsRaw as Drill[];

const CATEGORIES: { value: DrillCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'shooting', label: 'Shooting' },
  { value: 'ball-handling', label: 'Ball Handling' },
  { value: 'finishing', label: 'Finishing' },
  { value: 'footwork', label: 'Footwork' },
  { value: 'defense', label: 'Defense' },
  { value: 'conditioning', label: 'Conditioning' },
  { value: 'strength', label: 'Strength' },
];

export default function DrillsScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<DrillCategory | 'all'>('all');
  const [difficulty, setDifficulty] = useState<(1 | 2 | 3)[]>([]);

  const filtered = useMemo(() => {
    return allDrills.filter((d) => {
      if (category !== 'all' && d.category !== category) return false;
      if (difficulty.length > 0 && !difficulty.includes(d.difficulty)) return false;
      if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [category, difficulty, search]);

  const toggleDiff = (n: 1 | 2 | 3) => {
    setDifficulty((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  };

  const diffColors = [colors.easy, colors.medium, colors.hard];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.textDark }]}>Drill Library</Text>
        <TextInput
          style={[
            styles.search,
            {
              backgroundColor: colors.background,
              borderColor: colors.surfaceBorder,
              color: colors.textDark,
            },
          ]}
          placeholder="Search drills…"
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={colors.textLight}
          clearButtonMode="while-editing"
        />

        {/* Category filters */}
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(x) => x.value}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catRow}
          ItemSeparatorComponent={() => <View style={{ width: Spacing.sm }} />}
          renderItem={({ item }) => {
            const active = category === item.value;
            return (
              <TouchableOpacity
                style={[
                  styles.catChip,
                  { backgroundColor: colors.background, borderColor: colors.surfaceBorder },
                  active && { backgroundColor: colors.primary, borderColor: colors.primary },
                ]}
                onPress={() => setCategory(item.value)}
                activeOpacity={0.8}
              >
                <Text style={[styles.catChipText, { color: colors.textMid }, active && { color: colors.white }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* Difficulty filters */}
        <View style={styles.diffRow}>
          {([1, 2, 3] as const).map((n) => {
            const labels = ['Beginner', 'Intermediate', 'Advanced'];
            const active = difficulty.includes(n);
            return (
              <TouchableOpacity
                key={n}
                style={[
                  styles.diffChip,
                  { backgroundColor: colors.background, borderColor: colors.surfaceBorder },
                  active && { backgroundColor: diffColors[n - 1], borderColor: diffColors[n - 1] },
                ]}
                onPress={() => toggleDiff(n)}
                activeOpacity={0.8}
              >
                <Text style={[styles.diffChipText, { color: colors.textMid }, active && { color: colors.white }]}>
                  {labels[n - 1]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.count, { color: colors.textLight }]}>{filtered.length} drills</Text>

        {filtered.length === 0 ? (
          <View style={[styles.emptyState, { backgroundColor: colors.background }]}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={[styles.emptyTitle, { color: colors.textDark }]}>No drills found</Text>
            <Text style={[styles.emptyText, { color: colors.textMid }]}>
              Try adjusting your filters or search term.
            </Text>
            <TouchableOpacity
              style={[styles.clearBtn, { backgroundColor: colors.accentLight }]}
              onPress={() => { setSearch(''); setCategory('all'); setDifficulty([]); }}
            >
              <Text style={[styles.clearBtnText, { color: colors.primary }]}>Clear Filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(d) => d.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <DrillCard
                drill={item}
                onPress={() => navigation.navigate('DrillDetail', { drill: item })}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Spacing.lg },
  title: { fontSize: 28, fontWeight: '800', paddingHorizontal: Spacing.lg, marginBottom: Spacing.md },
  search: {
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  catRow: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.sm },
  catChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.full,
    borderWidth: 1.5,
  },
  catChipText: { fontSize: 13, fontWeight: '600' },
  diffRow: { flexDirection: 'row', gap: Spacing.sm, paddingHorizontal: Spacing.lg, marginBottom: Spacing.sm },
  diffChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: Radius.full,
    borderWidth: 1.5,
  },
  diffChipText: { fontSize: 12, fontWeight: '600' },
  count: { fontSize: 13, paddingHorizontal: Spacing.lg, marginBottom: Spacing.sm },
  list: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl },
  emptyState: {
    margin: Spacing.lg,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  emptyEmoji: { fontSize: 40 },
  emptyTitle: { fontSize: 18, fontWeight: '700' },
  emptyText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  clearBtn: {
    marginTop: Spacing.sm,
    borderRadius: Radius.full,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  clearBtnText: { fontSize: 14, fontWeight: '700' },
});
