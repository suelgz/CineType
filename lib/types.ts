export type WatchTag =
  | "dark"
  | "romance"
  | "chaos"
  | "comfort"
  | "villain"
  | "slowburn"
  | "fast_paced"
  | "prestige"
  | "brain_off"
  | "supernatural"
  | "mystery"
  | "rich_drama"
  | "teen_drama"
  | "comedy"
  | "emotional"
  | "aesthetic"
  | "psychological"
  | "action"
  | "cozy"
  | "female_rage";

export type MediaType = "movie" | "tv";

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  tags: WatchTag[];
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionId: string;
  tags: WatchTag[];
}

export interface WatchPersonality {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  loves: string[];
  bores: string[];
  characterType: string;
  primaryTags: WatchTag[];
  color: string;
  accentColor: string;
  emoji: string;
}

export interface TagWeights {
  [key: string]: number;
}

export interface UserProfile {
  personality: WatchPersonality;
  tagWeights: TagWeights;
  answers: QuizAnswer[];
  takenAt: string;
}

export interface TMDbMovie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
  media_type?: MediaType;
  popularity: number;
  adult: boolean;
  original_language: string;
}

export interface RecommendationCard {
  tmdbId: number;
  title: string;
  posterPath: string | null;
  mediaType: MediaType;
  year: string;
  genres: string[];
  rating: number;
  matchScore: number;
  whyItFits: string;
  skipIf: string;
  moodTags: string[];
  overview: string;
  runtime?: string;
}

export interface WatchlistItem {
  tmdbId: number;
  title: string;
  posterPath: string | null;
  mediaType: MediaType;
  savedAt: string;
}
