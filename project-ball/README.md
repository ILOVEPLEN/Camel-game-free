# Project Ball — Basketball Training MVP

A personalized basketball training app built with Expo + React Native (iOS).

## Setup

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app installed on your iPhone (App Store)

### Install & Run

```bash
cd project-ball
npm install
npx expo start
```

Scan the QR code in Expo Go. Make sure your phone and machine are on the same Wi-Fi network.

### Run on iOS Simulator (Mac only)
```bash
npx expo start --ios
```

---

## Architecture Decisions

### Storage
All state lives in AsyncStorage (key-prefixed `pb_`). No auth, no server. Every write is immediate and local — clean extension point for a future Supabase/Firebase sync layer.

### Workout Generation (`lib/workoutGenerator.ts`)
Profile → equipment filter → goal-to-category map → pick drills per block. Volume multiplier (0.8–1.2) is injected at generation time; the generator itself is pure. Adaptive engine computes the multiplier separately from the last two RPE logs.

### Adaptive Engine (`lib/adaptiveEngine.ts`)
Two-pass scan of the last 2 logs. RPE ≥ 8 × 2 → -10% volume. RPE ≤ 4 × 2 → +10% volume. Deliberately simple — no regression, no ML. Shooting trend analysis available as a utility for future difficulty-bumping UI.

### Programs (`data/programs.ts`)
Three hardcoded programs as TypeScript (not JSON) so they can reference drill objects directly without a join. Enrollment state in AsyncStorage; home screen pulls from program schedule when enrolled, falls back to generator otherwise.

### Navigation
React Navigation v6: bottom tab navigator with two nested stacks (Today + Drills both need DrillDetail). `DrillDetail` is registered in each stack independently to keep back-button labels correct.

### No Victory Native / NativeWind in MVP
Victory Native requires additional native setup that conflicts with Expo Go's constraints. Progress charts are implemented as custom SVG-free bar/sparkline views — easy to swap for Victory Native in a bare workflow. NativeWind was similarly deferred to avoid Tailwind config complexity; StyleSheet throughout is consistent and easy to migrate.

---

## Extension Points

| Feature | Where to hook in |
|---|---|
| Auth | Wrap `App.tsx` root; replace AsyncStorage keys with user-scoped ones |
| Video | Replace `videoPlaceholder` URL in each drill object; swap `<Image>` for `<Video>` in `DrillDetailScreen` |
| Real charts | Drop Victory Native into `ProgressScreen` replacing `SimpleBarChart` / `ShootingChart` |
| Coach mode | Add a `coachId` field to `PlayerProfile` and a `CoachScreen` tab |
| Social / sharing | Workout log → shareable image via `react-native-view-shot` |
| Push notifications | Expo Notifications → daily reminder at profile-set time |

---

## Folder Structure

```
project-ball/
├── App.tsx              Root + navigation shell
├── theme/
│   ├── colors.ts        Design tokens
│   └── spacing.ts       Padding, radius, shadow constants
├── types/
│   ├── drill.ts
│   ├── profile.ts
│   ├── workout.ts
│   └── program.ts
├── data/
│   ├── drills.json      60 seed drills
│   └── programs.ts      3 structured multi-week programs
├── lib/
│   ├── storage.ts       AsyncStorage helpers
│   ├── workoutGenerator.ts
│   └── adaptiveEngine.ts
├── components/
│   ├── DrillCard.tsx
│   ├── ProgressRing.tsx  SVG ring
│   ├── WorkoutItem.tsx
│   ├── StatCard.tsx
│   └── RPESlider.tsx
└── screens/
    ├── onboarding/       5-step flow
    ├── HomeScreen.tsx    Daily session + log modal
    ├── DrillsScreen.tsx  Filterable library
    ├── DrillDetailScreen.tsx  Timer + cues
    ├── ProgramsScreen.tsx
    ├── ProgressScreen.tsx
    └── ProfileScreen.tsx
```
