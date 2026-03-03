export const getSuperEmbedUrl = ({ type, tmdbId, season, episode }) => {
  if (!tmdbId) return null;

  const base = "https://multiembed.mov/";

  // Movies
  if (type === "movie") {
    return `${base}?video_id=${tmdbId}&tmdb=1`;
  }

  // TV series with season/episode
  if (type === "tv") {
    const s = season || 1;
    const e = episode || 1;
    return `${base}?video_id=${tmdbId}&tmdb=1&s=${s}&e=${e}`;
  }

  // Fallback: treat unknown types as movie
  return `${base}?video_id=${tmdbId}&tmdb=1`;
};
