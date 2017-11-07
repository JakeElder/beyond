export function canBeIncremented() {
  return new Promise((resolve, reject) => {
    const random = Math.random()
    if (random < 0.33) {
      resolve([true])
    } else if (random < 0.66) {
      resolve([false, 'That\'s quite enough incrementing for now'])
    } else {
      reject(new Error('Request borked'))
    }
  })
}
