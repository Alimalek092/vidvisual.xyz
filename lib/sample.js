export const SAMPLE = {
  title: 'How Memory Actually Works',
  level: 'Beginner',
  minutes: 12,
  quote: 'Testing yourself beats re-reading, every single time.',
  concepts: [
    { emoji: '🧩', title: 'Active recall', text: 'Pulling an answer from memory strengthens it more than looking at it again.' },
    { emoji: '⏳', title: 'Spaced review', text: 'Reviewing just before you forget makes the memory last longer.' },
    { emoji: '🔗', title: 'Connections', text: 'Ideas linked to things you already know are easier to find later.' },
    { emoji: '😴', title: 'Sleep', text: 'Sleep is when the brain files the day into long-term memory.' },
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
    'Close the video and write down what you remember.',
    'Review after a day, a week, then a month.',
    'Explain the idea to someone else in your own words.',
    'Sleep before big exams instead of cramming.',
  ],
};

export const GOLDEN_SAMPLES = {
  // Huberman Lab Focus (both new verified ID and old ID)
  'LG53Vxum0as': {
    title: 'How to Focus to Change Your Brain · Huberman Lab',
    level: 'Intermediate',
    minutes: 90,
    quote: 'Neuroplasticity requires intense mental focus followed by deep rest and slow-wave sleep.',
    concepts: [
      { emoji: '🧠', title: 'Neuroplasticity', text: 'The brain changes its physical connections when challenged with focused attention and effort.' },
      { emoji: '👁️', title: 'Visual Focus', text: 'Narrowing visual aperture to a specific point mechanically drives mental alertness and concentration.' },
      { emoji: '⚡', title: 'Epinephrine & Acetylcholine', text: 'Epinephrine provides energy while acetylcholine acts as a spotlight highlighting what needs to be learned.' },
      { emoji: '🧘', title: 'Non-Sleep Deep Rest (NSDR)', text: '20-minute rest or yoga nidra accelerates memory consolidation right after intense study bouts.' },
      { emoji: '⏳', title: '90-Minute Focus Cycles', text: 'Human ultradian rhythms peak for about 90 minutes; work in 90-minute blocks with total breaks.' },
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
      'Stare at a single point for 30-60 seconds before studying to focus your visual field.',
      'Work in 90-minute ultradian blocks, then disconnect completely for 20 minutes.',
      'Embrace mental friction — error signals are required for the brain to trigger neuroplasticity.',
      'Prioritize deep sleep; actual synapse rewiring happens during sleep, not while studying.',
    ],
  },
  'a9yO-K8mwL0': {
    // Alias to Huberman Focus
    title: 'How to Focus to Change Your Brain · Huberman Lab',
    level: 'Intermediate',
    minutes: 90,
    quote: 'Neuroplasticity requires intense mental focus followed by deep rest and slow-wave sleep.',
    concepts: [
      { emoji: '🧠', title: 'Neuroplasticity', text: 'The brain changes its physical connections when challenged with focused attention and effort.' },
      { emoji: '👁️', title: 'Visual Focus', text: 'Narrowing visual aperture to a specific point mechanically drives mental alertness and concentration.' },
      { emoji: '⚡', title: 'Epinephrine & Acetylcholine', text: 'Epinephrine provides energy while acetylcholine acts as a spotlight highlighting what needs to be learned.' },
      { emoji: '🧘', title: 'Non-Sleep Deep Rest (NSDR)', text: '20-minute rest or yoga nidra accelerates memory consolidation right after intense study bouts.' },
      { emoji: '⏳', title: '90-Minute Focus Cycles', text: 'Human ultradian rhythms peak for about 90 minutes; work in 90-minute blocks with total breaks.' },
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
      'Stare at a single point for 30-60 seconds before studying to focus your visual field.',
      'Work in 90-minute ultradian blocks, then disconnect completely for 20 minutes.',
      'Embrace mental friction — error signals are required for the brain to trigger neuroplasticity.',
      'Prioritize deep sleep; actual synapse rewiring happens during sleep, not while studying.',
    ],
  },

  // 3Blue1Brown Neural Networks
  'aircAruvnKk': {
    title: 'What is a Neural Network? · 3Blue1Brown',
    level: 'Intermediate',
    minutes: 18,
    quote: 'A neural network is simply a mathematical function that maps input activations to output probabilities.',
    concepts: [
      { emoji: '💡', title: 'Neuron Activations', text: 'Each neuron holds a number between 0 and 1 representing its activation level in that layer.' },
      { emoji: '🥞', title: 'Layered Hierarchy', text: 'Early layers detect simple edges, middle layers assemble shapes, and late layers recognize full digits.' },
      { emoji: '⚖️', title: 'Weights & Biases', text: 'Weights determine connection strengths between neurons; biases set the activation threshold.' },
      { emoji: '📉', title: 'Sigmoid / ReLU Function', text: 'Nonlinear activation functions compress raw weighted sums into meaningful activation values.' },
      { emoji: '🎯', title: 'Pattern Recognition', text: 'Networks learn by breaking down complex image recognition into tiny sub-components.' },
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
      'Think of neurons as functions that light up when specific patterns or features appear.',
      'Layering allows the model to build high-level concepts out of primitive building blocks.',
      'Learning in AI is just finding the optimal set of weights and biases to minimize error.',
      'Matrix math enables computers to calculate millions of neuron activations simultaneously.',
    ],
  },

  // Harvard CS50 Algorithms (both verified ID and typo alias)
  'jZzyERW7h1A': {
    title: 'Algorithms & Computational Efficiency · Harvard CS50',
    level: 'Intermediate',
    minutes: 122,
    quote: 'An algorithm is step-by-step instructions for solving a problem with measurable efficiency.',
    concepts: [
      { emoji: '📈', title: 'Big O Notation', text: 'Measures worst-case algorithmic running time as input size n grows toward infinity.' },
      { emoji: '🔍', title: 'Linear vs Binary Search', text: 'Linear search checks every item O(n); binary search divides sorted arrays in half O(log n).' },
      { emoji: '🔀', title: 'Sorting Algorithms', text: 'Bubble sort O(n²) repeatedly swaps neighbors, while Merge sort O(n log n) divides and conquers.' },
      { emoji: '🧩', title: 'Divide and Conquer', text: 'Breaking problems into independent subproblems drastically reduces computational steps.' },
      { emoji: '⚡', title: 'Memory vs Time Tradeoffs', text: 'Faster algorithms often require extra memory buffers to organize and merge data.' },
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
      'Always look at how an algorithm scales as input size doubles or triples.',
      'Binary search turns 4 billion operations into only 32 comparisons.',
      'Sorting your data once pays compounding dividends on all future searches.',
      'Merge sort trades memory space for unmatched O(n log n) speed.',
    ],
  },
  'zYIER3vGdB8': {
    // Alias for the previous typo URL so users who clicked it get instant success!
    title: 'Algorithms & Computational Efficiency · Harvard CS50',
    level: 'Intermediate',
    minutes: 122,
    quote: 'An algorithm is step-by-step instructions for solving a problem with measurable efficiency.',
    concepts: [
      { emoji: '📈', title: 'Big O Notation', text: 'Measures worst-case algorithmic running time as input size n grows toward infinity.' },
      { emoji: '🔍', title: 'Linear vs Binary Search', text: 'Linear search checks every item O(n); binary search divides sorted arrays in half O(log n).' },
      { emoji: '🔀', title: 'Sorting Algorithms', text: 'Bubble sort O(n²) repeatedly swaps neighbors, while Merge sort O(n log n) divides and conquers.' },
      { emoji: '🧩', title: 'Divide and Conquer', text: 'Breaking problems into independent subproblems drastically reduces computational steps.' },
      { emoji: '⚡', title: 'Memory vs Time Tradeoffs', text: 'Faster algorithms often require extra memory buffers to organize and merge data.' },
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
      'Always look at how an algorithm scales as input size doubles or triples.',
      'Binary search turns 4 billion operations into only 32 comparisons.',
      'Sorting your data once pays compounding dividends on all future searches.',
      'Merge sort trades memory space for unmatched O(n log n) speed.',
    ],
  },
};
