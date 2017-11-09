import VideoListPage from './containers/VideoListPage'
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
  component: NotFoundPage
}]

export default routes
