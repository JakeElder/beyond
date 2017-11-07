import React from 'react'
import PropTypes from 'prop-types'
import s from './ErrorPage.css'

const ErrorPage = ({ title, body }) => (
  <div className={s.root}>
    <h1 className={s.title}>{title}</h1>
    <p className={s.body}>{body}</p>
  </div>
)

ErrorPage.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
}

export default ErrorPage
