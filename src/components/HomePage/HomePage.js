import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import PropTypes from 'prop-types'
import s from './HomePage.css'

const HomePage = ({ count, handleIncrementRequest }) => (
  <div className={s.root}>
    <div className={s.content}>
      <h1 className={s.heading}>Home</h1>
      <div className={s.count}>
        Count: {count}
      </div>
      <button
        className={s.button}
        onClick={handleIncrementRequest}
      >
        Increment
      </button>
    </div>
  </div>
)

HomePage.propTypes = {
  count: PropTypes.number.isRequired,
  handleIncrementRequest: PropTypes.func.isRequired
}

export default withStyles(s)(HomePage)
