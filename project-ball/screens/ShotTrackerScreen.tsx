import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
  Modal, Alert, Vibration,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useTheme } from '../theme/ThemeContext';
import { Spacing, Radius, Shadow } from '../theme/spacing';
import { Storage, ShotSession } from '../lib/storage';

type TabMode = 'counter' | 'zones' | 'camera';

interface ZoneStats { makes: number; attempts: number; }
interface ShotMark { id: string; zone: ZoneId; made: boolean; ox: number; oy: number; }

type ZoneId =
  | 'left-corner-3' | 'right-corner-3'
  | 'left-wing-3' | 'right-wing-3'
  | 'top-key-3'
  | 'left-elbow-mid' | 'right-elbow-mid'
  | 'free-throw' | 'paint';

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
  'left-wing-3', 'right-wing-3', 'top-key-3',
  'left-elbow-mid', 'right-elbow-mid',
  'free-throw', 'paint',
];

const THREE_POINT_ZONES: ZoneId[] = [
  'left-corner-3', 'right-corner-3',
  'left-wing-3', 'right-wing-3', 'top-key-3',
];

// Zone centres as fraction of mini-court (x: left→right, y: top=far from hoop → bottom=near hoop)
const ZONE_POSITIONS: Record<ZoneId, { x: number; y: number }> = {
  'left-corner-3':   { x: 0.06, y: 0.88 },
  'right-corner-3':  { x: 0.94, y: 0.88 },
  'left-wing-3':     { x: 0.10, y: 0.50 },
  'right-wing-3':    { x: 0.90, y: 0.50 },
  'top-key-3':       { x: 0.50, y: 0.10 },
  'left-elbow-mid':  { x: 0.27, y: 0.62 },
  'right-elbow-mid': { x: 0.73, y: 0.62 },
  'free-throw':      { x: 0.50, y: 0.50 },
  'paint':           { x: 0.50, y: 0.78 },
};

const COURT_W = 180;
const COURT_H = 148;

function makeEmpty(): Record<ZoneId, ZoneStats> {
  const r = {} as Record<ZoneId, ZoneStats>;
  ZONES.forEach((z) => { r[z] = { makes: 0, attempts: 0 }; });
  return r;
}

function fgPct(makes: number, attempts: number): string {
  if (attempts === 0) return '—';
  return `${Math.round((makes / attempts) * 100)}%`;
}

