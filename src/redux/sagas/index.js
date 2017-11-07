import { call, put, takeLatest } from 'redux-saga/effects'
import { COUNT_INCREMENT_REQUESTED } from '../constants'
import * as Count from '../../models/count'

import {
  countIncrementApproved,
  countIncrementDenied,
  countIncrementRequestFailed
} from '../actions'

function* checkCanIncrement() {
  try {
    const [canIncrement, reason] = yield call(Count.canBeIncremented)
    if (canIncrement) {
      yield put(countIncrementApproved())
    } else {
      yield put(countIncrementDenied(reason))
    }
  } catch (e) {
    yield put(countIncrementRequestFailed(e.message))
  }
}

export function* incrementRequestSaga() {
  yield takeLatest(COUNT_INCREMENT_REQUESTED, checkCanIncrement)
}
