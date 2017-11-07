import { COUNT_INCREMENT_APPROVED } from '../constants'

function count(state = 0, action) {
  switch (action.type) {
    case COUNT_INCREMENT_APPROVED:
      return state + 1
    default:
      return state
  }
}

export default function reducer(state = {}, action) {
  return {
    count: count(state.count, action)
  }
}
