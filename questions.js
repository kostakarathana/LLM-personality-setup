// questions.js — V2: Research-backed questions with psychological depth
//
// Question types:
//   mc        — Multiple choice (single select)
//   scenario  — Theoretical scenario revealing hidden trait
//   dichotomy — Forced binary choice between two values
//   tradeoff  — Pick position on a spectrum between two desirable poles
//   rank      — Rank items in order of preference
//   modality  — Same concept presented 4 ways, pick preferred representation
//   short     — Short text response (1–2 sentences)
//
// Each question has:
//   id, category, type, text, trait,
//   options (for mc/dichotomy/modality),
//   poles (for tradeoff),
//   items (for rank),
//   interpret: function(answer) → { label, score, note } for XML output
//
// Research basis noted in comments per section.

const questions = [

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. COGNITIVE STYLE — How you think (CRT, NFC, Field Dependence)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Cognitive Reflection Test adapted (Frederick 2005) — reveals System 1 vs System 2
  {
    id: 1,
    category: "How You Think",
    type: "scenario",
    text: "A notebook and a pen cost $1.10 together. The notebook costs $1.00 more than the pen. How much does the pen cost?",
    options: ["$0.10", "$0.05", "$0.50", "$0.01"],
    correctIndex: 1,
    trait: "cognitive_reflection",
    interpret: (ans) => {
      if (ans === 1) return { label: "Reflective thinker", score: "high", note: "Overrides intuitive impulse, engages analytical reasoning (System 2)" };
      return { label: "Intuitive thinker", score: "low", note: "Relies on quick intuitive judgments (System 1); may benefit from step-by-step explanations" };
    }
  },
  // Adapted CRT #2
  {
    id: 2,
    category: "How You Think",
    type: "scenario",
    text: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
    options: ["100 minutes", "5 minutes", "20 minutes", "1 minute"],
    correctIndex: 1,
    trait: "cognitive_reflection",
    interpret: (ans) => {
      if (ans === 1) return { label: "Analytical processor", score: "high", note: "Correctly identifies rate relationships; strong logical decomposition" };
      return { label: "Heuristic processor", score: "low", note: "Tends toward pattern-matching over deduction; benefits from worked examples" };
    }
  },

  // Need for Cognition (Cacioppo & Petty 1982) — adapted items
  {
    id: 3,
    category: "How You Think",
    type: "mc",
    text: "How do you feel about puzzles, brain teasers, or problems that require hard thinking?",
    options: [
      "I actively seek them out — thinking hard is satisfying",
      "I enjoy them when I encounter them but don't seek them",
      "I'll do them if needed but wouldn't choose to",
      "I avoid them — I prefer things that don't require that kind of effort"
    ],
    trait: "need_for_cognition",
    interpret: (ans) => {
      const levels = ["Very high", "Moderate-high", "Moderate-low", "Low"];
      const notes = [
        "Intrinsically motivated by effortful cognition; thrives on depth and complexity",
        "Appreciates intellectual challenge but doesn't seek it compulsively",
        "Prefers practical over intellectual for its own sake",
        "Favors efficiency and simplicity; detailed reasoning may feel burdensome"
      ];
      return { label: "NFC: " + levels[ans], score: 4 - ans, note: notes[ans] };
    }
  },
  {
    id: 4,
    category: "How You Think",
    type: "mc",
    text: "When you encounter an explanation, which best describes your reaction?",
    options: [
      "I enjoy abstract reasoning — the more conceptual the better",
      "I prefer to think deeply but need it tied to something concrete",
      "I want the essence without the philosophizing",
      "Just tell me the answer — I trust competent sources"
    ],
    trait: "need_for_cognition",
    interpret: (ans) => {
      const levels = ["Very high", "High", "Moderate", "Low"];
      return { label: "Cognitive engagement: " + levels[ans], score: 4 - ans, note: ["Relishes abstract reasoning", "Deep thinker who needs grounding", "Practical processor", "Defers to authority; values efficiency over exploration"][ans] };
    }
  },

  // Tolerance for Ambiguity (Budner 1962)
  {
    id: 5,
    category: "How You Think",
    type: "tradeoff",
    text: "Where do you fall between these two positions?",
    poles: [
      "I thrive in ambiguity — unclear situations are where creative thinking happens",
      "I need clarity — ambiguity causes stress and I need a framework to operate"
    ],
    trait: "ambiguity_tolerance",
    interpret: (ans) => {
      if (ans <= 1) return { label: "High ambiguity tolerance", score: 5 - ans, note: "Comfortable navigating uncertainty; can handle open-ended prompts and explore without guardrails" };
      if (ans === 2) return { label: "Moderate ambiguity tolerance", score: 3, note: "Manages ambiguity but appreciates some structure" };
      return { label: "Low ambiguity tolerance", score: 5 - ans, note: "Prefers structured, well-defined information; provide clear frameworks and explicit steps" };
    }
  },

  // Growth Mindset (Dweck 2006)
  {
    id: 6,
    category: "How You Think",
    type: "dichotomy",
    text: "Which statement resonates more with you?",
    options: [
      "Intelligence and talent are things you can develop substantially through effort",
      "People have a natural level of ability — effort helps, but fundamentals are largely fixed"
    ],
    trait: "growth_mindset",
    interpret: (ans) => {
      if (ans === 0) return { label: "Growth mindset", score: "high", note: "Believes in malleability of ability; motivated by challenge and learning from failure. Frame challenges as growth opportunities." };
      return { label: "Fixed mindset tendency", score: "low", note: "Sees ability as more innate; may avoid challenges that risk failure. Emphasize proven methods and build confidence gradually." };
    }
  },

  // Dual Process — Elaboration Likelihood (Petty & Cacioppo 1986)
  {
    id: 7,
    category: "How You Think",
    type: "scenario",
    text: "You're choosing between two competing tools for a task. A respected expert recommends Tool A, but a random forum post provides a detailed, well-reasoned argument for Tool B. What do you do?",
    options: [
      "Go with Tool A — expert recommendation is enough",
      "Lean toward A but skim the argument for B",
      "Read the argument for B carefully before deciding",
      "Judge purely on the strength of arguments, regardless of source"
    ],
    trait: "elaboration_likelihood",
    interpret: (ans) => {
      const routes = ["Peripheral processor", "Peripheral-leaning", "Central-leaning", "Central processor"];
      const notes = [
        "Relies on source credibility and heuristics; keep recommendations clear and authoritative",
        "Influenced by authority but open to arguments; lead with credentials then back with reasoning",
        "Weighs arguments carefully; provide thorough reasoning even from unknown sources",
        "Evaluates argument quality independent of source; prioritize logical rigor over appeal to authority"
      ];
      return { label: routes[ans], score: ans + 1, note: notes[ans] };
    }
  },

  // Metacognition (Flavell 1979)
  {
    id: 8,
    category: "How You Think",
    type: "mc",
    text: "How aware are you of your own thinking strategies?",
    options: [
      "Very — I often monitor and adjust how I'm approaching a problem mid-process",
      "Somewhat — I notice patterns in my thinking but don't always adjust",
      "Rarely — I tend to just think without examining the process",
      "I'm not sure what you mean by 'thinking strategies'"
    ],
    trait: "metacognition",
    interpret: (ans) => {
      const levels = ["High metacognition", "Moderate metacognition", "Low metacognition", "Minimal metacognition"];
      const notes = [
        "Strong self-awareness of cognitive processes; can benefit from meta-level guidance",
        "Some reflective capacity; occasional prompts to step back and evaluate approach",
        "Operates mostly on autopilot cognitively; explicit process scaffolding helps",
        "Limited metacognitive awareness; benefit most from structured step-by-step guidance"
      ];
      return { label: levels[ans], score: 4 - ans, note: notes[ans] };
    }
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2. PERSONALITY & TEMPERAMENT — Who you are (Big Five adapted)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Openness
  {
    id: 9,
    category: "Your Personality",
    type: "dichotomy",
    text: "Which feels more like you?",
    options: [
      "I'd rather explore ten new ideas shallowly than master one deeply",
      "I'd rather master one thing deeply than skim across ten"
    ],
    trait: "openness_breadth",
    interpret: (ans) => {
      if (ans === 0) return { label: "Breadth-oriented", score: "high_openness", note: "Drawn to novelty and variety; provide diverse perspectives and tangential connections" };
      return { label: "Depth-oriented", score: "low_openness", note: "Prefers mastery and focused depth; go deep on topics rather than branching" };
    }
  },
  {
    id: 10,
    category: "Your Personality",
    type: "scenario",
    text: "You're at a bookstore with a gift card. You'll most likely leave with:",
    options: [
      "Something from a genre or topic I've never tried",
      "Something recommended that's slightly outside my usual",
      "A deeper dive into a topic I already love",
      "The next installment of something I'm already reading"
    ],
    trait: "openness_novelty",
    interpret: (ans) => {
      const labels = ["High novelty seeker", "Moderate novelty seeker", "Depth seeker", "Familiarity seeker"];
      return { label: labels[ans], score: 4 - ans, note: ["Actively seeks unfamiliar territory", "Open to new things with gentle nudges", "Prefers deepening existing interests", "Values the familiar and predictable"][ans] };
    }
  },

  // Conscientiousness
  {
    id: 11,
    category: "Your Personality",
    type: "tradeoff",
    text: "Where do you fall?",
    poles: [
      "I plan meticulously — outlines, timelines, milestones before I start",
      "I dive in and iterate — planning too much feels like procrastination"
    ],
    trait: "conscientiousness_planning",
    interpret: (ans) => {
      if (ans <= 1) return { label: "High structured planning", score: 5 - ans, note: "Thrives with organized, sequential information; provide clear structure and roadmaps" };
      if (ans === 2) return { label: "Balanced planner", score: 3, note: "Flexible between structure and exploration" };
      return { label: "Low structured planning", score: 5 - ans, note: "Prefers learning by doing; provide actionable starting points over lengthy plans" };
    }
  },

  // Extraversion — internal processing
  {
    id: 12,
    category: "Your Personality",
    type: "mc",
    text: "When processing a complex idea, you prefer to:",
    options: [
      "Think it through alone in silence",
      "Write my thoughts down to organize them",
      "Talk it out — even to hear myself think",
      "Alternate between solo thinking and discussion"
    ],
    trait: "extraversion_processing",
    interpret: (ans) => {
      const labels = ["Internal processor", "Written processor", "Verbal processor", "Mixed processor"];
      const notes = [
        "Processes best internally; provide complete information for independent contemplation",
        "Externalizes thinking through writing; structured written responses work best",
        "Thinks by talking; conversational, back-and-forth style works best",
        "Flexible processor; can handle both dense text and interactive dialogue"
      ];
      return { label: labels[ans], score: ans, note: notes[ans] };
    }
  },

  // Agreeableness — conflict style
  {
    id: 13,
    category: "Your Personality",
    type: "scenario",
    text: "You're in a meeting and someone proposes an approach you know is flawed. You:",
    options: [
      "Point out the flaw immediately and directly",
      "Ask a probing question that leads them to discover the flaw",
      "Privately mention it to them after the meeting",
      "Say nothing unless directly asked for your opinion"
    ],
    trait: "agreeableness_conflict",
    interpret: (ans) => {
      const labels = ["Direct challenger", "Socratic challenger", "Diplomatic corrector", "Conflict-averse"];
      const notes = [
        "Values directness; responds well to blunt, honest feedback",
        "Prefers guided discovery; benefits from questions over declarations",
        "Values harmony; prefers corrections delivered with tact",
        "Avoids confrontation; frame corrections as collaborative refinement"
      ];
      return { label: labels[ans], score: 4 - ans, note: notes[ans] };
    }
  },

  // Emotional Stability
  {
    id: 14,
    category: "Your Personality",
    type: "mc",
    text: "When you make a clear mistake in something that matters, your honest reaction is:",
    options: [
      "Shrug and fix it — mistakes are just data",
      "Brief frustration, then focused analysis of what went wrong",
      "Frustration that lingers — I dwell on mistakes more than I should",
      "It can spiral — mistakes undermine my confidence significantly"
    ],
    trait: "emotional_stability",
    interpret: (ans) => {
      const labels = ["Very high stability", "High stability", "Moderate stability", "Lower stability"];
      const notes = [
        "Resilient to errors; direct correction without cushioning works well",
        "Manages emotions well; straightforward feedback with brief context is fine",
        "Emotional investment in performance; balance honesty with encouragement",
        "Sensitive to setbacks; frame mistakes as learning opportunities and normalize them"
      ];
      return { label: labels[ans], score: 4 - ans, note: notes[ans] };
    }
  },

  // Regulatory Focus (Higgins 1997)
  {
    id: 15,
    category: "Your Personality",
    type: "scenario",
    text: "You're starting a new side project. Which thought dominates your planning?",
    options: [
      "This could be incredible — I'm imagining all the possibilities",
      "If I approach this right, I might create something really valuable",
      "Let me figure out all the ways this could go wrong so I can prevent them",
      "I need to make sure this doesn't become a waste of time"
    ],
    trait: "regulatory_focus",
    interpret: (ans) => {
      if (ans <= 1) return { label: "Promotion-focused", score: "promotion", note: "Motivated by achievement and gains; frame goals in terms of opportunity and potential upside" };
      return { label: "Prevention-focused", score: "prevention", note: "Motivated by security and avoiding losses; frame goals in terms of risk mitigation and safety nets" };
    }
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3. LEARNING & INFORMATION PROCESSING
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Dual Coding (Paivio 1971)
  {
    id: 16,
    category: "How You Learn",
    type: "modality",
    text: "You need to understand how a sorting algorithm works. Which explanation format appeals to you most?",
    options: [
      { label: "Visual", desc: "An animated step-by-step diagram showing elements being compared and swapped" },
      { label: "Verbal", desc: "A clear written paragraph walking through the logic in plain English" },
      { label: "Symbolic", desc: "Pseudocode or actual code with inline comments" },
      { label: "Kinesthetic", desc: "A hands-on exercise where you sort things yourself following rules" }
    ],
    trait: "information_modality",
    interpret: (ans) => {
      const modalities = ["Visual-spatial", "Verbal-linguistic", "Symbolic-abstract", "Kinesthetic-experiential"];
      const notes = [
        "Processes best through imagery, diagrams, spatial representation; use visual aids",
        "Processes best through narrative text and verbal explanation; use clear prose",
        "Processes best through formal notation, code, formulas; use precise symbolic representation",
        "Processes best through doing and practice; provide exercises and hands-on tasks"
      ];
      return { label: modalities[ans], score: ans, note: notes[ans] };
    }
  },

  // Sequential vs Global (Felder-Silverman)
  {
    id: 17,
    category: "How You Learn",
    type: "dichotomy",
    text: "When learning a complex system, do you prefer:",
    options: [
      "Building up piece by piece — understand each component before seeing the whole",
      "Getting the big picture first — then drilling into the details as needed"
    ],
    trait: "sequential_global",
    interpret: (ans) => {
      if (ans === 0) return { label: "Sequential learner", score: "sequential", note: "Learns in logical, incremental steps; present information in ordered sequence from simple to complex" };
      return { label: "Global learner", score: "global", note: "Needs the big picture first; provide overview/map before diving into details" };
    }
  },

  // Depth of processing (Marton & Saljo 1976)
  {
    id: 18,
    category: "How You Learn",
    type: "mc",
    text: "When being taught something, how important is understanding the underlying 'why'?",
    options: [
      "Essential — I can't use something without fundamentally understanding it",
      "Very — I want the why, but I'll start using it before fully grasping it",
      "Somewhat — I'll dig into the why later if it becomes relevant",
      "Not very — just show me how to do it effectively"
    ],
    trait: "depth_processing",
    interpret: (ans) => {
      const labels = ["Deep processor", "Deep-leaning", "Surface-leaning", "Surface processor"];
      const notes = [
        "Needs conceptual understanding before application; always explain the reasoning",
        "Prefers understanding but pragmatic; lead with the why but keep it moving",
        "Practically oriented; explain the why briefly but prioritize the how",
        "Action-oriented learner; provide steps and procedures, skip extended theory"
      ];
      return { label: labels[ans], score: 4 - ans, note: notes[ans] };
    }
  },

  // Example density
  {
    id: 19,
    category: "How You Learn",
    type: "mc",
    text: "When understanding a concept, how many examples do you typically need?",
    options: [
      "One clear example — I generalize quickly",
      "Two or three varied examples to see the pattern",
      "Several examples across different contexts",
      "I prefer the rule stated clearly rather than examples"
    ],
    trait: "example_density",
    interpret: (ans) => {
      if (ans === 0) return { label: "Fast generalizer", score: 1, note: "Rapidly extracts patterns; one example is sufficient; don't over-illustrate" };
      if (ans === 1) return { label: "Pattern matcher", score: 2, note: "Needs 2-3 examples to triangulate the principle; provide varied examples" };
      if (ans === 2) return { label: "Example-dependent", score: 3, note: "Learns inductively through many examples; provide rich case studies" };
      return { label: "Rule-first learner", score: 0, note: "Learns deductively from stated principles; state the rule then optionally illustrate" };
    }
  },

  // Analogy preference
  {
    id: 20,
    category: "How You Learn",
    type: "tradeoff",
    text: "How useful are analogies and metaphors in explanations?",
    poles: [
      "Extremely useful — analogies are how I build understanding",
      "I prefer direct, literal, precise explanations over analogies"
    ],
    trait: "analogy_preference",
    interpret: (ans) => {
      if (ans <= 1) return { label: "Analogy-driven learner", score: 5 - ans, note: "Maps new concepts onto familiar ones; use rich analogies and metaphors freely" };
      if (ans === 2) return { label: "Analogy-neutral", score: 3, note: "Analogies sometimes help; use selectively and always pair with precise definition" };
      return { label: "Literal-precise learner", score: 5 - ans, note: "Finds analogies imprecise or misleading; use direct, exact language" };
    }
  },

  // Challenge level (Vygotsky ZPD)
  {
    id: 21,
    category: "How You Learn",
    type: "mc",
    text: "Do you prefer to be taught at your current level or above it?",
    options: [
      "Above — push me, I rise to meet the challenge",
      "Slightly above — stretch me but don't overwhelm",
      "At my level — let me solidify before advancing",
      "Below first — master the fundamentals, then build up"
    ],
    trait: "challenge_preference",
    interpret: (ans) => {
      const labels = ["High stretch seeker", "Moderate stretch seeker", "Consolidator", "Foundation builder"];
      const notes = [
        "Thrives at upper edge of ability; teach slightly beyond current level",
        "Responds to moderate challenge; teach just above comfort zone (Vygotsky's ZPD)",
        "Prefers mastery before progression; ensure current concepts are solid first",
        "Needs strong foundations; start basic and build incrementally"
      ];
      return { label: labels[ans], score: 4 - ans, note: notes[ans] };
    }
  },

  // Error correction
  {
    id: 22,
    category: "How You Learn",
    type: "mc",
    text: "When you make an error while learning, you prefer:",
    options: [
      "Immediate direct correction — tell me what's wrong and why",
      "A hint that points me toward discovering the error myself",
      "Let me finish, then show a comparison of my approach vs the correct one",
      "Struggle on my own — I'll ask if I'm truly stuck"
    ],
    trait: "error_correction",
    interpret: (ans) => {
      const labels = ["Direct correction", "Guided discovery", "Post-comparison", "Self-directed"];
      const notes = [
        "Wants immediate, clear correction; correct errors directly as they occur",
        "Prefers scaffolded hints; guide toward self-correction without giving the answer",
        "Learns from contrasting approaches; let them attempt, then show the difference",
        "Values productive struggle; only intervene when asked"
      ];
      return { label: labels[ans], score: ans, note: notes[ans] };
    }
  },

  // Context level
  {
    id: 23,
    category: "How You Learn",
    type: "mc",
    text: "When someone explains something, how much background context do you want?",
    options: [
      "Minimal — assume I know a lot, skip the basics",
      "Some — briefly mention prerequisites, don't belabor",
      "Moderate — enough to follow without prior knowledge",
      "Extensive — full picture from first principles"
    ],
    trait: "context_level",
    interpret: (ans) => {
      const labels = ["Expert-level assumed", "Light context", "Moderate context", "First-principles"];
      const notes = [
        "Wants dense, assumption-heavy communication; skip basics and known context",
        "Prefers brief setup; mention prerequisites once then proceed",
        "Needs moderate scaffolding; provide enough context for standalone understanding",
        "Wants complete, self-contained explanations from the ground up"
      ];
      return { label: labels[ans], score: ans, note: notes[ans] };
    }
  },

  // Pace
  {
    id: 24,
    category: "How You Learn",
    type: "tradeoff",
    text: "What learning pace works best?",
    poles: [
      "Fast and broad — give me essentials and let me explore depth on my own",
      "Slow and thorough — I want to fully absorb each idea before moving on"
    ],
    trait: "learning_pace",
    interpret: (ans) => {
      if (ans <= 1) return { label: "Fast-paced learner", score: 5 - ans, note: "Prefers rapid coverage with optional depth; provide concise overviews" };
      if (ans === 2) return { label: "Moderate-paced learner", score: 3, note: "Variable pace depending on familiarity; adapt speed to topic complexity" };
      return { label: "Thorough-paced learner", score: 5 - ans, note: "Prefers careful, deep coverage; don't rush through concepts" };
    }
  },

  // Bloom's Taxonomy knowledge type
  {
    id: 25,
    category: "How You Learn",
    type: "rank",
    text: "Rank these types of knowledge from most to least valuable to you:",
    items: [
      "Factual — knowing the what (facts, terminology, details)",
      "Procedural — knowing the how (methods, techniques, steps)",
      "Conceptual — knowing the why (principles, theories, connections)",
      "Metacognitive — knowing how you think (strategies, self-awareness)"
    ],
    trait: "knowledge_type",
    interpret: (ans) => {
      const types = ["factual", "procedural", "conceptual", "metacognitive"];
      const top = types[ans[0]];
      const notes = {
        factual: "Values concrete facts and specific details; provide precise, factual information",
        procedural: "Values practical how-to knowledge; provide steps, methods, and actionable procedures",
        conceptual: "Values understanding connections and principles; explain the why behind things",
        metacognitive: "Values self-reflective strategic knowledge; include meta-level insights about learning"
      };
      return { label: "Primary: " + top, score: ans.join(","), note: notes[top] };
    }
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4. COMMUNICATION PREFERENCES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 26,
    category: "Communication",
    type: "tradeoff",
    text: "Response length:",
    poles: [
      "As concise as possible — just the answer, no fluff",
      "Very detailed — thorough, comprehensive, leave nothing out"
    ],
    trait: "verbosity",
    interpret: (ans) => {
      if (ans <= 1) return { label: "Concise", score: 5 - ans, note: "Wants minimal, dense responses; cut all unnecessary words and filler" };
      if (ans === 2) return { label: "Moderate", score: 3, note: "Balanced detail; cover what's needed but don't over-explain" };
      return { label: "Detailed", score: 5 - ans, note: "Wants thorough exploration; err on the side of too much detail" };
    }
  },
  {
    id: 27,
    category: "Communication",
    type: "mc",
    text: "What tone do you prefer?",
    options: [
      "Casual and conversational — like a friend who's an expert",
      "Friendly but professional — warm without being too informal",
      "Neutral and informative — personality not needed",
      "Formal and precise — professional, zero small talk"
    ],
    trait: "tone",
    interpret: (ans) => {
      const tones = ["Casual-expert", "Warm-professional", "Neutral-informative", "Formal-precise"];
      return { label: tones[ans], score: ans, note: "Preferred tone: " + tones[ans].toLowerCase() };
    }
  },
  {
    id: 28,
    category: "Communication",
    type: "dichotomy",
    text: "When you're wrong, you'd rather be:",
    options: [
      "Told bluntly — just say it, don't soften it",
      "Guided to see the error — help me discover it myself"
    ],
    trait: "correction_directness",
    interpret: (ans) => {
      if (ans === 0) return { label: "Direct correction preferred", score: "direct", note: "Correct errors immediately and directly; don't cushion or dance around it" };
      return { label: "Guided correction preferred", score: "guided", note: "Prefer Socratic correction; ask questions that lead to self-discovery of errors" };
    }
  },
  {
    id: 29,
    category: "Communication",
    type: "mc",
    text: "How do you feel about technical jargon?",
    options: [
      "Use it freely — I speak the language, it's more precise",
      "Use it but define new terms once — I'll pick it up",
      "Minimize it — plain language with jargon only when necessary",
      "Avoid it — explain everything in accessible terms"
    ],
    trait: "jargon_tolerance",
    interpret: (ans) => {
      return { label: ["Jargon-fluent", "Jargon-learning", "Jargon-averse", "Plain-language"][ans], score: 4 - ans, note: ["Use domain-specific terminology freely", "Introduce jargon with brief definitions, then use naturally", "Use plain language by default, technical terms only when essential", "Always use accessible, everyday language"][ans] };
    }
  },
  {
    id: 30,
    category: "Communication",
    type: "mc",
    text: "When you ask a question, what do you want back?",
    options: [
      "Just the answer — nothing more",
      "The answer plus brief reasoning",
      "The answer, reasoning, and related context",
      "Full exploration of the topic beyond my original question"
    ],
    trait: "response_scope",
    interpret: (ans) => {
      return { label: ["Minimal", "Answer+reasoning", "Contextual", "Expansive"][ans], score: ans, note: ["Give only what was asked", "Answer then briefly explain why", "Answer with context and related implications", "Use questions as springboards for deeper exploration"][ans] };
    }
  },
  {
    id: 31,
    category: "Communication",
    type: "tradeoff",
    text: "Confidence in responses:",
    poles: [
      "Be confident — state the most likely answer without hedging",
      "Be thorough — I want every caveat, limitation, and edge case"
    ],
    trait: "certainty_preference",
    interpret: (ans) => {
      if (ans <= 1) return { label: "Confidence preferred", score: 5 - ans, note: "State the answer confidently; only mention uncertainty when it genuinely matters" };
      if (ans === 2) return { label: "Balanced certainty", score: 3, note: "Mention important caveats but don't overdo qualifications" };
      return { label: "Thoroughness preferred", score: 5 - ans, note: "Include limitations, uncertainties, and edge cases; intellectual honesty over brevity" };
    }
  },
  {
    id: 32,
    category: "Communication",
    type: "mc",
    text: "Humor and personality in explanations?",
    options: [
      "Love it — makes learning more enjoyable and memorable",
      "Occasional dry wit is fine — keep it subtle",
      "Neutral — I don't mind either way",
      "Prefer none — keep it focused"
    ],
    trait: "humor",
    interpret: (ans) => {
      return { label: ["Humor-appreciating", "Subtle-wit", "Humor-neutral", "Humor-averse"][ans], score: 4 - ans, note: ["Use humor, personality, and wit freely to aid engagement", "Occasional understated humor is welcome; keep it professional", "Humor neither helps nor hinders; use when natural", "Avoid humor; pure substance and focus"][ans] };
    }
  },
  {
    id: 33,
    category: "Communication",
    type: "mc",
    text: "What format do you prefer for structured information?",
    options: [
      "Bullet points and lists — scannable and clean",
      "Short paragraphs — more natural and flowing",
      "Tables and structured data when applicable",
      "Mixed — whatever best suits the content"
    ],
    trait: "format_preference",
    interpret: (ans) => {
      return { label: ["Lists", "Prose", "Tabular", "Adaptive"][ans], score: ans, note: ["Use bullet points and lists; prioritize scannability", "Use flowing paragraphs; prioritize narrative coherence", "Use tables, comparisons, structured layouts when possible", "Adapt format to content type; no single preference"][ans] };
    }
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 5. MOTIVATIONAL & VALUE PROFILE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Self-Determination Theory (Deci & Ryan 2000)
  {
    id: 34,
    category: "What Drives You",
    type: "rank",
    text: "Rank these psychological needs from most to least important to you:",
    items: [
      "Autonomy — freedom to choose my own direction and methods",
      "Competence — feeling capable and effective at what I do",
      "Relatedness — feeling connected to and understood by others",
      "Novelty — encountering new ideas, experiences, and challenges"
    ],
    trait: "self_determination",
    interpret: (ans) => {
      const needs = ["autonomy", "competence", "relatedness", "novelty"];
      const top = needs[ans[0]];
      const notes = {
        autonomy: "Highly autonomy-driven; give options and freedom, avoid prescriptive instructions",
        competence: "Competence-driven; help build mastery and provide skill-building progressions",
        relatedness: "Connection-driven; use warm, understanding tone and acknowledge shared experience",
        novelty: "Novelty-driven; introduce fresh perspectives, unexpected angles, and variety"
      };
      return { label: "Primary need: " + top, score: ans.join(","), note: notes[top] };
    }
  },

  // Risk orientation (Kahneman & Tversky 1979)
  {
    id: 35,
    category: "What Drives You",
    type: "scenario",
    text: "You have a working solution that's decent. Someone offers you a 60% chance of a much better solution, but a 40% chance you lose what you have and start over. You:",
    options: [
      "Take the gamble — the upside is worth the risk",
      "Take it, but first save/backup the current solution",
      "Stick with what works — a guaranteed decent outcome beats a risky great one",
      "Ask for more information before deciding"
    ],
    trait: "risk_orientation",
    interpret: (ans) => {
      const labels = ["Risk-seeking", "Calculated risk-taker", "Risk-averse", "Information-seeking"];
      const notes = [
        "Comfortable with risk; present bold/innovative options alongside safe ones",
        "Risk-aware but willing; present options with fallback strategies",
        "Risk-averse; lead with proven approaches, present novel options as optional",
        "Deliberate decision-maker; provide comprehensive pros/cons to enable informed choices"
      ];
      return { label: labels[ans], score: ans, note: notes[ans] };
    }
  },

  // Perfectionism
  {
    id: 36,
    category: "What Drives You",
    type: "tradeoff",
    text: "Your relationship with quality:",
    poles: [
      "Ship it — done is better than perfect, I'll iterate",
      "It must be excellent — I can't let go until it meets my standards"
    ],
    trait: "perfectionism",
    interpret: (ans) => {
      if (ans <= 1) return { label: "Pragmatic finisher", score: 5 - ans, note: "Prioritizes completion and iteration over perfection; provide practical, ship-ready help" };
      if (ans === 2) return { label: "Balanced quality", score: 3, note: "Values quality but knows when good enough is good enough" };
      return { label: "Perfectionist", score: 5 - ans, note: "High quality standards; be thorough, precise, and don't cut corners in explanations" };
    }
  },

  // Locus of Control (Rotter 1966)
  {
    id: 37,
    category: "What Drives You",
    type: "dichotomy",
    text: "Which resonates more?",
    options: [
      "Outcomes in my life are mostly determined by my own actions and decisions",
      "Outcomes are heavily influenced by external circumstances, luck, and other people"
    ],
    trait: "locus_of_control",
    interpret: (ans) => {
      if (ans === 0) return { label: "Internal locus", score: "internal", note: "Believes in personal agency; frame advice as actions they can take, emphasize what's within their control" };
      return { label: "External locus", score: "external", note: "Acknowledges external factors; be empathetic about constraints and frame advice within realistic context" };
    }
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 6. WORK STYLE & AI RELATIONSHIP
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 38,
    category: "How You Work",
    type: "mc",
    text: "How do you manage your attention?",
    options: [
      "Deep focus on one thing until it's done",
      "Primarily focused but I context-switch when blocked",
      "Multiple projects in rotation — I like variety",
      "Highly parallel — I juggle many things simultaneously"
    ],
    trait: "attention_management",
    interpret: (ans) => {
      return { label: ["Deep focus", "Focus + context-switch", "Rotational", "Parallel"][ans], score: ans, note: ["Single-focused deep worker; provide complete, self-contained information", "Focused with strategic switches; provide clear stopping points and resumption cues", "Rotation-based worker; keep topics distinct and transitions clear", "Parallel processor; keep information modular and scannable"][ans] };
    }
  },
  {
    id: 39,
    category: "How You Work",
    type: "mc",
    text: "When stuck on a problem, you'd rather:",
    options: [
      "Get the full solution explained so I can learn from it",
      "Get a targeted hint pointing me in the right direction",
      "Be told what concept to look into, then figure it out",
      "Work through it alone — struggle is how I learn"
    ],
    trait: "help_seeking",
    interpret: (ans) => {
      return { label: ["Full-solution", "Hint-seeking", "Concept-pointer", "Self-reliant"][ans], score: ans, note: ["When stuck, provide complete worked solutions with explanation", "When stuck, give directional hints without revealing the full answer", "When stuck, point to relevant concept/resource then step back", "Minimize unsolicited help; only assist when explicitly asked"][ans] };
    }
  },
  {
    id: 40,
    category: "How You Work",
    type: "mc",
    text: "How do you see your ideal relationship with an AI assistant?",
    options: [
      "A tool — I give precise instructions, it executes",
      "A knowledgeable colleague — we discuss, it pushes back",
      "A tutor — it teaches me and builds my understanding",
      "A collaborator — we brainstorm and build ideas together"
    ],
    trait: "ai_relationship",
    interpret: (ans) => {
      return { label: ["Tool", "Colleague", "Tutor", "Collaborator"][ans], score: ans, note: ["Execute instructions efficiently and precisely; minimal unsolicited commentary", "Engage as an intellectual peer; challenge assumptions, offer alternatives", "Prioritize teaching and understanding; explain reasoning behind recommendations", "Co-create and brainstorm freely; build on ideas together, be creative"][ans] };
    }
  },
  {
    id: 41,
    category: "How You Work",
    type: "mc",
    text: "How do you feel about conventions and best practices?",
    options: [
      "Follow them closely — consistency and standards matter",
      "Generally follow, deviate when there's good reason",
      "See them as suggestions — useful but not binding",
      "Skeptical of most — I prefer first-principles thinking"
    ],
    trait: "conventions",
    interpret: (ans) => {
      return { label: ["Convention-follower", "Pragmatic observer", "Flexible interpreter", "First-principles thinker"][ans], score: ans, note: ["Recommend standard, established approaches", "Lead with best practices but flag alternatives", "Present options flexibly; don't assume conventions are preferred", "Focus on reasoning from fundamentals; conventions are just one data point"][ans] };
    }
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 7. VALUES & FRUSTRATIONS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 42,
    category: "What Matters",
    type: "rank",
    text: "Rank what matters most to you in an explanation:",
    items: [
      "Accuracy — it must be correct above all",
      "Clarity — it must be understandable, even if simplified",
      "Depth — it should be thorough and comprehensive",
      "Speed — it should get to the point quickly"
    ],
    trait: "explanation_values",
    interpret: (ans) => {
      const vals = ["accuracy", "clarity", "depth", "speed"];
      const top = vals[ans[0]];
      return { label: "Values " + top + " most", score: ans.join(","), note: "Prioritize " + top + " above other qualities in communication" };
    }
  },
  {
    id: 43,
    category: "What Matters",
    type: "mc",
    text: "What frustrates you most in an explanation?",
    options: [
      "Vagueness — being imprecise or hand-wavy",
      "Condescension — being spoken to as if I don't understand",
      "Over-explanation — unnecessary detail wasting my time",
      "Disorganization — jumping around without structure"
    ],
    trait: "frustration_trigger",
    interpret: (ans) => {
      return { label: ["Anti-vagueness", "Anti-condescension", "Anti-over-explanation", "Anti-disorganization"][ans], score: ans, note: ["Never be vague or imprecise; be specific and exact", "Never talk down or over-explain basics the user already knows", "Be efficient; cut filler and unnecessary elaboration", "Always organize information clearly; use structure and logical flow"][ans] };
    }
  },
  {
    id: 44,
    category: "What Matters",
    type: "dichotomy",
    text: "When there's a tradeoff between simplicity and completeness:",
    options: [
      "Simplicity wins — I can always ask for more",
      "Completeness wins — I'd rather have too much than miss something"
    ],
    trait: "simplicity_completeness",
    interpret: (ans) => {
      if (ans === 0) return { label: "Simplicity-first", score: "simple", note: "Default to simpler explanations; user will request elaboration when wanted" };
      return { label: "Completeness-first", score: "complete", note: "Default to thorough, complete explanations; user prefers too much over too little" };
    }
  },
  {
    id: 45,
    category: "What Matters",
    type: "mc",
    text: "When working, what do you optimize for first?",
    options: [
      "Efficiency — maximum output with minimum effort",
      "Quality — the best possible result regardless of time",
      "Innovation — finding novel or better approaches",
      "Reliability — making sure it works consistently"
    ],
    trait: "optimization_priority",
    interpret: (ans) => {
      return { label: ["Efficiency optimizer", "Quality optimizer", "Innovation optimizer", "Reliability optimizer"][ans], score: ans, note: ["Prioritize efficient, time-saving approaches", "Prioritize thoroughness and quality of output", "Prioritize creative and innovative approaches", "Prioritize proven, reliable approaches"][ans] };
    }
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 8. PSYCHOLOGICAL REVEAL SCENARIOS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Sunk Cost
  {
    id: 46,
    category: "Hidden Patterns",
    type: "scenario",
    text: "You've spent 3 weeks building a solution. Someone shows you a completely different approach that would be better but means scrapping your work. You:",
    options: [
      "Scrap immediately — the best solution wins regardless of sunk effort",
      "Spend a day evaluating, probably switch if it's genuinely better",
      "Try to adapt my existing work to incorporate the better approach",
      "Stick with mine — I've invested too much to throw it away"
    ],
    trait: "sunk_cost_bias",
    interpret: (ans) => {
      const labels = ["Low sunk cost bias", "Rational evaluator", "Integration seeker", "High sunk cost bias"];
      const notes = [
        "Makes decisions based on future value, not past investment; present options objectively",
        "Generally rational but benefits from explicit framing of future value vs past investment",
        "Tends to seek compromise; may benefit from direct framing when a clean break is better",
        "Attachment to prior investment may cloud judgment; explicitly frame decisions in terms of future returns"
      ];
      return { label: labels[ans], score: ans, note: notes[ans] };
    }
  },

  // Calibration (Dunning-Kruger awareness)
  {
    id: 47,
    category: "Hidden Patterns",
    type: "scenario",
    text: "You just spent 20 minutes learning the basics of a completely new field. An expert asks your opinion. You:",
    options: [
      "Share my thoughts confidently — I grasped the fundamentals quickly",
      "Offer my understanding with heavy caveats about being new",
      "Ask questions rather than offer opinions — I know too little to have one",
      "Honestly say I have no real opinion yet — 20 minutes isn't enough"
    ],
    trait: "calibration",
    interpret: (ans) => {
      const labels = ["Possibly over-confident", "Appropriately uncertain", "Curious learner", "Well-calibrated"];
      const notes = [
        "May overestimate understanding of new topics; tactfully challenge assumptions when user is early in learning",
        "Shows awareness of limitations; matches appropriate confidence level",
        "Defaults to learning mode; a good instinct — encourage this",
        "Excellent calibration of knowledge boundaries; this user knows what they don't know"
      ];
      return { label: labels[ans], score: 4 - ans, note: notes[ans] };
    }
  },

  // Anchoring
  {
    id: 48,
    category: "Hidden Patterns",
    type: "scenario",
    text: "You're estimating how long a project will take. A colleague casually mentions it took them 2 months. You:",
    options: [
      "Estimate independently based on my own analysis — their number is irrelevant",
      "Start from their estimate but adjust based on my situation",
      "Use their estimate as a baseline and add buffer",
      "Probably land somewhere close to 2 months in my estimate"
    ],
    trait: "anchoring_susceptibility",
    interpret: (ans) => {
      const labels = ["Anchor-resistant", "Anchor-adjusting", "Anchor-influenced", "Anchor-susceptible"];
      const notes = [
        "Evaluates independently of reference points; present unbiased information first, comparisons after",
        "Uses reference points as starting data; present context but ensure your framing doesn't unduly anchor",
        "Moderately anchored by initial information; be careful what numbers/claims you present first",
        "Heavily influenced by initial reference points; present information neutrally without leading with extreme examples"
      ];
      return { label: labels[ans], score: ans, note: notes[ans] };
    }
  },

  // Confirmation Bias
  {
    id: 49,
    category: "Hidden Patterns",
    type: "scenario",
    text: "You believe strongly in Approach X for a problem. You find an article critical of Approach X. You:",
    options: [
      "Read it carefully and update my view if the arguments are good",
      "Read it but instinctively look for flaws in their methodology",
      "Skim it — I already know what I think",
      "Skip it — I've done enough research on this"
    ],
    trait: "confirmation_bias",
    interpret: (ans) => {
      const labels = ["Low confirmation bias", "Aware but susceptible", "Moderate confirmation bias", "High confirmation bias"];
      const notes = [
        "Genuinely open to disconfirming evidence; present counter-arguments when relevant",
        "Tries to be open but defaults to defending existing beliefs; present counter-evidence gently with strong logic",
        "May dismiss contradicting information; proactively present balanced perspectives",
        "Strong tendency to seek confirming evidence; be especially balanced and present strongest counter-arguments"
      ];
      return { label: labels[ans], score: ans, note: notes[ans] };
    }
  },

  // Maximizer vs Satisficer (Schwartz 2004)
  {
    id: 50,
    category: "Hidden Patterns",
    type: "dichotomy",
    text: "When choosing between options:",
    options: [
      "I research extensively and pick the objectively best option (maximizing)",
      "I pick the first option that's good enough and move on (satisficing)"
    ],
    trait: "maximizer_satisficer",
    interpret: (ans) => {
      if (ans === 0) return { label: "Maximizer", score: "maximize", note: "Wants to find the best solution; provide comprehensive comparisons and help evaluate all options" };
      return { label: "Satisficer", score: "satisfice", note: "Wants a good-enough solution fast; lead with the best recommendation rather than exhaustive options" };
    }
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 9. SHORT RESPONSE QUESTIONS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 51,
    category: "About You",
    type: "short",
    text: "What's your field, role, or primary area of work?",
    placeholder: "e.g. software engineer, student studying biology, product designer...",
    trait: "background",
    interpret: (ans) => ({ label: "Professional background", score: "verbatim", note: ans })
  },
  {
    id: 52,
    category: "About You",
    type: "short",
    text: "What are you currently trying to learn, build, or get better at?",
    placeholder: "e.g. machine learning, writing, building a startup...",
    trait: "current_goals",
    interpret: (ans) => ({ label: "Current goals", score: "verbatim", note: ans })
  },
  {
    id: 53,
    category: "About You",
    type: "short",
    text: "Think of a time an explanation really 'clicked'. What made it work?",
    placeholder: "What made the lightbulb go on?",
    trait: "click_moment",
    interpret: (ans) => ({ label: "Effective teaching trigger", score: "verbatim", note: ans })
  },
  {
    id: 54,
    category: "About You",
    type: "short",
    text: "Describe your ideal teacher, mentor, or advisor in one sentence.",
    placeholder: "What qualities matter most?",
    trait: "ideal_teacher",
    interpret: (ans) => ({ label: "Ideal mentor archetype", score: "verbatim", note: ans })
  },
  {
    id: 55,
    category: "About You",
    type: "short",
    text: "What annoys you most when getting help from AI?",
    placeholder: "Your biggest frustration with AI assistants...",
    trait: "ai_frustrations",
    interpret: (ans) => ({ label: "AI interaction pain point", score: "verbatim", note: ans })
  },
  {
    id: 56,
    category: "About You",
    type: "short",
    text: "What do you primarily use AI for?",
    placeholder: "e.g. coding help, research, writing, brainstorming...",
    trait: "ai_use_cases",
    interpret: (ans) => ({ label: "Primary AI use cases", score: "verbatim", note: ans })
  },
  {
    id: 57,
    category: "About You",
    type: "short",
    text: "Is there anything about how you think or communicate that's important to know? (neurodivergence, cultural context, etc.)",
    placeholder: "Optional — skip if nothing comes to mind",
    trait: "identity_context",
    interpret: (ans) => ({ label: "Cognitive/cultural context", score: "verbatim", note: ans })
  },
  {
    id: 58,
    category: "About You",
    type: "short",
    text: "Anything else an AI should know about you?",
    placeholder: "Optional — anything not covered above",
    trait: "freeform",
    interpret: (ans) => ({ label: "Additional context", score: "verbatim", note: ans })
  }
];