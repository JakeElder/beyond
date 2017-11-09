import { connect } from 'react-redux'
import VideoDetailPage from '../components/VideoDetailPage'

const mapStateToProps = ({ videos, activeVideoId }) => {
  const video = videos.find(v => v.id === activeVideoId)
  return { video }
}

export default connect(mapStateToProps)(VideoDetailPage)
