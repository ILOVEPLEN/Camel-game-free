import React, { useMemo, useState } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import drillsRaw from '../data/drills.json';
import { Drill, DrillCategory } from '../types/drill';
import DrillCard from '../components/DrillCard';
import { Colors } from '../theme/colors';
import { Spacing, Radius } from '../theme/spacing';

const allDrills = drillsRaw as Drill[];

const CATEGORIES: { value: DrillCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'shooting', label: 'Shooting' },
  { value: 'ball-handling', label: 'Handles' },
  { value: 'finishing', label: 'Finishing' },
  { value: 'footwork', label: 'Footwork' },
  { value: 'defense', label: 'Defense' },
  { value: 'conditioning', label: 'Conditioning' },
  { value: 'strength', label: 'Strength' },
];

export default function DrillsScreen({ navigation }: any) {
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

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Drill Library</Text>
        <TextInput
          style={styles.search}
          placeholder="Search drills…"
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={Colors.textLight}
          clearButtonMode="while-editing"
        />

        {/* Category filters */}
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(x) => x.value}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catRow}
          renderItem={({ item }) => {
            const active = category === item.value;
            return (
              <TouchableOpacity
                style={[styles.catChip, active && styles.catChipActive]}
                onPress={() => setCategory(item.value)}
                activeOpacity={0.8}
              >
                <Text style={[styles.catChipText, active && styles.catChipTextActive]}>{item.label}</Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* Difficulty filters */}
        <View style={styles.diffRow}>
          {([1, 2, 3] as const).map((n) => {
            const labels = ['Beginner', 'Intermediate', 'Advanced'];
            const colors = [Colors.easy, Colors.medium, Colors.hard];
            const active = difficulty.includes(n);
            return (
              <TouchableOpacity
                key={n}
                style={[styles.diffChip, active && { backgroundColor: colors[n - 1], borderColor: colors[n - 1] }]}
                onPress={() => toggleDiff(n)}
                activeOpacity={0.8}
              >
                <Text style={[styles.diffChipText, active && styles.diffChipTextActive]}>{labels[n - 1]}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.count}>{filtered.length} drills</Text>

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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.surface },
  container: { flex: 1, paddingTop: Spacing.lg },
  title: { fontSize: 28, fontWeight: '800', color: Colors.textDark, paddingHorizontal: Spacing.lg, marginBottom: Spacing.md },
  search: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    fontSize: 15,
    color: Colors.textDark,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Spacing.sm,
  },
  catRow: { paddingHorizontal: Spacing.lg, gap: Spacing.sm, marginBottom: Spacing.sm },
  catChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.background,
    borderWidth: 1.5,
    borderColor: Colors.surfaceBorder,
  },
  catChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catChipText: { fontSize: 13, fontWeight: '600', color: Colors.textMid },
  catChipTextActive: { color: Colors.white },
  diffRow: { flexDirection: 'row', gap: Spacing.sm, paddingHorizontal: Spacing.lg, marginBottom: Spacing.sm },
  diffChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: Radius.full,
    backgroundColor: Colors.background,
    borderWidth: 1.5,
    borderColor: Colors.surfaceBorder,
  },
  diffChipText: { fontSize: 12, fontWeight: '600', color: Colors.textMid },
  diffChipTextActive: { color: Colors.white },
  count: { fontSize: 13, color: Colors.textLight, paddingHorizontal: Spacing.lg, marginBottom: Spacing.sm },
  list: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl },
});
