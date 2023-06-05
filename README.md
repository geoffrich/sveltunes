# SvelteKit music app demo

You will need a Discogs account and a Discogs API key to run this demo. You can get a key by [creating a new application.](https://www.discogs.com/settings/developers)

## TODO

- scroll not resetting properly when navigating (skeleton issue?)
- not sure if I want to use app shell or not (see scroll issue)
- handle artist ID 194 - "various" (placeholder)
- improve pagination to only load additional data - +server.js endpoint
- maybe very quickly wire favorites up to upstash
- test real deployment
- error handling everywhere
- lru cache to avoid 429s (or client-side caching of album details?) right now every mutation reloads the whole data tree (+ undo re-loads it).
  - possibly load favorite ids from +page.server.ts, get album details from +page.ts (and avoid refetching). But that means potentially exposing a JSON endpoint that goes through to discogs.
  - maybe server would only return album details in favorites? potential perf cost of real API.
- use `setHeaders` somewhere

### If this goes prod

- actual auth
- actual db
- enforce max favorites
- revisit caching
