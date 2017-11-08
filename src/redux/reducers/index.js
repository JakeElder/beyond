import { combineReducers } from 'redux'
import {
  APP_STATE_CHECKING_CAN_INCREMENT,
  APP_STATE_IDLE,
  COUNT_INCREMENT_APPROVED,
  COUNT_INCREMENT_DENIED,
  COUNT_INCREMENT_REQUESTED,
  COUNT_INCREMENT_REQUEST_FAILED
} from '../constants'

function appState(state = APP_STATE_IDLE, action) {
  switch (action.type) {
    case COUNT_INCREMENT_REQUESTED:
      return APP_STATE_CHECKING_CAN_INCREMENT
    case COUNT_INCREMENT_APPROVED:
    case COUNT_INCREMENT_DENIED:
    case COUNT_INCREMENT_REQUEST_FAILED:
      return APP_STATE_IDLE
    default:
      return state
  }
}

function count(state = 0, action) {
  switch (action.type) {
    case COUNT_INCREMENT_APPROVED:
      return state + 1
    default:
      return state
  }
}

function error(state = false, action) {
  switch (action.type) {
    case COUNT_INCREMENT_DENIED:
      return action.reason
    case COUNT_INCREMENT_REQUEST_FAILED:
      return action.message
    case COUNT_INCREMENT_REQUESTED:
      return false
    default:
      return state
  }
}

export default combineReducers({
  appState,
  count,
  error
})
