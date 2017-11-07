export function canBeIncremented() {
  return new Promise((resolve, reject) => {
    // Approve 1/3rd of the time
    if (Math.random() < 0.33) { return resolve([true]) }

    // Deny 1/3rd of the time
    if (Math.random() < 0.5) {
      return resolve([false, 'That\'s quite enough incrementing for now'])
    }

    // Fail the remaining 1/3rd
    return reject(new Error('Request borked'))
  })
}
