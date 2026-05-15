export const DRILL_CATEGORIES = ['All', 'Shooting', 'Ball Handling', 'Defense', 'Finishing', 'Conditioning', 'Passing', 'Footwork'];

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
  {
    id: 'd45',
    name: 'Pull-Up 3-Pointer',
    category: 'Shooting',
    duration: 8,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop'],
    description: 'Dribble into a 3-point pull-up from both wings, stop on a dime, rise and shoot.',
    instructions: [
      'Start at the top of the key with the ball in your hands',
      'Attack the right wing with two hard dribbles, building speed',
      'Plant your inside foot and execute a clean one-two hop stop at the 3-point line',
      'Rise straight up — do not lean forward or backward — and shoot with a full follow-through',
      'Retrieve your make or miss, dribble back, and repeat from the left wing',
      'Complete 5 reps from each wing per round, 3 rounds total'
    ],
    tips: 'The stop is the hardest part. If your momentum carries you forward, you will fade off balance. Practice the stop alone before adding the shot.'
  },
  {
    id: 'd46',
    name: 'Catch & Shoot off V-Cut',
    category: 'Shooting',
    duration: 7,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop'],
    description: 'Simulate receiving a pass off a V-cut, catch in shooting stance and fire.',
    instructions: [
      'Start at the 3-point line on the wing, walk your defender down toward the block',
      'Plant hard on your inside foot and push off explosively back up toward the 3-point line',
      'Toss the ball ahead of yourself or have a partner chest-pass to you as you arrive',
      'Catch the ball already in your shooting stance — feet under you, knees slightly bent',
      'Shoot immediately without an extra dribble or reset',
      'Complete 6 reps on each wing, 3 rounds total'
    ],
    tips: 'The catch is everything — if you are not ready to shoot the moment the ball arrives, the defender recovers. Train your feet to arrive before the ball does.'
  },
  {
    id: 'd47',
    name: 'Fadeaway Jumper',
    category: 'Shooting',
    duration: 8,
    difficulty: 'Advanced',
    equipment: ['Basketball', 'Hoop'],
    description: 'Elbow fadeaway from both sides, step back, maintain balance in the air.',
    instructions: [
      'Position yourself at the right elbow, ball in your shooting pocket',
      'Take one hard jab step toward the baseline to create space',
      'Simultaneously push off your lead foot and fade slightly away from the basket',
      'Keep your shooting elbow in, release at the top of your jump while drifting — not falling — backward',
      'Hold your follow-through until the ball hits the net or rim',
      'Perform 5 reps from the right elbow, 5 from the left, 3 rounds'
    ],
    tips: 'A true fadeaway means controlled drift, not a wild lean. Your torso should be upright at release — only your feet move away from the defender.'
  },
  {
    id: 'd48',
    name: 'Free Throw Make-5 Challenge',
    category: 'Shooting',
    duration: 8,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Must make 5 in a row before moving on, 4 rounds total.',
    instructions: [
      'Stand at the free throw line and go through your full pre-shot routine on every single attempt',
      'Shoot until you make 5 consecutive free throws — the streak resets on any miss',
      'After completing a streak of 5, step away from the line for 30 seconds to simulate game pressure',
      'Return and start a new streak — complete 4 total streaks of 5',
      'Track how many total shots it takes you to complete all 4 rounds',
      'Goal: complete all 4 rounds in 25 total attempts or fewer'
    ],
    tips: 'Missing during a streak teaches you to refocus under pressure. Breathe, reset your routine, and trust your mechanics — do not rush the next shot after a miss.'
  },
  {
    id: 'd49',
    name: 'Off-Screen Shooting',
    category: 'Shooting',
    duration: 7,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop'],
    description: 'Simulate curling off a screen to catch and shoot, use chair or cone as screen.',
    instructions: [
      'Place a chair or tall cone at the elbow to serve as the screener',
      'Start at the block and cut toward the chair as if running off a screen',
      'Read the angle: curl tightly around the chair for a catch-and-shoot on the move',
      'Toss the ball ahead or have a partner deliver a pass as you clear the screen',
      'Catch in shooting stance, shoot in rhythm without resetting your feet',
      'Perform 5 curl-and-shoot reps, then 5 fade-away reps (brush the screen and fade to the corner), 3 rounds total'
    ],
    tips: 'Use your shoulder to brush the screener — wide cuts give the defender time to recover. The tighter you run off the screen, the better your shot.'
  },
  {
    id: 'd50',
    name: 'Step-Back Jumper',
    category: 'Shooting',
    duration: 8,
    difficulty: 'Advanced',
    equipment: ['Basketball', 'Hoop'],
    description: 'One hard dribble step-back to create space then shoot, both sides.',
    instructions: [
      'Position yourself on the right wing at the 3-point line in triple-threat stance',
      'Take one hard attacking dribble toward the basket to engage the imaginary defender',
      'Plant your inside foot and push off explosively backward and slightly sideways to create separation',
      'Land with both feet simultaneously in a balanced shooting stance behind the 3-point line',
      'Rise and shoot immediately — hesitation gives the defender time to close out',
      'Complete 5 reps from the right wing, 5 from the left wing, 3 rounds total'
    ],
    tips: 'The step-back only works if the first dribble is hard enough to make the defender commit. A soft attack dribble telegraphs the move — make them believe you are going to the rim.'
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
  {
    id: 'd51',
    name: 'Behind the Back Series',
    category: 'Ball Handling',
    duration: 7,
    difficulty: 'Intermediate',
    equipment: ['Basketball'],
    description: 'Stationary BtB, walking BtB, full court BtB combo.',
    instructions: [
      'Start stationary: pound the ball 3 times right, then swing it behind your back to your left hand and pound 3 times — repeat continuously for 60 seconds',
      'Progress to walking: dribble right hand, behind the back at each step so left hand receives it naturally in stride',
      'Walk the full court length twice using only behind-the-back transfers',
      'Now add a crossover in front, then a behind-the-back as a combo — alternate every 4 steps full court',
      'Finish with a speed run: dribble at 70% speed, adding a BtB move every 5 steps',
      'Complete 3 full-court trips in the combo sequence, rest 30 seconds between trips'
    ],
    tips: 'The behind-the-back is not a fancy move — it is a protection move. Use it when a defender is swiping at the ball from the front. Keep your elbow close to your hip to get the cleanest wrap.'
  },
  {
    id: 'd52',
    name: 'Hesi (Hesitation) Dribble',
    category: 'Ball Handling',
    duration: 8,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Cones'],
    description: 'Slow dribble then explosive burst past a cone, simulate freezing a defender.',
    instructions: [
      'Place 4 cones in a straight line from the half court to the basket, spacing them 8-10 feet apart',
      'Dribble toward the first cone at a slow, casual pace as if you have nowhere to go',
      'As you approach within 2 feet of the cone, suddenly go upright — straighten your body briefly to sell the hesitation',
      'Then immediately drop back into an attack stance and explode past the cone at full speed',
      'Slow back down before the next cone and repeat the hesitation move',
      'Complete 5 trips from half court to the basket, then 5 more leading with the opposite hand'
    ],
    tips: 'The hesitation works because defenders match your pace — when you slow down, they relax, and that is the moment you blow by them. The key is a genuine pause, not a fake one. Make them think you are stopping.'
  },
  {
    id: 'd53',
    name: 'Full Court Weak Hand Only',
    category: 'Ball Handling',
    duration: 8,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Everything with the weak hand: dribble full court, layup, come back.',
    instructions: [
      'Place your strong hand behind your back or tuck it in your waistband to eliminate the temptation to use it',
      'Speed dribble full court using only your weak hand — stay in control, do not just push the ball ahead',
      'Approach the basket and finish with a weak-hand layup off the correct foot',
      'Retrieve the ball out of the net and dribble back to the baseline using only your weak hand',
      'Add a weak-hand crossover between the legs or a hesitation move on each return trip',
      'Complete 8 full-court round trips, resting 20 seconds between every 2 trips'
    ],
    tips: 'This will feel uncomfortable and slow. That is the point. Your weak hand only becomes capable through overloaded, intentional reps. Resist the urge to switch hands even once.'
  },
  {
    id: 'd54',
    name: 'Combo Move Series',
    category: 'Ball Handling',
    duration: 8,
    difficulty: 'Advanced',
    equipment: ['Basketball'],
    description: 'Crossover-between-behind in sequence, both directions, add speed each round.',
    instructions: [
      'Start stationary: crossover right to left, between the legs left to right, behind the back right to left — this is one combo',
      'Repeat the three-move combo continuously for 45 seconds, staying low and controlled',
      'Walk forward while performing the combo sequence — do not pause between moves',
      'Progress to a jog, then a near-full-speed dribble while maintaining the sequence',
      'Reverse the sequence: behind the back first, between the legs second, crossover third',
      'Complete 4 rounds of 45 seconds each, increasing speed with every round and resting 15 seconds between rounds'
    ],
    tips: 'Combo moves in a game flow naturally only when each individual move is automatic. If you have to think about the behind-the-back, slow down. Drill the weakest link of the combo separately until it is automatic, then reintegrate it into the sequence.'
  },
  {
    id: 'd55',
    name: 'In & Out Dribble',
    category: 'Ball Handling',
    duration: 6,
    difficulty: 'Beginner',
    equipment: ['Basketball'],
    description: 'Fake to one side then explode the other way, great for breaking ankles.',
    instructions: [
      'Dribble the ball with your right hand and take an exaggerated step to your left — sell the direction change with your shoulder and head',
      'Instead of crossing the ball, push it back to the outside on the same right hand and explode right',
      'Practice the move slowly first: step left, push out right, burst right, repeat 10 times',
      'Now walk the length of the court performing an in-and-out every 4-5 steps',
      'Progress to game speed: dribble with purpose, sell the fake aggressively, explode past the imaginary defender',
      'Complete 4 full court trips with the right hand, then 4 with the left hand'
    ],
    tips: 'The in-and-out is your first move when you want to attack without crossing the ball. The sell is in the head and shoulder fake — if you look where you are going, the defender will not bite.'
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
  {
    id: 'd56',
    name: 'Charge Taking Drill',
    category: 'Defense',
    duration: 6,
    difficulty: 'Intermediate',
    equipment: [],
    description: 'Position yourself to take a charge, practice falling correctly and protecting yourself.',
    instructions: [
      'Stand just outside the restricted arc in the lane — this is the legal charge zone, inside the arc is always a block',
      'Get your feet set before the imaginary or real offensive player arrives — both feet planted, body square to the offense',
      'Bend your knees slightly and put your arms across your chest to protect yourself on contact',
      'When contact comes, absorb it by sitting back slightly and falling straight down, not backward onto your tailbone',
      'Hit the ground with your forearms first to break the fall, chin tucked, then show the referee your position by keeping your arms in',
      'Practice the fall technique without a partner 10 times, then have a partner walk into you at slow speed for 10 more controlled reps'
    ],
    tips: 'Taking a charge is a skill and a mindset. Most players flinch or jump — you have to stay planted. The refs are looking for two things: feet set before contact and no lateral movement. Give them both.'
  },
  {
    id: 'd57',
    name: 'Deny the Ball',
    category: 'Defense',
    duration: 7,
    difficulty: 'Intermediate',
    equipment: [],
    description: 'Deny pass to the wing, one hand in passing lane, stay between ball and man.',
    instructions: [
      'Set up in a denial position on the wing: one foot in the passing lane, lead hand extended palm up to intercept passes',
      'Your body should be half-turned, able to see both the ball and your man at the same time — use your peripheral vision',
      'Stay on the balls of your feet in a low, active stance — never flat-footed',
      'When your man cuts toward the ball, slide and maintain denial without reaching or grabbing',
      'If the ball is passed to your man despite denial, immediately sprint to get in front of them — no ball watching',
      'Hold denial position for 30-second rounds, 6 rounds each side, with a partner moving the offensive player around'
    ],
    tips: 'Denial defense is exhausting because you cannot relax for a single second. Your positioning must be perfect before the pass is thrown, not after. One step out of position is all a good player needs.'
  },
  {
    id: 'd58',
    name: 'Contest Without Fouling',
    category: 'Defense',
    duration: 6,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Practice jumping straight up to contest, not into the shooter.',
    instructions: [
      'Stand at the 3-point line in defensive stance, with a partner or mannequin at the same spot in shooting position',
      'When the shooter begins their shooting motion, jump straight up — your body should go vertically, not forward',
      'Keep both arms extended straight above your head — do not swipe or reach toward the ball',
      'Land in the same spot you left — if you land forward or into the shooter, that is a foul',
      'Practice the straight-up contest 10 times from the 3-point line, then 10 times from the mid-range',
      'Add a partner who actually shoots so you practice timing the contest with a real release'
    ],
    tips: 'The most common defensive foul is jumping forward into the shooter. Gravity is your friend — jump up and let gravity bring you straight down. Your hands being up matters more than being close to the shooter.'
  },
  {
    id: 'd59',
    name: 'Help-Side Rotation',
    category: 'Defense',
    duration: 7,
    difficulty: 'Intermediate',
    equipment: [],
    description: 'Rotate from help position to ball, two steps off your man, ready to help.',
    instructions: [
      'Start in the help-side lane: your man is one pass away, you are in the lane positioned to see both ball and man simultaneously',
      'Position yourself two big steps off your man — close enough to recover if they get the ball, but in position to stop a drive',
      'When the ball-handler drives toward the lane, take one hard step toward the ball to show help and stop the drive',
      'If the ball-handler kicks it out to your man, sprint back out to close out with a high hand and chopped steps',
      'Practice the rotation sequence — help position, step toward drive, sprint back to your man — 10 reps at walk-through speed first',
      'Increase to full speed for 3 sets of 8 rotations, switching which side you help from each set'
    ],
    tips: 'Help-side defense wins championships. The mistake most players make is watching the ball instead of staying connected to their man. Your job is to stop the drive AND recover to your man if they kick it out — both, every time.'
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
  {
    id: 'd60',
    name: 'Baby Hook',
    category: 'Finishing',
    duration: 6,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop'],
    description: 'Soft one-hand hook from close range, both sides, use backboard.',
    instructions: [
      'Stand at the low block on the right side of the lane, 3-5 feet from the basket',
      'Hold the ball in your right hand with your arm extended, elbow slightly bent — hook position',
      'Step across your body with your left foot to create separation from the imaginary defender',
      'Sweep the ball in a hook arc from low to high, releasing off your fingertips at the top of the arc — aim for the near corner of the backboard box',
      'The motion is a soft, high-arcing release — not a push — use touch, not force',
      'Complete 10 reps from the right block with the right hand, then 10 from the left block with the left hand, 3 rounds total'
    ],
    tips: 'The baby hook is the one unstoppable shot in basketball when it is developed — defenders cannot block it without fouling you. The key is keeping it close to your body until the very last second, then sweeping up and away.'
  },
  {
    id: 'd61',
    name: 'Up and Under',
    category: 'Finishing',
    duration: 7,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop'],
    description: 'Pump fake to get defender in air, step through and finish.',
    instructions: [
      'Receive the ball in the post or at the elbow and face the basket in a strong triple-threat position',
      'Give a convincing shot fake — raise the ball toward your shooting pocket and dip your knees as if actually shooting',
      'Pause one beat to let the imaginary defender commit and leave their feet',
      'Step through with your non-pivot foot under the defender who is now in the air',
      'Finish with a soft layup or short shot on the other side of the defender, using the opposite hand from your step-through direction',
      'Complete 5 reps stepping through right, 5 stepping through left, 3 rounds total'
    ],
    tips: 'The pump fake only works if it looks exactly like your real shot. Use the same grip, same lift, same body position. A lazy pump fake will not get anyone off their feet.'
  },
  {
    id: 'd62',
    name: 'Contact Finish',
    category: 'Finishing',
    duration: 8,
    difficulty: 'Advanced',
    equipment: ['Basketball', 'Hoop'],
    description: 'Drive and finish through simulated contact, stay strong and convert.',
    instructions: [
      'Set up a pad, foam roller, or have a partner use a blocking pad at the lane line to simulate a body at the rim',
      'Drive hard from the wing, gathering the ball before contact',
      'Absorb the contact by keeping your core tight, staying tall through the hit, and maintaining your finishing motion',
      'Finish with your inside hand, keeping the ball high and protected through the contact',
      'The goal is not to avoid contact but to convert through it — keep shooting after the hit',
      'Complete 5 drives from the right wing and 5 from the left wing, resting 30 seconds between rounds, 3 rounds total'
    ],
    tips: 'Flinching at contact is a natural reaction that must be trained out. Start with very light contact and build up. The players who score through contact do so because they have taken that contact a thousand times in practice and learned to treat it as normal.'
  },
  {
    id: 'd63',
    name: 'Post Drop Step',
    category: 'Finishing',
    duration: 8,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop'],
    description: 'Receive in the post, drop step baseline and middle, both sides.',
    instructions: [
      'Establish deep post position on the right block, calling for the ball with a target hand',
      'Receive the pass and immediately feel where your imaginary defender is with your back — this is your read',
      'For the baseline drop step: take your left foot and swing it around toward the baseline, sealing the defender behind you, then power up for a layup or short shot',
      'For the middle drop step: take your left foot and swing it toward the middle of the lane, sealing off the defender, then finish with a power move to the rim',
      'Practice 5 baseline drop steps, then 5 middle drop steps from the right block',
      'Move to the left block and repeat with the opposite foot as the pivot, 3 full rounds total'
    ],
    tips: 'The drop step is all about leverage, not speed. Feel the defender and go the opposite direction. If they are playing your baseline, go middle. If they play middle, go baseline. The read happens before you catch the ball.'
  },
  {
    id: 'd64',
    name: 'Lefty Layup Focus',
    category: 'Finishing',
    duration: 6,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Left hand only layups from both sides, overload the weak hand.',
    instructions: [
      'Start at the right wing, dribble to the basket and finish with a left-hand layup — yes, the left hand from the right side',
      'Gather off your right foot and extend the left hand toward the backboard, aiming for the near corner of the painted box',
      'Move to the left side and again finish with the left hand — this is the natural layup side for the left hand, so practice getting comfortable here too',
      'Perform 10 left-hand layups from the right side (the harder side), then 10 from the left side',
      'Add a jab step or hesitation before each drive to simulate creating space before attacking',
      'Complete 4 rounds total, focusing on soft touch and using the backboard consistently'
    ],
    tips: 'Most right-handed players avoid left-hand finishes because they are uncomfortable. Defenders know this and will funnel you left to force the weak hand. Train the left hand until it is not weak anymore.'
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
  {
    id: 'd65',
    name: 'Lateral Bounds',
    category: 'Conditioning',
    duration: 6,
    difficulty: 'Intermediate',
    equipment: [],
    description: 'Single-leg lateral jumps, stick the landing, build explosiveness side to side.',
    instructions: [
      'Stand on your right foot with a slight knee bend, loading your hip and glute',
      'Explode laterally off your right foot as far as you can to the left, driving through your hip and swinging your arms for momentum',
      'Land on your left foot only, absorbing the landing with a soft knee bend — hold the landing for one full second before going again',
      'Immediately bound back to the right, exploding off the left foot',
      'Complete 10 bounds in each direction as one set, focusing on maximum distance and clean single-leg landings',
      'Rest 45 seconds between sets, complete 4 sets total'
    ],
    tips: 'The one-second hold on landing is not optional — it teaches your body to stabilize and builds the ankle and knee strength that prevents injuries on cuts and landings in games.'
  },
  {
    id: 'd66',
    name: 'Jump Squat Series',
    category: 'Conditioning',
    duration: 6,
    difficulty: 'Beginner',
    equipment: [],
    description: 'Bodyweight jump squats, explode up, soft landing, 3 sets 15 reps.',
    instructions: [
      'Stand with feet shoulder-width apart, toes slightly turned out, core braced',
      'Drop into a squat until your thighs are parallel to the floor — do not let your knees cave inward',
      'From the bottom position, explode upward as fast as possible, driving through your heels and extending through your hips, knees, and ankles',
      'Leave the ground and reach full extension, then land softly with bent knees on the balls of your feet to absorb impact',
      'Immediately reload into the squat position and go again without pausing at the top',
      'Complete 3 sets of 15 reps with 45 seconds rest between sets'
    ],
    tips: 'The quality of each jump matters more than the speed of the reps. A sloppy landing is how ankles and knees get hurt. Land like you are trying not to make any noise.'
  },
  {
    id: 'd67',
    name: 'Half-Court Shuttle',
    category: 'Conditioning',
    duration: 6,
    difficulty: 'Intermediate',
    equipment: [],
    description: 'Baseline to half court and back, touch the line, 10 reps 45s rest.',
    instructions: [
      'Start on the baseline in a sprint stance, weight forward on the balls of your feet',
      'On go, sprint at full speed to the half-court line',
      'Touch the line with your hand — not just your foot — then immediately reverse direction',
      'Sprint back to the baseline at full speed and touch that line with your hand',
      'This counts as one rep — complete 10 total reps without stopping',
      'Rest exactly 45 seconds, then complete 3 more sets of 10 reps'
    ],
    tips: 'The difference between good and great conditioning is what you do in the last 3 reps of each set. Anyone can sprint the first 7. Push your effort when it gets hard — that is where the conditioning gains are made.'
  },
  {
    id: 'd68',
    name: 'Timed Layup Challenge',
    category: 'Conditioning',
    duration: 8,
    difficulty: 'Beginner',
    equipment: ['Basketball', 'Hoop'],
    description: 'Make as many layups as possible in 4 minutes, alternate hands.',
    instructions: [
      'Start a 4-minute timer and begin at the right side of the basket',
      'Attack the right side and finish with your right hand, immediately retrieve the ball out of the net',
      'Dribble quickly to the left side and finish with your left hand — alternate sides on every single layup',
      'Do not waste time — every second counts, so move with urgency between each layup',
      'Keep a running count of every made layup — misses do not count',
      'Record your total makes and try to beat your score each session'
    ],
    tips: 'The first 2 minutes feel easy. Push through the last 2 when your legs get heavy. Track your score every session — improvement from 30 to 45 layups in 4 minutes represents a real jump in both conditioning and finishing efficiency.'
  },

  // ── PASSING ───────────────────────────────────────────────
  {
    id: 'd69',
    name: 'Wall Pass Drill',
    category: 'Passing',
    duration: 6,
    difficulty: 'Beginner',
    equipment: [],
    description: 'Chest passes against a wall, 50 reps, then bounce passes 50 reps, quick release.',
    instructions: [
      'Stand 6-8 feet from a solid wall, feet shoulder-width apart in a balanced athletic stance',
      'Grip the ball with both hands on the sides, thumbs pointing toward each other behind the ball',
      'Chest pass: push the ball from your chest with both hands, stepping forward with one foot, ending with thumbs pointing down and fingers spread toward the target — the pass should be firm and flat, not arcing',
      'Catch the return off the wall and immediately reset — minimize the time the ball is in your hands before releasing again',
      'Complete 50 chest passes, then switch to bounce passes: aim for a spot on the floor 2/3 of the way to the wall so the ball bounces up to waist height on the return',
      'Complete 50 bounce passes, focusing on the same quick release and step through'
    ],
    tips: 'A soft pass is a turnover waiting to happen. Passes should have zip on them — make a sound when they hit the wall. The step through transfers your body weight into the pass and adds velocity without arm strain.'
  },
  {
    id: 'd70',
    name: 'Bounce Pass Accuracy',
    category: 'Passing',
    duration: 6,
    difficulty: 'Beginner',
    equipment: ['Basketball'],
    description: 'Hit a target on the floor with bounce pass, land it 2/3 of the way to target.',
    instructions: [
      'Place a piece of tape or mark a spot on the floor to serve as your target — position yourself 10 feet away from a partner or wall',
      'The target should be placed at exactly 2/3 of the distance between you and the receiver — this is where the ball should hit the floor',
      'Grip the ball on the sides and step through as you release, aiming to hit your floor target precisely',
      'A well-thrown bounce pass hits the target and arrives at the receiver between the waist and knee — adjust your aim until the bounce hits that height consistently',
      'Complete 20 reps standing still, then move to 20 reps where you are catching and immediately bounce-passing on the move',
      'Track how many of your 20 moving passes hit within one foot of your target'
    ],
    tips: 'Bounce passes are slower in the air than chest passes but harder to steal — they are best used in traffic. The common mistake is bouncing too close to yourself, which makes the ball rise too high at the receiver. Aim further out than feels natural.'
  },
  {
    id: 'd71',
    name: 'Overhead Pass',
    category: 'Passing',
    duration: 5,
    difficulty: 'Beginner',
    equipment: ['Basketball'],
    description: 'Two-hand overhead pass to wall or partner, 40 reps, strong core.',
    instructions: [
      'Hold the ball directly above your head with both hands, elbows slightly bent — the ball should be behind your forehead, not in front of your face',
      'Engage your core and snap the ball forward by extending your elbows and flicking your wrists downward at release',
      'The ball should travel on a line — not a rainbow arc — and arrive at chest height to the target',
      'Step into the pass to generate power from your lower body, not just your arms',
      'Complete 40 reps against a wall or with a partner, focusing on a consistent flat trajectory and strong wrist snap at release',
      'After 40 stationary reps, add 10 reps where you jump slightly before releasing — this is the overhead outlet pass after a rebound'
    ],
    tips: 'The overhead pass is used to skip over pressing defenders, to outlet quickly after a rebound, and to enter the ball into the post. If your pass is arcing too high, your elbows are bending too far back — shorten the windup.'
  },
  {
    id: 'd72',
    name: 'Skip Pass Drill',
    category: 'Passing',
    duration: 7,
    difficulty: 'Intermediate',
    equipment: ['Basketball'],
    description: 'Swing ball side to side with skip passes, catch in shooting stance.',
    instructions: [
      'Position yourself at the top of the key — imagine a teammate in each corner and another at the opposite wing',
      'Start with the ball on the right side, wind up with both hands and throw a long, flat skip pass to the left corner — the ball should travel diagonally across the court',
      'The receiver (or your target) should catch the ball at shooting height so it can be released immediately',
      'After throwing, immediately shift your weight and prepare to receive a return pass',
      'Practice throwing skip passes from the right wing to the left corner, from the left wing to the right corner, and from the top to each corner — 10 reps from each angle',
      'Focus on catching every return pass already in shooting stance — feet set, ball in pocket, ready to shoot'
    ],
    tips: 'The skip pass is one of the most important passes in modern basketball — it swings the ball from one side to the other to find the open corner shooter. Throw it flat and crisp. A slow, looping skip pass gives the defense time to rotate and close out.'
  },
  {
    id: 'd73',
    name: 'Drive & Kick Simulation',
    category: 'Passing',
    duration: 8,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop'],
    description: 'Drive the lane, kick to corner for a shot, simulate spot-up shooting off drive.',
    instructions: [
      'Start at the top of the key in triple-threat position',
      'Attack the lane hard as if driving to score — sell the drive, make the defense collapse',
      'When you reach the lane line, pick up your dribble and pivot to face the corner',
      'Deliver a crisp chest or bounce pass to the corner target (partner, cone, or spot on the floor)',
      'Sprint to the corner yourself, catch the imaginary return pass, and shoot — simulate the spot-up shot that results from the drive-and-kick',
      'Complete 5 reps driving right and kicking left, 5 reps driving left and kicking right, 3 rounds total'
    ],
    tips: 'The kick pass needs to arrive at the shooter while they are still in rhythm — a pass that bounces at their feet or arrives late kills the advantage your drive created. Practice delivering the pass on a rope, not a rainbow.'
  },
  {
    id: 'd74',
    name: 'No-Look Pass Practice',
    category: 'Passing',
    duration: 7,
    difficulty: 'Advanced',
    equipment: ['Basketball'],
    description: 'Face a target, look away and throw accurate passes, develops court vision.',
    instructions: [
      'Stand 8-10 feet from a wall target or partner, facing slightly away from your target so you must pass without direct eye contact',
      'Pick a fixed point elsewhere to stare at — a spot on the opposite wall, a cone, anything — and commit to not looking at your target',
      'Deliver a chest pass to the target using only your peripheral vision and spatial memory',
      'Vary the types of no-look passes: chest, bounce, and wrap-around passes where you look one direction and pass another',
      'With a partner, look directly at them while passing to a second target behind them — simulate looking off a defender',
      'Complete 40 total no-look pass reps across the variations, resting when needed'
    ],
    tips: 'No-look passing is about peripheral vision and court awareness, not tricks. The best passers in basketball are always scanning the floor — by the time they receive the ball, they already know where the open man is. Practice seeing the whole floor before you touch the ball.'
  },
  {
    id: 'd75',
    name: 'Outlet Pass Drill',
    category: 'Passing',
    duration: 6,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop'],
    description: 'Grab a rebound, pivot quickly, throw long outlet pass and sprint.',
    instructions: [
      'Start under the basket — toss the ball high off the backboard to simulate a missed shot',
      'Jump and catch the ball at the highest point with two hands, immediately bringing it to your chin (chinning the ball) to protect it from imaginary defenders',
      'Pivot explosively on your inside foot to face the sideline — do not pivot toward the middle of the court',
      'Scan the floor quickly and deliver a long, flat overhead or one-handed outlet pass toward the sideline at the nearest free throw line extended',
      'Immediately sprint up the floor after throwing the pass — in transition, passers must become runners',
      'Complete 10 outlet passes to the right sideline, 10 to the left sideline, 2 rounds total'
    ],
    tips: 'The outlet pass starts a fast break. Speed of release is everything — every half-second you hold the ball after the rebound gives the defense time to get back. Catch, pivot, and throw as one continuous motion.'
  },
  {
    id: 'd76',
    name: 'Quick Release Passing',
    category: 'Passing',
    duration: 7,
    difficulty: 'Intermediate',
    equipment: ['Basketball'],
    description: 'Rapid-fire passes against wall, minimize time ball is in your hands.',
    instructions: [
      'Stand 5-6 feet from the wall — closer than usual to reduce flight time and force faster hands',
      'Chest pass against the wall and catch the return — your goal is to release the next pass within one second of catching the previous one',
      'Do not set your feet between passes — catch and release from wherever your hands are, simulating passing on the move',
      'After 30 reps, switch to rapid-fire bounce passes at the same distance',
      'After 30 bounce pass reps, combine both: alternate chest and bounce passes on every other rep for 30 more reps',
      'Complete 3 full rounds, resting 20 seconds between rounds'
    ],
    tips: 'In a game, every extra second you hold the ball is a second for the defense to recover. The goal of this drill is to make your catch-and-release feel reflexive. Count your seconds aloud at first — most beginners hold the ball 2-3 seconds without realizing it.'
  },

  // ── FOOTWORK ──────────────────────────────────────────────
  {
    id: 'd77',
    name: 'Pivot Work',
    category: 'Footwork',
    duration: 6,
    difficulty: 'Beginner',
    equipment: [],
    description: 'Front pivot and reverse pivot from both feet, 100 reps, don\'t lift the pivot foot.',
    instructions: [
      'Stand with feet shoulder-width apart and designate your right foot as the pivot foot — this foot cannot move once it is established',
      'Front pivot: swing your left foot forward and around in a sweeping motion, rotating your entire body to face the opposite direction while your right foot stays planted',
      'Reverse pivot: swing your left foot backward and around to face the opposite direction — this is the pivot you use to protect the ball and create space',
      'Perform 25 front pivots on the right foot, then 25 reverse pivots on the right foot',
      'Switch to the left foot as your pivot foot and complete 25 front pivots and 25 reverse pivots',
      'Focus entirely on keeping the pivot foot stationary — any drag or lift is a travel'
    ],
    tips: 'Pivoting is the most commonly traveled move in basketball, especially at the youth level. Film yourself if possible — players almost always drag the pivot foot slightly without realizing it. The pivot foot stays nailed to the floor, even the heel.'
  },
  {
    id: 'd78',
    name: 'Triple Threat Position',
    category: 'Footwork',
    duration: 6,
    difficulty: 'Beginner',
    equipment: ['Basketball'],
    description: 'Hold ball in triple threat, practice jab steps and shot fakes from the position.',
    instructions: [
      'Receive or pick up the ball and immediately get into triple threat: knees bent, weight on balls of feet, ball in your shooting pocket at hip level on your shooting side, eyes up',
      'Hold this position for 5 seconds — feel how balanced and explosive you are from this stance',
      'Execute a jab step: take a short, hard step with your non-pivot foot to one side without lifting your pivot foot, then return to triple threat',
      'Execute a shot fake: raise the ball toward your shoulder as if shooting, watching for the imaginary defender to jump, then bring the ball back down to triple threat',
      'Alternate jab steps and shot fakes for 2 minutes, then combine them: jab step right, shot fake, jab step left',
      'Complete 3 two-minute rounds with 30 seconds rest between rounds'
    ],
    tips: 'Triple threat is the most powerful position in basketball — you can shoot, pass, or drive from it. Every time you catch the ball in a game, your first move should be getting into triple threat. Players who skip this step give away their intentions immediately.'
  },
  {
    id: 'd79',
    name: 'Jab Step Series',
    category: 'Footwork',
    duration: 7,
    difficulty: 'Intermediate',
    equipment: ['Basketball'],
    description: 'Jab right then go, jab then shoot, jab then crossover, master all three reads.',
    instructions: [
      'Start in triple threat position on the right wing with your left foot as the pivot foot',
      'Read 1 — Jab and go: take a short hard jab step right, and if the defender steps back, immediately attack right by driving hard off the jab foot in that same direction',
      'Read 2 — Jab and shoot: take the jab step right, and if the defender steps up to stop the drive, bring the jab foot back and shoot the jumper — they are off balance from reacting to the jab',
      'Read 3 — Jab and crossover: take the jab step right, and if the defender shifts to cut off the right drive, crossover dribble hard to the left and attack that side',
      'Practice each read 10 times individually so the footwork is automatic, then randomize the reads',
      'Complete 3 full sets from both the right and left wing, always starting from a proper triple threat position'
    ],
    tips: 'The jab step only works if it is convincing — a tiny jab does nothing. Step hard enough that a real defender has to react. Then read their response and take what they give you. The three reads are not choices you make — the defender makes them for you.'
  },
  {
    id: 'd80',
    name: 'V-Cut Footwork',
    category: 'Footwork',
    duration: 6,
    difficulty: 'Beginner',
    equipment: [],
    description: 'Cut hard in one direction, plant hard, push off and cut back the other way to get open.',
    instructions: [
      'Start at the 3-point line on the wing — walk your defender down toward the block by taking slow, deliberate steps toward the baseline',
      'When you are 3-4 steps below the 3-point line, plant your inside foot hard into the ground — this plant must be aggressive, not gradual',
      'Push off explosively off the planted foot, changing direction back up toward the 3-point line at a sharp angle',
      'The cut back to the 3-point line should be at maximum speed — this is when you are open, so sprint to the catch point',
      'As you arrive at the 3-point line, get your hands up as a target and be ready to catch in shooting stance',
      'Complete 15 V-cuts on each side of the floor, 2 rounds total'
    ],
    tips: 'The V-cut gets you open by making the defender think you are going one way before exploding the other. The plant is everything — a soft plant means a slow cut, and a slow cut means the defender stays attached. Sell the wrong direction before the plant, then explode.'
  },
  {
    id: 'd81',
    name: 'L-Cut Footwork',
    category: 'Footwork',
    duration: 6,
    difficulty: 'Intermediate',
    equipment: [],
    description: 'Baseline cut then 90-degree turn to the wing, simulate getting open off a curl.',
    instructions: [
      'Start at the block — cut hard along the baseline toward the corner as if clearing out or drawing a defender',
      'After 4-5 hard steps along the baseline, plant your outside foot and make a sharp 90-degree cut up toward the wing at the 3-point line — this creates the L shape',
      'The baseline portion of the cut is designed to pull the defender one direction before the turn, so run it with purpose — do not jog it',
      'As you turn the corner and cut to the wing, get your hands up and be ready to receive the ball immediately at the 3-point line in shooting stance',
      'Practice the cut 10 times on the right side, then 10 times on the left side',
      'Add a ball toss or partner pass at the end of each cut so you practice actually catching and shooting off the footwork'
    ],
    tips: 'The L-cut is used by forwards and wings to get open on the weak side when the ball is on the opposite wing. The key is not rounding the corner — make a clean 90-degree turn. Rounding the corner gives your defender time to recover.'
  },
  {
    id: 'd82',
    name: 'Post Entry Footwork',
    category: 'Footwork',
    duration: 7,
    difficulty: 'Intermediate',
    equipment: ['Basketball', 'Hoop'],
    description: 'Seal defender on entry, catch, pivot to face up or go to the block.',
    instructions: [
      'Establish position on the block by stepping in front of your imaginary defender with your inside foot, using your body to seal them behind you — your back should be to the basket and to the defender',
      'Call for the ball with your top hand as a target while using your bottom arm and body to maintain the seal',
      'Receive the entry pass with two hands and immediately chin the ball — bring it tight to your body at chin height with elbows out to protect it',
      'Read 1 — Face up: catch and pivot on your inside foot to face the basket, reading whether to shoot a face-up jumper or drive',
      'Read 2 — Go to block: catch and execute a drop step, swinging your outside foot toward the baseline or middle to seal the defender and attack the rim directly',
      'Practice 5 face-up reads and 5 drop-step reads from each block, 3 rounds total'
    ],
    tips: 'The entry catch is where most post players get stripped — they catch the ball away from their body and give the defender an angle to poke it out. Catch with two hands, chin it immediately, and use your elbows to create space before making your move.'
  },
];
