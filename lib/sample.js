export const SAMPLE = {
  title: 'How Memory Actually Works',
  level: 'Beginner',
  minutes: 12,
  videoUrl: 'https://www.youtube.com/watch?v=LG53Vxum0as',
  quote: 'Testing yourself beats re-reading, every single time.',
  concepts: [
    { emoji: '🧩', title: 'Active recall', text: 'Pulling an answer from memory strengthens it more than looking at it again.', timestamp: '02:15' },
    { emoji: '⏳', title: 'Spaced review', text: 'Reviewing just before you forget makes the memory last longer.', timestamp: '05:30' },
    { emoji: '🔗', title: 'Connections', text: 'Ideas linked to things you already know are easier to find later.', timestamp: '08:45' },
    { emoji: '😴', title: 'Sleep consolidation', text: 'Sleep is when the brain files the day into long-term memory.', timestamp: '10:20' },
  ],
  mindmap: {
    center: 'Memory',
    branches: [
      { label: 'Encode', children: ['Pay attention', 'Make links'] },
      { label: 'Store', children: ['Sleep', 'Repeat'] },
      { label: 'Recall', children: ['Self-test', 'Explain it'] },
      { label: 'Forget', children: ['Curve', 'Review early'] },
    ],
  },
  takeaways: [
    '[02:15] Close the video and write down what you remember.',
    '[05:30] Review after a day, a week, then a month.',
    '[08:45] Explain the idea to someone else in your own words.',
    '[10:20] Sleep before big exams instead of cramming.',
  ],
};

