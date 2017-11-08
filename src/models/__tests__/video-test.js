import { all } from '../video'

describe('all', () => {
  it('resolves with a list of videos', async () => {
    expect.assertions(1)
    const videos = await all()
    expect(videos).toMatchObject({
      'items': expect.any(Array)
    })
  })

  // TODO: Handle errors
})
