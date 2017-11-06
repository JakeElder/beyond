import React from 'react'
import PropTypes from 'prop-types'
import Error from '../Error'

class NotFound extends Error {
  static propTypes = {
    staticContext: PropTypes.object
  }

  static defaultProps = {
    staticContext: {}
  }

  render() {
    this.props.staticContext.statusCode = 404
    return <Error title="404" body="Page Not Found" />
  }
}

export default NotFound