export const GOLDEN_SAMPLES = {
  // 1. Steve Jobs 2005 Stanford Commencement Speech (100% verified, universal English captions)
  'UF8uR6Z6KLc': {
    title: 'How to Live Before You Die · Steve Jobs',
    level: 'Beginner',
    minutes: 15,
    videoUrl: 'https://www.youtube.com/watch?v=UF8uR6Z6KLc',
    quote: "Your time is limited, so don't waste it living someone else's life.",
    concepts: [
      {
        emoji: '🔗',
        title: 'Connecting the Dots',
        text: 'You cannot connect the dots looking forward; you can only connect them looking backward.',
        timestamp: '03:45',
        timestamps: ['03:45', '05:10'],
      },
      {
        emoji: '❤️',
        title: 'Love & Loss',
        text: 'Getting fired from Apple was the best thing that could have happened — lightness replaced heaviness.',
        timestamp: '07:15',
        timestamps: ['07:15', '08:50'],
      },
      {
        emoji: '⏳',
        title: 'Death as Life Change Agent',
        text: 'Remembering that you are going to die is the best way to avoid the trap of thinking you have something to lose.',
        timestamp: '10:30',
        timestamps: ['10:30', '12:05'],
      },
      {
        emoji: '🧭',
        title: 'Inner Voice & Intuition',
        text: "Don't let the noise of others' opinions drown out your own inner voice, heart, and intuition.",
        timestamp: '12:40',
        timestamps: ['12:40'],
      },
      {
        emoji: '⚡',
        title: 'Stay Hungry, Stay Foolish',
        text: 'Never settle. Keep looking until you find what you love, in your work and in your life.',
        timestamp: '13:50',
        timestamps: ['13:50', '14:35'],
      },
    ],
    mindmap: {
      center: 'Life Lessons · Steve Jobs',
      branches: [
        { label: 'The 3 Stories', children: ['Connecting dots', 'Love & loss', 'Facing mortality'] },
        { label: 'Work Philosophy', children: ['Find what you love', 'Never settle', 'Do great work'] },
        { label: 'Perspective', children: ['Death clears old', 'Intuition first', 'Beginner mindset'] },
        { label: 'Call to Action', children: ['Stay hungry', 'Stay foolish', 'Follow heart'] },
      ],
    },
    takeaways: [
      '[03:45] Trust that the dots will somehow connect in your future.',
      '[07:15] The only way to be truly satisfied is to do what you believe is great work.',
      '[10:30] Almost everything — pride, fear of embarrassment — falls away in the face of death.',
      '[13:50] Stay Hungry. Stay Foolish. Always keep the beginner appetite alive.',
    ],
  },

  // 2. Huberman Lab Focus & Neuroplasticity (Proven verified study hit)
  'LG53Vxum0as': {
    title: 'How to Focus to Change Your Brain · Huberman Lab',
    level: 'Intermediate',
    minutes: 90,
    videoUrl: 'https://www.youtube.com/watch?v=LG53Vxum0as',
    quote: 'Neuroplasticity requires intense mental focus followed by deep rest and slow-wave sleep.',
    concepts: [
      {
        emoji: '🧠',
        title: 'Neuroplasticity',
        text: 'The brain changes physical synaptic connections when challenged with focused attention and error signals.',
        timestamp: '04:15',
        timestamps: ['04:15', '08:20'],
      },
      {
        emoji: '👁️',
        title: 'Visual Aperture Focus',
        text: 'Narrowing visual aperture to a specific point mechanically drives mental alertness and executive concentration.',
        timestamp: '14:30',
        timestamps: ['14:30', '17:45'],
      },
      {
        emoji: '⚡',
        title: 'Epinephrine & Acetylcholine',
        text: 'Epinephrine provides the alertness energy while acetylcholine acts as a spotlight highlighting what is learned.',
        timestamp: '28:10',
        timestamps: ['28:10', '32:00'],
      },
      {
        emoji: '🧘',
        title: 'Non-Sleep Deep Rest (NSDR)',
        text: 'A 20-minute rest or yoga nidra session accelerates memory consolidation right after intense study bouts.',
        timestamp: '47:20',
        timestamps: ['47:20', '52:10'],
      },
      {
        emoji: '⏳',
        title: '90-Minute Focus Cycles',
        text: 'Human ultradian rhythms peak for about 90 minutes; work in 90-minute blocks with total cognitive breaks.',
        timestamp: '68:45',
        timestamps: ['68:45', '73:30'],
      },
    ],
    mindmap: {
      center: 'Focus & Neuroplasticity',
      branches: [
        { label: 'Triggers', children: ['Visual focus', 'High alertness', 'Deliberate friction'] },
        { label: 'Neurochemicals', children: ['Epinephrine', 'Acetylcholine', 'Dopamine'] },
        { label: 'Consolidation', children: ['Slow-wave sleep', 'NSDR protocol', 'Zero stimulation'] },
        { label: 'Protocols', children: ['90-min blocks', 'Optic flow walks', 'Morning sunlight'] },
      ],
    },
    takeaways: [
      '[14:30] Stare at a single focal point for 30-60 seconds before studying to prime visual and mental alertness.',
      '[68:45] Work in 90-minute ultradian blocks, then disconnect completely for 20 minutes.',
      '[04:15] Embrace mental friction — error signals are biologically required to trigger neuroplasticity.',
      '[47:20] Do 20 minutes of NSDR or deep rest post-study; actual synaptic rewiring happens in rest.',
    ],
  },
  'a9yO-K8mwL0': {
    // Alias to Huberman Focus
    title: 'How to Focus to Change Your Brain · Huberman Lab',
    level: 'Intermediate',
    minutes: 90,
    videoUrl: 'https://www.youtube.com/watch?v=LG53Vxum0as',
    quote: 'Neuroplasticity requires intense mental focus followed by deep rest and slow-wave sleep.',
    concepts: [
      { emoji: '🧠', title: 'Neuroplasticity', text: 'The brain changes physical synaptic connections when challenged with focused attention and effort.', timestamp: '04:15' },
      { emoji: '👁️', title: 'Visual Aperture Focus', text: 'Narrowing visual aperture to a specific point mechanically drives mental alertness.', timestamp: '14:30' },
      { emoji: '⚡', title: 'Epinephrine & Acetylcholine', text: 'Epinephrine provides energy while acetylcholine acts as a spotlight highlighting learning.', timestamp: '28:10' },
      { emoji: '🧘', title: 'Non-Sleep Deep Rest (NSDR)', text: '20-minute rest or yoga nidra accelerates memory consolidation right after study.', timestamp: '47:20' },
      { emoji: '⏳', title: '90-Minute Focus Cycles', text: 'Human ultradian rhythms peak for about 90 minutes; work in 90-minute blocks.', timestamp: '68:45' },
    ],
    mindmap: {
      center: 'Focus & Neuroplasticity',
      branches: [
        { label: 'Triggers', children: ['Visual focus', 'High alertness', 'Deliberate friction'] },
        { label: 'Neurochemicals', children: ['Epinephrine', 'Acetylcholine', 'Dopamine'] },
        { label: 'Consolidation', children: ['Slow-wave sleep', 'NSDR protocol', 'Zero stimulation'] },
        { label: 'Protocols', children: ['90-min blocks', 'Optic flow walks', 'Morning sunlight'] },
      ],
    },
    takeaways: [
      '[14:30] Stare at a single point for 30-60 seconds before studying to focus your visual field.',
      '[68:45] Work in 90-minute ultradian blocks, then disconnect completely for 20 minutes.',
      '[04:15] Embrace mental friction — error signals are required for the brain to trigger neuroplasticity.',
      '[47:20] Prioritize deep rest; actual synapse rewiring happens during rest, not while studying.',
    ],
  },

  // 3. Veritasium - The 4 Rules to Master Any Skill
  '5eW6Eagr9XA': {
    title: 'The 4 Rules to Master Any Skill · Veritasium',
    level: 'Intermediate',
    minutes: 18,
    videoUrl: 'https://www.youtube.com/watch?v=5eW6Eagr9XA',
    quote: 'Experience alone does not produce expertise; deliberate practice with instant feedback does.',
    concepts: [
      {
        emoji: '🔁',
        title: 'Repeated Deliberate Practice',
        text: 'Repetition must be focused and intentional, specifically targeting the weak links in your execution.',
        timestamp: '02:10',
        timestamps: ['02:10', '04:15'],
      },
      {
        emoji: '🎯',
        title: 'Immediate Valid Feedback',
        text: 'Learning stalls if you cannot immediately see the results of your actions and correct mistakes in real time.',
        timestamp: '05:30',
        timestamps: ['05:30', '07:40'],
      },
      {
        emoji: '🌐',
        title: 'Environment of Regularities',
        text: 'Expert intuition only develops in domains with consistent causal rules, like chess, math, or aviation.',
        timestamp: '08:45',
        timestamps: ['08:45', '11:10'],
      },
      {
        emoji: '🧗',
        title: 'Operating at the Edge',
        text: 'Staying in your comfort zone produces automaticity, not improvement. You must train at your failure threshold.',
        timestamp: '12:20',
        timestamps: ['12:20', '15:15'],
      },
    ],
    mindmap: {
      center: 'Master Any Skill',
      branches: [
        { label: 'Rule 1: Practice', children: ['Targeted repetition', 'Break down skills', 'Deliberate effort'] },
        { label: 'Rule 2: Feedback', children: ['Immediate signals', 'Objective metrics', 'Fast correction'] },
        { label: 'Rule 3: Environment', children: ['Predictable rules', 'Causal systems', 'Valid patterns'] },
        { label: 'Rule 4: Edge', children: ['Failure threshold', 'Discomfort zone', 'Constant stretch'] },
      ],
    },
    takeaways: [
      '[02:10] Break down complex skills into micro-components and drill each separately.',
      '[05:30] Shorten feedback loops — know within seconds whether your attempt was right or wrong.',
      '[08:45] Beware of domains with high randomness where feedback is deceptive.',
      '[12:20] If you never make mistakes during practice, you are practicing too comfortably.',
    ],
  },

  // 4. 3Blue1Brown - The Essence of Calculus, Chapter 1
  'WUvTyaaNkzM': {
    title: 'The Essence of Calculus, Chapter 1 · 3Blue1Brown',
    level: 'Intermediate',
    minutes: 17,
    videoUrl: 'https://www.youtube.com/watch?v=WUvTyaaNkzM',
    quote: 'Calculus is the art of breaking complex curved problems into infinite simple straight approximations.',
    concepts: [
      {
        emoji: '⭕',
        title: 'Area of a Circle Paradox',
        text: 'Unrolling concentric rings of a circle transforms the curved area problem into a simple straight triangle.',
        timestamp: '02:15',
        timestamps: ['02:15', '04:50'],
      },
      {
        emoji: '📏',
        title: 'Infinitesimal Width (dr)',
        text: 'Making ring thickness dr infinitesimally small makes approximations infinitely closer to exact reality.',
        timestamp: '05:40',
        timestamps: ['05:40', '08:20'],
      },
      {
        emoji: '📐',
        title: 'Integrals as Accumulation',
        text: 'Integration is finding the area under a curve by adding together infinitely many tiny rectangular slices.',
        timestamp: '09:10',
        timestamps: ['09:10', '11:45'],
      },
      {
        emoji: '📈',
        title: 'Derivatives as Sensitivity',
        text: 'Derivatives measure how tiny changes in input produce proportional changes in the output value.',
        timestamp: '13:25',
        timestamps: ['13:25', '15:50'],
      },
    ],
    mindmap: {
      center: 'Essence of Calculus',
      branches: [
        { label: 'Geometry', children: ['Concentric rings', 'Unrolled triangle', 'Area formula πr²'] },
        { label: 'Integration', children: ['Sum of slices', 'Infinitesimal dr', 'Area under curve'] },
        { label: 'Differentiation', children: ['Slope of tangent', 'Instant rate', 'Local linearity'] },
        { label: 'Fundamental Theorem', children: ['Inverse operations', 'Accumulation vs rate', 'Connecting both'] },
      ],
    },
    takeaways: [
      '[02:15] Solve hard curved geometry problems by slicing them into thin parts and unrolling them straight.',
      '[05:40] Infinitesimal calculus turns impossible nonlinear problems into manageable linear sums.',
      '[09:10] Think of integrals as smart area accumulators and derivatives as instant rate detectors.',
      '[13:25] Derivatives and integrals are opposite sides of the exact same geometric coin.',
    ],
  },

  // 5. 3Blue1Brown - What is a Neural Network? (Alias for backwards compatibility)
  'aircAruvnKk': {
    title: 'What is a Neural Network? · 3Blue1Brown',
    level: 'Intermediate',
    minutes: 18,
    videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk',
    quote: 'A neural network is a mathematical function that maps input activations to output probabilities.',
    concepts: [
      { emoji: '💡', title: 'Neuron Activations', text: 'Each neuron holds a number between 0 and 1 representing its activation level.', timestamp: '01:50', timestamps: ['01:50', '03:40'] },
      { emoji: '🥞', title: 'Layered Hierarchy', text: 'Early layers detect edges, middle layers assemble shapes, late layers recognize digits.', timestamp: '05:15', timestamps: ['05:15', '07:20'] },
      { emoji: '⚖️', title: 'Weights & Biases', text: 'Weights determine connection strengths; biases set the activation threshold.', timestamp: '08:30', timestamps: ['08:30', '11:10'] },
      { emoji: '📉', title: 'Sigmoid / ReLU Function', text: 'Nonlinear functions compress raw weighted sums into meaningful activation values.', timestamp: '12:05', timestamps: ['12:05', '14:20'] },
      { emoji: '🎯', title: 'Pattern Recognition', text: 'Networks learn by breaking down complex image recognition into tiny sub-components.', timestamp: '15:10', timestamps: ['15:10'] },
    ],
    mindmap: {
      center: 'Neural Network',
      branches: [
        { label: 'Architecture', children: ['Input 784 pixels', 'Hidden layers', 'Output 10 digits'] },
        { label: 'Parameters', children: ['Connection weights', 'Neuron biases', 'Total 13,000+'] },
        { label: 'Computation', children: ['Weighted sum', 'Sigmoid activation', 'Matrix multiplication'] },
        { label: 'Abstraction', children: ['Pixel edges', 'Component loops', 'Complete numbers'] },
      ],
    },
    takeaways: [
      '[01:50] Think of neurons as functions that light up when specific patterns appear.',
      '[05:15] Layering allows the model to build high-level concepts out of primitive building blocks.',
      '[08:30] Learning in AI is finding the optimal set of weights and biases to minimize error.',
      '[12:05] Matrix multiplication enables calculating millions of neuron activations simultaneously.',
    ],
  },

  // 6. Harvard CS50 Algorithms (Alias for backwards compatibility)
  'jZzyERW7h1A': {
    title: 'Algorithms & Computational Efficiency · Harvard CS50',
    level: 'Intermediate',
    minutes: 122,
    videoUrl: 'https://www.youtube.com/watch?v=jZzyERW7h1A',
    quote: 'An algorithm is step-by-step instructions for solving a problem with measurable efficiency.',
    concepts: [
      { emoji: '📈', title: 'Big O Notation', text: 'Measures worst-case algorithmic running time as input size n grows toward infinity.', timestamp: '08:30', timestamps: ['08:30', '14:20'] },
      { emoji: '🔍', title: 'Linear vs Binary Search', text: 'Linear search checks every item O(n); binary search divides sorted arrays in half O(log n).', timestamp: '22:15', timestamps: ['22:15', '28:40'] },
      { emoji: '🔀', title: 'Sorting Algorithms', text: 'Bubble sort O(n²) repeatedly swaps neighbors, while Merge sort O(n log n) divides and conquers.', timestamp: '45:10', timestamps: ['45:10', '58:00'] },
      { emoji: '🧩', title: 'Divide and Conquer', text: 'Breaking problems into independent subproblems drastically reduces computational steps.', timestamp: '72:30', timestamps: ['72:30'] },
      { emoji: '⚡', title: 'Memory vs Time Tradeoffs', text: 'Faster algorithms often require extra memory buffers to organize and merge data.', timestamp: '95:40', timestamps: ['95:40'] },
    ],
    mindmap: {
      center: 'CS50 Algorithms',
      branches: [
        { label: 'Complexity', children: ['Big O worst-case', 'Big Omega best-case', 'Theta tight bound'] },
        { label: 'Searching', children: ['Linear search O(n)', 'Binary search O(log n)', 'Sorted arrays'] },
        { label: 'Sorting', children: ['Selection sort', 'Bubble sort', 'Merge sort O(n log n)'] },
        { label: 'Principles', children: ['Recursion', 'Divide & conquer', 'Algorithmic tradeoffs'] },
      ],
    },
    takeaways: [
      '[08:30] Always analyze how an algorithm scales as input size doubles or triples.',
      '[22:15] Binary search turns 4 billion operations into only 32 comparisons.',
      '[45:10] Sorting your data once pays compounding dividends on all future searches.',
      '[72:30] Merge sort trades memory space for unmatched O(n log n) speed.',
    ],
  },
  'zYIER3vGdB8': {
    // Alias for old typo link
    title: 'Algorithms & Computational Efficiency · Harvard CS50',
    level: 'Intermediate',
    minutes: 122,
    videoUrl: 'https://www.youtube.com/watch?v=jZzyERW7h1A',
    quote: 'An algorithm is step-by-step instructions for solving a problem with measurable efficiency.',
    concepts: [
      { emoji: '📈', title: 'Big O Notation', text: 'Measures worst-case algorithmic running time as input size n grows.', timestamp: '08:30' },
      { emoji: '🔍', title: 'Linear vs Binary Search', text: 'Linear search O(n) vs binary search O(log n).', timestamp: '22:15' },
      { emoji: '🔀', title: 'Sorting Algorithms', text: 'Bubble sort O(n²) vs Merge sort O(n log n).', timestamp: '45:10' },
      { emoji: '🧩', title: 'Divide and Conquer', text: 'Breaking problems into subproblems drastically reduces steps.', timestamp: '72:30' },
      { emoji: '⚡', title: 'Memory vs Time Tradeoffs', text: 'Faster algorithms often require extra memory buffers.', timestamp: '95:40' },
    ],
    mindmap: {
      center: 'CS50 Algorithms',
      branches: [
        { label: 'Complexity', children: ['Big O worst-case', 'Big Omega best-case', 'Theta tight bound'] },
        { label: 'Searching', children: ['Linear search O(n)', 'Binary search O(log n)', 'Sorted arrays'] },
        { label: 'Sorting', children: ['Selection sort', 'Bubble sort', 'Merge sort O(n log n)'] },
        { label: 'Principles', children: ['Recursion', 'Divide & conquer', 'Algorithmic tradeoffs'] },
      ],
    },
    takeaways: [
      '[08:30] Always analyze how an algorithm scales as input size doubles or triples.',
      '[22:15] Binary search turns 4 billion operations into only 32 comparisons.',
      '[45:10] Sorting your data once pays compounding dividends on all future searches.',
      '[72:30] Merge sort trades memory space for unmatched O(n log n) speed.',
    ],
  },
};
