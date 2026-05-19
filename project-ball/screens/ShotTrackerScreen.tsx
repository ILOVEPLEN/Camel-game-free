import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
  Modal, Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../theme/ThemeContext';
import { Spacing, Radius, Shadow } from '../theme/spacing';
import { Storage, ShotSession } from '../lib/storage';

interface ZoneStats {
  makes: number;
  attempts: number;
}

type ZoneId =
  | 'left-corner-3'
  | 'right-corner-3'
  | 'left-wing-3'
  | 'right-wing-3'
  | 'top-key-3'
  | 'left-elbow-mid'
  | 'right-elbow-mid'
  | 'free-throw'
  | 'paint';

const ZONE_LABELS: Record<ZoneId, string> = {
  'left-corner-3': 'L Corner 3',
  'right-corner-3': 'R Corner 3',
  'left-wing-3': 'L Wing 3',
  'right-wing-3': 'R Wing 3',
  'top-key-3': 'Top Key 3',
  'left-elbow-mid': 'L Elbow',
  'right-elbow-mid': 'R Elbow',
  'free-throw': 'Free Throw',
  'paint': 'Paint',
};

const ZONES: ZoneId[] = [
  'left-corner-3', 'right-corner-3',
  'left-wing-3', 'right-wing-3',
  'top-key-3',
  'left-elbow-mid', 'right-elbow-mid',
  'free-throw',
  'paint',
];

function makeEmpty(): Record<ZoneId, ZoneStats> {
  const result = {} as Record<ZoneId, ZoneStats>;
  ZONES.forEach((z) => { result[z] = { makes: 0, attempts: 0 }; });
  return result;
}

function fgPct(makes: number, attempts: number): string {
  if (attempts === 0) return '—';
  return `${Math.round((makes / attempts) * 100)}%`;
}

const THREE_POINT_ZONES: ZoneId[] = [
  'left-corner-3', 'right-corner-3',
  'left-wing-3', 'right-wing-3',
  'top-key-3',
];

