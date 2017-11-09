import React from 'react'
import PropTypes from 'prop-types'
import Video from '../Video'
import s from './VideoList.css'

const VideoList = ({ videos }) => (
  <ul className={s.root}>
    {videos.map(video => {
      return (
        <li key={video.id} className={s.video}>
          <Video {...video} />
        </li>
      )
    })}
  </ul>
)

VideoList.PropTypes = {
  videos: PropTypes.array.isRequired
}

export default VideoList
