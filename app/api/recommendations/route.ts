import { NextRequest, NextResponse } from "next/server";
import { MOCK_MOVIES, GENRE_MAP } from "@/lib/mock-data";
import { TMDbMovie } from "@/lib/types";

const TMDB_BASE = "https://api.themoviedb.org/3";

function getApiKey(): string | null {
  return process.env.TMDB_API_KEY || null;
}

async function fetchFromTMDb(path: string): Promise<TMDbMovie[]> {
  const apiKey = getApiKey();
  if (!apiKey) return [];

  const url = `${TMDB_BASE}${path}&api_key=${apiKey}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.results || [];
}

async function discoverByGenres(
  genreIds: number[],
  mediaType: "movie" | "tv"
): Promise<TMDbMovie[]> {
  const genres = genreIds.join(",");
  const path = `/discover/${mediaType}?with_genres=${genres}&sort_by=vote_average.desc&vote_count.gte=500&language=en-US`;
  const results = await fetchFromTMDb(path);
  return results.map((r: TMDbMovie) => ({ ...r, media_type: mediaType }));
}

// Map personality tags to TMDb genre IDs
function tagsToGenreIds(tags: string[]): { movie: number[]; tv: number[] } {
  const movieGenres: number[] = [];
  const tvGenres: number[] = [];

  const tagToGenres: Record<string, { movie: number[]; tv: number[] }> = {
    dark: { movie: [27, 53, 80], tv: [9648, 18] },
    romance: { movie: [10749, 18], tv: [10749, 18] },
    chaos: { movie: [28, 80, 35], tv: [18, 35] },
    comfort: { movie: [35, 10751], tv: [35, 18] },
    villain: { movie: [80, 53], tv: [18, 9648] },
    slowburn: { movie: [18, 10749], tv: [18, 10749] },
    fast_paced: { movie: [28, 12], tv: [10759, 28] },
    prestige: { movie: [18, 36], tv: [18] },
    brain_off: { movie: [35, 28], tv: [35, 10764] },
    supernatural: { movie: [27, 14], tv: [10765, 27] },
    mystery: { movie: [9648, 53], tv: [9648] },
    rich_drama: { movie: [18, 80], tv: [18] },
    teen_drama: { movie: [18], tv: [18, 10762] },
    comedy: { movie: [35], tv: [35] },
    emotional: { movie: [18, 10749], tv: [18] },
    aesthetic: { movie: [18, 14], tv: [18, 10765] },
    psychological: { movie: [53, 9648], tv: [9648, 18] },
    action: { movie: [28, 12], tv: [10759] },
    cozy: { movie: [35, 10751], tv: [35] },
    female_rage: { movie: [53, 18], tv: [18, 9648] },
  };

  for (const tag of tags) {
    const mapping = tagToGenres[tag];
    if (mapping) {
      movieGenres.push(...mapping.movie);
      tvGenres.push(...mapping.tv);
    }
  }

  return {
    movie: [...new Set(movieGenres)].slice(0, 3),
    tv: [...new Set(tvGenres)].slice(0, 3),
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tags, personalityId } = body as {
      tags: string[];
      personalityId: string;
    };

    const apiKey = getApiKey();

    if (!apiKey) {
      // Return mock data with media_type attached
      const mockWithType = MOCK_MOVIES.map((m) => ({
        ...m,
        media_type: m.title ? "movie" : "tv",
      }));
      return NextResponse.json({ results: mockWithType, source: "mock" });
    }

    const genreMapping = tagsToGenreIds(tags);
    const topTags = tags.slice(0, 4);

    const [movieResults, tvResults] = await Promise.all([
      discoverByGenres(genreMapping.movie, "movie"),
      discoverByGenres(genreMapping.tv, "tv"),
    ]);

    // Interleave movies and TV shows, deduplicate by id
    const seen = new Set<number>();
    const combined: TMDbMovie[] = [];
    const maxEach = 8;

    for (let i = 0; i < maxEach; i++) {
      if (movieResults[i] && !seen.has(movieResults[i].id)) {
        seen.add(movieResults[i].id);
        combined.push(movieResults[i]);
      }
      if (tvResults[i] && !seen.has(tvResults[i].id)) {
        seen.add(tvResults[i].id);
        combined.push(tvResults[i]);
      }
    }

    return NextResponse.json({ results: combined.slice(0, 16), source: "tmdb" });
  } catch (error) {
    console.error("Recommendations API error:", error);
    const mockWithType = MOCK_MOVIES.map((m) => ({
      ...m,
      media_type: m.title ? "movie" : "tv",
    }));
    return NextResponse.json(
      { results: mockWithType, source: "mock" },
      { status: 200 }
    );
  }
}
