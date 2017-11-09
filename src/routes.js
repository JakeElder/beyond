import VideoListPage from './containers/VideoListPage'
import VideoDetailPage from './containers/VideoDetailPage'
import NotFoundPage from './components/NotFoundPage'
import * as Video from './models/video'

const routes = [{
  path: '/',
  exact: true,
  component: VideoListPage,
  getData: async () => {
    const videos = await Video.all()
    return { videos }
  }
}, {
  path: '/videos/:id',
  component: VideoDetailPage,
  getData: async ({ id }) => {
    const video = await Video.find(id)
    return {
      videos: [video],
      activeVideoId: video.id
    }
  }
}, {
  component: NotFoundPage
}]

export default routes
