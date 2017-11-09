import React from 'react'
import PropTypes from 'prop-types'
import dateFormat from 'dateformat'
import s from './VideoSummary.css'

// TODO: Factor out in to constants/config
const DATE_FORMAT = 'mmm d, yyyy'

const VideoSummary = ({
  id,
  link,
  publishedAt,
  title,
  thumbnail,
  description
}) => (
  <div className={s.root}>
    <div className={s.meta}>
      <a data-push data-id={id} href={link} title={title}>
        <h2 className={s.heading}>{title}</h2>
        {publishedAt &&
          <time dateTime={publishedAt} className={s.publishedAt}>
            {dateFormat(new Date(publishedAt), DATE_FORMAT)}
          </time>
        }
        <img src={thumbnail} alt="" />
      </a>
      <div className={s.description}>
        {description}
      </div>
    </div>
  </div>
)

VideoSummary.propTypes = {
  id: PropTypes.string.isRequired,
  publishedAt: PropTypes.string,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
}

VideoSummary.defaultProps = {
  publishedAt: null
}

export default VideoSummary
