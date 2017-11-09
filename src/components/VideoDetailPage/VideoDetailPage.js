import React from 'react'
import PropTypes from 'prop-types'
import s from './VideoDetailPage.css'

const VideoDetailPage = ({ video }) => (
  <div className={s.root}>
    <h1 className={s.heading}>{video.title}</h1>
  </div>
)

VideoDetailPage.propTypes = {
  video: PropTypes.object.isRequired
}

export default VideoDetailPage
