// questions.js — 70 targeted questions (50 multiple-choice, 20 long-answer)
// Grounded in: Big Five personality traits (OCEAN), Kolb's experiential learning,
// Felder-Silverman learning dimensions, VARK modalities, Bloom's taxonomy,
// cognitive processing styles, and LLM-interaction-specific optimisations.

const questions = [

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // A. PERSONALITY & TEMPERAMENT (Big Five) — 12 multiple choice
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 1,
    category: "Personality",
    type: "mc",
    text: "When you encounter a subject you know nothing about, your first reaction is usually:",
    options: [
      "Excitement — I love diving into the unknown",
      "Cautious interest — I'll look into it if it seems relevant",
      "Indifference — I'd rather deepen what I already know",
      "Mild anxiety — unfamiliar territory feels uncomfortable"
    ],
    trait: "openness"
  },
  {
    id: 2,
    category: "Personality",
    type: "mc",
    text: "When reading in your spare time, you gravitate toward:",
    options: [
      "Abstract or theoretical ideas — philosophy, science, speculation",
      "Practical non-fiction — how-to guides, case studies, biographies",
      "Narrative and storytelling — fiction, long-form journalism",
      "I rarely read for leisure"
    ],
    trait: "openness"
  },
  {
    id: 3,
    category: "Personality",
    type: "mc",
    text: "A deadline is approaching. Which best describes you?",
    options: [
      "Already done — I finished well ahead of time",
      "On track — I planned it out and I'm steadily progressing",
      "Last-minute surge — I do my best work under pressure",
      "Scrambling — I tend to underestimate how long things take"
    ],
    trait: "conscientiousness"
  },
  {
    id: 4,
    category: "Personality",
    type: "mc",
    text: "When starting a new project, you typically:",
    options: [
      "Plan extensively — outline, timeline, milestones before touching anything",
      "Do a rough plan then iterate as I go",
      "Jump straight in and figure it out along the way",
      "Research obsessively before starting, sometimes delaying too long"
    ],
    trait: "conscientiousness"
  },
  {
    id: 5,
    category: "Personality",
    type: "mc",
    text: "When processing a difficult idea, you prefer to:",
    options: [
      "Think it through alone in silence",
      "Talk it out with someone — even just to hear myself think",
      "Write my thoughts down to organise them",
      "Alternate between solo thinking and discussion"
    ],
    trait: "extraversion"
  },
  {
    id: 6,
    category: "Personality",
    type: "mc",
    text: "After a long, mentally demanding day, what recharges you the most?",
    options: [
      "Solitude — quiet time on my own",
      "Low-key social time — a relaxed conversation with someone close",
      "Active socialising — going out, group activities",
      "A complete change of activity — exercise, music, nature"
    ],
    trait: "extraversion"
  },
  {
    id: 7,
    category: "Personality",
    type: "mc",
    text: "When someone firmly disagrees with your position, your instinct is to:",
    options: [
      "Debate it — I enjoy defending and stress-testing my ideas",
      "Listen carefully to their reasoning before responding",
      "Look for common ground and compromise",
      "Disengage — I find arguments draining and unproductive"
    ],
    trait: "agreeableness"
  },
  {
    id: 8,
    category: "Personality",
    type: "mc",
    text: "How important is tact when someone gives you feedback?",
    options: [
      "Not important — just be direct and honest, even if it stings",
      "Slightly important — be straightforward but not rude",
      "Fairly important — I appreciate honesty wrapped in respect",
      "Very important — how something is said matters as much as what is said"
    ],
    trait: "agreeableness"
  },
  {
    id: 9,
    category: "Personality",
    type: "mc",
    text: "When you make a clear mistake, your typical reaction is:",
    options: [
      "Accept it quickly and move on — dwelling doesn't help",
      "Analyse what went wrong so I can avoid it next time",
      "Feel frustrated with myself for a while",
      "Spiral a bit — mistakes weigh on me more than they should"
    ],
    trait: "neuroticism"
  },
  {
    id: 10,
    category: "Personality",
    type: "mc",
    text: "How do you handle situations with a lot of ambiguity and no clear right answer?",
    options: [
      "I thrive in ambiguity — it's where creative thinking happens",
      "I'm comfortable but prefer some structure to work within",
      "I manage, but I'd rather have clearer parameters",
      "I find it stressful — I need at least a rough framework to operate"
    ],
    trait: "neuroticism"
  },
  {
    id: 11,
    category: "Personality",
    type: "mc",
    text: "When presented with strong evidence against a belief you hold, you:",
    options: [
      "Change my mind readily — I follow the evidence",
      "Update my position gradually as I gather more data",
      "Resist at first but come around if the case is airtight",
      "Tend to find reasons to stick with my original view"
    ],
    trait: "openness"
  },
  {
    id: 12,
    category: "Personality",
    type: "mc",
    text: "How would you describe your relationship with routine?",
    options: [
      "I dislike routine — I need variety and novelty",
      "I appreciate some routine but break from it often",
      "I rely on routine to stay productive and grounded",
      "I'm very structured — routine frees up mental energy for important things"
    ],
    trait: "conscientiousness"
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // B. LEARNING & COGNITIVE STYLE — 15 multiple choice
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 13,
    category: "Learning Style",
    type: "mc",
    text: "When learning a completely new concept, what helps you the most?",
    options: [
      "Diagrams, visuals, or spatial representations",
      "A clear written explanation I can re-read",
      "Hearing someone explain it or talking it through",
      "Hands-on practice — I need to try it myself"
    ],
    trait: "vark"
  },
  {
    id: 14,
    category: "Learning Style",
    type: "mc",
    text: "You encounter a new tool or technology. Your instinct is to:",
    options: [
      "Read the documentation or a tutorial first",
      "Open it up and start experimenting immediately",
      "Watch someone else use it first, then try",
      "Find a structured course or guided walkthrough"
    ],
    trait: "kolb"
  },
  {
    id: 15,
    category: "Learning Style",
    type: "mc",
    text: "When learning something, how important is understanding the underlying 'why'?",
    options: [
      "Essential — I can't use something I don't fundamentally understand",
      "Very important — I want the why, but I'll start using it before I fully grasp it",
      "Somewhat important — I'll dig into the why later if needed",
      "Not very important — just show me how to do it"
    ],
    trait: "depth"
  },
  {
    id: 16,
    category: "Learning Style",
    type: "mc",
    text: "When being taught a complex topic, do you prefer to:",
    options: [
      "Get the big picture first, then zoom into details",
      "Build up from fundamentals step by step",
      "See a concrete example first, then extract the principles",
      "Get a summary of key points with links to dig deeper on my own"
    ],
    trait: "sequential_global"
  },
  {
    id: 17,
    category: "Learning Style",
    type: "mc",
    text: "What pace of learning works best for you?",
    options: [
      "Fast and broad — give me the essentials and let me explore depth on my own",
      "Moderate — balance between speed and thoroughness",
      "Slow and thorough — I want to fully absorb each idea before moving on",
      "Variable — fast for familiar territory, slow for novel concepts"
    ],
    trait: "pace"
  },
  {
    id: 18,
    category: "Learning Style",
    type: "mc",
    text: "You learn better from:",
    options: [
      "Concrete, real-world examples and case studies",
      "Abstract principles and theoretical frameworks",
      "A mix — theory first, then grounded with examples",
      "A mix — examples first, then generalise to the principle"
    ],
    trait: "abstraction"
  },
  {
    id: 19,
    category: "Learning Style",
    type: "mc",
    text: "Do you prefer active learning (doing/building/experimenting) or reflective learning (reading/analysing/observing)?",
    options: [
      "Strongly active — I learn by doing",
      "Lean active — mostly doing, with some reflection",
      "Lean reflective — mostly thinking, with some doing",
      "Strongly reflective — I learn by thinking and observing"
    ],
    trait: "active_reflective"
  },
  {
    id: 20,
    category: "Learning Style",
    type: "mc",
    text: "When learning a multi-part subject, do you prefer to:",
    options: [
      "Follow a strict logical sequence — A then B then C",
      "Jump between sections based on what's interesting or relevant",
      "Skim everything first for a map, then dive into sections",
      "Start with the hardest or most interesting part"
    ],
    trait: "sequential_global"
  },
  {
    id: 21,
    category: "Learning Style",
    type: "mc",
    text: "When you're trying to understand a concept, how many examples do you typically need?",
    options: [
      "One clear example is enough — I generalise quickly",
      "Two or three varied examples to see the pattern",
      "Several examples across different contexts",
      "I'd rather have the rule explained clearly than rely on examples"
    ],
    trait: "examples"
  },
  {
    id: 22,
    category: "Learning Style",
    type: "mc",
    text: "How useful are analogies and metaphors in explanations?",
    options: [
      "Extremely useful — they're how I build understanding",
      "Useful as a starting point, then give me the precise definition",
      "Hit or miss — good ones help, bad ones confuse",
      "I prefer direct, literal explanations without analogies"
    ],
    trait: "analogies"
  },
  {
    id: 23,
    category: "Learning Style",
    type: "mc",
    text: "Do you prefer to be taught at your current level or slightly above it?",
    options: [
      "Above — I like being challenged and stretching my understanding",
      "Slightly above — push me a little but not too far",
      "At my level — I want to solidify what I know before moving up",
      "Below first — I prefer to master basics before any challenge"
    ],
    trait: "challenge"
  },
  {
    id: 24,
    category: "Learning Style",
    type: "mc",
    text: "When you make errors while learning, you prefer to:",
    options: [
      "Be told immediately what's wrong and why",
      "Get a hint so I can figure out the correction myself",
      "Work through problems and only check at the end",
      "See a comparison between my approach and the correct one"
    ],
    trait: "error_correction"
  },
  {
    id: 25,
    category: "Learning Style",
    type: "mc",
    text: "In terms of presentation, you prefer explanations that are:",
    options: [
      "Text-heavy with detailed paragraphs",
      "Mixed text with tables, diagrams, or structured formats",
      "Code-first or formula-first with minimal prose",
      "Bullet points and concise summaries"
    ],
    trait: "presentation"
  },
  {
    id: 26,
    category: "Learning Style",
    type: "mc",
    text: "When someone explains something to you, how much background context do you expect?",
    options: [
      "Minimal — assume I know a lot and skip the basics",
      "Some — briefly mention prerequisites but don't belabour them",
      "Moderate — give me enough context to follow without prior knowledge",
      "Extensive — I want the full picture from first principles"
    ],
    trait: "context"
  },
  {
    id: 27,
    category: "Learning Style",
    type: "mc",
    text: "Which type of knowledge do you find most valuable?",
    options: [
      "Factual knowledge — knowing the what",
      "Procedural knowledge — knowing the how",
      "Conceptual knowledge — knowing the why and how things connect",
      "Metacognitive knowledge — knowing my own thought processes and strategies"
    ],
    trait: "blooms"
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // C. COMMUNICATION PREFERENCES — 10 multiple choice
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 28,
    category: "Communication",
    type: "mc",
    text: "How detailed do you want responses to be?",
    options: [
      "As concise as possible — just the answer, no fluff",
      "Brief but complete — cover what's needed, nothing more",
      "Moderately detailed — explain the reasoning too",
      "Very detailed — I want thorough, comprehensive responses"
    ],
    trait: "verbosity"
  },
  {
    id: 29,
    category: "Communication",
    type: "mc",
    text: "What tone do you prefer in communication?",
    options: [
      "Casual and conversational — like talking to a colleague",
      "Friendly but professional — warm without being too informal",
      "Neutral and straightforward — informative without personality",
      "Formal and precise — professional, no small talk"
    ],
    trait: "tone"
  },
  {
    id: 30,
    category: "Communication",
    type: "mc",
    text: "When you're wrong about something, how do you prefer to be corrected?",
    options: [
      "Directly — just tell me I'm wrong and explain why",
      "Gently — acknowledge my reasoning, then redirect",
      "Through questions — help me discover the error myself",
      "Show me the correct answer and let me figure out where I went wrong"
    ],
    trait: "correction_style"
  },
  {
    id: 31,
    category: "Communication",
    type: "mc",
    text: "How important is positive reinforcement or encouragement when you're working?",
    options: [
      "Not important — skip the cheerleading and give me substance",
      "Slightly — occasional acknowledgment is nice but don't overdo it",
      "Fairly important — recognition keeps me motivated",
      "Very important — I need validation and encouragement to stay confident"
    ],
    trait: "encouragement"
  },
  {
    id: 32,
    category: "Communication",
    type: "mc",
    text: "How do you feel about technical jargon and domain-specific terminology?",
    options: [
      "Use it freely — I speak the language and it's more precise",
      "Use it with brief definitions the first time — I'll pick it up quickly",
      "Minimise it — prefer plain language with jargon only when necessary",
      "Avoid it — I want everything explained in accessible terms"
    ],
    trait: "jargon"
  },
  {
    id: 33,
    category: "Communication",
    type: "mc",
    text: "How do you feel about humour, wit, or personality in explanations?",
    options: [
      "Love it — makes learning more enjoyable and memorable",
      "Occasional dry wit is fine — keep it subtle",
      "Neutral — I don't mind it either way",
      "Prefer none — keep it focused and professional"
    ],
    trait: "humor"
  },
  {
    id: 34,
    category: "Communication",
    type: "mc",
    text: "Do you prefer direct, blunt responses or more diplomatic, nuanced ones?",
    options: [
      "Blunt and direct — don't sugarcoat or hedge",
      "Direct but thoughtful — get to the point with some nuance",
      "Balanced — directness tempered with diplomacy",
      "Diplomatic — I prefer a measured, careful way of phrasing things"
    ],
    trait: "directness"
  },
  {
    id: 35,
    category: "Communication",
    type: "mc",
    text: "When you ask a question, what do you want in return?",
    options: [
      "Just the answer — nothing more",
      "The answer plus a brief explanation of why",
      "The answer, the reasoning, and any related context I might find useful",
      "A thorough exploration of the topic even beyond my original question"
    ],
    trait: "scope"
  },
  {
    id: 36,
    category: "Communication",
    type: "mc",
    text: "Do you prefer responses that include caveats and qualifications, or confident direct statements?",
    options: [
      "Confident — state the most likely answer without hedging",
      "Mostly confident — mention uncertainty only when it genuinely matters",
      "Balanced — include relevant caveats without overdoing it",
      "Thorough — I want to know every limitation and edge case"
    ],
    trait: "certainty"
  },
  {
    id: 37,
    category: "Communication",
    type: "mc",
    text: "What format do you prefer for structured information?",
    options: [
      "Bullet points and lists — scannable and clean",
      "Short paragraphs — more natural and flowing",
      "Tables or structured data when applicable",
      "Mixed — whatever suits the content best"
    ],
    trait: "format"
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // D. WORK & PRODUCTIVITY STYLE — 8 multiple choice
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 38,
    category: "Work Style",
    type: "mc",
    text: "How do you typically manage your attention across projects?",
    options: [
      "Deep focus — one thing at a time until it's done",
      "Primarily focused but I context-switch when blocked",
      "Multiple projects in rotation — I like variety",
      "Highly parallel — I juggle many things simultaneously"
    ],
    trait: "focus"
  },
  {
    id: 39,
    category: "Work Style",
    type: "mc",
    text: "When making decisions, you tend to:",
    options: [
      "Go with my gut — quick, intuitive decisions",
      "Brief analysis then decide — I trust my judgement after some thought",
      "Thorough analysis — I weigh options carefully before committing",
      "Extensive deliberation — I want all available data before deciding"
    ],
    trait: "decision_making"
  },
  {
    id: 40,
    category: "Work Style",
    type: "mc",
    text: "When you're stuck on a problem, you'd rather:",
    options: [
      "Get the full solution explained so I can learn from it",
      "Get a targeted hint that points me in the right direction",
      "Be told what concept or area to look into, then figure it out",
      "Work through it myself with no help — struggle is part of learning"
    ],
    trait: "help_style"
  },
  {
    id: 41,
    category: "Work Style",
    type: "mc",
    text: "When choosing a solution to a problem, do you prefer:",
    options: [
      "The proven, standard approach that's known to work",
      "The standard approach with some modifications",
      "A creative or novel solution if it's more elegant",
      "The most innovative approach even if it's risky"
    ],
    trait: "creativity"
  },
  {
    id: 42,
    category: "Work Style",
    type: "mc",
    text: "How do you see your ideal relationship with an AI assistant?",
    options: [
      "A tool — I give precise instructions, it executes",
      "A knowledgeable colleague — I discuss, it contributes and pushes back",
      "A tutor — it teaches me and helps me build understanding",
      "A collaborator — we brainstorm and build ideas together"
    ],
    trait: "ai_relationship"
  },
  {
    id: 43,
    category: "Work Style",
    type: "mc",
    text: "Where do you fall on the perfectionism spectrum?",
    options: [
      "Ship it — done is better than perfect",
      "Good enough for now — I'll refine as needed",
      "High quality is important — I invest the time to get it right",
      "It needs to be excellent — I can't let go until it meets my standards"
    ],
    trait: "perfectionism"
  },
  {
    id: 44,
    category: "Work Style",
    type: "mc",
    text: "How do you perform under time pressure?",
    options: [
      "I thrive — pressure sharpens my focus",
      "I perform well — pressure is motivating",
      "I manage — but I prefer having breathing room",
      "Poorly — time pressure increases errors and stress for me"
    ],
    trait: "pressure"
  },
  {
    id: 45,
    category: "Work Style",
    type: "mc",
    text: "How do you feel about following established conventions vs doing things your own way?",
    options: [
      "Follow conventions — consistency and standards matter",
      "Generally follow conventions but deviate when there's good reason",
      "Often forge my own path — conventions are suggestions not rules",
      "I actively reject unnecessary conventions — first principles thinking"
    ],
    trait: "conventions"
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // E. VALUES & PRIORITIES — 5 multiple choice
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 46,
    category: "Values",
    type: "mc",
    text: "What matters most to you in an explanation?",
    options: [
      "Accuracy — it must be correct above all",
      "Clarity — it must be understandable, even if simplified",
      "Depth — it should be thorough and comprehensive",
      "Speed — it should get to the point quickly"
    ],
    trait: "explanation_value"
  },
  {
    id: 47,
    category: "Values",
    type: "mc",
    text: "When there's a trade-off between simplicity and completeness:",
    options: [
      "Simplicity wins — I can always ask for more",
      "Lean toward simplicity but flag what's been left out",
      "Lean toward completeness — I'd rather trim than miss things",
      "Completeness wins — I want the full picture"
    ],
    trait: "simplicity_completeness"
  },
  {
    id: 48,
    category: "Values",
    type: "mc",
    text: "What frustrates you most in a conversation or explanation?",
    options: [
      "Vagueness — being imprecise or hand-wavy",
      "Condescension — being spoken to as if I don't understand",
      "Over-explanation — unnecessary detail that wastes my time",
      "Disorganisation — jumping around without clear structure"
    ],
    trait: "frustration"
  },
  {
    id: 49,
    category: "Values",
    type: "mc",
    text: "What's your relationship with rules, best practices, and established norms?",
    options: [
      "I respect them and follow them closely",
      "I follow them when they make sense and question them when they don't",
      "I see them as guidelines — useful but not binding",
      "I'm skeptical of most rules — I prefer to think from first principles"
    ],
    trait: "rules"
  },
  {
    id: 50,
    category: "Values",
    type: "mc",
    text: "When working on something, what do you optimise for first?",
    options: [
      "Efficiency — getting the most done with the least effort",
      "Quality — producing the best possible output",
      "Innovation — finding novel or better approaches",
      "Reliability — making sure things work consistently"
    ],
    trait: "optimise"
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // F. LONG-ANSWER QUESTIONS — 20
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 51,
    category: "Background",
    type: "long",
    text: "What is your professional background, area of expertise, or primary role?",
    trait: "background"
  },
  {
    id: 52,
    category: "Background",
    type: "long",
    text: "What are you currently trying to learn, build, or improve at?",
    trait: "current_goals"
  },
  {
    id: 53,
    category: "Learning",
    type: "long",
    text: "Describe how you typically approach learning something completely new from scratch.",
    trait: "learning_approach"
  },
  {
    id: 54,
    category: "Learning",
    type: "long",
    text: "Think of a time when an explanation really 'clicked' for you. What made it work?",
    trait: "click_moment"
  },
  {
    id: 55,
    category: "Learning",
    type: "long",
    text: "Describe a skill you successfully taught yourself. What method did you use?",
    trait: "self_teaching"
  },
  {
    id: 56,
    category: "Learning",
    type: "long",
    text: "What topics, formats, or approaches to learning do you tend to avoid, and why?",
    trait: "avoidances"
  },
  {
    id: 57,
    category: "Thinking",
    type: "long",
    text: "Walk me through your thinking process when you're faced with a complex, multi-layered problem.",
    trait: "problem_solving"
  },
  {
    id: 58,
    category: "Thinking",
    type: "long",
    text: "How do you organise your thoughts when planning something — a project, a piece of writing, a decision?",
    trait: "planning"
  },
  {
    id: 59,
    category: "Thinking",
    type: "long",
    text: "What does your internal monologue sound like when you're working through an intellectual challenge?",
    trait: "inner_monologue"
  },
  {
    id: 60,
    category: "Communication",
    type: "long",
    text: "Describe your ideal teacher, mentor, or advisor. What qualities do they have?",
    trait: "ideal_teacher"
  },
  {
    id: 61,
    category: "Communication",
    type: "long",
    text: "Are there specific communication styles, phrases, or patterns that annoy or frustrate you?",
    trait: "annoyances"
  },
  {
    id: 62,
    category: "Communication",
    type: "long",
    text: "How do you prefer to receive bad news, critical feedback, or a negative assessment of your work?",
    trait: "feedback_style"
  },
  {
    id: 63,
    category: "Motivation",
    type: "long",
    text: "What motivates you to keep going when something gets genuinely difficult or frustrating?",
    trait: "motivation"
  },
  {
    id: 64,
    category: "Motivation",
    type: "long",
    text: "What kind of projects or tasks do you find most fulfilling, and which drain you?",
    trait: "fulfillment"
  },
  {
    id: 65,
    category: "Motivation",
    type: "long",
    text: "What does a genuinely productive day look like for you?",
    trait: "productive_day"
  },
  {
    id: 66,
    category: "AI Interaction",
    type: "long",
    text: "What are your biggest frustrations when interacting with AI assistants or chatbots?",
    trait: "ai_frustrations"
  },
  {
    id: 67,
    category: "AI Interaction",
    type: "long",
    text: "What are your primary goals when you interact with an AI — what do you use it for most?",
    trait: "ai_goals"
  },
  {
    id: 68,
    category: "AI Interaction",
    type: "long",
    text: "Describe the ideal AI interaction — how would a perfect AI assistant behave and communicate with you?",
    trait: "ideal_ai"
  },
  {
    id: 69,
    category: "Identity",
    type: "long",
    text: "Is there anything about your personality, culture, neurodivergence, or background that meaningfully affects how you think or communicate?",
    trait: "identity_factors"
  },
  {
    id: 70,
    category: "Identity",
    type: "long",
    text: "Anything else you'd like an AI to know about you that hasn't been covered?",
    trait: "freeform"
  }
];
