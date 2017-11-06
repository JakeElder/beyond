import React, { Component, Children } from 'react'
import { func } from 'prop-types'

class InsertCSSProvider extends Component {
  static childContextTypes = {
    insertCss: func
  }

  getChildContext(...styles) {
    const { css } = this.props
    return {
      insertCss: (...styles) => {
        if (__BROWSER__) {
          const removeCss = styles.map(x => x._insertCss())
          return () => removeCss.forEach(f => f())
        } else {
          return styles.forEach(style => css.add(style._getCss()))
        }
      }
    }
  }

  render() {
    return Children.only(this.props.children)
  }
}

export default InsertCSSProvider
