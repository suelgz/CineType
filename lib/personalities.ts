import { WatchPersonality } from "./types";

export const PERSONALITIES: WatchPersonality[] = [
  {
    id: "chaos_romantic",
    name: "The Chaos Romantic",
    tagline: "You don't want love stories. You want love stories that destroy someone.",
    description:
      "You are here for the emotional wreckage. Healthy relationships on screen bore you. You want tension, unresolved feelings, grand mistakes, and people who love each other in completely unsustainable ways.",
    longDescription:
      "You've defended at least one toxic ship for longer than any reasonable conversation should allow. You understand that slowburn isn't slow if the voltage is high enough. You call certain villains 'misunderstood' and you mean it. The stories that live in your head rent-free are the ones that never quite resolved — and you think that's better, actually.",
    loves: [
      "Relationships that shouldn't work but obviously will",
      "Characters who make the worst possible choice for love",
      "Slowburns that pay off in one devastating scene",
      "Villains with genuine emotional intelligence",
    ],
    bores: [
      "Healthy communication solving problems in episode three",
      "Love interests with no discernible flaws or edge",
      "Endings that feel earned but emotionally safe",
    ],
    characterType: "The morally grey love interest — every time",
    primaryTags: ["dark", "romance", "chaos", "slowburn", "villain"],
    color: "#7C3AED",
    accentColor: "#F472B6",
    emoji: "🌹",
  },
  {
    id: "villain_apologist",
    name: "The Villain Apologist",
    tagline: "The villain had a point. That's it. That's the whole thing.",
    description:
      "You're not rooting for the bad guy — you just find them the most interesting person in the room. You're drawn to characters with coherent, if terrible, worldviews. Weak protagonists lose you immediately.",
    longDescription:
      "You've sat through an entire protagonist's arc waiting for the scenes with the antagonist. You believe the best writing gives the villain a real argument, not just evil for evil's sake. You're not morally bankrupt — you just have standards for complexity. The hero needs to work harder to deserve your attention.",
    loves: [
      "Antagonists with more depth than most protagonists",
      "Writing that respects your intelligence",
      "Moral ambiguity without a clean resolution",
      "Scenes where the villain is technically correct",
    ],
    bores: [
      "Evil for no reason other than plot convenience",
      "Heroes who are right about everything",
      "Stories that punish complexity in favor of comfort",
    ],
    characterType: "The antagonist with the best monologue in the entire series",
    primaryTags: ["villain", "psychological", "dark", "prestige", "chaos"],
    color: "#1D4ED8",
    accentColor: "#A78BFA",
    emoji: "🎭",
  },
  {
    id: "dark_comfort_watcher",
    name: "The Dark Comfort Watcher",
    tagline: "Horror with a good soundtrack and an emotional core is a love language.",
    description:
      "You find comfort in dark things. You rewatch horror films in autumn like other people rewatch romcoms. Supernatural stories that are really about grief or loneliness are your genre.",
    longDescription:
      "You're not watching dark things to feel bad. You're watching them because they understand something about the world that lighter stories paper over. Old houses with complicated family dynamics. Ghost stories underneath which is really a story about not being able to let go. The darkness is the warmth, for you — it just takes a particular kind of viewer to feel that.",
    loves: [
      "Horror with real emotional stakes underneath",
      "Supernatural stories about grief or identity",
      "Atmospheric, slow-building dread",
      "Found family in impossible circumstances",
    ],
    bores: [
      "Gore for shock value with no emotional purpose",
      "Horror that forgets characters exist",
      "Overly bright and optimistic stories",
    ],
    characterType: "The quietly strange one who turns out to be the most perceptive person in the room",
    primaryTags: ["dark", "supernatural", "comfort", "emotional", "aesthetic"],
    color: "#065F46",
    accentColor: "#6EE7B7",
    emoji: "🕯️",
  },
  {
    id: "soft_escapist",
    name: "The Soft Escapist",
    tagline: "I just want to go somewhere beautiful and not worry about anything.",
    description:
      "You watch to leave. You want lush visuals, warm worlds, gentle stakes, and stories where things mostly work out. Not naive — you appreciate emotional depth — but you're not here to be traumatized.",
    longDescription:
      "Period dramas set in the English countryside. Travel shows where the food looks incredible. Found family stories where people are kind to each other in specific, believable ways. You know escapism doesn't mean shallow — the best comfort watches are genuinely well-made. You just have a hard limit on how much suffering you'll voluntarily consume for entertainment.",
    loves: [
      "Beautiful, well-realized settings that feel like a place",
      "Relationships built on warmth and mutual respect",
      "Stories with stakes that don't require you to brace yourself",
      "Endings you actually feel good about",
    ],
    bores: [
      "Suffering that serves no narrative purpose",
      "Dark twists that exist purely to subvert expectations",
      "Characters who are terrible to each other for extended periods",
    ],
    characterType: "The warm, perceptive one who turns out to be much stronger than they seem",
    primaryTags: ["comfort", "cozy", "aesthetic", "emotional", "slowburn"],
    color: "#92400E",
    accentColor: "#FCD34D",
    emoji: "☕",
  },
  {
    id: "mind_game_addict",
    name: "The Mind Game Addict",
    tagline: "If I can figure out the twist, I'm bored.",
    description:
      "You need your brain engaged at all times. Unreliable narrators, structural experiments, ambiguous endings — this is your native genre. You've watched Primer more than once and explained it to people who just wanted a good time.",
    longDescription:
      "You don't just watch stories — you audit them. You notice when something doesn't add up. You rewind. You theorize. The best viewing experience you've had involved piecing something together across multiple episodes and realizing you were right. Or wrong in an interesting way. Plot holes are a personal offense. Clever structure is a love language.",
    loves: [
      "Unreliable narrators who are doing it on purpose",
      "Non-linear structures that justify the complexity",
      "Endings that reframe everything you watched",
      "Stories that reward paying close attention",
    ],
    bores: [
      "Predictable plot beats from the first act",
      "Twists that are unearned or arbitrary",
      "Stories where the mystery is less interesting than the resolution",
    ],
    characterType: "The one who knew something was wrong from the beginning and kept quiet about it",
    primaryTags: ["psychological", "mystery", "dark", "prestige", "chaos"],
    color: "#1E1B4B",
    accentColor: "#818CF8",
    emoji: "🔍",
  },
  {
    id: "brainrot_binger",
    name: "The Brainrot Binger",
    tagline: "I'm not looking for art. I'm looking for my next personality.",
    description:
      "You don't want prestige. You want something so specifically entertaining that it rewires your brain. Fast-paced, dramatically unhinged, and oddly specific — you will consume four seasons in a weekend and feel no guilt.",
    longDescription:
      "You started watching something because of a gifset or a TikTok edit and you're in the finale by the end of the week. You know it's not 'good' in any traditional critical sense and that is not even slightly the point. The point is the drama, the chaos, the characters you immediately form opinions about, the plot that makes no sense but moves too fast to question. You're not lowering your standards — you have different standards.",
    loves: [
      "Pacing that never gives you time to think",
      "Dramatic, specific chaos that feels handcrafted",
      "Characters you immediately have strong feelings about",
      "Stories you can describe to a friend in one sentence",
    ],
    bores: [
      "Slow artistic pacing that requires patience to appreciate",
      "Prestige dramas where nothing happens dramatically",
      "Characters who behave reasonably under pressure",
    ],
    characterType: "The one who makes objectively terrible decisions at maximum speed",
    primaryTags: ["brain_off", "fast_paced", "chaos", "teen_drama", "comedy"],
    color: "#831843",
    accentColor: "#FB7185",
    emoji: "📱",
  },
  {
    id: "cozy_mystery_soul",
    name: "The Cozy Mystery Soul",
    tagline: "I just want someone to solve something in a charming location.",
    description:
      "You love a mystery, but you want it warm. British villages. Small-town secrets. Detectives with good coats. Shows where murder exists but isn't traumatizing.",
    longDescription:
      "You've noticed that the best cozy mysteries are really character studies with a procedural frame. The mystery is the structure; the warmth is the point. You like competence — watching someone who is genuinely good at what they do, in a world that's strange and specific and a little eccentric. High body count, low emotional damage. That's the genre.",
    loves: [
      "Charming, specific settings that feel lived-in",
      "Protagonists who are quietly brilliant",
      "Mysteries that are clever but fair",
      "A sense of community and place",
    ],
    bores: [
      "Gore and horror elements in what's supposed to be relaxing",
      "Mystery series that lean into darkness and trauma",
      "Procedurals with no warmth or character development",
    ],
    characterType: "The eccentric local who turns out to know absolutely everything",
    primaryTags: ["mystery", "cozy", "comfort", "prestige", "aesthetic"],
    color: "#1C3A5F",
    accentColor: "#7DD3FC",
    emoji: "🔎",
  },
  {
    id: "prestige_snob",
    name: "The Prestige Snob",
    tagline: "I only watch things that are technically excellent and I'll admit this is a problem.",
    description:
      "You judge cinematography. You have opinions about aspect ratios. You've abandoned shows because the writing 'got lazy.' You don't need things to be slow — you need them to be good.",
    longDescription:
      "You're not a film bro — you genuinely don't care about gatekeeping. You just have very specific standards for craft and you lose patience when shows that started well start coasting. You respect genre work done with precision. You appreciate when a production treats its audience as intelligent. You've said 'the book was better' and meant it in a specific technical way.",
    loves: [
      "Writing that earns every beat",
      "Performances that do more than the dialogue requires",
      "Cinematography and editing that communicate meaning",
      "Shows that maintain quality across their entire run",
    ],
    bores: [
      "Prestige aesthetics used to mask thin writing",
      "Long runtimes that haven't earned the runtime",
      "Any show that peaked in season one and then continued",
    ],
    characterType: "The one who is correct about everything and is trying very hard to be less annoying about it",
    primaryTags: ["prestige", "psychological", "dark", "mystery", "slowburn"],
    color: "#292524",
    accentColor: "#D4A853",
    emoji: "🎬",
  },
  {
    id: "supernatural_comfort_seeker",
    name: "The Supernatural Comfort Seeker",
    tagline: "I want magic, but I also want someone to have a really good cry.",
    description:
      "Your sweet spot is supernatural stories with emotional cores. The magic isn't the point — it's the frame for exploring grief, identity, love, and belonging. Too much gore loses you. Pure realism also loses you.",
    longDescription:
      "You know that the best supernatural stories are really about very human things. The haunting is grief. The magic system is the story's way of giving form to something internal. You want worlds with rules you can understand, characters who feel the weight of those rules, and emotional payoffs that the supernatural setup has been building toward all along.",
    loves: [
      "Supernatural mechanics that map onto emotional reality",
      "Found family in impossible circumstances",
      "A world with real texture and internal logic",
      "Horror that earns its emotional moments",
    ],
    bores: [
      "Supernatural elements with no thematic purpose",
      "Horror that forgets the emotional core exists",
      "Realistic dramas with no wonder anywhere",
    ],
    characterType: "The one who understood what the magic was really about before anyone else",
    primaryTags: ["supernatural", "comfort", "emotional", "aesthetic", "dark"],
    color: "#3B0764",
    accentColor: "#C084FC",
    emoji: "✨",
  },
  {
    id: "rich_drama_gremlin",
    name: "The Rich Drama Gremlin",
    tagline: "I need everyone to have too much money and genuinely terrible judgment.",
    description:
      "You are not watching for relatability. You are watching to see people with unlimited resources make the worst possible choices. Rich families, corporate backstabbing, fashion, betrayal.",
    longDescription:
      "You are fully self-aware about this. You know why these shows work on you and you're fine with it. The fantasy isn't the money — it's the scale of the chaos that money enables. People who have every advantage and still manage to catastrophically ruin their lives. The drama is better when the stakes are gilded. You've watched board meetings more tensely than car chases.",
    loves: [
      "Characters with resources and zero emotional intelligence",
      "Corporate and family power dynamics",
      "Fashion, aesthetics, and environments as character",
      "Betrayals that have been a long time coming",
    ],
    bores: [
      "Relatable, down-to-earth drama with modest stakes",
      "Rich characters who are just nice people",
      "Storylines that don't involve someone actively scheming",
    ],
    characterType: "The one who had the best plan and would have gotten away with it",
    primaryTags: ["rich_drama", "chaos", "prestige", "psychological", "fast_paced"],
    color: "#1A0A00",
    accentColor: "#F59E0B",
    emoji: "💸",
  },
  {
    id: "slow_burn_devotee",
    name: "The Slow-Burn Devotee",
    tagline: "The longer it takes, the harder I fall.",
    description:
      "You believe the best stories earn their payoff. You can sit with tension for entire seasons. You hate when shows rush things that should be savored.",
    longDescription:
      "You've mentally celebrated a two-second lingering glance that the show didn't comment on. You understand that restraint is its own form of intensity. A single conversation in the finale that lands because of everything that was withheld before it — that's your peak television experience. You believe that patience isn't passive; it's the active form of wanting something very much.",
    loves: [
      "Tension that builds across entire seasons",
      "Gestures and glances that do more than speeches",
      "Payoffs that justify everything you waited through",
      "Characters who want things they won't admit",
    ],
    bores: [
      "Shows that rush payoffs that needed more time",
      "Emotional beats that haven't been earned",
      "Fast-paced plots that sacrifice character depth",
    ],
    characterType: "The one who has been in love with someone for three seasons and won't say it",
    primaryTags: ["slowburn", "romance", "prestige", "emotional", "psychological"],
    color: "#1E3A5F",
    accentColor: "#93C5FD",
    emoji: "🕰️",
  },
  {
    id: "female_rage_enjoyer",
    name: "The Female Rage Enjoyer",
    tagline: "She's going to do something unhinged and I will cheer.",
    description:
      "You want stories about women who stop being reasonable. Revenge arcs, morally complicated female protagonists, women who are allowed to be messy and terrifying and fascinating.",
    longDescription:
      "You're tired of redemption arcs that apologize for the interesting part. You want the chaos — with the depth to make it matter. The best stories you've seen are about women who are fully themselves, even when fully themselves is dangerous and strange and a little frightening. You don't need them to be likeable. You need them to be real.",
    loves: [
      "Female protagonists who are allowed to be wrong in interesting ways",
      "Revenge arcs that take their time and commit",
      "Writing that understands rage as intelligence",
      "Stories that don't punish women for being complicated",
    ],
    bores: [
      "Female characters defined primarily by their relationships to men",
      "Stories where the interesting woman gets tamed by the third act",
      "Competent female characters who are competent and nothing else",
    ],
    characterType: "The one who was too smart for the room and decided to stop pretending otherwise",
    primaryTags: ["female_rage", "chaos", "dark", "psychological", "prestige"],
    color: "#7F1D1D",
    accentColor: "#FCA5A5",
    emoji: "🔥",
  },
];
