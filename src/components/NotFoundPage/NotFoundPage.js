import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ErrorPage from '../ErrorPage'

class NotFoundPage extends Component {
  static propTypes = {
    staticContext: PropTypes.object
  }

  static defaultProps = {
    staticContext: {}
  }

  render() {
    this.props.staticContext.statusCode = 404
    return <ErrorPage title="404" body="Page Not Found" />
  }
}

export default NotFoundPage
