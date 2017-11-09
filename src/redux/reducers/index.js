import { combineReducers } from 'redux'

function activeVideoId(state = null, action) {
  switch (action.type) {
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

export default combineReducers({
  activeVideoId,
  videos
})
