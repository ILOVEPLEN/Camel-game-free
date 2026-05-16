import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SessionDrill } from '../types/workout';
import { Colors } from '../theme/colors';
import { Spacing, Radius } from '../theme/spacing';

const BLOCK_LABELS: Record<string, string> = {
  warmup: 'Warm-Up',
  skill: 'Skill',
  conditioning: 'Conditioning',
  lift: 'Strength',
  cooldown: 'Cool-Down',
};

const BLOCK_COLORS: Record<string, string> = {
  warmup: '#FEF9C3',
  skill: Colors.accentLight,
  conditioning: '#DCFCE7',
  lift: '#EDE9FE',
  cooldown: '#F1F5F9',
};

const BLOCK_TEXT_COLORS: Record<string, string> = {
  warmup: '#92400E',
  skill: Colors.primary,
  conditioning: '#166534',
  lift: '#5B21B6',
  cooldown: Colors.textMid,
};

interface Props {
  item: SessionDrill;
  completed?: boolean;
  onPress: () => void;
  onSwap?: () => void;
}

export default function WorkoutItem({ item, completed, onPress, onSwap }: Props) {
  return (
    <TouchableOpacity style={[styles.row, completed && styles.rowDone]} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.blockTag, { backgroundColor: BLOCK_COLORS[item.block] ?? Colors.accentLight }]}>
        <Text style={[styles.blockText, { color: BLOCK_TEXT_COLORS[item.block] ?? Colors.primary }]}>
          {BLOCK_LABELS[item.block] ?? item.block}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, completed && styles.nameDone]} numberOfLines={1}>{item.drill.name}</Text>
        <Text style={styles.meta}>{item.drill.duration} min{item.targetSets ? ` · ${item.targetSets} sets` : ''}</Text>
      </View>
      {completed ? (
        <View style={styles.checkCircle}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
      ) : onSwap ? (
        <TouchableOpacity onPress={onSwap} style={styles.swapBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.swapText}>Swap</Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  rowDone: { opacity: 0.6 },
  blockTag: {
    borderRadius: Radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  blockText: { fontSize: 10, fontWeight: '700' },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: Colors.textDark },
  nameDone: { textDecorationLine: 'line-through', color: Colors.textMid },
  meta: { fontSize: 12, color: Colors.textMid, marginTop: 2 },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: { color: Colors.white, fontSize: 13, fontWeight: '800' },
  swapBtn: { paddingHorizontal: 8 },
  swapText: { fontSize: 13, color: Colors.accent, fontWeight: '600' },
});
