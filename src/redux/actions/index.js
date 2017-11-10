import {
  VIDEO_LIST_DATA_FETCHED,
  VIDEO_LIST_PAGE_NAVIGATED_TO_WITHOUT_DATA
} from '../constants'

export function videoListPageNavigatedToWithoutData() {
  return { type: VIDEO_LIST_PAGE_NAVIGATED_TO_WITHOUT_DATA }
}

export function videoListDataFetched(videos) {
  return {
    type: VIDEO_LIST_DATA_FETCHED,
    videos
  }
}
