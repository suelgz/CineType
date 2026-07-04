"use client";

import { UserProfile, WatchlistItem } from "./types";

const PROFILE_KEY = "cinetype_profile";
const WATCHLIST_KEY = "cinetype_watchlist";
const SEEN_KEY = "cinetype_seen";
const DISLIKED_KEY = "cinetype_disliked";

export function saveProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Failed to save profile", e);
  }
}

export function loadProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    if (!data) return null;
    return JSON.parse(data) as UserProfile;
  } catch (e) {
    return null;
  }
}

export function clearProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PROFILE_KEY);
}

export function saveToWatchlist(item: WatchlistItem): void {
  if (typeof window === "undefined") return;
  try {
    const current = loadWatchlist();
    const exists = current.find((w) => w.tmdbId === item.tmdbId);
    if (exists) return;
    const updated = [item, ...current];
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save watchlist", e);
  }
}

export function removeFromWatchlist(tmdbId: number): void {
  if (typeof window === "undefined") return;
  try {
    const current = loadWatchlist();
    const updated = current.filter((w) => w.tmdbId !== tmdbId);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to update watchlist", e);
  }
}

export function loadWatchlist(): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(WATCHLIST_KEY);
    if (!data) return [];
    return JSON.parse(data) as WatchlistItem[];
  } catch (e) {
    return [];
  }
}

export function isInWatchlist(tmdbId: number): boolean {
  return loadWatchlist().some((w) => w.tmdbId === tmdbId);
}

export function markSeen(tmdbId: number): void {
  if (typeof window === "undefined") return;
  try {
    const current = loadSeen();
    if (!current.includes(tmdbId)) {
      localStorage.setItem(SEEN_KEY, JSON.stringify([...current, tmdbId]));
    }
  } catch (e) {}
}

export function loadSeen(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(SEEN_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function markDisliked(tmdbId: number): void {
  if (typeof window === "undefined") return;
  try {
    const current = loadDisliked();
    if (!current.includes(tmdbId)) {
      localStorage.setItem(DISLIKED_KEY, JSON.stringify([...current, tmdbId]));
    }
  } catch (e) {}
}

export function loadDisliked(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(DISLIKED_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}
