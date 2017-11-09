import request from 'supertest'
import { JSDOM } from 'jsdom'
import server from './server'

async function getDocumentForPath(path) {
  const instance = server.listen()
  const response = await request(instance).get(path)
  const { document } = new JSDOM(response.text).window
  return document
}

describe('/', () => {
  it('returns 200', async () => {
    const instance = server.listen()
    await request(instance).get('/').expect(200)
  })

  it('renders a list of 10 videos', async () => {
    const document = await getDocumentForPath('/')
    expect(document.querySelectorAll('.VideoListPage-root').length).toBe(1)
    expect(document.querySelectorAll('.VideoSummary-root').length).toBe(10)
  })
})

describe('/videos/:id', async () => {
  it('returns 200', async () => {
    const instance = server.listen()
    await request(instance).get('/videos/X0qwQqwKLlM').expect(200)
  })

  it('renders the details for one video', async () => {
    const document = await getDocumentForPath('/videos/X0qwQqwKLlM')
    expect(document.querySelectorAll('.VideoDetailPage-root').length).toBe(1)
    expect(document.querySelector('.VideoDetailPage-heading').textContent).toBe('Lamb Angelica')
  })
})
