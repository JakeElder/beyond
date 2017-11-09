import qs from 'qs'

// TODO: Factor out in to config/params
const API_URL = 'https://www.googleapis.com/youtube/v3/'
const API_KEY = 'AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw'
const MAX_RESULTS = 10
const PART = ['snippet', 'contentDetails']
const PLAYLIST_ID = 'PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ'

export function getDeletedVideo(id) {
  return {
    id,
    publishedAt: null,
    title: 'Video unavailable',
    thumbnail: '',
    description: 'This video is currently unavailable'
  }
}

// TODO: Transform functions need to have more robust error checking and
// correction
export function googlePlaylistItemsItemToVideo(item) {
  if (item.snippet.title === 'Deleted video') {
    return getDeletedVideo(item.contentDetails.videoId)
  }
  return {
    id: item.contentDetails.videoId,
    publishedAt: item.contentDetails.videoPublishedAt,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.high.url,
    description: item.snippet.description.replace(/\r\n/g, '')
  }
}

export function googleVideosResponseToVideo({ items }) {
  if (items[0].snippet.title === 'Deleted video') {
    return getDeletedVideo(items[0].id)
  }
  return {
    id: items[0].id,
    publishedAt: items[0].snippet.publishedAt,
    title: items[0].snippet.title,
    thumbnail: items[0].snippet.thumbnails.high.url,
    description: items[0].snippet.description.replace(/\r\n/g, '')
  }
}

export function googlePlayListItemsResponseToVideoList(response) {
  return response.items.map(googlePlaylistItemsItemToVideo)
}

export function all() {
  const queryString = qs.stringify({
    key: API_KEY,
    maxResults: MAX_RESULTS,
    part: PART.join(','),
    playlistId: PLAYLIST_ID
  })
  return fetch(`${API_URL}playlistItems?${queryString}`)
    .then(r => r.json())
    .then(googlePlayListItemsResponseToVideoList)
}

export function find(id) {
  const queryString = qs.stringify({
    key: API_KEY,
    part: PART.join(','),
    id
  })
  return fetch(`${API_URL}videos?${queryString}`)
    .then(r => r.json())
    .then(googleVideosResponseToVideo)
}
