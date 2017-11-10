import React from 'react'
import PropTypes from 'prop-types'
import VideoList from '../VideoList'
import s from './VideoListPage.css'

const VideoListPage = ({ videos }) => (
  <div className={s.root}>
    <h1 className={s.heading}>My Youtube Playlist</h1>
    <VideoList videos={videos} />
  </div>
)

VideoListPage.propTypes = {
  videos: PropTypes.array.isRequired
}

export default VideoListPage