export default function ShotTrackerScreen() {
  const { colors, isDark } = useTheme();
  const [zones, setZones] = useState<Record<ZoneId, ZoneStats>>(makeEmpty());
  const [selectedZone, setSelectedZone] = useState<ZoneId | null>(null);
  const [shotModalVisible, setShotModalVisible] = useState(false);

  const openZone = (zone: ZoneId) => {
    setSelectedZone(zone);
    setShotModalVisible(true);
  };

  const recordShot = (make: boolean) => {
    if (!selectedZone) return;
    setZones((prev) => ({
      ...prev,
      [selectedZone]: {
        makes: prev[selectedZone].makes + (make ? 1 : 0),
        attempts: prev[selectedZone].attempts + 1,
      },
    }));
    setShotModalVisible(false);
    setSelectedZone(null);
  };

  const totalMakes = ZONES.reduce((s, z) => s + zones[z].makes, 0);
  const totalAttempts = ZONES.reduce((s, z) => s + zones[z].attempts, 0);
  const totalThreeMakes = THREE_POINT_ZONES.reduce((s, z) => s + zones[z].makes, 0);
  const totalThreeAttempts = THREE_POINT_ZONES.reduce((s, z) => s + zones[z].attempts, 0);

  const saveSession = async () => {
    if (totalAttempts === 0) {
      Alert.alert('No shots recorded', 'Take some shots before saving the session.');
      return;
    }
    const session: ShotSession = {
      id: `shot-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      zones,
      totalMakes,
      totalAttempts,
    };
    await Storage.appendShotSession(session);
    Alert.alert('Session Saved!', `${totalMakes}/${totalAttempts} (${fgPct(totalMakes, totalAttempts)}) — great work!`, [
      { text: 'OK', onPress: () => setZones(makeEmpty()) },
    ]);
  };

  const resetSession = () => {
    if (totalAttempts === 0) return;
    Alert.alert('Reset Session?', 'All shot data for this session will be cleared.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: () => setZones(makeEmpty()) },
    ]);
  };

  const zoneBadge = (zone: ZoneId) => {
    const z = zones[zone];
    if (z.attempts === 0) return null;
    return `${z.makes}/${z.attempts}`;
  };

  const zoneColor = (zone: ZoneId): string => {
    const z = zones[zone];
    if (z.attempts === 0) return colors.surface;
    const pct = z.makes / z.attempts;
    if (pct >= 0.5) return isDark ? '#166534' : '#DCFCE7';
    if (pct >= 0.35) return isDark ? '#78350F' : '#FEF3C7';
    return isDark ? '#7F1D1D' : '#FEE2E2';
  };

  const zoneBorderColor = (zone: ZoneId): string => {
    const z = zones[zone];
    if (z.attempts === 0) return colors.surfaceBorder;
    const pct = z.makes / z.attempts;
    if (pct >= 0.5) return colors.easy;
    if (pct >= 0.35) return colors.medium;
    return colors.hard;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={[styles.scroll, { gap: Spacing.md }]} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: colors.textDark }]}>Shot Tracker</Text>
        <Text style={[styles.subtitle, { color: colors.textMid }]}>Tap a zone to log a shot</Text>

        {/* Half-Court Layout */}
        <View style={[styles.court, { backgroundColor: isDark ? '#1a3a1a' : '#2d5a2d', borderColor: '#FFFFFF' }]}>
          {/* Three-point arc label */}
          <Text style={styles.courtLabel}>THREE POINT LINE</Text>

          {/* Corner 3s */}
          <View style={styles.cornerRow}>
            <CourtZone
              zone="left-corner-3"
              label={ZONE_LABELS['left-corner-3']}
              badge={zoneBadge('left-corner-3')}
              bgColor={zoneColor('left-corner-3')}
              borderColor={zoneBorderColor('left-corner-3')}
              onPress={() => openZone('left-corner-3')}
              colors={colors}
            />
            <View style={styles.cornerSpacer} />
            <CourtZone
              zone="right-corner-3"
              label={ZONE_LABELS['right-corner-3']}
              badge={zoneBadge('right-corner-3')}
              bgColor={zoneColor('right-corner-3')}
              borderColor={zoneBorderColor('right-corner-3')}
              onPress={() => openZone('right-corner-3')}
              colors={colors}
            />
          </View>

          {/* Wing 3s */}
          <View style={styles.wingRow}>
            <CourtZone
              zone="left-wing-3"
              label={ZONE_LABELS['left-wing-3']}
              badge={zoneBadge('left-wing-3')}
              bgColor={zoneColor('left-wing-3')}
              borderColor={zoneBorderColor('left-wing-3')}
              onPress={() => openZone('left-wing-3')}
              colors={colors}
            />
            <CourtZone
              zone="top-key-3"
              label={ZONE_LABELS['top-key-3']}
              badge={zoneBadge('top-key-3')}
              bgColor={zoneColor('top-key-3')}
              borderColor={zoneBorderColor('top-key-3')}
              onPress={() => openZone('top-key-3')}
              colors={colors}
            />
            <CourtZone
              zone="right-wing-3"
              label={ZONE_LABELS['right-wing-3']}
              badge={zoneBadge('right-wing-3')}
              bgColor={zoneColor('right-wing-3')}
              borderColor={zoneBorderColor('right-wing-3')}
              onPress={() => openZone('right-wing-3')}
              colors={colors}
            />
          </View>

          {/* Mid-range */}
          <View style={styles.elbowRow}>
            <CourtZone
              zone="left-elbow-mid"
              label={ZONE_LABELS['left-elbow-mid']}
              badge={zoneBadge('left-elbow-mid')}
              bgColor={zoneColor('left-elbow-mid')}
              borderColor={zoneBorderColor('left-elbow-mid')}
              onPress={() => openZone('left-elbow-mid')}
              colors={colors}
            />
            <CourtZone
              zone="free-throw"
              label={ZONE_LABELS['free-throw']}
              badge={zoneBadge('free-throw')}
              bgColor={zoneColor('free-throw')}
              borderColor={zoneBorderColor('free-throw')}
              onPress={() => openZone('free-throw')}
              colors={colors}
            />
            <CourtZone
              zone="right-elbow-mid"
              label={ZONE_LABELS['right-elbow-mid']}
              badge={zoneBadge('right-elbow-mid')}
              bgColor={zoneColor('right-elbow-mid')}
              borderColor={zoneBorderColor('right-elbow-mid')}
              onPress={() => openZone('right-elbow-mid')}
              colors={colors}
            />
          </View>

          {/* Paint */}
          <View style={styles.paintRow}>
            <CourtZone
              zone="paint"
              label="PAINT"
              badge={zoneBadge('paint')}
              bgColor={zoneColor('paint')}
              borderColor={zoneBorderColor('paint')}
              onPress={() => openZone('paint')}
              colors={colors}
              wide
            />
          </View>

          {/* Basket indicator */}
          <View style={styles.basketArea}>
            <View style={[styles.basketCircle, { borderColor: '#FFFFFF' }]}>
              <Text style={styles.basketText}>🏀</Text>
            </View>
          </View>
        </View>

        {/* Session Summary */}
        <View style={[styles.summaryCard, { backgroundColor: colors.background }]}>
          <Text style={[styles.summaryTitle, { color: colors.textDark }]}>Session Summary</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{fgPct(totalMakes, totalAttempts)}</Text>
              <Text style={[styles.statLabel, { color: colors.textMid }]}>FG%</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.surfaceBorder }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{fgPct(totalThreeMakes, totalThreeAttempts)}</Text>
              <Text style={[styles.statLabel, { color: colors.textMid }]}>3P%</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.surfaceBorder }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{totalMakes}/{totalAttempts}</Text>
              <Text style={[styles.statLabel, { color: colors.textMid }]}>Makes/Att</Text>
            </View>
          </View>
        </View>

        {/* Per-zone breakdown */}
        {totalAttempts > 0 && (
          <View style={[styles.breakdownCard, { backgroundColor: colors.background }]}>
            <Text style={[styles.summaryTitle, { color: colors.textDark }]}>Zone Breakdown</Text>
            {ZONES.filter((z) => zones[z].attempts > 0).map((zone) => {
              const z = zones[zone];
              const pct = z.attempts > 0 ? Math.round((z.makes / z.attempts) * 100) : 0;
              const barColor = pct >= 50 ? colors.easy : pct >= 35 ? colors.medium : colors.hard;
              return (
                <View key={zone} style={styles.breakdownRow}>
                  <Text style={[styles.breakdownZone, { color: colors.textDark }]}>{ZONE_LABELS[zone]}</Text>
                  <View style={styles.breakdownBar}>
                    <View style={[styles.breakdownFill, { width: `${pct}%`, backgroundColor: barColor }]} />
                  </View>
                  <Text style={[styles.breakdownPct, { color: colors.textMid }]}>
                    {z.makes}/{z.attempts} ({pct}%)
                  </Text>
                </View>
              );
            })}
          </View>
        )}

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: colors.primary }]}
            onPress={saveSession}
            activeOpacity={0.85}
          >
            <Text style={[styles.saveBtnText, { color: colors.white }]}>Save Session</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.resetBtn, { borderColor: colors.hard }]}
            onPress={resetSession}
            activeOpacity={0.85}
          >
            <Text style={[styles.resetBtnText, { color: colors.hard }]}>Reset</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Shot Modal */}
      <Modal visible={shotModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.shotModal, { backgroundColor: colors.background }]}>
            <Text style={[styles.shotModalTitle, { color: colors.textDark }]}>
              {selectedZone ? ZONE_LABELS[selectedZone] : ''}
            </Text>
            <Text style={[styles.shotModalSub, { color: colors.textMid }]}>Did it go in?</Text>
            <View style={styles.shotBtns}>
              <TouchableOpacity
                style={[styles.makeBtn, { backgroundColor: colors.easy }]}
                onPress={() => recordShot(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.makeBtnText}>✓ Make</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.missBtn, { backgroundColor: colors.hard }]}
                onPress={() => recordShot(false)}
                activeOpacity={0.85}
              >
                <Text style={styles.missBtnText}>✗ Miss</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.cancelModal}
              onPress={() => { setShotModalVisible(false); setSelectedZone(null); }}
            >
              <Text style={[styles.cancelModalText, { color: colors.textMid }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

interface CourtZoneProps {
  zone: ZoneId;
  label: string;
  badge: string | null;
  bgColor: string;
  borderColor: string;
  onPress: () => void;
  colors: ReturnType<typeof useTheme>['colors'];
  wide?: boolean;
}

function CourtZone({ label, badge, bgColor, borderColor, onPress, colors, wide }: CourtZoneProps) {
  return (
    <TouchableOpacity
      style={[
        styles.zone,
        { backgroundColor: bgColor, borderColor },
        wide && styles.zoneWide,
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={styles.zoneLabel} numberOfLines={2}>{label}</Text>
      {badge && (
        <View style={[styles.badge, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 14 },

  // Court
  court: {
    borderRadius: Radius.xl,
    padding: Spacing.md,
    gap: Spacing.sm,
    borderWidth: 2,
    overflow: 'hidden',
  },
  courtLabel: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 4,
  },
  cornerRow: { flexDirection: 'row', justifyContent: 'space-between' },
  cornerSpacer: { flex: 1 },
  wingRow: { flexDirection: 'row', gap: Spacing.xs },
  elbowRow: { flexDirection: 'row', gap: Spacing.xs },
  paintRow: { alignItems: 'center' },
  basketArea: { alignItems: 'center', paddingBottom: Spacing.sm },
  basketCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  basketText: { fontSize: 22 },

  zone: {
    flex: 1,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    paddingVertical: 14,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    gap: 4,
  },
  zoneWide: { flex: undefined, width: '60%', borderRadius: Radius.md },
  zoneLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  badge: {
    borderRadius: Radius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },

  // Summary
  summaryCard: {
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  summaryTitle: { fontSize: 17, fontWeight: '700' },
  summaryStats: { flexDirection: 'row', alignItems: 'center' },
  statItem: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: { fontSize: 26, fontWeight: '800' },
  statLabel: { fontSize: 12, fontWeight: '500' },
  statDivider: { width: 1, height: 40 },

  // Breakdown
  breakdownCard: {
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  breakdownRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  breakdownZone: { fontSize: 13, fontWeight: '600', width: 80 },
  breakdownBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  breakdownFill: { height: '100%', borderRadius: 4 },
  breakdownPct: { fontSize: 12, width: 90, textAlign: 'right' },

  // Action buttons
  actionRow: { flexDirection: 'row', gap: Spacing.md },
  saveBtn: {
    flex: 1,
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    ...Shadow.md,
  },
  saveBtnText: { fontSize: 16, fontWeight: '700' },
  resetBtn: {
    borderWidth: 1.5,
    borderRadius: Radius.md,
    paddingVertical: 16,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  resetBtnText: { fontSize: 16, fontWeight: '700' },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  shotModal: {
    width: '100%',
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    gap: Spacing.md,
    alignItems: 'center',
    ...Shadow.md,
  },
  shotModalTitle: { fontSize: 22, fontWeight: '800' },
  shotModalSub: { fontSize: 15 },
  shotBtns: { flexDirection: 'row', gap: Spacing.md, width: '100%' },
  makeBtn: {
    flex: 1,
    borderRadius: Radius.md,
    paddingVertical: 20,
    alignItems: 'center',
    ...Shadow.sm,
  },
  makeBtnText: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  missBtn: {
    flex: 1,
    borderRadius: Radius.md,
    paddingVertical: 20,
    alignItems: 'center',
    ...Shadow.sm,
  },
  missBtnText: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  cancelModal: { paddingVertical: Spacing.sm },
  cancelModalText: { fontSize: 15 },
});
