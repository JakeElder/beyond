import fs from 'fs-extra'
import path from 'path'
import { googleItemToVideo, all } from '../video'

const expectedVideo = {
  id: 'X0qwQqwKLlM',
  publishedAt: '2009-09-07T15:09:56.000Z',
  title: 'Lamb Angelica',
  thumbnail: 'https://i.ytimg.com/vi/X0qwQqwKLlM/hqdefault.jpg',
  description: 'From Lamb\'s 2003 album Between Darkness and Wonder'
}

describe('all', () => {
  it('resolves with a list of videos', async () => {
    const videos = await all()
    expect(videos.length).toBe(10)
    expect(videos[0]).toEqual(expectedVideo)
  })

  // TODO: Handle errors
})

describe('googleItemToVideo', () => {
  it('transforms the response to only include useful data', () => {
    const jsonPath = path.resolve(__dirname, '..', '__fixtures__', 'playlistitems-response.json')
    const response = fs.readJsonSync(jsonPath)
    const transformed = googleItemToVideo(response.items[0])
    expect(transformed).toEqual(expectedVideo)
  })
})
