# SvelteKit music app demo

You will need a Discogs account and a Discogs API key to run this demo. You can get a key by [creating a new application.](https://www.discogs.com/settings/developers)

## TODO

## Further improvements

- improve pagination of artist releases to only load additional data - +server.js endpoint
- show error for no-js when failing to favorite an album

### If this goes prod

- actual auth
- actual db - upstash
- enforce max favorites
- revisit caching. right now every mutation reloads the whole data tree (+ undo re-loads it).
  - possibly load favorite ids from +page.server.ts, get album details from +page.ts (and avoid refetching). But that means potentially exposing a JSON endpoint that goes through to discogs.
  - maybe server would only return album details in favorites? potential perf cost of real API.
