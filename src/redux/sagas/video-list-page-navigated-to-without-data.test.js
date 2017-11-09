import { call, put } from 'redux-saga/effects'
import assert from 'assert'
import * as Video from '../../models/video'
import { fetchVideoListData } from './video-list-page-navigated-to-without-data'
import { videoListDataFetched } from '../actions'

test('fetchVideoListData saga', () => {
  const gen = fetchVideoListData()

  assert.deepEqual(
    gen.next().value,
    call(Video.all),
    'it should call Video.all'
  )

  assert.deepEqual(
    gen.next().value,
    put(videoListDataFetched()),
    'it should dispatch an action to update the video list'
  )

  // TODO: Handle errors
})
