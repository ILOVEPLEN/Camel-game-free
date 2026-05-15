export const DRILL_CATEGORIES = ['All', 'Shooting', 'Ball Handling', 'Defense', 'Finishing', 'Conditioning'];

export const drills = [
  // ── SHOOTING ──────────────────────────────────────────────
  {
    id: 'd1',
    name: 'Free Throw Routine',
    category: 'Shooting',
    duration: 10,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Build a consistent free throw routine with proper form and mental focus.',
    instructions: [
      'Stand at the free throw line, feet shoulder-width apart',
      'Bounce the ball 2-3 times — make it a routine',
      'Bend knees slightly, align elbow under the ball',
      'Focus on a spot on the back of the rim',
      'Follow through with wrist snap — hold the finish',
      'Shoot 5 sets of 10, rest 30s between sets'
    ],
    tips: 'Track your percentage each session. 70%+ is solid for beginners.'
  },
  {
    id: 'd2',
    name: 'Spot Shooting',
    category: 'Shooting',
    duration: 8,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Shoot from 5 spots around the arc to build consistency from all angles.',
    instructions: [
      'Mark 5 spots: both corners, both wings, top of the key',
      'Shoot 5 shots from each spot',
      'Focus on consistent footwork and catch-and-shoot rhythm',
      'Track makes from each spot',
      'Complete 2 full rounds'
    ],
    tips: 'Move with a purpose — simulate coming off a screen to each spot.'
  },
  {
    id: 'd3',
    name: 'Form Shooting',
    category: 'Shooting',
    duration: 6,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Perfect shooting mechanics from close range to build muscle memory.',
    instructions: [
      'Stand 3 feet in front of the basket',
      'One-hand only: shooting hand, no guide hand',
      'Focus on wrist snap and backspin',
      'Make 10 in a row, then step back a foot',
      'Work up to 8-10 feet'
    ],
    tips: 'Isolates your shooting hand — do this every single session.'
  },
  {
    id: 'd4',
    name: '3-Point Circuit',
    category: 'Shooting',
    duration: 10,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop'],
    description: 'Build confidence from the arc by moving through 5 spots.',
    instructions: [
      'Start at corner 3, shoot until you make 3 in a row',
      'Move to wing, repeat',
      'Move to the top, repeat',
      'Move to opposite wing, repeat',
      'Finish at opposite corner',
      'Complete 2 circuits'
    ],
    tips: 'Use game-speed footwork — catch, set, shoot in one fluid motion.'
  },
  {
    id: 'd5',
    name: 'Mid-Range Pull-Up',
    category: 'Shooting',
    duration: 8,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop'],
    description: 'Develop a reliable pull-up jumper from both elbows.',
    instructions: [
      'Start at half court with the ball',
      'Drive to the elbow (free throw line extended)',
      'Two-dribble pull-up with proper footwork',
      'Focus on stopping under control',
      'Shoot 5 from each elbow, then alternate'
    ],
    tips: 'The elbow is one of the most efficient shots in basketball.'
  },
  {
    id: 'd21',
    name: 'Corner Catch & Shoot',
    category: 'Shooting',
    duration: 6,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Simulate catching and shooting from the corner — one of the best spots in basketball.',
    instructions: [
      'Stand in the corner at the 3-point line',
      'Toss ball out, sprint to it, catch in shooting stance',
      'Shoot immediately on the catch — no extra dribbles',
      'Alternate: left corner 5, right corner 5',
      'Repeat for 3 rounds'
    ],
    tips: 'The corner 3 is the shortest 3 on the court. Master it first.'
  },
  {
    id: 'd22',
    name: 'Around the World',
    category: 'Shooting',
    duration: 8,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Classic game that builds shooting from a variety of spots.',
    instructions: [
      'Set 7 spots in a semicircle from corner to corner',
      'Make a shot from spot 1 before moving to spot 2',
      'If you miss, stay at that spot and try again',
      'Try to complete all 7 spots in under 3 minutes',
      'Do 2 full rounds'
    ],
    tips: 'Time yourself. Beat your own record each session.'
  },
  {
    id: 'd23',
    name: 'Elbow Jumpers',
    category: 'Shooting',
    duration: 7,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Develop your mid-range from both elbows — a fundamental scoring spot.',
    instructions: [
      'Stand at the left elbow (top of the key, left side)',
      'Catch or pick up ball, set your feet, shoot',
      'Make 5 from left elbow, move to right elbow',
      'Make 5 from right elbow',
      'Repeat for 3 rounds'
    ],
    tips: 'Keep your elbow in and follow through on every rep.'
  },
  {
    id: 'd24',
    name: 'Rhythm Shooting',
    category: 'Shooting',
    duration: 6,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Short-range shooting drill to get your body in a shooting groove.',
    instructions: [
      'Stand 5-8 feet from the basket',
      'Shoot 20 shots with a consistent rhythm — no rushing',
      'Focus on: same footwork, same dip, same release every time',
      'Move around the arc slightly between shots',
      'Track your makes out of 20'
    ],
    tips: 'This is a warm-up drill. Do it first to get your shot feeling natural.'
  },
  {
    id: 'd25',
    name: 'Bank Shot Drill',
    category: 'Shooting',
    duration: 6,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Use the backboard to score from angles — an underused weapon.',
    instructions: [
      'Stand at 45 degrees (wing area), 10-15 feet from the basket',
      'Aim for the top corner of the painted box on the backboard',
      'Shoot 10 from the right side',
      'Move to the left side, shoot 10',
      'Repeat 2 rounds'
    ],
    tips: 'The bank shot from 45 degrees goes in at a high rate. Pro players use it constantly.'
  },
  {
    id: 'd26',
    name: 'Shooting Off the Dribble',
    category: 'Shooting',
    duration: 8,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop'],
    description: 'Create your own shot off live dribble — essential for real games.',
    instructions: [
      'Start at half court, dribble to the wing',
      'Attack, then pull up for a jump shot',
      'Focus on stopping your momentum cleanly before shooting',
      'Alternate sides — left and right',
      '5 reps each side, 3 rounds'
    ],
    tips: 'The gather step before your shot is the key. Master the stop.'
  },
  {
    id: 'd27',
    name: 'Chair Shooting Drill',
    category: 'Shooting',
    duration: 8,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop'],
    description: 'Simulate coming off screens using a chair as a defender.',
    instructions: [
      'Place a chair at the elbow',
      'Start at the block, curl around the chair to the 3-point line',
      'Catch (from toss or partner) and shoot immediately',
      'Do 5 curl shots, then 5 fade-away shots (cut the other way)',
      '3 rounds total'
    ],
    tips: 'Game shots come off screens. This drill makes those reps feel automatic.'
  },
  {
    id: 'd28',
    name: '21-Cone Shooting',
    category: 'Shooting',
    duration: 8,
    difficulty: 'Advanced',
    equipment: ['Basketball', 'Hoop', 'Cones'],
    description: 'High-intensity shooting drill from multiple spots with conditioning built in.',
    instructions: [
      'Place cones at 5 spots around the 3-point line',
      'Sprint to cone 1, shoot — regardless of make/miss sprint to cone 2',
      'Continue through all 5 cones — this is one circuit',
      'Rest 45 seconds between circuits',
      'Complete 4 circuits, track total makes'
    ],
    tips: 'The goal is to shoot the same way when tired as when fresh.'
  },

  // ── BALL HANDLING ─────────────────────────────────────────
  {
    id: 'd6',
    name: 'Stationary Dribbling Series',
    category: 'Ball Handling',
    duration: 8,
    difficulty: 'Beginner',
    equipment: ['Basketball'],
    description: 'Master ball control with a series of stationary dribbling patterns.',
    instructions: [
      '1 min: low hard dribble dominant hand',
      '1 min: low hard dribble weak hand',
      '1 min: alternating pounds (right, left, right...)',
      '1 min: crossover at knee level',
      '1 min: between-the-legs alternating',
      '1 min: behind-the-back dribble — head up!'
    ],
    tips: 'Keep the ball below the waist. Dribble with fingertips, not your palm.'
  },
  {
    id: 'd7',
    name: 'Figure-8 Dribble',
    category: 'Ball Handling',
    duration: 6,
    difficulty: 'Beginner',
    equipment: ['Basketball'],
    description: 'Weave the ball in a figure-8 through your legs to improve hand coordination.',
    instructions: [
      'Stand with feet wider than shoulder-width, knees bent',
      'Dribble through right leg front to back, transfer to left hand',
      'Bring ball front left, dribble through left leg',
      'Complete the figure-8 continuously',
      '30 seconds forward, 30 seconds reverse — 4 rounds'
    ],
    tips: 'Start slow. Speed will naturally increase with repetition.'
  },
  {
    id: 'd8',
    name: 'Two-Ball Dribbling',
    category: 'Ball Handling',
    duration: 8,
    difficulty: 'Intermediate',
    equipment: ['2 Basketballs'],
    description: 'Dribble two balls simultaneously to build independent hand coordination.',
    instructions: [
      '90s: simultaneous dribble (both balls bounce together)',
      '90s: alternating dribble (one up, one down)',
      '90s: walk forward dribbling both balls',
      '90s: crossovers with both balls',
      'Rest 1 minute, repeat'
    ],
    tips: 'Trains each hand to work independently — hardest ball handling drill there is.'
  },
  {
    id: 'd9',
    name: 'Speed Dribble & Stop',
    category: 'Ball Handling',
    duration: 8,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Cones'],
    description: 'Develop attacking speed and the ability to stop on a dime.',
    instructions: [
      'Set cones at half court and 3-point line',
      'Explosive speed dribble from baseline to half court',
      'Jump stop at half court (two-foot landing)',
      'Turn, drive toward 3-point line, jump stop',
      'Continue to baseline, jump stop',
      '10 reps each direction'
    ],
    tips: 'The jump stop sets you up for any next move. Master it.'
  },
  {
    id: 'd10',
    name: 'Cone Slalom',
    category: 'Ball Handling',
    duration: 10,
    difficulty: 'Advanced',
    equipment: ['Basketball', 'Cones'],
    description: 'Navigate a slalom course to simulate live ball-handling at speed.',
    instructions: [
      'Set 6 cones in a line, 3 feet apart',
      'Weave through using crossover dribble',
      'Return using between-the-legs dribble',
      'Return using behind-the-back dribble',
      'Return using spin move at each cone',
      '5 complete rounds, rest 30s between'
    ],
    tips: 'Attack each cone — be decisive about your move before you reach it.'
  },
  {
    id: 'd29',
    name: 'Pound & Crossover Series',
    category: 'Ball Handling',
    duration: 6,
    difficulty: 'Beginner',
    equipment: ['Basketball'],
    description: 'Simple combination drill to build crossover confidence.',
    instructions: [
      'Pound the ball 3 times low with right hand',
      'Crossover to left, pound 3 times low',
      'Crossover back to right — continue for 1 minute',
      'Progress: add a between-the-legs in the middle',
      '3 sets of 1 minute'
    ],
    tips: 'Keep your eyes up. Look at a spot on the wall, not the ball.'
  },
  {
    id: 'd30',
    name: 'Spider Dribble',
    category: 'Ball Handling',
    duration: 5,
    difficulty: 'Beginner',
    equipment: ['Basketball'],
    description: 'Fast hands drill that builds touch and control around the ball.',
    instructions: [
      'Ball on the floor in front of you',
      'Tap ball forward and back: right hand front, right hand back, left hand front, left hand back',
      'This is one rep — build speed while keeping control',
      'Do 30 reps, rest 15s, repeat for 4 sets',
      'Keep the ball low and controlled'
    ],
    tips: 'Pure hand speed and ball feel. Do this every day.'
  },
  {
    id: 'd31',
    name: 'Change of Pace Dribble',
    category: 'Ball Handling',
    duration: 8,
    difficulty: 'Intermediate',
    equipment: ['Basketball'],
    description: 'Learn to manipulate your speed to lose defenders.',
    instructions: [
      'Dribble slowly for 3 steps, then explode at full speed for 5 steps',
      'Slow down again for 3 steps, explode for 5',
      'Continue from baseline to half court and back',
      'Switch hands each trip',
      '5 trips each hand'
    ],
    tips: 'The change of pace is how you beat defenders without a crossover.'
  },
  {
    id: 'd32',
    name: 'Tennis Ball Dribble',
    category: 'Ball Handling',
    duration: 6,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Tennis Ball'],
    description: 'Dribble a basketball while catching/tossing a tennis ball to improve focus.',
    instructions: [
      'Dribble basketball with right hand',
      'Hold tennis ball in left hand, toss it up and catch',
      'Keep dribbling — maintain control throughout',
      'Switch: dribble left, toss tennis ball with right',
      '45 seconds each side, 4 rounds'
    ],
    tips: 'Forces you to dribble without looking — game-changer for court vision.'
  },
  {
    id: 'd33',
    name: 'One-Hand Dribble Series',
    category: 'Ball Handling',
    duration: 6,
    difficulty: 'Beginner',
    equipment: ['Basketball'],
    description: 'Isolate your weak hand to close the gap between your two hands.',
    instructions: [
      'Dribble only with your weak hand for the entire drill',
      '1 min: stationary, low hard dribbles',
      '1 min: walking forward, then backward',
      '1 min: figure-8 through legs (weak hand dominant)',
      '1 min: crossovers — but reset to weak hand after each one',
      'No cheating — keep strong hand behind your back'
    ],
    tips: 'Most players have a massive gap between hands. Close it here.'
  },

  // ── DEFENSE ───────────────────────────────────────────────
  {
    id: 'd11',
    name: 'Defensive Slide Drill',
    category: 'Defense',
    duration: 8,
    difficulty: 'Beginner',
    equipment: [],
    description: 'Build lateral quickness and proper defensive stance.',
    instructions: [
      'Get in defensive stance: knees bent, back flat, hands active',
      'Slide left 5 steps, then right 5 steps',
      'Never cross your feet — stay low',
      '10 reps across full width of the lane',
      'Add a sprint closeout at the end of each slide'
    ],
    tips: 'Stay low the entire time. Height = slower reaction time.'
  },
  {
    id: 'd12',
    name: 'Closeout Drill',
    category: 'Defense',
    duration: 8,
    difficulty: 'Intermediate',
    equipment: ['Basketball'],
    description: 'Sprint to contest a shooter without flying past them.',
    instructions: [
      'Start under the basket',
      'Ball held at 3-point line (partner or cone)',
      'Explode toward the ball',
      'Chop your steps at 6 feet out to slow momentum',
      'Arrive with hand up, balanced',
      '10 closeouts from different angles'
    ],
    tips: 'The chop step is essential — don\'t sprint straight into the shooter.'
  },
  {
    id: 'd13',
    name: 'Mirror Drill',
    category: 'Defense',
    duration: 8,
    difficulty: 'Intermediate',
    equipment: [],
    description: 'Partner drill to simulate staying in front of a ball-handler.',
    instructions: [
      'Partner faces you in offensive stance',
      'Defender mirrors every movement without crossing feet',
      'Offensive player moves laterally, forward, back',
      'Stay in stance the whole time — no standing up',
      'Switch every 45 seconds, 6 rounds total'
    ],
    tips: 'React to the hips, not the ball or feet. Hips never lie.'
  },
  {
    id: 'd34',
    name: 'Zig-Zag Drill',
    category: 'Defense',
    duration: 8,
    difficulty: 'Beginner',
    equipment: ['Cones'],
    description: 'Classic drill to build defensive footwork and staying in front.',
    instructions: [
      'Set cones in a zig-zag pattern down the court',
      'Defensive slide from cone to cone in a defensive stance',
      'At each cone: plant, change direction, slide to next cone',
      'Never cross feet — stay low throughout',
      'Go up the court and back 5 times'
    ],
    tips: 'This builds the exact footwork you need to guard penetrating guards.'
  },
  {
    id: 'd35',
    name: 'Defensive Rebounding Box-Out',
    category: 'Defense',
    duration: 6,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Box out technique drill — one of the most overlooked fundamentals.',
    instructions: [
      'Stand facing the basket with a partner behind you',
      'Someone shoots — you pivot into your partner and seal them out',
      'Find the ball and go get it — two hands, chin the ball',
      'The person you boxed out must try to get around you',
      '10 reps each role'
    ],
    tips: 'Boxing out is more about desire than height. Always assume a miss.'
  },
  {
    id: 'd36',
    name: 'Drop Step Defense',
    category: 'Defense',
    duration: 6,
    difficulty: 'Intermediate',
    equipment: [],
    description: 'Guard the post and practice staying between the ball and the basket.',
    instructions: [
      'Stand in a strong-side post position',
      'Simulate holding your position against a post player',
      'Practice the drop step: one foot back, arms up, keep balance',
      'Mirror an imaginary or real partner going baseline and middle',
      '3 sets of 5 on each side'
    ],
    tips: 'Front the post on weak side, 3/4 deny on strong side. Be physical.'
  },

  // ── FINISHING ─────────────────────────────────────────────
  {
    id: 'd14',
    name: 'Mikan Drill',
    category: 'Finishing',
    duration: 6,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Classic drill to develop soft touch and footwork around the basket.',
    instructions: [
      'Stand under the basket',
      'Right-hand layup off right side of backboard',
      'Catch before it hits floor',
      'Left-hand layup off left side',
      'Alternate continuously for 1 minute',
      '5 sets of 1 minute'
    ],
    tips: 'Use the backboard. Aim for the top corner of the painted box.'
  },
  {
    id: 'd15',
    name: 'Euro Step Drill',
    category: 'Finishing',
    duration: 8,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop', 'Cones'],
    description: 'Master the euro step to glide past defenders and score at the rim.',
    instructions: [
      'Start at 3-point line, dribble toward the lane',
      'Take a long step right at the free throw line',
      'Gather and step left around the imaginary defender',
      'Finish with a soft layup',
      '10 reps right, 10 reps left'
    ],
    tips: 'The gather step is key — collect the ball cleanly before your two steps.'
  },
  {
    id: 'd16',
    name: 'Floater Series',
    category: 'Finishing',
    duration: 8,
    difficulty: 'Advanced',
    equipment: ['Basketball', 'Hoop'],
    description: 'Develop the floater to score over shot-blockers in the paint.',
    instructions: [
      'Start at the elbow, drive into the lane',
      'One-handed push shot — high arc, soft release',
      'Practice off one foot and two feet',
      'Move to the left side and use left hand',
      '5 sets of 10 from each side'
    ],
    tips: 'The floater requires soft touch — imagine dropping the ball into a bucket.'
  },
  {
    id: 'd37',
    name: 'Pro Hop Finish',
    category: 'Finishing',
    duration: 8,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop'],
    description: 'The pro hop (two-foot gather) gives you more balance and power at the rim.',
    instructions: [
      'Drive from the wing toward the basket',
      'Gather the ball with two feet landing simultaneously',
      'This resets your pivot foot — you can now go left or right',
      'Finish with a power layup or short jumper',
      '5 reps from left side, 5 from right, 3 rounds'
    ],
    tips: 'The pro hop is legal! It\'s a gather, not a travel. Use it to get past shot-blockers.'
  },
  {
    id: 'd38',
    name: 'Reverse Layup',
    category: 'Finishing',
    duration: 6,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop'],
    description: 'Finish on the opposite side of the rim to avoid the shot-blocker.',
    instructions: [
      'Drive baseline from the right side',
      'Continue under the basket and finish with LEFT hand on the left side',
      'Use the rim as a shield between you and the defender',
      'Aim for the top of the backboard box',
      '5 from the right, 5 from the left, 3 rounds'
    ],
    tips: 'The reverse keeps the rim between you and the help defender. Pros use it constantly.'
  },
  {
    id: 'd39',
    name: 'Power Layup Series',
    category: 'Finishing',
    duration: 6,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Two-foot power layup to absorb contact and score through traffic.',
    instructions: [
      'Drive toward the basket from the right side',
      'Two-foot takeoff — gather and jump off both feet',
      'Finish high and strong with right hand',
      'Move to left side, use left hand',
      '5 each side, 4 rounds'
    ],
    tips: 'Power layup absorbs contact better than a running layup. Great for paint play.'
  },
  {
    id: 'd40',
    name: 'Finger Roll',
    category: 'Finishing',
    duration: 5,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'The softest finish in basketball — essential for close-range scoring.',
    instructions: [
      'Stand 3-5 feet from the basket',
      'Roll the ball off your fingertips toward the top of the backboard',
      'No wrist snap — it\'s all fingertip control and gentle touch',
      'Alternate hands',
      'Make 20 from each side'
    ],
    tips: 'Lay the ball UP, not at the backboard. Imagine laying it on a shelf.'
  },

  // ── CONDITIONING ──────────────────────────────────────────
  {
    id: 'd17',
    name: 'Suicide Sprints',
    category: 'Conditioning',
    duration: 10,
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
    duration: 8,
    difficulty: 'Beginner',
    equipment: ['Jump Rope'],
    description: 'Improve foot speed, coordination, and cardiovascular endurance.',
    instructions: [
      '90s: basic two-foot jump',
      '45s: single leg right',
      '45s: single leg left',
      '90s: alternating high knees',
      '45s: fast feet (barely leaving the ground)',
      '1 min rest, repeat twice'
    ],
    tips: 'Jump rope is the #1 tool for ankle strength and foot quickness.'
  },
  {
    id: 'd19',
    name: 'Agility Ladder',
    category: 'Conditioning',
    duration: 8,
    difficulty: 'Intermediate',
    equipment: ['Agility Ladder'],
    description: 'Improve foot speed and coordination with ladder patterns used by pros.',
    instructions: [
      'In-in-out-out pattern (2 steps per box)',
      'Lateral 2-in (sideways through ladder)',
      'Icky shuffle (forward, lateral)',
      'High knees through each box',
      'Single-leg hops through boxes',
      'Each pattern 3 times, 30s rest between'
    ],
    tips: 'Speed comes later — focus on clean footwork first.'
  },
  {
    id: 'd20',
    name: 'Full Court Layup Lines',
    category: 'Conditioning',
    duration: 8,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Build conditioning and finishing together with full-court runs.',
    instructions: [
      'Start at baseline with the ball',
      'Speed dribble full court for a layup',
      'Grab out of net, speed dribble back',
      'Alternate hands each rep',
      'Go for 4 minutes straight, rest 1 min, repeat 3 times'
    ],
    tips: 'Attack the basket at full speed — simulates fast break situations.'
  },
  {
    id: 'd41',
    name: '17s',
    category: 'Conditioning',
    duration: 8,
    difficulty: 'Intermediate',
    equipment: [],
    description: 'Classic team conditioning test — sprint sideline to sideline 17 times.',
    instructions: [
      'Stand on the sideline',
      'Sprint to the opposite sideline and back — that is 2 lengths',
      'Complete 17 sideline-to-sideline lengths',
      'Target: under 60 seconds for the full set',
      'Rest 90 seconds, complete 3 sets'
    ],
    tips: 'This is how college coaches test conditioning. Time yourself every session.'
  },
  {
    id: 'd42',
    name: 'Box Drill',
    category: 'Conditioning',
    duration: 6,
    difficulty: 'Intermediate',
    equipment: ['Cones'],
    description: 'Sprint, backpedal, and shuffle in a box pattern to simulate game movements.',
    instructions: [
      'Set 4 cones in a 5x5 yard box',
      'Sprint from cone 1 to cone 2',
      'Shuffle from cone 2 to cone 3',
      'Backpedal from cone 3 to cone 4',
      'Shuffle from cone 4 back to cone 1',
      'Complete 8 laps of the box, rest 1 min, repeat twice'
    ],
    tips: 'Change direction sharply at each cone — don\'t round the corners.'
  },
  {
    id: 'd43',
    name: 'Four Corners Sprint',
    category: 'Conditioning',
    duration: 6,
    difficulty: 'Advanced',
    equipment: ['Cones'],
    description: 'Explosive change-of-direction sprint drill — builds game-speed quickness.',
    instructions: [
      'Place cones at all 4 corners of the key',
      'Start at one corner — sprint to the opposite diagonal corner',
      'Sprint to the next corner, continue around the box',
      'Complete a full circuit in under 20 seconds',
      'Rest 45 seconds, repeat 8 times'
    ],
    tips: 'Think about cutting, not running. Your first step out of each cone is everything.'
  },
  {
    id: 'd44',
    name: 'Defensive Slide Circuit',
    category: 'Conditioning',
    duration: 6,
    difficulty: 'Beginner',
    equipment: ['Cones'],
    description: 'Defensive-specific conditioning — slide, sprint, repeat.',
    instructions: [
      'Defensive slide from baseline to free throw line (lateral)',
      'Sprint to half court',
      'Backpedal to free throw line',
      'Defensive slide back to baseline',
      'Rest 30 seconds — this is one rep',
      'Complete 8 reps'
    ],
    tips: 'Keep your stance low the entire time. Rising up = losing your man.'
  },
];
