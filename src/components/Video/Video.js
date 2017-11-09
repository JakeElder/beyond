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
  <div data-id={id} className={s.root}>
    <div className={s.meta}>
      <h2 className={s.heading}>{title}</h2>
      {publishedAt &&
        <time dateTime={publishedAt} className={s.publishedAt}>
          {dateFormat(new Date(publishedAt), DATE_FORMAT)}
        </time>
      }
      <img src={thumbnail} alt="" />
      <div className={s.description}>
        {description}
      </div>
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

Video.defaultProps = {
  publishedAt: null
}

export default Video
