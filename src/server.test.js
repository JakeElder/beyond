import request from 'supertest'
import { JSDOM } from 'jsdom'
import server from './server'

describe('/', () => {
  it('returns 200', async () => {
    const instance = server.listen()
    await request(instance).get('/').expect(200)
  })

  it('renders a list of 10 videos', async () => {
    const instance = server.listen()
    const response = await request(instance).get('/')
    const { document } = new JSDOM(response.text).window

    expect(document.querySelectorAll('.VideoListPage-root').length).toBe(1)
    expect(document.querySelectorAll('.Video-root').length).toBe(10)
  })
})
