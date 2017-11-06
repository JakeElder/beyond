import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Home.css'
import { connect } from 'react-redux'
import { incrementCount } from '../../redux/actions'

@connect(({ count }) => ({ count }), { incrementCount })
class Home extends Component {
  render() {
    const { count, incrementCount } = this.props
    return (
      <div className={s.root}>
        <h1>Home</h1>
        <div>
          Count: {count}
        </div>
        <button onClick={incrementCount}>Increment</button>
      </div>
    )
  }
}

export default withStyles(s)(Home)
