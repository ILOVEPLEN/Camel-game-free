export const MUSCLE_GROUPS = ['All', 'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Calves'];

export const exercises = [
  // CHEST
  {
    id: 'e1',
    name: 'Bench Press',
    muscleGroup: 'Chest',
    sets: 4,
    reps: '8-10',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    description: 'The king of chest exercises. Builds upper body pushing power for boxing out and physical play.',
    instructions: [
      'Lie flat on bench, grip slightly wider than shoulder-width',
      'Lower bar to mid-chest under control',
      'Press explosively to full extension',
      'Keep feet flat, back slightly arched',
      'Breathe in on the way down, out on the push'
    ],
    progression: 'Add 5 lbs when you can complete all sets with perfect form'
  },
  {
    id: 'e2',
    name: 'Push-Ups',
    muscleGroup: 'Chest',
    sets: 4,
    reps: '15-20',
    equipment: 'None',
    difficulty: 'Beginner',
    description: 'No-equipment chest staple. Perfect for home workouts and finishing sets.',
    instructions: [
      'Hands slightly wider than shoulders',
      'Body in a straight line from head to heels',
      'Lower chest to just above the floor',
      'Push explosively to the top',
      'Keep core tight throughout'
    ],
    progression: 'Progress to diamond push-ups or weighted push-ups (plate on back)'
  },
  {
    id: 'e3',
    name: 'Dumbbell Flyes',
    muscleGroup: 'Chest',
    sets: 3,
    reps: '12-15',
    equipment: 'Dumbbells',
    difficulty: 'Intermediate',
    description: 'Isolates the chest for a deep stretch and contraction. Builds chest width.',
    instructions: [
      'Lie on bench with dumbbells above chest, palms facing each other',
      'Slight bend in elbows, open arms wide in an arc',
      'Feel the stretch at the bottom',
      'Squeeze chest to bring arms back together',
      'Slow on the way down, controlled on the way up'
    ],
    progression: 'Increase weight by 5 lbs when form is perfect'
  },
  // BACK
  {
    id: 'e4',
    name: 'Pull-Ups',
    muscleGroup: 'Back',
    sets: 4,
    reps: '6-10',
    equipment: 'Pull-up Bar',
    difficulty: 'Intermediate',
    description: 'Best bodyweight back exercise. Builds the vertical jump muscles and overall athleticism.',
    instructions: [
      'Hang from bar, hands shoulder-width apart, palms away',
      'Engage lats before pulling',
      'Pull elbows to hips, chin over the bar',
      'Lower slowly under control — 3 second descent',
      'Full hang at the bottom before next rep'
    ],
    progression: 'Add a weight belt when you can do 10+ clean reps'
  },
  {
    id: 'e5',
    name: 'Bent-Over Row',
    muscleGroup: 'Back',
    sets: 4,
    reps: '10-12',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    description: 'Builds a thick, strong back essential for absorbing contact under the basket.',
    instructions: [
      'Hinge at the hips, back flat, knees slightly bent',
      'Grip barbell just outside hip width',
      'Pull bar to lower chest/upper abs',
      'Squeeze shoulder blades at the top',
      'Lower with control — don\'t just drop the weight'
    ],
    progression: 'Increase weight by 10 lbs when you complete all sets clean'
  },
  {
    id: 'e6',
    name: 'Deadlift',
    muscleGroup: 'Back',
    sets: 3,
    reps: '5-6',
    equipment: 'Barbell',
    difficulty: 'Advanced',
    description: 'The ultimate strength builder. Directly translates to jumping power and athleticism.',
    instructions: [
      'Bar over mid-foot, feet hip-width apart',
      'Hinge down, grip bar just outside legs',
      'Chest up, lats tight, take a deep breath',
      'Push floor away — don\'t pull the bar',
      'Lock out hips at top, lower with control'
    ],
    progression: 'Increase by 10-20 lbs each week during beginner phase'
  },
  // SHOULDERS
  {
    id: 'e7',
    name: 'Overhead Press',
    muscleGroup: 'Shoulders',
    sets: 4,
    reps: '8-10',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    description: 'Builds shoulder strength for shooting power and contesting shots overhead.',
    instructions: [
      'Grip bar just outside shoulders, elbows at 45 degrees',
      'Brace core, press bar straight up',
      'Move head back slightly as bar passes face',
      'Lock out overhead, bar over the back of your head',
      'Lower with control back to collarbone'
    ],
    progression: 'Add 5 lbs when you can complete all reps'
  },
  {
    id: 'e8',
    name: 'Lateral Raises',
    muscleGroup: 'Shoulders',
    sets: 3,
    reps: '15-20',
    equipment: 'Dumbbells',
    difficulty: 'Beginner',
    description: 'Builds shoulder width. Important for maintaining shooting form when fatigued.',
    instructions: [
      'Stand with dumbbells at sides',
      'Slight bend in elbows',
      'Raise arms to shoulder height in a wide arc',
      'Lead with the pinky (thumb slightly down)',
      'Lower slowly — 3 second descent'
    ],
    progression: 'Move up 5 lbs when you can do 20 clean reps'
  },
  {
    id: 'e9',
    name: 'Face Pulls',
    muscleGroup: 'Shoulders',
    sets: 3,
    reps: '15-20',
    equipment: 'Cable Machine',
    difficulty: 'Beginner',
    description: 'Protects your shoulder health for long-term shooting. Essential for all athletes.',
    instructions: [
      'Set cable at head height with rope attachment',
      'Step back, arms extended',
      'Pull rope to face, elbows flared up',
      'External rotate at the end — thumbs point behind you',
      'Squeeze rear delts, hold 1 second'
    ],
    progression: 'Light weight, high reps. This is injury prevention, not ego lifting.'
  },
  // ARMS
  {
    id: 'e10',
    name: 'Barbell Bicep Curl',
    muscleGroup: 'Arms',
    sets: 3,
    reps: '10-12',
    equipment: 'Barbell',
    difficulty: 'Beginner',
    description: 'Build bicep strength and size. Helps with rebounding and fighting through screens.',
    instructions: [
      'Stand with bar, underhand grip shoulder-width',
      'Keep elbows at sides — don\'t let them drift forward',
      'Curl bar to chin level',
      'Squeeze at the top',
      'Lower with 3-second eccentric'
    ],
    progression: 'Add 5 lbs when you can complete all reps without swinging'
  },
  {
    id: 'e11',
    name: 'Tricep Dips',
    muscleGroup: 'Arms',
    sets: 3,
    reps: '12-15',
    equipment: 'Parallel Bars',
    difficulty: 'Beginner',
    description: 'Builds the pushing strength in your triceps for a strong shooting follow-through.',
    instructions: [
      'Grip parallel bars, arms straight',
      'Lean slightly forward for chest focus',
      'Lower until shoulders are at elbow level',
      'Press back up explosively',
      'Keep elbows from flaring too wide'
    ],
    progression: 'Add weight with a belt when you can do 15+ reps'
  },
  {
    id: 'e12',
    name: 'Hammer Curls',
    muscleGroup: 'Arms',
    sets: 3,
    reps: '12-15',
    equipment: 'Dumbbells',
    difficulty: 'Beginner',
    description: 'Targets bicep and forearm. Builds grip strength critical for ball control.',
    instructions: [
      'Hold dumbbells with neutral grip (palms facing each other)',
      'Curl alternating arms, keeping palms neutral',
      'No swinging — controlled movement only',
      'Full range of motion',
      'Lower slowly'
    ],
    progression: 'Increase weight when you can do 15 clean reps each side'
  },
  // LEGS
  {
    id: 'e13',
    name: 'Back Squat',
    muscleGroup: 'Legs',
    sets: 4,
    reps: '8-10',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    description: 'The king of lower body exercises. Directly builds vertical jump and explosive first step.',
    instructions: [
      'Bar on upper traps, feet shoulder-width, toes slightly out',
      'Chest up, take a deep breath and brace',
      'Break at the hips and knees simultaneously',
      'Squat to parallel or below (knees over toes)',
      'Drive through heels to stand — explode up'
    ],
    progression: 'Add 10 lbs per week in early training'
  },
  {
    id: 'e14',
    name: 'Bulgarian Split Squat',
    muscleGroup: 'Legs',
    sets: 3,
    reps: '10-12 each',
    equipment: 'Dumbbells',
    difficulty: 'Intermediate',
    description: 'Unilateral movement that fixes imbalances and builds single-leg explosion for cuts.',
    instructions: [
      'Rear foot elevated on a bench, front foot forward',
      'Hold dumbbells at sides',
      'Lower straight down until rear knee nearly touches floor',
      'Drive through front heel to stand',
      'Don\'t let front knee cave inward'
    ],
    progression: 'Increase by 5 lbs each side when all reps are clean'
  },
  {
    id: 'e15',
    name: 'Box Jumps',
    muscleGroup: 'Legs',
    sets: 4,
    reps: '8',
    equipment: 'Plyo Box',
    difficulty: 'Intermediate',
    description: 'Explosive plyometric that directly trains your vertical jump and fast-twitch fibers.',
    instructions: [
      'Stand 1 foot in front of a 20-30" box',
      'Swing arms back, quarter squat',
      'Explode arms up and jump onto the box',
      'Land softly with bent knees',
      'Step down (don\'t jump down) and reset',
      'Rest 30s between sets for max power output'
    ],
    progression: 'Increase box height by 4-6 inches as you improve'
  },
  {
    id: 'e16',
    name: 'Romanian Deadlift',
    muscleGroup: 'Legs',
    sets: 3,
    reps: '10-12',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    description: 'Builds hamstrings and glutes. Critical for powerful jumps and injury prevention.',
    instructions: [
      'Hold bar at hips with overhand grip',
      'Hinge at the hips, pushing them back',
      'Lower bar along your shins, keeping back flat',
      'Feel hamstring stretch at the bottom',
      'Drive hips forward to stand'
    ],
    progression: 'Focus on feeling the hamstrings — don\'t round your lower back'
  },
  {
    id: 'e17',
    name: 'Lunges',
    muscleGroup: 'Legs',
    sets: 3,
    reps: '12 each leg',
    equipment: 'Dumbbells',
    difficulty: 'Beginner',
    description: 'Builds quad and glute strength with functional movement patterns for cuts and drives.',
    instructions: [
      'Stand with dumbbells at sides',
      'Step forward, lower until both knees are at 90 degrees',
      'Push off front foot to return to start',
      'Alternate legs with each step',
      'Keep torso upright throughout'
    ],
    progression: 'Add walking lunges for extra hip flexor work'
  },
  // CORE
  {
    id: 'e18',
    name: 'Plank',
    muscleGroup: 'Core',
    sets: 3,
    reps: '45-60 sec',
    equipment: 'None',
    difficulty: 'Beginner',
    description: 'Builds core stability that transfers to every movement on the court.',
    instructions: [
      'Forearms on floor, elbows under shoulders',
      'Body in a straight line from head to heels',
      'Squeeze abs, glutes, and quads all at once',
      'Breathe normally — don\'t hold your breath',
      'Don\'t let hips sag or rise'
    ],
    progression: 'Progress to RKC plank (maximum tension throughout body)'
  },
  {
    id: 'e19',
    name: 'Dead Bug',
    muscleGroup: 'Core',
    sets: 3,
    reps: '10 each side',
    equipment: 'None',
    difficulty: 'Beginner',
    description: 'The safest and most effective core stability exercise. Protects the lower back.',
    instructions: [
      'Lie on back, arms straight up, knees bent at 90 degrees',
      'Press lower back INTO the floor (keep it there!)',
      'Slowly lower right arm and left leg toward the floor',
      'Only go as low as you can maintain the back contact',
      'Return and repeat opposite side'
    ],
    progression: 'Add resistance by holding a dumbbell in the arm'
  },
  {
    id: 'e20',
    name: 'Russian Twists',
    muscleGroup: 'Core',
    sets: 3,
    reps: '20',
    equipment: 'Weight Plate',
    difficulty: 'Intermediate',
    description: 'Builds rotational core power for passing, finishing, and changing direction.',
    instructions: [
      'Sit with knees bent, feet off the floor',
      'Lean back to 45 degrees',
      'Hold weight plate with both hands',
      'Rotate side to side, touching weight to floor each side',
      'Control the movement — don\'t just throw the weight'
    ],
    progression: 'Increase plate weight or slow down the movement'
  },
  {
    id: 'e21',
    name: 'Hanging Leg Raises',
    muscleGroup: 'Core',
    sets: 3,
    reps: '10-15',
    equipment: 'Pull-up Bar',
    difficulty: 'Intermediate',
    description: 'Builds lower ab strength and hip flexor power for explosive jumping.',
    instructions: [
      'Hang from pull-up bar',
      'Keep arms straight, shoulders engaged',
      'Raise straight legs to 90 degrees (or as high as possible)',
      'Lower with control — don\'t swing',
      'Full hang at the bottom before next rep'
    ],
    progression: 'Raise legs higher than 90 degrees or hold at top'
  },
  // CALVES
  {
    id: 'e22',
    name: 'Standing Calf Raises',
    muscleGroup: 'Calves',
    sets: 4,
    reps: '20-25',
    equipment: 'None',
    difficulty: 'Beginner',
    description: 'Calves are massively important for a basketball player — every jump and sprint starts here.',
    instructions: [
      'Stand on the edge of a step, heel hanging off',
      'Rise up as high as possible on your toes',
      'Hold at the top for 1 second',
      'Lower heel below step level for a full stretch',
      'Feel the burn — high reps are key for calves'
    ],
    progression: 'Add weight (dumbbell in one hand) or do single-leg calf raises'
  },
  {
    id: 'e23',
    name: 'Seated Calf Raises',
    muscleGroup: 'Calves',
    sets: 3,
    reps: '20',
    equipment: 'Barbell',
    difficulty: 'Beginner',
    description: 'Targets the soleus (deeper calf muscle), critical for lateral stability and ankle support.',
    instructions: [
      'Sit on a bench with barbell across thighs',
      'Feet flat on floor or on a raised surface',
      'Rise up on toes as high as possible',
      'Pause at top, squeeze',
      'Lower with control to full stretch'
    ],
    progression: 'Increase weight when 20 reps feel easy'
  },
  {
    id: 'e24',
    name: 'Jump Rope Calf Circuit',
    muscleGroup: 'Calves',
    sets: 3,
    reps: '3 min',
    equipment: 'Jump Rope',
    difficulty: 'Beginner',
    description: 'Builds calf endurance and tendon strength needed for a full game of basketball.',
    instructions: [
      '1 min: basic bounce (both feet, stay on toes)',
      '30 sec: single leg right',
      '30 sec: single leg left',
      '1 min: fast feet (barely leaving the ground)',
      'Rest 1 minute between sets'
    ],
    progression: 'Increase duration or add double-unders'
  }
];
