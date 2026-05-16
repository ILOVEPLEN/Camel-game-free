import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Drill } from '../types/drill';
import { Colors } from '../theme/colors';
import { Spacing, Radius, Shadow } from '../theme/spacing';

const CATEGORY_LABELS: Record<string, string> = {
  shooting: 'Shooting',
  'ball-handling': 'Ball Handling',
  finishing: 'Finishing',
  footwork: 'Footwork',
  defense: 'Defense',
  conditioning: 'Conditioning',
  strength: 'Strength',
};

const DIFFICULTY_COLORS = [Colors.easy, Colors.medium, Colors.hard];
const DIFFICULTY_LABELS = ['', 'Beginner', 'Intermediate', 'Advanced'];

interface Props {
  drill: Drill;
  onPress: () => void;
  compact?: boolean;
}

export default function DrillCard({ drill, onPress, compact }: Props) {
  return (
    <TouchableOpacity style={[styles.card, compact && styles.compact]} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.top}>
        <View style={[styles.catBadge, { backgroundColor: Colors.accentLight }]}>
          <Text style={styles.catText}>{CATEGORY_LABELS[drill.category] ?? drill.category}</Text>
        </View>
        <View style={[styles.diffDot, { backgroundColor: DIFFICULTY_COLORS[drill.difficulty - 1] }]} />
      </View>
      <Text style={styles.name} numberOfLines={2}>{drill.name}</Text>
      {!compact && (
        <Text style={styles.desc} numberOfLines={2}>{drill.description}</Text>
      )}
      <View style={styles.meta}>
        <Text style={styles.metaText}>{drill.duration} min</Text>
        <Text style={styles.metaDot}>·</Text>
        <Text style={styles.metaText}>{DIFFICULTY_LABELS[drill.difficulty]}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    ...Shadow.sm,
  },
  compact: { padding: Spacing.sm },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  catBadge: {
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  catText: { fontSize: 11, fontWeight: '700', color: Colors.accent },
  diffDot: { width: 8, height: 8, borderRadius: 4 },
  name: { fontSize: 16, fontWeight: '700', color: Colors.textDark },
  desc: { fontSize: 13, color: Colors.textMid, lineHeight: 18 },
  meta: { flexDirection: 'row', gap: 6, marginTop: 2 },
  metaText: { fontSize: 12, color: Colors.textLight, fontWeight: '500' },
  metaDot: { fontSize: 12, color: Colors.textLight },
});
