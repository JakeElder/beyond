import qs from 'qs'

// TODO: Factor out in to config/params
const API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems'
const API_KEY = 'AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw'
const MAX_RESULTS = 10
const PART = ['snippet', 'contentDetails', 'status']
const PLAYLIST_ID = 'PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ'

export function googleItemToVideo(item) {
  // TODO: More robust malformed response handling
  if (item.snippet.title === 'Deleted video') {
    return {
      id: item.contentDetails.videoId,
      publishedAt: null,
      title: item.snippet.title,
      thumbnail: '',
      description: item.snippet.description
    }
  }
  return {
    id: item.contentDetails.videoId,
    publishedAt: item.contentDetails.videoPublishedAt,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.high.url,
    description: item.snippet.description
  }
}

export function googleAPIResponseToVideoList(response) {
  return response.items.map(googleItemToVideo)
}

export function all() {
  const queryString = qs.stringify({
    key: API_KEY,
    maxResults: MAX_RESULTS,
    part: PART.join(','),
    playlistId: PLAYLIST_ID
  })
  return fetch(`${API_URL}?${queryString}`)
    .then(r => r.json())
    .then(googleAPIResponseToVideoList)
}
