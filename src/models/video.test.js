import fs from 'fs-extra'
import path from 'path'
import * as Video from './video'

const expectedVideo = {
  id: 'X0qwQqwKLlM',
  publishedAt: '2009-09-07T15:09:56.000Z',
  title: 'Lamb Angelica',
  thumbnail: 'https://i.ytimg.com/vi/X0qwQqwKLlM/hqdefault.jpg',
  description: 'From Lamb\'s 2003 album Between Darkness and Wonder'
}

describe('all', () => {
  it('resolves with a list of videos', async () => {
    const videos = await Video.all()
    expect(videos.length).toBe(10)
    expect(videos[0]).toEqual(expectedVideo)
  })

  // TODO: Handle errors
})

describe('googlePlaylistItemsItemToVideo', () => {
  it('transforms the response to only include useful data', () => {
    const jsonPath = path.resolve(__dirname, '__fixtures__', 'playlistitems-response.json')
    const response = fs.readJsonSync(jsonPath)
    const transformed = Video.googlePlaylistItemsItemToVideo(response.items[0])
    expect(transformed).toEqual(expectedVideo)
  })
})

describe('googleVideosResponseToVideo', () => {
  it('transforms the response to only include useful data', () => {
    const jsonPath = path.resolve(__dirname, '__fixtures__', 'videos-response.json')
    const response = fs.readJsonSync(jsonPath)
    const transformed = Video.googleVideosResponseToVideo(response)
    expect(transformed).toEqual(expectedVideo)
  })
})

describe('find', () => {
  it('returns a single video when given an id', async () => {
    const video = await Video.find('X0qwQqwKLlM')
    expect(video).toEqual(expectedVideo)
  })
})
