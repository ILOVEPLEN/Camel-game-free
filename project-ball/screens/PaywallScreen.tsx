import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../theme/ThemeContext';
import { useSubscription } from '../context/SubscriptionContext';
import { setProUser } from '../lib/subscriptions';
import { Spacing, Radius, Shadow } from '../theme/spacing';

type Plan = 'monthly' | 'yearly';

const FEATURES = [
  { icon: '📷', text: 'Camera shot tracker with live court map' },
  { icon: '📅', text: 'All 3 training programs' },
  { icon: '📊', text: 'Full shot history & analytics' },
  { icon: '🏀', text: '109+ drills across all positions' },
  { icon: '🔥', text: 'Streak tracking & performance insights' },
  { icon: '⚡', text: 'Adaptive workouts that grow with you' },
];

export default function PaywallScreen() {
  const { isDark } = useTheme();
  const { hidePaywall, refreshPro } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<Plan>('yearly');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      // TODO: Replace with RevenueCat purchase flow:
      // import Purchases from 'react-native-purchases';
      // const offerings = await Purchases.getOfferings();
      // const pkg = selectedPlan === 'yearly'
      //   ? offerings.current?.annual
      //   : offerings.current?.monthly;
      // if (pkg) await Purchases.purchasePackage(pkg);

      // Dev simulation — activates pro immediately
      await setProUser(true);
      await refreshPro();
      hidePaywall();
      Alert.alert('Welcome to Pro! 🏆', 'Your 7-day free trial has started. Enjoy all features.');
    } catch {
      Alert.alert('Purchase failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    // TODO: Purchases.restorePurchases()
    Alert.alert('Restore Purchases', 'No previous purchases found.');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />

      {/* Close button */}
      <TouchableOpacity style={styles.closeBtn} onPress={hidePaywall} activeOpacity={0.7}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroIcon}>🏆</Text>
          <View style={styles.titleRow}>
            <Text style={styles.heroTitle}>Project Ball</Text>
            <View style={styles.proBadge}>
              <Text style={styles.proBadgeText}>PRO</Text>
            </View>
          </View>
          <Text style={styles.heroSub}>Train smarter. Shoot better.</Text>
          <View style={styles.trialBadge}>
            <Text style={styles.trialText}>🎁 7-Day Free Trial — No charge today</Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresCard}>
          {FEATURES.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </View>

        {/* Pricing cards */}
        <View style={styles.plansRow}>
          <TouchableOpacity
            style={[styles.planCard, selectedPlan === 'monthly' && styles.planCardSelected]}
            onPress={() => setSelectedPlan('monthly')}
            activeOpacity={0.85}
          >
            <Text style={styles.planName}>Monthly</Text>
            <Text style={styles.planPrice}>$5.99</Text>
            <Text style={styles.planPer}>per month</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.planCard, styles.planCardBest, selectedPlan === 'yearly' && styles.planCardSelected]}
            onPress={() => setSelectedPlan('yearly')}
            activeOpacity={0.85}
          >
            <View style={styles.bestBadge}>
              <Text style={styles.bestBadgeText}>BEST VALUE</Text>
            </View>
            <Text style={styles.planName}>Yearly</Text>
            <Text style={styles.planPrice}>$49</Text>
            <Text style={styles.planPer}>per year</Text>
            <Text style={styles.planSaving}>Save 32%</Text>
          </TouchableOpacity>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={[styles.ctaBtn, loading && { opacity: 0.7 }]}
          onPress={handleSubscribe}
          activeOpacity={0.85}
          disabled={loading}
        >
          <Text style={styles.ctaText}>
            {loading ? 'Starting trial…' : 'Start Free Trial'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.legalText}>
          {selectedPlan === 'yearly'
            ? 'After 7 days, $49.00/year. '
            : 'After 7 days, $5.99/month. '}
          Auto-renews. Cancel anytime in Settings.
        </Text>

        <TouchableOpacity onPress={handleRestore} style={styles.restoreBtn}>
          <Text style={styles.restoreText}>Restore Purchases</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F172A' },
  closeBtn: {
    position: 'absolute', top: 56, right: Spacing.lg,
    zIndex: 10, width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xxl, gap: Spacing.lg },

  // Hero
  hero: { alignItems: 'center', gap: Spacing.sm, paddingTop: Spacing.xl },
  heroIcon: { fontSize: 56 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  heroTitle: { fontSize: 32, fontWeight: '900', color: '#FFFFFF' },
  proBadge: {
    backgroundColor: '#F59E0B', borderRadius: Radius.sm,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  proBadgeText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900', letterSpacing: 1 },
  heroSub: { fontSize: 16, color: 'rgba(255,255,255,0.65)', fontWeight: '500' },
  trialBadge: {
    backgroundColor: 'rgba(34,197,94,0.2)', borderRadius: Radius.full,
    borderWidth: 1, borderColor: 'rgba(34,197,94,0.5)',
    paddingHorizontal: 16, paddingVertical: 8, marginTop: 4,
  },
  trialText: { color: '#22C55E', fontSize: 14, fontWeight: '700' },

  // Features
  featuresCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: Radius.xl, padding: Spacing.lg, gap: Spacing.md,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  featureIcon: { fontSize: 22, width: 30 },
  featureText: { flex: 1, color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: '500' },

  // Plans
  plansRow: { flexDirection: 'row', gap: Spacing.md },
  planCard: {
    flex: 1, borderRadius: Radius.xl, padding: Spacing.lg,
    alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.12)',
  },
  planCardBest: { backgroundColor: 'rgba(59,130,246,0.15)', borderColor: 'rgba(59,130,246,0.4)' },
  planCardSelected: { borderColor: '#3B82F6', backgroundColor: 'rgba(59,130,246,0.25)' },
  bestBadge: {
    backgroundColor: '#3B82F6', borderRadius: Radius.full,
    paddingHorizontal: 8, paddingVertical: 3, marginBottom: 4,
  },
  bestBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  planName: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '600' },
  planPrice: { color: '#FFFFFF', fontSize: 30, fontWeight: '900' },
  planPer: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  planSaving: { color: '#22C55E', fontSize: 13, fontWeight: '700', marginTop: 2 },

  // CTA
  ctaBtn: {
    backgroundColor: '#3B82F6', borderRadius: Radius.xl,
    paddingVertical: 18, alignItems: 'center', ...Shadow.md,
  },
  ctaText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  legalText: {
    color: 'rgba(255,255,255,0.35)', fontSize: 12,
    textAlign: 'center', lineHeight: 18,
  },
  restoreBtn: { alignItems: 'center', paddingVertical: Spacing.sm },
  restoreText: { color: 'rgba(255,255,255,0.45)', fontSize: 14, textDecorationLine: 'underline' },
});
