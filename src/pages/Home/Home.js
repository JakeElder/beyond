import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import PropTypes from 'prop-types'
import s from './Home.css'
import { incrementCount } from '../../redux/actions'

@connect(({ count }) => ({ count }), { handleIncrementRequest: incrementCount })
class Home extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    handleIncrementRequest: PropTypes.func.isRequired
  }

  render() {
    const { count, handleIncrementRequest } = this.props
    return (
      <div className={s.root}>
        <h1>Home</h1>
        <div>
          Count: {count}
        </div>
        <button onClick={handleIncrementRequest}>Increment</button>
      </div>
    )
  }
}

export default withStyles(s)(Home)
