/* eslint-disable react/no-danger */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Ellipsis from 'ftellipsis'
import debounce from 'debounce'
import { formatDate } from '../../utils'
import s from './VideoSummary.css'

class VideoSummary extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    publishedAt: PropTypes.string,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }

  static defaultProps = {
    publishedAt: null
  }

  componentDidMount() {
    if (__BROWSER__) {
      window.addEventListener('resize', this.handleWindowResize)
      if (__DEV__) {
        // Wait for style loader to inject the css in to the <head>
        setTimeout(() => this.truncate(), 500)
      } else {
        this.truncate()
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  truncate(fromResize = false) {
    // Don't do anything if element is hidden
    if (this.description.offsetParent === null) { return }

    // Calculate how much height is available in container
    const descriptionRect = this.description.getBoundingClientRect()
    const rootRect = this.root.getBoundingClientRect()
    const descriptionOffsetFromTop = descriptionRect.y - rootRect.y
    const heightAvailable = rootRect.height - descriptionOffsetFromTop

    // Set an explicit height on element so Ellipsis can properly truncate
    this.description.style.height = `${heightAvailable - 10}px`

    // Tidy up previous instance, if it exists
    if (fromResize && this.ellipsis) { this.ellipsis.destroy() }

    // Instantiate Ellipsis and truncate
    this.ellipsis = new Ellipsis(this.description)
    this.ellipsis.calc()
    this.ellipsis.set()
  }

  // TODO: Factor out. This isn't ideal
  handleWindowResize = debounce(() => this.truncate(true), 200)

  render() {
    const {
      id,
      link,
      publishedAt,
      title,
      thumbnail,
      description
    } = this.props

    return (
      <div ref={(el) => { this.root = el }} className={s.root}>
        <div className={s.content}>
          <a className={s.headingLink} data-push href={link} title={title}>
            <h2 className={s.heading}>{title}</h2>
          </a>
          {publishedAt &&
            <div className={s.publishedAt}>
              <span className={s.publishedAtLabel}>Published: </span>
              <time className={s.publishedAtDate} dateTime={publishedAt}>
                {formatDate(publishedAt)}
              </time>
            </div>
          }
          <div
            className={s.description}
            ref={(el) => { this.description = el }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <a className={s.thumbnailLink} data-push data-id={id} href={link} title={title}>
          <img className={s.thumbnail} src={thumbnail} alt="" />
        </a>
      </div>
    )
  }
}

export default VideoSummary
