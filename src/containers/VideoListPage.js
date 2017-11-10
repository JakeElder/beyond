import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import matches from 'dom-matches'
import PropTypes from 'prop-types'
import VideoListPage from '../components/VideoListPage'
import LoadingPage from '../components/LoadingPage'
import {
  videoDetailLinkClicked,
  videoListPageNavigatedToWithoutData
} from '../redux/actions'

class VideoListPageContainer extends Component {
  static propTypes = {
    videos: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    videosLoaded: PropTypes.bool.isRequired
  }

  componentWillMount() {
    const { videosLoaded, dispatch } = this.props
    if (__BROWSER__ && !videosLoaded) {
      dispatch(videoListPageNavigatedToWithoutData())
    }
  }

  /*
   * This function listens for click/touch/keyboard presses on child anchors
   * in order to provide pushState navigation
   * This is in order to keep components as dumb and away from application
   * logic as possible
   */
  handleClick = (e) => {
    let node = e.target
    // Traverse up the tree to see if the target has an <a data-push> as an
    // ancestor
    do {
      if (matches(node, 'a[data-push]')) {
        // Prevent browser navigation and push the new url
        e.preventDefault()
        this.props.history.push(node.getAttribute('href'))
      }
      node = node.parentNode
    } while (node)
  }

  render() {
    const { videos, videosLoaded } = this.props

    // Add link to videos
    // Best to keep this out of the model as it can be derived from model data
    const videosWithLinks = videos.map(v =>
      Object.assign({}, v, { link: `/videos/${v.id}` }))

    if (videosLoaded) {
      // As this div is handling events bubbled up from an (accesible) anchor
      // tag these rules can be disabled without impacting accessibility
      /*
        eslint-disable
        jsx-a11y/click-events-have-key-events,
        jsx-a11y/no-static-element-interactions
      */
      return (
        <div onClick={this.handleClick}>
          <VideoListPage videos={videosWithLinks} />
        </div>
      )
      /*
        eslint-enable
        jsx-a11y/click-events-have-key-events,
        jsx-a11y/no-static-element-interactions
      */
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
export default withRouter(connect(mapStateToProps)(VideoListPageContainer))
