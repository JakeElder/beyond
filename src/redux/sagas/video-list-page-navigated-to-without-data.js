import { call, put, takeLatest } from 'redux-saga/effects'
import * as Video from '../../models/video'
import { VIDEO_LIST_PAGE_NAVIGATED_TO_WITHOUT_DATA } from '../constants'
import { videoListDataFetched } from '../actions'

export function* fetchVideoListData() {
  try {
    const videos = yield call(Video.all)
    yield put(videoListDataFetched(videos))
  } catch (e) {
    // TODO: Handle
  }
}

export function* videoListPageNavigatedToWithoutDataSaga() {
  yield takeLatest(VIDEO_LIST_PAGE_NAVIGATED_TO_WITHOUT_DATA, fetchVideoListData)
}
