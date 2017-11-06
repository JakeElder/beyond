import { INCREMENT_COUNT } from '../constants'

function count(state = 0, action) {
  switch (action.type) {
    case INCREMENT_COUNT:
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
