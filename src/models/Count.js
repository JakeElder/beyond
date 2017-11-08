export function canBeIncremented() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Approve 1/2 of the time
      if (Math.random() < 0.5) { return resolve([true]) }

      // Deny 1/4 of the time
      if (Math.random() < 0.5) {
        return resolve([false, 'That\'s quite enough incrementing for now'])
      }

      // Fail the remaining 1/4
      return reject(new Error('Request borked'))
    }, 1000)
  })
}
