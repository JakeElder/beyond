import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Error.css'

class Error extends Component {
  render() {
    const { title, body } = this.props
    return (
      <div className={s.root}>
        <h1 className={s.title}>{title}</h1>
        <p className={s.body}>{body}</p>
      </div>
    )
  }
}

export default withStyles(s)(Error)
