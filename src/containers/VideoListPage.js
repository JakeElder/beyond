import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import VideoListPage from '../components/VideoListPage'
import LoadingPage from '../components/LoadingPage'
import { videoListPageNavigatedToWithoutData } from '../redux/actions'

class VideoListPageContainer extends Component {
  static propTypes = {
    videos: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    videosLoaded: PropTypes.bool.isRequired
  }

  componentWillMount() {
    const { videosLoaded, dispatch } = this.props
    if (__BROWSER__ && !videosLoaded) {
      dispatch(videoListPageNavigatedToWithoutData())
    }
  }
  render() {
    const { videos, videosLoaded } = this.props

    // Add link to videos
    // Best to keep this out of the model as it can be derived from model data
    const videosWithLinks = videos.map(v =>
      Object.assign({}, v, { link: `/videos/${v.id}` }))

    if (videosLoaded) {
      return <VideoListPage videos={videosWithLinks} />
    }

    return <LoadingPage />
  }
}

const mapStateToProps = ({
  videos,
  listLoadPerformed
}) => ({
  videos,
  videosLoaded: listLoadPerformed
})
export default connect(mapStateToProps)(VideoListPageContainer)
