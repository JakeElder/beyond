import { connect } from 'react-redux'
import VideoListPage from '../components/VideoListPage'

const mapStateToProps = ({ videos }) => ({ videos })

export default connect(mapStateToProps)(VideoListPage)
