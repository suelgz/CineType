import { WatchTag, WatchPersonality, TMDbMovie, RecommendationCard, TagWeights } from "./types";
import { GENRE_MAP } from "./mock-data";
import { calculateMatchScore } from "./scoring";

// Why it fits templates per personality id
const WHY_IT_FITS: Record<string, string[]> = {
  chaos_romantic: [
    "This has the exact kind of romantic tension that never fully resolves — which is precisely what you're here for.",
    "The central relationship in this is built on everything you love: history, chemistry, and terrible decisions made for the right reasons.",
    "This offers the kind of emotional devastation you'll describe to friends as 'worth it.' It is, but you'll need a minute after.",
    "The slowburn here is genuinely patient. You'll spend episodes watching two people almost say the right thing, and it pays off.",
  ],
  villain_apologist: [
    "The antagonist here has a fully coherent worldview and the writing respects your intelligence enough to let them make their case.",
    "This gives you what you actually came for: a protagonist you're supposed to root for and someone far more interesting beside them.",
    "Moral ambiguity is baked into the structure here. No one is clean. That's exactly the kind of story you find yourself defending at 2am.",
    "The villain has the best lines and the most interesting logic. You already know which character you're going to understand too well.",
  ],
  dark_comfort_watcher: [
    "This is dark in the way you actually like — atmospheric and emotionally true, not gratuitously unpleasant.",
    "The supernatural element here isn't decorative; it's the story's way of talking about something very human. That's your genre.",
    "This has the quality you look for: dread that feels earned and warmth underneath the darkness.",
    "It asks you to sit with some difficult things, but it does so with care. The dark isn't the point — it's the frame.",
  ],
  soft_escapist: [
    "This is the kind of beautiful, safe world you want to disappear into. The stakes are real but not punishing.",
    "A story where people are largely decent to each other and the world rewards that. Not naive — just warm.",
    "This gives you the specific pleasure you're looking for: a world so well-realized you'll miss it after the finale.",
    "Emotionally satisfying without requiring you to brace yourself. The ending earns its warmth.",
  ],
  mind_game_addict: [
    "This will reward your attention. Pay close attention to what's not said in the first act.",
    "The structure here is doing real work. You'll notice things on a second watch you missed the first time.",
    "Unreliable narration done properly — the kind that feels earned when it lands, not arbitrary.",
    "This is built for viewers who audit. Every detail is there for a reason. You'll find them.",
  ],
  brainrot_binger: [
    "This moves at exactly the speed you need. You will not have time to think about whether you're enjoying it because you'll be too busy enjoying it.",
    "Dramatically unhinged in a very specific, handcrafted way. This is comfort food with extra chaos.",
    "This has the pacing and drama ratio you're looking for. You'll finish it much faster than you planned.",
    "Characters making terrible decisions at maximum speed. Your natural habitat.",
  ],
  cozy_mystery_soul: [
    "A mystery that's clever without being punishing. The setting is specific and warm, the protagonist is quietly brilliant.",
    "This has the cozy procedural energy you're looking for: something to solve, someone competent solving it, in a world you want to spend time in.",
    "Murder, but make it charming. The mystery is fair, the resolution is satisfying, and no one asks you to be traumatized.",
    "This has the 'competent person in a specific setting' energy that defines your genre. You'll find it immediately comfortable.",
  ],
  prestige_snob: [
    "The writing here maintains its standard across the entire run. You won't need to lower your expectations after the pilot.",
    "Every performance does more than the dialogue requires. The direction knows exactly what it's doing.",
    "This was made by people with high standards and it shows. You'll appreciate what it doesn't do as much as what it does.",
    "The craft here is genuine. This isn't prestige aesthetics over thin writing — it earned the reputation.",
  ],
  supernatural_comfort_seeker: [
    "The supernatural mechanics here map onto emotional reality in a way that will feel right to you.",
    "Found family in impossible circumstances — the warmth underneath the strange is where this lives.",
    "This uses the supernatural to say something true about grief and identity. That's exactly your genre.",
    "The world-building is real and the emotional payoffs justify the setup. You'll find this satisfying in the specific way you're looking for.",
  ],
  rich_drama_gremlin: [
    "Everyone here has too much money and absolutely no emotional regulation. You're going to love it.",
    "The scale of the chaos is proportional to the resources involved. That's the entire appeal and it delivers.",
    "Betrayal, scheming, fashion, and people who could solve their problems but choose not to. Your environment.",
    "This understands that the drama is better when the stakes are gilded. The board meeting scene alone is worth it.",
  ],
  slow_burn_devotee: [
    "This is patient in the way you actually appreciate. The tension accumulates and the payoff justifies everything you waited through.",
    "A lingering glance in episode four is doing more work here than most shows do in an entire season.",
    "This rewards the viewers who are willing to sit with the wanting before the getting. That's you.",
    "The restraint here is deliberate and intelligent. When it finally lands, you'll feel it.",
  ],
  female_rage_enjoyer: [
    "This is about women who stop being reasonable and the writing doesn't apologize for it. That's everything.",
    "The female protagonist here is allowed to be wrong in interesting ways. The story doesn't tame her.",
    "Rage as intelligence. The writing understands what the anger is actually about and lets it breathe.",
    "This doesn't punish women for being complicated. The messiness is the point and it's handled with care.",
  ],
};

