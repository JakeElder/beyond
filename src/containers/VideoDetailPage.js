import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import VideoDetailPage from '../components/VideoDetailPage'

const mapStateToProps = ({ videos, activeVideoId }, { match }) => {
  const video = videos.find(v => v.id === match.params.id)
  return { video }
}

export default withRouter(connect(mapStateToProps)(VideoDetailPage))
