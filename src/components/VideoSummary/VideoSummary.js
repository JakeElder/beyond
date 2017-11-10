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
      <a className={s.link} data-push data-id={id} href={link} title={title}>
        <h2 className={s.heading}>{title}</h2>
      </a>
      {publishedAt &&
        <div className={s.publishedAt}>
          <span className={s.publishedAtLabel}>Published: </span>
          <time className={s.publishedAtDate} dateTime={publishedAt}>
            {dateFormat(new Date(publishedAt), DATE_FORMAT)}
          </time>
        </div>
      }
    </div>
    <a className={s.link} data-push data-id={id} href={link} title={title}>
      <img className={s.thumbnail} src={thumbnail} alt="" />
    </a>
    <div className={s.description}>
      {description}
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
