import React from 'react'
import PropTypes from 'prop-types'
import VideoSummary from '../VideoSummary'
import s from './VideoList.css'

const VideoList = ({ videos }) => (
  <ul className={s.root}>
    {videos.map(video => ((
      <li key={video.id} className={s.video}>
        <VideoSummary {...video} />
      </li>
    )))}
  </ul>
)

VideoList.propTypes = {
  videos: PropTypes.array.isRequired
}

export default VideoList