export default function ShotTrackerScreen() {
  const { colors, isDark } = useTheme();
  const [tab, setTab] = useState<TabMode>('counter');
  const [permission, requestPermission] = useCameraPermissions();

  // ── Quick counter ──
  const [counterMakes, setCounterMakes] = useState(0);
  const [counterAttempts, setCounterAttempts] = useState(0);
  const [history, setHistory] = useState<boolean[]>([]);

  const recordCounter = (make: boolean) => {
    Vibration.vibrate(30);
    setCounterMakes((p) => p + (make ? 1 : 0));
    setCounterAttempts((p) => p + 1);
    setHistory((p) => [...p, make]);
  };
  const undoCounter = () => {
    if (!history.length) return;
    const last = history[history.length - 1];
    setCounterMakes((p) => p - (last ? 1 : 0));
    setCounterAttempts((p) => p - 1);
    setHistory((p) => p.slice(0, -1));
  };
  const resetCounter = () => {
    if (!counterAttempts) return;
    Alert.alert('Reset Counter?', 'Session will be cleared.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: () => { setCounterMakes(0); setCounterAttempts(0); setHistory([]); } },
    ]);
  };
  const saveCounter = async () => {
    if (!counterAttempts) { Alert.alert('No shots yet', 'Hit Make or Miss first.'); return; }
    const s: ShotSession = { id: `shot-${Date.now()}`, date: new Date().toISOString().slice(0, 10), zones: makeEmpty(), totalMakes: counterMakes, totalAttempts: counterAttempts };
    await Storage.appendShotSession(s);
    Alert.alert('Saved!', `${counterMakes}/${counterAttempts} (${fgPct(counterMakes, counterAttempts)})`, [
      { text: 'OK', onPress: () => { setCounterMakes(0); setCounterAttempts(0); setHistory([]); } },
    ]);
  };

  // ── Zone tracker ──
  const [zones, setZones] = useState<Record<ZoneId, ZoneStats>>(makeEmpty());
  const [selectedZone, setSelectedZone] = useState<ZoneId | null>(null);
  const [shotModalVisible, setShotModalVisible] = useState(false);

  const openZone = (zone: ZoneId) => { setSelectedZone(zone); setShotModalVisible(true); };
  const recordZoneShot = (make: boolean) => {
    if (!selectedZone) return;
    setZones((prev) => ({
      ...prev,
      [selectedZone]: { makes: prev[selectedZone].makes + (make ? 1 : 0), attempts: prev[selectedZone].attempts + 1 },
    }));
    setShotModalVisible(false);
    setSelectedZone(null);
  };

  const totalMakes = ZONES.reduce((s, z) => s + zones[z].makes, 0);
  const totalAttempts = ZONES.reduce((s, z) => s + zones[z].attempts, 0);
  const totalThreeMakes = THREE_POINT_ZONES.reduce((s, z) => s + zones[z].makes, 0);
  const totalThreeAttempts = THREE_POINT_ZONES.reduce((s, z) => s + zones[z].attempts, 0);

  const saveZoneSession = async () => {
    if (!totalAttempts) { Alert.alert('No shots recorded', 'Log some shots first.'); return; }
    const s: ShotSession = { id: `shot-${Date.now()}`, date: new Date().toISOString().slice(0, 10), zones, totalMakes, totalAttempts };
    await Storage.appendShotSession(s);
    Alert.alert('Saved!', `${totalMakes}/${totalAttempts} (${fgPct(totalMakes, totalAttempts)})`, [
      { text: 'OK', onPress: () => setZones(makeEmpty()) },
    ]);
  };
  const resetZoneSession = () => {
    if (!totalAttempts) return;
    Alert.alert('Reset?', 'All zone data will be cleared.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: () => setZones(makeEmpty()) },
    ]);
  };

  const zoneBadge = (z: ZoneId) => { const s = zones[z]; return s.attempts === 0 ? null : `${s.makes}/${s.attempts}`; };
  const zoneColor = (z: ZoneId) => {
    const s = zones[z];
    if (!s.attempts) return colors.surface;
    const p = s.makes / s.attempts;
    if (p >= 0.5) return isDark ? '#166534' : '#DCFCE7';
    if (p >= 0.35) return isDark ? '#78350F' : '#FEF3C7';
    return isDark ? '#7F1D1D' : '#FEE2E2';
  };
  const zoneBorderColor = (z: ZoneId) => {
    const s = zones[z];
    if (!s.attempts) return colors.surfaceBorder;
    const p = s.makes / s.attempts;
    if (p >= 0.5) return colors.easy;
    if (p >= 0.35) return colors.medium;
    return colors.hard;
  };

  // ── Camera tracker ──
  const [cameraZone, setCameraZone] = useState<ZoneId>('paint');
  const [shotMarks, setShotMarks] = useState<ShotMark[]>([]);
  const [cameraMakes, setCameraMakes] = useState(0);
  const [cameraTotal, setCameraTotal] = useState(0);

  const recordCameraShot = (made: boolean) => {
    Vibration.vibrate(35);
    setCameraMakes((p) => p + (made ? 1 : 0));
    setCameraTotal((p) => p + 1);
    setShotMarks((prev) => [
      ...prev,
      { id: `m-${Date.now()}-${Math.random()}`, zone: cameraZone, made, ox: (Math.random() - 0.5) * 0.10, oy: (Math.random() - 0.5) * 0.08 },
    ]);
  };
  const resetCameraSession = () => {
    if (!cameraTotal) return;
    Alert.alert('Reset?', 'Clear all shot markers?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: () => { setCameraMakes(0); setCameraTotal(0); setShotMarks([]); } },
    ]);
  };
  const saveCameraSession = async () => {
    if (!cameraTotal) { Alert.alert('No shots yet'); return; }
    const s: ShotSession = { id: `shot-${Date.now()}`, date: new Date().toISOString().slice(0, 10), zones: makeEmpty(), totalMakes: cameraMakes, totalAttempts: cameraTotal };
    await Storage.appendShotSession(s);
    Alert.alert('Saved!', `${cameraMakes}/${cameraTotal} (${fgPct(cameraMakes, cameraTotal)})`, [
      { text: 'OK', onPress: () => { setCameraMakes(0); setCameraTotal(0); setShotMarks([]); } },
    ]);
  };

  const cameraPct = fgPct(cameraMakes, cameraTotal);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Title + Tab bar — always visible */}
      <View style={[styles.topBar, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.textDark }]}>Shot Tracker</Text>
        <View style={[styles.tabBar, { backgroundColor: colors.background, borderColor: colors.surfaceBorder }]}>
          {(['counter', 'zones', 'camera'] as TabMode[]).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tabBtn, tab === t && { backgroundColor: colors.primary }]}
              onPress={() => setTab(t)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabBtnText, { color: tab === t ? colors.white : colors.textMid }]}>
                {t === 'counter' ? '🎯 Count' : t === 'zones' ? '🗺 Zones' : '📷 Camera'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── Camera tab — full screen ── */}
      {tab === 'camera' ? (
        !permission ? (
          <View style={styles.permissionView}>
            <Text style={[styles.permissionText, { color: colors.textMid }]}>Checking camera…</Text>
          </View>
        ) : !permission.granted ? (
          <View style={styles.permissionView}>
            <Text style={styles.permissionEmoji}>📷</Text>
            <Text style={[styles.permissionTitle, { color: colors.textDark }]}>Camera Access Needed</Text>
            <Text style={[styles.permissionText, { color: colors.textMid }]}>
              Point your phone at the hoop and tap Make or Miss as you shoot.
            </Text>
            <TouchableOpacity style={[styles.permissionBtn, { backgroundColor: colors.primary }]} onPress={requestPermission} activeOpacity={0.85}>
              <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>Allow Camera</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <CameraView style={StyleSheet.absoluteFill} facing="back" />

            {/* Top stats bar */}
            <View style={styles.cameraStatsBar}>
              <View style={styles.cameraStatItem}>
                <Text style={styles.cameraCallout}>{cameraMakes} for {cameraTotal}</Text>
                <Text style={styles.cameraStatLabel}>makes · attempts</Text>
              </View>
              <View style={styles.cameraStatDivider} />
              <View style={styles.cameraStatItem}>
                <Text style={styles.cameraPctText}>{cameraPct}</Text>
                <Text style={styles.cameraStatLabel}>FG%</Text>
              </View>
            </View>

            {/* Bottom control panel */}
            <View style={styles.cameraPanel}>
              {/* Mini court + zone picker */}
              <View style={styles.cameraMidRow}>
                <MiniCourt marks={shotMarks} selectedZone={cameraZone} isDark={isDark} />
                <View style={styles.cameraZoneList}>
                  <Text style={styles.cameraZoneTitle}>ZONE</Text>
                  <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    {ZONES.map((zone) => (
                      <TouchableOpacity
                        key={zone}
                        style={[styles.cameraZoneChip, cameraZone === zone && styles.cameraZoneChipActive]}
                        onPress={() => setCameraZone(zone)}
                        activeOpacity={0.75}
                      >
                        <Text style={[styles.cameraZoneChipText, cameraZone === zone && { color: '#FFFFFF', fontWeight: '700' }]}>
                          {ZONE_LABELS[zone]}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>

              {/* Make / Miss */}
              <View style={styles.cameraBtns}>
                <TouchableOpacity style={styles.cameraMakeBtn} onPress={() => recordCameraShot(true)} activeOpacity={0.8}>
                  <Text style={styles.cameraBtnIcon}>✓</Text>
                  <Text style={styles.cameraBtnLabel}>MAKE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraMissBtn} onPress={() => recordCameraShot(false)} activeOpacity={0.8}>
                  <Text style={styles.cameraBtnIcon}>✗</Text>
                  <Text style={styles.cameraBtnLabel}>MISS</Text>
                </TouchableOpacity>
              </View>

              {/* Save / Reset */}
              <View style={styles.cameraActionRow}>
                <TouchableOpacity style={styles.cameraSaveBtn} onPress={saveCameraSession} activeOpacity={0.85}>
                  <Text style={styles.cameraSaveBtnText}>Save Session</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={resetCameraSession} style={styles.cameraResetBtn}>
                  <Text style={styles.cameraResetText}>Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      ) : (
        /* ── Counter + Zones tabs in ScrollView ── */
        <ScrollView contentContainerStyle={[styles.scroll, { gap: Spacing.md }]} showsVerticalScrollIndicator={false}>
          {tab === 'counter' ? (
            <>
              <View style={[styles.counterCard, { backgroundColor: colors.background }]}>
                <Text style={[styles.counterPct, { color: colors.primary }]}>
                  {counterAttempts === 0 ? '—' : `${Math.round((counterMakes / counterAttempts) * 100)}%`}
                </Text>
                <Text style={[styles.counterScore, { color: colors.textDark }]}>
                  {counterMakes} for {counterAttempts}
                </Text>
                <Text style={[styles.counterLabel, { color: colors.textMid }]}>makes · attempts</Text>
                {history.length > 0 && (
                  <View style={styles.historyRow}>
                    {history.slice(-20).map((made, i) => (
                      <View key={i} style={[styles.historyDot, { backgroundColor: made ? colors.easy : colors.hard }]} />
                    ))}
                    {history.length > 20 && (
                      <Text style={[styles.historyMore, { color: colors.textLight }]}>+{history.length - 20}</Text>
                    )}
                  </View>
                )}
              </View>

              <View style={styles.counterBtns}>
                <TouchableOpacity style={[styles.makeCounterBtn, { backgroundColor: colors.easy }]} onPress={() => recordCounter(true)} activeOpacity={0.8}>
                  <Text style={styles.counterBtnIcon}>✓</Text>
                  <Text style={styles.counterBtnLabel}>MAKE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.missCounterBtn, { backgroundColor: colors.hard }]} onPress={() => recordCounter(false)} activeOpacity={0.8}>
                  <Text style={styles.counterBtnIcon}>✗</Text>
                  <Text style={styles.counterBtnLabel}>MISS</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.counterActions}>
                <TouchableOpacity
                  style={[styles.counterActionBtn, { backgroundColor: colors.background, borderColor: colors.surfaceBorder }]}
                  onPress={undoCounter}
                  disabled={history.length === 0}
                >
                  <Text style={[styles.counterActionText, { color: history.length === 0 ? colors.textLight : colors.textDark }]}>↩ Undo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.counterActionBtn, { backgroundColor: colors.background, borderColor: colors.surfaceBorder }]}
                  onPress={resetCounter}
                >
                  <Text style={[styles.counterActionText, { color: colors.hard }]}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.counterActionBtn, { backgroundColor: colors.primary }]}
                  onPress={saveCounter}
                >
                  <Text style={[styles.counterActionText, { color: colors.white }]}>Save</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            /* Zones tab */
            <>
              <Text style={[{ color: colors.textMid, fontSize: 14 }]}>Tap a zone to log a shot</Text>
              <View style={[styles.court, { backgroundColor: isDark ? '#1a3a1a' : '#2d5a2d', borderColor: '#FFFFFF' }]}>
                <Text style={styles.courtLabel}>THREE POINT LINE</Text>
                <View style={styles.cornerRow}>
                  <CourtZone zone="left-corner-3" label={ZONE_LABELS['left-corner-3']} badge={zoneBadge('left-corner-3')} bgColor={zoneColor('left-corner-3')} borderColor={zoneBorderColor('left-corner-3')} onPress={() => openZone('left-corner-3')} colors={colors} />
                  <View style={styles.cornerSpacer} />
                  <CourtZone zone="right-corner-3" label={ZONE_LABELS['right-corner-3']} badge={zoneBadge('right-corner-3')} bgColor={zoneColor('right-corner-3')} borderColor={zoneBorderColor('right-corner-3')} onPress={() => openZone('right-corner-3')} colors={colors} />
                </View>
                <View style={styles.wingRow}>
                  <CourtZone zone="left-wing-3" label={ZONE_LABELS['left-wing-3']} badge={zoneBadge('left-wing-3')} bgColor={zoneColor('left-wing-3')} borderColor={zoneBorderColor('left-wing-3')} onPress={() => openZone('left-wing-3')} colors={colors} />
                  <CourtZone zone="top-key-3" label={ZONE_LABELS['top-key-3']} badge={zoneBadge('top-key-3')} bgColor={zoneColor('top-key-3')} borderColor={zoneBorderColor('top-key-3')} onPress={() => openZone('top-key-3')} colors={colors} />
                  <CourtZone zone="right-wing-3" label={ZONE_LABELS['right-wing-3']} badge={zoneBadge('right-wing-3')} bgColor={zoneColor('right-wing-3')} borderColor={zoneBorderColor('right-wing-3')} onPress={() => openZone('right-wing-3')} colors={colors} />
                </View>
                <View style={styles.elbowRow}>
                  <CourtZone zone="left-elbow-mid" label={ZONE_LABELS['left-elbow-mid']} badge={zoneBadge('left-elbow-mid')} bgColor={zoneColor('left-elbow-mid')} borderColor={zoneBorderColor('left-elbow-mid')} onPress={() => openZone('left-elbow-mid')} colors={colors} />
                  <CourtZone zone="free-throw" label={ZONE_LABELS['free-throw']} badge={zoneBadge('free-throw')} bgColor={zoneColor('free-throw')} borderColor={zoneBorderColor('free-throw')} onPress={() => openZone('free-throw')} colors={colors} />
                  <CourtZone zone="right-elbow-mid" label={ZONE_LABELS['right-elbow-mid']} badge={zoneBadge('right-elbow-mid')} bgColor={zoneColor('right-elbow-mid')} borderColor={zoneBorderColor('right-elbow-mid')} onPress={() => openZone('right-elbow-mid')} colors={colors} />
                </View>
                <View style={styles.paintRow}>
                  <CourtZone zone="paint" label="PAINT" badge={zoneBadge('paint')} bgColor={zoneColor('paint')} borderColor={zoneBorderColor('paint')} onPress={() => openZone('paint')} colors={colors} wide />
                </View>
                <View style={styles.basketArea}>
                  <View style={[styles.basketCircle, { borderColor: '#FFFFFF' }]}>
                    <Text style={styles.basketText}>🏀</Text>
                  </View>
                </View>
              </View>

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
                        <Text style={[styles.breakdownPct, { color: colors.textMid }]}>{z.makes}/{z.attempts} ({pct}%)</Text>
                      </View>
                    );
                  })}
                </View>
              )}

              <View style={styles.actionRow}>
                <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primary }]} onPress={saveZoneSession} activeOpacity={0.85}>
                  <Text style={[styles.saveBtnText, { color: colors.white }]}>Save Session</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.resetBtn, { borderColor: colors.hard }]} onPress={resetZoneSession} activeOpacity={0.85}>
                  <Text style={[styles.resetBtnText, { color: colors.hard }]}>Reset</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      )}

      {/* Zone shot modal */}
      <Modal visible={shotModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.shotModal, { backgroundColor: colors.background }]}>
            <Text style={[styles.shotModalTitle, { color: colors.textDark }]}>
              {selectedZone ? ZONE_LABELS[selectedZone] : ''}
            </Text>
            <Text style={[styles.shotModalSub, { color: colors.textMid }]}>Did it go in?</Text>
            <View style={styles.shotBtns}>
              <TouchableOpacity style={[styles.makeBtn, { backgroundColor: colors.easy }]} onPress={() => recordZoneShot(true)} activeOpacity={0.85}>
                <Text style={styles.makeBtnText}>✓ Make</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.missBtn, { backgroundColor: colors.hard }]} onPress={() => recordZoneShot(false)} activeOpacity={0.85}>
                <Text style={styles.missBtnText}>✗ Miss</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.cancelModal} onPress={() => { setShotModalVisible(false); setSelectedZone(null); }}>
              <Text style={[styles.cancelModalText, { color: colors.textMid }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ── Mini Court ──
interface MiniCourtProps {
  marks: ShotMark[];
  selectedZone: ZoneId;
  isDark: boolean;
}
function MiniCourt({ marks, selectedZone, isDark }: MiniCourtProps) {
  const selPos = ZONE_POSITIONS[selectedZone];
  return (
    <View style={[styles.miniCourt, { backgroundColor: isDark ? '#1a3a1a' : '#2d5a2d' }]}>
      {/* Selected zone indicator */}
      <View style={[styles.miniZoneHighlight, {
        left: selPos.x * COURT_W - 14,
        top: selPos.y * COURT_H - 14,
      }]} />
      {/* Basket */}
      <View style={styles.miniBasket} />
      {/* Shot marks */}
      {marks.map((mark) => {
        const pos = ZONE_POSITIONS[mark.zone];
        return (
          <Text
            key={mark.id}
            style={[
              styles.miniMark,
              {
                left: (pos.x + mark.ox) * COURT_W - 8,
                top: (pos.y + mark.oy) * COURT_H - 8,
                color: mark.made ? '#22C55E' : '#EF4444',
              },
            ]}
          >
            {mark.made ? '✓' : '✗'}
          </Text>
        );
      })}
    </View>
  );
}

// ── Court Zone Button ──
interface CourtZoneProps {
  zone: ZoneId; label: string; badge: string | null;
  bgColor: string; borderColor: string; onPress: () => void;
  colors: ReturnType<typeof useTheme>['colors']; wide?: boolean;
}
function CourtZone({ label, badge, bgColor, borderColor, onPress, wide }: CourtZoneProps) {
  return (
    <TouchableOpacity style={[styles.zone, { backgroundColor: bgColor, borderColor }, wide && styles.zoneWide]} onPress={onPress} activeOpacity={0.75}>
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
  topBar: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.sm, gap: Spacing.sm },
  title: { fontSize: 28, fontWeight: '800' },
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xxl },

  // Tab switcher
  tabBar: { flexDirection: 'row', borderRadius: Radius.full, borderWidth: 1.5, padding: 3, gap: 3 },
  tabBtn: { flex: 1, borderRadius: Radius.full, paddingVertical: 10, alignItems: 'center' },
  tabBtnText: { fontSize: 13, fontWeight: '700' },

  // Quick counter
  counterCard: { borderRadius: Radius.xl, padding: Spacing.xl, alignItems: 'center', gap: Spacing.sm, ...Shadow.sm },
  counterPct: { fontSize: 72, fontWeight: '900', lineHeight: 80 },
  counterScore: { fontSize: 28, fontWeight: '700' },
  counterLabel: { fontSize: 13, fontWeight: '500' },
  historyRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 5, marginTop: Spacing.sm, paddingHorizontal: Spacing.md },
  historyDot: { width: 12, height: 12, borderRadius: 6 },
  historyMore: { fontSize: 12, fontWeight: '600', alignSelf: 'center' },
  counterBtns: { flexDirection: 'row', gap: Spacing.md, height: 160 },
  makeCounterBtn: { flex: 1, borderRadius: Radius.xl, alignItems: 'center', justifyContent: 'center', gap: 8, ...Shadow.md },
  missCounterBtn: { flex: 1, borderRadius: Radius.xl, alignItems: 'center', justifyContent: 'center', gap: 8, ...Shadow.md },
  counterBtnIcon: { fontSize: 40, color: '#FFFFFF', fontWeight: '900' },
  counterBtnLabel: { fontSize: 20, fontWeight: '800', color: '#FFFFFF', letterSpacing: 1 },
  counterActions: { flexDirection: 'row', gap: Spacing.sm },
  counterActionBtn: { flex: 1, borderRadius: Radius.md, paddingVertical: 14, alignItems: 'center', borderWidth: 1.5 },
  counterActionText: { fontSize: 15, fontWeight: '700' },

  // Court zones
  court: { borderRadius: Radius.xl, padding: Spacing.md, gap: Spacing.sm, borderWidth: 2, overflow: 'hidden' },
  courtLabel: { textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 9, fontWeight: '700', letterSpacing: 2, marginBottom: 4 },
  cornerRow: { flexDirection: 'row', justifyContent: 'space-between' },
  cornerSpacer: { flex: 1 },
  wingRow: { flexDirection: 'row', gap: Spacing.xs },
  elbowRow: { flexDirection: 'row', gap: Spacing.xs },
  paintRow: { alignItems: 'center' },
  basketArea: { alignItems: 'center', paddingBottom: Spacing.sm },
  basketCircle: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  basketText: { fontSize: 22 },
  zone: { flex: 1, borderRadius: Radius.md, borderWidth: 1.5, paddingVertical: 14, paddingHorizontal: 4, alignItems: 'center', justifyContent: 'center', minHeight: 56, gap: 4 },
  zoneWide: { flex: undefined, width: '60%', borderRadius: Radius.md },
  zoneLabel: { fontSize: 10, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', textShadowColor: 'rgba(0,0,0,0.8)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },
  badge: { borderRadius: Radius.full, paddingHorizontal: 6, paddingVertical: 2 },
  badgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },

  // Summary
  summaryCard: { borderRadius: Radius.xl, padding: Spacing.lg, gap: Spacing.md, ...Shadow.sm },
  summaryTitle: { fontSize: 17, fontWeight: '700' },
  summaryStats: { flexDirection: 'row', alignItems: 'center' },
  statItem: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: { fontSize: 26, fontWeight: '800' },
  statLabel: { fontSize: 12, fontWeight: '500' },
  statDivider: { width: 1, height: 40 },
  breakdownCard: { borderRadius: Radius.xl, padding: Spacing.lg, gap: Spacing.md, ...Shadow.sm },
  breakdownRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  breakdownZone: { fontSize: 13, fontWeight: '600', width: 80 },
  breakdownBar: { flex: 1, height: 8, borderRadius: 4, backgroundColor: '#E5E7EB', overflow: 'hidden' },
  breakdownFill: { height: '100%', borderRadius: 4 },
  breakdownPct: { fontSize: 12, width: 90, textAlign: 'right' },
  actionRow: { flexDirection: 'row', gap: Spacing.md },
  saveBtn: { flex: 1, borderRadius: Radius.md, paddingVertical: 16, alignItems: 'center', ...Shadow.md },
  saveBtnText: { fontSize: 16, fontWeight: '700' },
  resetBtn: { borderWidth: 1.5, borderRadius: Radius.md, paddingVertical: 16, paddingHorizontal: Spacing.lg, alignItems: 'center' },
  resetBtnText: { fontSize: 16, fontWeight: '700' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  shotModal: { width: '100%', borderRadius: Radius.xl, padding: Spacing.xl, gap: Spacing.md, alignItems: 'center', ...Shadow.md },
  shotModalTitle: { fontSize: 22, fontWeight: '800' },
  shotModalSub: { fontSize: 15 },
  shotBtns: { flexDirection: 'row', gap: Spacing.md, width: '100%' },
  makeBtn: { flex: 1, borderRadius: Radius.md, paddingVertical: 20, alignItems: 'center', ...Shadow.sm },
  makeBtnText: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  missBtn: { flex: 1, borderRadius: Radius.md, paddingVertical: 20, alignItems: 'center', ...Shadow.sm },
  missBtnText: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  cancelModal: { paddingVertical: Spacing.sm },
  cancelModalText: { fontSize: 15 },

  // Permission
  permissionView: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, gap: Spacing.lg },
  permissionEmoji: { fontSize: 60 },
  permissionTitle: { fontSize: 22, fontWeight: '800', textAlign: 'center' },
  permissionText: { fontSize: 15, textAlign: 'center', lineHeight: 22 },
  permissionBtn: { borderRadius: Radius.md, paddingVertical: 16, paddingHorizontal: 32, ...Shadow.md },

  // Camera overlay
  cameraStatsBar: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.65)', paddingVertical: 14, paddingHorizontal: Spacing.lg, alignItems: 'center' },
  cameraStatItem: { flex: 1, alignItems: 'center' },
  cameraCallout: { fontSize: 26, fontWeight: '900', color: '#FFFFFF' },
  cameraStatLabel: { fontSize: 11, color: 'rgba(255,255,255,0.65)', fontWeight: '500', marginTop: 2 },
  cameraStatDivider: { width: 1, height: 44, backgroundColor: 'rgba(255,255,255,0.3)' },
  cameraPctText: { fontSize: 26, fontWeight: '900', color: '#FFFFFF' },
  cameraPanel: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.82)', paddingTop: 12, paddingHorizontal: Spacing.md, paddingBottom: 28, gap: 10 },
  cameraMidRow: { flexDirection: 'row', gap: Spacing.md, alignItems: 'flex-start' },

  // Mini court
  miniCourt: { width: COURT_W, height: COURT_H, borderRadius: Radius.md, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)' },
  miniBasket: { position: 'absolute', bottom: 6, left: COURT_W / 2 - 8, width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: 'rgba(255,255,255,0.75)' },
  miniZoneHighlight: { position: 'absolute', width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.22)', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.55)' },
  miniMark: { position: 'absolute', fontSize: 14, fontWeight: '800', textShadowColor: 'rgba(0,0,0,0.9)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },

  // Camera zone list
  cameraZoneList: { flex: 1, maxHeight: COURT_H },
  cameraZoneTitle: { color: 'rgba(255,255,255,0.55)', fontSize: 10, fontWeight: '700', marginBottom: 4, letterSpacing: 1 },
  cameraZoneChip: { paddingVertical: 5, paddingHorizontal: 8, borderRadius: 6, marginBottom: 3, backgroundColor: 'rgba(255,255,255,0.10)' },
  cameraZoneChipActive: { backgroundColor: 'rgba(59,130,246,0.85)' },
  cameraZoneChipText: { color: 'rgba(255,255,255,0.70)', fontSize: 12 },

  // Camera Make/Miss buttons
  cameraBtns: { flexDirection: 'row', gap: Spacing.sm, height: 76 },
  cameraMakeBtn: { flex: 1, backgroundColor: '#22C55E', borderRadius: Radius.xl, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, ...Shadow.md },
  cameraMissBtn: { flex: 1, backgroundColor: '#EF4444', borderRadius: Radius.xl, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, ...Shadow.md },
  cameraBtnIcon: { fontSize: 26, color: '#FFFFFF', fontWeight: '900' },
  cameraBtnLabel: { fontSize: 17, fontWeight: '800', color: '#FFFFFF', letterSpacing: 1 },
  cameraActionRow: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'center' },
  cameraSaveBtn: { flex: 1, backgroundColor: 'rgba(59,130,246,0.9)', borderRadius: Radius.md, paddingVertical: 11, alignItems: 'center' },
  cameraSaveBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  cameraResetBtn: { paddingVertical: 11, paddingHorizontal: 16 },
  cameraResetText: { color: 'rgba(255,255,255,0.50)', fontSize: 14, fontWeight: '600' },
});
