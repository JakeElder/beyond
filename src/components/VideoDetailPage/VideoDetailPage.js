import React from 'react'
import PropTypes from 'prop-types'
import Video from '../Video'
import s from './VideoDetailPage.css'

const VideoDetailPage = ({ video }) => (
  <div className={s.root}>
    <h1 className={s.heading}>Video Detail</h1>
    <Video {...video} />
  </div>
)

VideoDetailPage.propTypes = {
  video: PropTypes.object.isRequired
}

export default VideoDetailPage
