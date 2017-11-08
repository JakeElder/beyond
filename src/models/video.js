import fetch from 'node-fetch'
import qs from 'qs'

// TODO: Factor out in to config/params
const API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems'
const API_KEY = 'AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw'
const MAX_RESULTS = 10
const PART = ['snippet', 'contentDetails', 'status']
const PLAYLIST_ID = 'PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ'

export function all() {
  const queryString = qs.stringify({
    key: API_KEY,
    maxResults: MAX_RESULTS,
    part: PART.join(','),
    playlistId: PLAYLIST_ID
  })
  return fetch(`${API_URL}?${queryString}`).then(r => r.json())
}
