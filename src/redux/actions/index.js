import { INCREMENT_COUNT } from '../constants'

// eslint-disable-next-line import/prefer-default-export
export function incrementCount() {
  return {
    type: INCREMENT_COUNT
  }
}
