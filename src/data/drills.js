export const DRILL_CATEGORIES = ['All', 'Shooting', 'Ball Handling', 'Defense', 'Finishing', 'Conditioning'];

export const drills = [
  // SHOOTING
  {
    id: 'd1',
    name: 'Free Throw Routine',
    category: 'Shooting',
    duration: 15,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Build a consistent free throw routine with proper form and mental focus.',
    instructions: [
      'Stand at the free throw line, feet shoulder-width apart',
      'Bounce the ball 2-3 times for consistency',
      'Bend knees slightly, align elbow under the ball',
      'Focus on a spot on the back of the rim',
      'Follow through with wrist snap — hold the finish',
      'Shoot 10 sets of 10 free throws with 30s rest between sets'
    ],
    tips: 'Track your percentage each session. A 70%+ rate is solid for beginners.'
  },
  {
    id: 'd2',
    name: 'Spot Shooting',
    category: 'Shooting',
    duration: 20,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Shoot from 5 spots around the arc to build shooting consistency from all angles.',
    instructions: [
      'Mark 5 spots: both corners, both wings, and top of the key',
      'Shoot 10 shots from each spot',
      'Focus on consistent footwork and catch-and-shoot rhythm',
      'Track makes from each spot',
      'Repeat for 2-3 rounds'
    ],
    tips: 'Move with a purpose — simulate coming off a screen to each spot.'
  },
  {
    id: 'd3',
    name: 'Form Shooting Close Range',
    category: 'Shooting',
    duration: 10,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Perfect your shooting mechanics from 3-5 feet to build muscle memory.',
    instructions: [
      'Stand 3 feet directly in front of the basket',
      'One-hand shooting: use only your shooting hand',
      'Focus on wrist snap and backspin',
      'Make 10 consecutive shots, then step back a foot',
      'Work up to 8-10 feet from the basket'
    ],
    tips: 'This drill isolates your shooting hand — no guide hand until full shot.'
  },
  {
    id: 'd4',
    name: '3-Point Shooting Circuit',
    category: 'Shooting',
    duration: 25,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop'],
    description: 'Build confidence and consistency from behind the arc with this circuit drill.',
    instructions: [
      'Start at corner 3, shoot until you make 3 in a row',
      'Move to the wing, repeat',
      'Move to the top of the key, repeat',
      'Move to the opposite wing, repeat',
      'Finish at the opposite corner',
      'Complete 2-3 full circuits'
    ],
    tips: 'Use game-speed footwork — catch, set, shoot in one fluid motion.'
  },
  {
    id: 'd5',
    name: 'Mid-Range Pull-Up',
    category: 'Shooting',
    duration: 15,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop'],
    description: 'Develop a reliable pull-up jumper from mid-range off the dribble.',
    instructions: [
      'Start at half court with the ball',
      'Drive to the elbow (free throw line extended)',
      'Two-dribble pull-up with proper footwork',
      'Focus on stopping under control',
      'Shoot 5 from each elbow, then alternate',
      'Work on both left and right side approaches'
    ],
    tips: 'The elbow is one of the most efficient shots in basketball.'
  },
  // BALL HANDLING
  {
    id: 'd6',
    name: 'Stationary Dribbling Series',
    category: 'Ball Handling',
    duration: 10,
    difficulty: 'Beginner',
    equipment: ['Basketball'],
    description: 'Master ball control with a series of stationary dribbling patterns.',
    instructions: [
      '1 minute: low hard dribble with dominant hand',
      '1 minute: low hard dribble with weak hand',
      '1 minute: alternating pounds (right, left, right...)',
      '1 minute: crossover at knee level',
      '1 minute: between-the-legs alternating',
      '1 minute: behind-the-back dribble',
      'Keep head up throughout!'
    ],
    tips: 'Keep the ball below the waist. Dribble with fingertips, not your palm.'
  },
  {
    id: 'd7',
    name: 'Figure-8 Dribble',
    category: 'Ball Handling',
    duration: 10,
    difficulty: 'Beginner',
    equipment: ['Basketball'],
    description: 'Weave the ball in a figure-8 pattern through your legs to improve hand coordination.',
    instructions: [
      'Stand with feet wider than shoulder-width, knees bent',
      'Dribble ball through right leg from front to back',
      'Transfer to left hand behind right leg',
      'Bring ball to front left, dribble through left leg',
      'Complete the figure-8 pattern',
      'Do 30 seconds forward, 30 seconds reverse',
      'Repeat 5 times'
    ],
    tips: 'Start slow. Speed will naturally increase with repetition.'
  },
  {
    id: 'd8',
    name: 'Two-Ball Dribbling',
    category: 'Ball Handling',
    duration: 15,
    difficulty: 'Intermediate',
    equipment: ['2 Basketballs'],
    description: 'Dribble two balls simultaneously to build independent hand coordination.',
    instructions: [
      '2 min: simultaneous dribble (both balls bounce together)',
      '2 min: alternating dribble (one up, one down)',
      '2 min: one low fast dribble + one crossover',
      '2 min: walk forward while dribbling both balls',
      '2 min: crossovers with both balls simultaneously'
    ],
    tips: 'This is hard at first — it trains each hand to work independently.'
  },
  {
    id: 'd9',
    name: 'Speed Dribble & Stop',
    category: 'Ball Handling',
    duration: 15,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Cones'],
    description: 'Develop attacking speed and the ability to stop on a dime.',
    instructions: [
      'Set cones at half court and 3-point line',
      'Explosive speed dribble from baseline to half court',
      'Jump stop at half court (two-foot landing)',
      'Turn and drive toward 3-point line, jump stop',
      'Continue to baseline, jump stop',
      'Perform 10 reps each direction'
    ],
    tips: 'The jump stop sets you up for any next move. Master it.'
  },
  {
    id: 'd10',
    name: 'Cone Dribbling Slalom',
    category: 'Ball Handling',
    duration: 20,
    difficulty: 'Advanced',
    equipment: ['Basketball', 'Cones'],
    description: 'Navigate a slalom course to simulate live game ball-handling at speed.',
    instructions: [
      'Set 6 cones in a line, 3 feet apart',
      'Weave through cones using crossover dribble',
      'Return using between-the-legs dribble',
      'Return using behind-the-back dribble',
      'Return using spin move at each cone',
      'Do 5 complete rounds, rest 30 seconds between'
    ],
    tips: 'Attack each cone — be decisive about your move before you reach it.'
  },
  // DEFENSE
  {
    id: 'd11',
    name: 'Defensive Slide Drill',
    category: 'Defense',
    duration: 15,
    difficulty: 'Beginner',
    equipment: [],
    description: 'Build the lateral quickness and proper stance needed for elite perimeter defense.',
    instructions: [
      'Get in defensive stance: knees bent, back flat, hands active',
      'Slide left 5 steps, then right 5 steps',
      'Never cross your feet — always stay low',
      'Do 10 reps across the full width of the lane',
      'Add a sprint closeout at the end of each slide'
    ],
    tips: 'Stay low the entire time. Height = slower reaction time.'
  },
  {
    id: 'd12',
    name: 'Closeout Drill',
    category: 'Defense',
    duration: 15,
    difficulty: 'Intermediate',
    equipment: ['Basketball'],
    description: 'Practice sprinting to contest a shooter without flying past them.',
    instructions: [
      'Start under the basket',
      'Ball is held at the 3-point line (by a partner or cone)',
      'Explode toward the ball',
      'Chop your steps at 6 feet out to slow momentum',
      'Arrive with hand up in the shooter\'s face, balanced',
      'Do 10 closeouts from different angles'
    ],
    tips: 'The two-handed chop step is essential — don\'t sprint straight into the shooter.'
  },
  {
    id: 'd13',
    name: 'Mirror Drill',
    category: 'Defense',
    duration: 10,
    difficulty: 'Intermediate',
    equipment: [],
    description: 'Partner drill to simulate staying in front of a ball-handler.',
    instructions: [
      'Partner faces you in offensive stance',
      'Defender mirrors every movement without crossing feet',
      'Offensive player moves laterally, forward, back',
      'Stay in stance — no standing up!',
      'Switch roles every 45 seconds',
      'Do 6 rounds total'
    ],
    tips: 'React to the hips, not the ball or feet. Hips never lie.'
  },
  // FINISHING
  {
    id: 'd14',
    name: 'Mikan Drill',
    category: 'Finishing',
    duration: 10,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Classic drill to develop soft touch and footwork around the basket.',
    instructions: [
      'Stand under the basket',
      'Right-hand layup off the right side of the backboard',
      'Catch the ball before it hits the floor',
      'Left-hand layup off the left side',
      'Alternate continuously for 1 minute',
      'Do 5 sets of 1 minute'
    ],
    tips: 'Use the backboard as your friend. Aim for the top corner of the box.'
  },
  {
    id: 'd15',
    name: 'Euro Step Drill',
    category: 'Finishing',
    duration: 15,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop', 'Cones'],
    description: 'Master the euro step to glide past defenders and score at the rim.',
    instructions: [
      'Start at the 3-point line, dribble toward the lane',
      'Take a long step right at the free throw line',
      'Gather and step left (euro step) around the imaginary defender',
      'Finish with a soft layup',
      'Do 10 reps going right, 10 reps going left'
    ],
    tips: 'The gather step is key — collect the ball cleanly before your two steps.'
  },
  {
    id: 'd16',
    name: 'Floater Series',
    category: 'Finishing',
    duration: 20,
    difficulty: 'Advanced',
    equipment: ['Basketball', 'Hoop'],
    description: 'Develop the floater to score over shot-blockers in the paint.',
    instructions: [
      'Start at the elbow, drive into the lane',
      'One-handed push shot (right hand driving right)',
      'Focus on releasing high with a high arc',
      'Practice off one foot (right foot) and two feet',
      'Move to left side and use left hand',
      '5 sets of 10 from each side'
    ],
    tips: 'The floater requires soft touch — imagine dropping the ball in a bucket.'
  },
  // CONDITIONING
  {
    id: 'd17',
    name: 'Suicide Sprints',
    category: 'Conditioning',
    duration: 15,
    difficulty: 'Intermediate',
    equipment: [],
    description: 'Classic basketball conditioning drill to build explosive speed and endurance.',
    instructions: [
      'Start at baseline',
      'Sprint to free throw line, touch, sprint back',
      'Sprint to half court, touch, sprint back',
      'Sprint to far free throw line, touch, sprint back',
      'Sprint to far baseline, touch, sprint back',
      'Rest 90 seconds, repeat 5 times'
    ],
    tips: 'Touch the line with your hand, not just your foot. Full effort every rep.'
  },
  {
    id: 'd18',
    name: 'Jump Rope HIIT',
    category: 'Conditioning',
    duration: 20,
    difficulty: 'Beginner',
    equipment: ['Jump Rope'],
    description: 'Improve foot speed, coordination, and cardiovascular endurance.',
    instructions: [
      '2 min: basic two-foot jump',
      '1 min: single leg (right)',
      '1 min: single leg (left)',
      '2 min: alternating high knees',
      '1 min: double unders (or fast feet)',
      '1 min: rest',
      'Repeat circuit 2-3 times'
    ],
    tips: 'Jump rope is the #1 tool for ankle strength and foot quickness.'
  },
  {
    id: 'd19',
    name: 'Agility Ladder',
    category: 'Conditioning',
    duration: 20,
    difficulty: 'Intermediate',
    equipment: ['Agility Ladder'],
    description: 'Improve foot speed and coordination with ladder patterns used by pros.',
    instructions: [
      '2 steps per box (in-in-out-out)',
      'Lateral 2-in (sideways through ladder)',
      'Icky shuffle (forward, lateral)',
      'High knees through each box',
      'Single-leg hops through boxes',
      'Do each pattern 3 times, 30s rest between'
    ],
    tips: 'Speed will come — focus on clean footwork first. Film yourself.'
  },
  {
    id: 'd20',
    name: 'Full Court Layup Lines',
    category: 'Conditioning',
    duration: 20,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Build conditioning and finishing together with full-court layup runs.',
    instructions: [
      'Start at one baseline with the ball',
      'Speed dribble the full court for a layup',
      'Grab the ball out of the net, speed dribble back',
      'Alternate hands each rep',
      'Keep going for 5 minutes straight',
      'Rest 1 minute, repeat 3 times'
    ],
    tips: 'Attack the basket at full speed — this simulates fast break situations.'
  }
];
