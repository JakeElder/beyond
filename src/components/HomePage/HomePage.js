import React, { Component } from 'react'
import PropTypes from 'prop-types'
import s from './HomePage.css'

class HomePage extends Component {
  static propTypes = {
    allowIncrement: PropTypes.bool,
    count: PropTypes.number.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    handleIncrementRequest: PropTypes.func.isRequired
  }

  static defaultProps = {
    allowIncrement: true,
    error: false
  }

  handleIncrementRequest = () => {
    if (this.props.allowIncrement) {
      this.props.handleIncrementRequest()
    }
  }

  render() {
    const {
      allowIncrement,
      count,
      error
    } = this.props

    return (
      <div className={s.root}>
        <div className={s.content}>
          <h1 className={s.heading}>Home</h1>
          <div className={s.count}>
            Count: {count}
          </div>
          <button
            className={allowIncrement ? s.button : s.buttonDisabled}
            onClick={this.handleIncrementRequest}
          >
            Increment
          </button>
          {error && <div className={s.error}>{error}</div>}
        </div>
      </div>
    )
  }
}

export default HomePage
