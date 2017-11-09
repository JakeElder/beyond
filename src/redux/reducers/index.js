import { combineReducers } from 'redux'
import { VIDEO_DETAIL_LINK_CLICKED } from '../constants'

function activeVideoId(state = null, action) {
  switch (action.type) {
    case VIDEO_DETAIL_LINK_CLICKED:
      return action.id
    default:
      return state
  }
}

function videos(state = [], action) {
  switch (action.type) {
    default:
      return state
  }
}

function listLoadPerformed(state = false, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  activeVideoId,
  videos,
  listLoadPerformed
})