const SKIP_IF_TEMPLATES: Record<string, string[]> = {
  chaos_romantic: [
    "You need your romantic leads to communicate like adults. They will not do that here.",
    "You need things to resolve cleanly. This does not resolve cleanly.",
    "Pacing patience is required. If you need events to happen, this may frustrate you.",
  ],
  villain_apologist: [
    "You need a clear protagonist to root for. This does not provide one without qualification.",
    "Moral clarity is important to your watch experience. There is none here.",
    "You're looking for something lighter. This is not that.",
  ],
  dark_comfort_watcher: [
    "Horror elements make you uncomfortable. There are horror elements.",
    "You need things to be straightforwardly cheerful. This is not straightforwardly cheerful.",
    "Slow atmospheric pacing isn't for you. This is atmospheric.",
  ],
  soft_escapist: [
    "You want narrative tension and stakes. The stakes here are gentle by design.",
    "You're in the mood for something dark or complex. This is neither.",
    "You need sharp conflict. The conflict here resolves warmly.",
  ],
  mind_game_addict: [
    "You want to be able to put this on in the background. You cannot. It requires attention.",
    "Ambiguous endings frustrate you. Several things here do not resolve.",
    "You want something emotionally straightforward. This is not.",
  ],
  brainrot_binger: [
    "You're in the mood for something patient and artistic. This is neither of those things.",
    "You prefer emotional depth over dramatic momentum. This prioritizes momentum.",
    "Prestige pacing is what you need right now. This moves too fast for that.",
  ],
  cozy_mystery_soul: [
    "You want high emotional stakes and darkness. The stakes here are deliberately moderate.",
    "You need your mysteries bloody and grim. This is warm.",
    "You're looking for edge and darkness. This is comforting by design.",
  ],
  prestige_snob: [
    "You want something to put on in the background. This requires and rewards attention.",
    "You're in the mood for fast, dramatic entertainment. This is considered and careful.",
    "You need an immediate hook. This earns your attention rather than demanding it.",
  ],
  supernatural_comfort_seeker: [
    "You need your supernatural stories to be purely action-based. The emotional core here is the entire point.",
    "Horror elements are a hard no for you. There are some here.",
    "You want realism. There isn't any.",
  ],
  rich_drama_gremlin: [
    "You want relatable characters making relatable choices. No one here is relatable.",
    "You need your drama to have consequences that feel real. Wealth insulates the consequences here.",
    "You're looking for warmth and character growth. The characters here grow, but not warmly.",
  ],
  slow_burn_devotee: [
    "You need narrative events to happen at a regular pace. They will not.",
    "Delayed gratification is not your current mood. You will be waiting.",
    "You want something to put on and enjoy without investment. This requires investment.",
  ],
  female_rage_enjoyer: [
    "You need your protagonists to make choices you endorse. She will not always do that.",
    "You want resolution and redemption arcs. The arc here doesn't apologize.",
    "Chaos makes you uncomfortable. There is controlled chaos here.",
  ],
};

function getExplanation(personalityId: string, templates: Record<string, string[]>): string {
  const options = templates[personalityId] || templates["prestige_snob"];
  return options[Math.floor(Math.random() * options.length)];
}

export function buildMoodTags(item: TMDbMovie): string[] {
  const genreIds = item.genre_ids || [];
  const tags: string[] = [];

  if (genreIds.includes(10749)) tags.push("romance");
  if (genreIds.includes(27)) tags.push("dark");
  if (genreIds.includes(9648)) tags.push("mystery");
  if (genreIds.includes(53)) tags.push("thriller");
  if (genreIds.includes(35)) tags.push("comedy");
  if (genreIds.includes(878) || genreIds.includes(10765)) tags.push("sci-fi");
  if (genreIds.includes(14)) tags.push("fantasy");
  if (genreIds.includes(80)) tags.push("crime");
  if (genreIds.includes(18)) tags.push("drama");
  if (genreIds.includes(28) || genreIds.includes(10759)) tags.push("action");
  if (item.vote_average >= 8.5) tags.push("prestige");
  if (item.media_type === "tv") tags.push("binge-worthy");

  return tags.slice(0, 4);
}

export function buildRecommendationCard(
  item: TMDbMovie,
  personality: WatchPersonality,
  tagWeights: TagWeights
): RecommendationCard {
  const mediaType = item.media_type || (item.title ? "movie" : "tv");
  const title = item.title || item.name || "Unknown";
  const year = (item.release_date || item.first_air_date || "").substring(0, 4);
  const genres = (item.genre_ids || [])
    .map((id) => GENRE_MAP[id])
    .filter(Boolean)
    .slice(0, 3);

  const itemTags = buildMoodTags(item);
  const matchScore = calculateMatchScore(
    personality.primaryTags,
    tagWeights,
    itemTags as WatchTag[]
  );

  const whyItFits = getExplanation(personality.id, WHY_IT_FITS);
  const skipIf = getExplanation(personality.id, SKIP_IF_TEMPLATES);

  return {
    tmdbId: item.id,
    title,
    posterPath: item.poster_path,
    mediaType,
    year,
    genres,
    rating: Math.round(item.vote_average * 10) / 10,
    matchScore,
    whyItFits,
    skipIf,
    moodTags: buildMoodTags(item),
    overview: item.overview,
  };
}
