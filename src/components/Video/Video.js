import React from 'react'
import PropTypes from 'prop-types'
import dateFormat from 'dateformat'
import s from './Video.css'

// TODO: Factor out in to constants/config
const DATE_FORMAT = 'mmm d, yyyy'

const Video = ({
  id,
  publishedAt,
  title,
  thumbnail,
  description
}) => (
  <div className={s.root}>
    <div className={s.meta}>
      <h2 className={s.heading}>{title}</h2>
      {publishedAt &&
        <time dateTime={publishedAt} className={s.publishedAt}>
          {dateFormat(new Date(publishedAt), DATE_FORMAT)}
        </time>
      }
    </div>
  </div>
)

Video.propTypes = {
  id: PropTypes.string.isRequired,
  publishedAt: PropTypes.string,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default Video
