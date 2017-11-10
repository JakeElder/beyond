import { combineReducers } from 'redux'
import { VIDEO_LIST_DATA_FETCHED } from '../constants'

function videos(state = [], action) {
  switch (action.type) {
    case VIDEO_LIST_DATA_FETCHED:
      return action.videos
    default:
      return state
  }
}

function listLoadPerformed(state = false, action) {
  switch (action.type) {
    case VIDEO_LIST_DATA_FETCHED:
      return true
    default:
      return state
  }
}

export default combineReducers({
  videos,
  listLoadPerformed
})
