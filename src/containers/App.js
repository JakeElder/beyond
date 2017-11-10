import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import matches from 'dom-matches'
import PropTypes from 'prop-types'
import App from '../components/App'

class AppContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  /*
   * This function listens for click/touch/keyboard presses on child anchors
   * in order to provide pushState navigation
   * This is in order to keep components as dumb and away from application
   * logic as possible
   */
  handleClick = (e) => {
    let node = e.target
    // Traverse up the tree to see if the target has an <a data-push> as an
    // ancestor
    do {
      if (matches(node, 'a[data-push]')) {
        // Prevent browser navigation and push the new url
        e.preventDefault()
        this.props.history.push(node.getAttribute('href'))
      }
      node = node.parentNode
    } while (node)
  }

  render() {
    // As this div is handling events bubbled up from an (accesible) anchor
    // tag these rules can be disabled without impacting accessibility
    /*
      eslint-disable
      jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-static-element-interactions
    */
    return (
      <div onClick={this.handleClick}>
        <App />
      </div>
    )
    /*
      eslint-enable
      jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-static-element-interactions
    */
  }
}


export default withRouter(AppContainer)
