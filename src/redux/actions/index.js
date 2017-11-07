import {
  COUNT_INCREMENT_REQUESTED,
  COUNT_INCREMENT_APPROVED,
  COUNT_INCREMENT_DENIED,
  COUNT_INCREMENT_REQUEST_FAILED
} from '../constants'

export function countIncrementRequested() {
  return {
    type: COUNT_INCREMENT_REQUESTED
  }
}

export function countIncrementApproved() {
  return {
    type: COUNT_INCREMENT_APPROVED
  }
}

export function countIncrementDenied(reason) {
  return {
    type: COUNT_INCREMENT_DENIED,
    reason
  }
}

export function countIncrementRequestFailed(message) {
  return {
    type: COUNT_INCREMENT_REQUEST_FAILED,
    message
  }
}
