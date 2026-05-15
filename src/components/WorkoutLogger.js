import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, StyleSheet, Animated } from 'react-native';
import { useApp } from '../context/AppContext';
import { drills } from '../data/drills';
import { exercises } from '../data/exercises';
import { colors, r, shadow } from '../theme';

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export default function WorkoutLogger({ visible, type, workout, drillId, exerciseId, onClose }) {
  const { completeTraining } = useApp();
  const [step, setStep] = useState('active');
  const [elapsed, setElapsed] = useState(0);
  const [restLeft, setRestLeft] = useState(90);
  const [checkedItems, setCheckedItems] = useState([]);
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(3);
  const timerRef = useRef(null);
  const restRef = useRef(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const item = drillId ? drills.find(d => d.id === drillId)
    : exerciseId ? exercises.find(e => e.id === exerciseId)
    : null;
  const items = workout?.items || (item ? [item.name] : ['Training session']);
  const sessionName = workout?.name || item?.name || 'Workout';

  useEffect(() => {
    if (visible) {
      setStep('active'); setElapsed(0); setRestLeft(90);
      setCheckedItems([]); setNotes(''); setRating(3);
      Animated.spring(slideAnim, { toValue: 1, useNativeDriver: true, tension: 65, friction: 10 }).start();
    }
  }, [visible]);

  useEffect(() => {
    if (step === 'active') {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [step]);

  const startRest = () => {
    clearInterval(timerRef.current);
    setStep('rest');
    setRestLeft(90);
    restRef.current = setInterval(() => {
      setRestLeft(r => {
        if (r <= 1) { clearInterval(restRef.current); setStep('active'); return 90; }
        return r - 1;
      });
    }, 1000);
  };

  const finish = () => {
    clearInterval(timerRef.current);
    clearInterval(restRef.current);
    completeTraining({ type: type || 'drill', name: sessionName, duration: Math.round(elapsed / 60), notes, rating, items: checkedItems });
    setStep('done');
  };

  const handleClose = () => {
    Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(onClose);
  };

  const translateY = slideAnim.interpolate({ inputRange: [0, 1], outputRange: [600, 0] });

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <TouchableOpacity style={s.overlay} activeOpacity={1} onPress={handleClose}>
        <Animated.View style={[s.sheet, { transform: [{ translateY }] }]}>
          <TouchableOpacity activeOpacity={1}>
            <View style={s.handle} />
            <ScrollView style={s.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
              {step === 'active' && (
                <ActiveView sessionName={sessionName} items={items} checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems} elapsed={elapsed} type={type}
                  item={item} onRest={startRest} onFinish={finish} />
              )}
              {step === 'rest' && (
                <RestView restLeft={restLeft} onSkip={() => { clearInterval(restRef.current); setStep('active'); }} />
              )}
              {step === 'done' && (
                <DoneView elapsed={elapsed} checkedItems={checkedItems} items={items}
                  notes={notes} setNotes={setNotes} rating={rating} setRating={setRating}
                  onClose={handleClose} />
              )}
            </ScrollView>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

function ActiveView({ sessionName, items, checkedItems, setCheckedItems, elapsed, type, item, onRest, onFinish }) {
  const allDone = items.length > 0 && checkedItems.length === items.length;
  const toggle = (i) => setCheckedItems(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <View style={{ paddingBottom: 32 }}>
      <View style={s.logHeader}>
        <View>
          <Text style={s.logType}>{type === 'gym' ? 'GYM SESSION' : 'DRILL SESSION'}</Text>
          <Text style={s.logName}>{sessionName}</Text>
        </View>
        <View style={s.timerBadge}>
          <Text style={s.timerText}>{fmt(elapsed)}</Text>
        </View>
      </View>

      {item?.instructions && (
        <View style={s.infoBox}>
          <Text style={s.infoTitle}>HOW TO DO IT</Text>
          {item.instructions.slice(0, 4).map((inst, i) => (
            <Text key={i} style={s.infoLine}>{i + 1}. {inst}</Text>
          ))}
        </View>
      )}

      <Text style={s.checklistTitle}>Checklist ({checkedItems.length}/{items.length})</Text>
      {items.map((it, i) => {
        const done = checkedItems.includes(i);
        return (
          <TouchableOpacity key={i} onPress={() => toggle(i)} activeOpacity={0.7}
            style={[s.checkItem, done && s.checkItemDone]}>
            <View style={[s.checkCircle, done && s.checkCircleDone]}>
              {done && <Text style={s.checkMark}>✓</Text>}
            </View>
            <Text style={[s.checkText, done && s.checkTextDone]}>{it}</Text>
          </TouchableOpacity>
        );
      })}

      {type === 'gym' && (
        <TouchableOpacity style={s.btnOutline} onPress={onRest}>
          <Text style={s.btnOutlineText}>⏱  Start Rest Timer (90s)</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={[s.btnPrimary, allDone && { backgroundColor: colors.success }]} onPress={onFinish}>
        <Text style={s.btnPrimaryText}>{allDone ? '✅  Complete Workout' : 'Finish Early'}</Text>
      </TouchableOpacity>
    </View>
  );
}

function RestView({ restLeft, onSkip }) {
  const pct = restLeft / 90;
  return (
    <View style={s.restContainer}>
      <Text style={s.restTitle}>Rest Time</Text>
      <View style={s.restCircleOuter}>
        <View style={[s.restCircleFill, { opacity: pct }]} />
        <View style={s.restInner}>
          <Text style={s.restNumber}>{restLeft}</Text>
          <Text style={s.restSec}>seconds</Text>
        </View>
      </View>
      <Text style={s.restHint}>Breathe. Next set coming up.</Text>
      <TouchableOpacity style={s.btnOutline} onPress={onSkip}>
        <Text style={s.btnOutlineText}>Skip Rest</Text>
      </TouchableOpacity>
    </View>
  );
}

function DoneView({ elapsed, checkedItems, items, notes, setNotes, rating, setRating, onClose }) {
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  return (
    <View style={{ paddingBottom: 40, alignItems: 'center' }}>
      <Text style={{ fontSize: 64, marginTop: 8, marginBottom: 12 }}>🔥</Text>
      <Text style={s.doneTitle}>Workout Complete!</Text>
      <Text style={s.doneSub}>{checkedItems.length}/{items.length} items · {mins}m {secs}s</Text>

      <View style={s.ratingBox}>
        <Text style={s.ratingLabel}>Rate this session</Text>
        <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', marginTop: 8 }}>
          {[1, 2, 3, 4, 5].map(r => (
            <TouchableOpacity key={r} onPress={() => setRating(r)}>
              <Text style={{ fontSize: 30, opacity: r <= rating ? 1 : 0.25 }}>⭐</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TextInput value={notes} onChangeText={setNotes}
        placeholder="Notes — how did it go?" placeholderTextColor={colors.gray400}
        multiline style={s.notesInput} />

      <TouchableOpacity style={[s.btnPrimary, { backgroundColor: colors.black, width: '100%' }]} onPress={onClose}>
        <Text style={s.btnPrimaryText}>Done 🏀</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.7)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '90%' },
  handle: { width: 40, height: 4, backgroundColor: colors.gray200, borderRadius: 2, alignSelf: 'center', marginTop: 12, marginBottom: 4 },
  content: { paddingHorizontal: 20 },
  logHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, marginTop: 8 },
  logType: { fontSize: 11, color: colors.gray400, fontWeight: '600', letterSpacing: 0.5, marginBottom: 4 },
  logName: { fontSize: 22, fontWeight: '800', color: colors.black },
  timerBadge: { backgroundColor: colors.blue500, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8 },
  timerText: { color: colors.white, fontSize: 18, fontWeight: '700', fontVariant: ['tabular-nums'] },
  infoBox: { backgroundColor: colors.blue50, borderRadius: 12, padding: 14, marginBottom: 20 },
  infoTitle: { fontSize: 11, color: colors.blue700, fontWeight: '700', letterSpacing: 0.5, marginBottom: 8 },
  infoLine: { fontSize: 13, color: colors.gray700, paddingVertical: 2, lineHeight: 19 },
  checklistTitle: { fontSize: 15, fontWeight: '700', color: colors.black, marginBottom: 10 },
  checkItem: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 12, backgroundColor: colors.gray100, marginBottom: 8, borderWidth: 1.5, borderColor: colors.gray200 },
  checkItemDone: { backgroundColor: '#F0FDF4', borderColor: '#86EFAC' },
  checkCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.gray300, alignItems: 'center', justifyContent: 'center' },
  checkCircleDone: { backgroundColor: colors.success, borderColor: colors.success },
  checkMark: { color: colors.white, fontSize: 13, fontWeight: '700' },
  checkText: { fontSize: 14, fontWeight: '500', color: colors.gray700, flex: 1 },
  checkTextDone: { color: '#16A34A', textDecorationLine: 'line-through' },
  btnPrimary: { backgroundColor: colors.blue500, borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 12 },
  btnPrimaryText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  btnOutline: { borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 12, borderWidth: 1.5, borderColor: colors.gray200 },
  btnOutlineText: { color: colors.black, fontWeight: '600', fontSize: 14 },
  restContainer: { alignItems: 'center', paddingVertical: 32, paddingBottom: 40 },
  restTitle: { fontSize: 22, fontWeight: '800', color: colors.black, marginBottom: 32 },
  restCircleOuter: { width: 160, height: 160, borderRadius: 80, borderWidth: 8, borderColor: colors.blue500, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  restCircleFill: { position: 'absolute', inset: 0, borderRadius: 80, backgroundColor: colors.blue100 },
  restInner: { alignItems: 'center' },
  restNumber: { fontSize: 48, fontWeight: '900', color: colors.black },
  restSec: { fontSize: 13, color: colors.gray400 },
  restHint: { color: colors.gray500, fontSize: 15, marginBottom: 16 },
  doneTitle: { fontSize: 26, fontWeight: '900', color: colors.black, marginBottom: 6 },
  doneSub: { color: colors.gray500, fontSize: 15, marginBottom: 24 },
  ratingBox: { backgroundColor: colors.blue50, borderRadius: 14, padding: 20, width: '100%', marginBottom: 16, alignItems: 'center' },
  ratingLabel: { fontWeight: '700', fontSize: 14, color: colors.black },
  notesInput: { width: '100%', borderRadius: 12, borderWidth: 1.5, borderColor: colors.gray200, padding: 14, fontSize: 14, minHeight: 80, textAlignVertical: 'top', marginBottom: 16, color: colors.black },
});
