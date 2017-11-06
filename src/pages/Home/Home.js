import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Home.css'

class Home extends Component {
  render() {
    return (
      <div className={s.root}>Home</div>
    )
  }
}

export default withStyles(s)(Home)
