import { QuizAnswer, TagWeights, WatchPersonality, WatchTag } from "./types";
import { PERSONALITIES } from "./personalities";

export function calculateTagWeights(answers: QuizAnswer[]): TagWeights {
  const weights: TagWeights = {};

  for (const answer of answers) {
    for (const tag of answer.tags) {
      weights[tag] = (weights[tag] || 0) + 1;
    }
  }

  return weights;
}

function scorePersonality(
  personality: WatchPersonality,
  tagWeights: TagWeights
): number {
  let score = 0;

  for (const tag of personality.primaryTags) {
    const weight = tagWeights[tag] || 0;
    score += weight;
  }

  return score;
}

export function determinePersonality(answers: QuizAnswer[]): {
  personality: WatchPersonality;
  tagWeights: TagWeights;
  scores: { id: string; score: number }[];
} {
  const tagWeights = calculateTagWeights(answers);

  const scores = PERSONALITIES.map((p) => ({
    id: p.id,
    score: scorePersonality(p, tagWeights),
  })).sort((a, b) => b.score - a.score);

  const topPersonalityId = scores[0].id;
  const personality =
    PERSONALITIES.find((p) => p.id === topPersonalityId) || PERSONALITIES[0];

  return { personality, tagWeights, scores };
}

export function calculateMatchScore(
  personalityTags: WatchTag[],
  tagWeights: TagWeights,
  itemTags: WatchTag[]
): number {
  if (itemTags.length === 0) return 60;

  let overlap = 0;
  let totalWeight = 0;

  for (const tag of itemTags) {
    const w = tagWeights[tag] || 0;
    overlap += w;
  }

  for (const tag of personalityTags) {
    totalWeight += tagWeights[tag] || 0;
  }

  if (totalWeight === 0) return 65;

  const rawScore = overlap / Math.max(totalWeight, 1);
  const normalized = Math.min(Math.round(60 + rawScore * 35), 99);
  return normalized;
}
