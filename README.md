# Devloped by Gohelboy (Dwarkesh)

Live website : https://bingepedia.netlify.app/

## SuperEmbed (optional streaming)

This project can optionally show an embedded player powered by the third‑party **SuperEmbed/MultiEmbed** service. Bingepedia **does not host or control any video content** – streams come from an external provider.

### How it works

- Movies use TMDB id:
  - `https://multiembed.mov/?video_id={tmdb_id}&tmdb=1`
- Series use TMDB id with season/episode:
  - `https://multiembed.mov/?video_id={tmdb_id}&tmdb=1&s={season}&e={episode}`
- The URL is generated in `src/helper/superEmbedUrl.js` and rendered as an iframe inside the content detail modal.

### Enabling / disabling

Controlled via the env flag:

```env
VITE_ENABLE_SUPEREMBED=false
```

- When set to `true`, the **Play (SuperEmbed)** button appears in the detail modal.
- When `false`, the app behaves as a pure TMDB discovery + watchlist app (no streaming UI).

Use this feature at your own risk and **only if you have confirmed the legal status** of the external streaming provider in your jurisdiction.
