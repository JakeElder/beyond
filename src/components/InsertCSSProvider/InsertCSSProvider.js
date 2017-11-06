import { Component, Children } from 'react'
import { element, func, instanceOf } from 'prop-types'

class InsertCSSProvider extends Component {
  static childContextTypes = {
    insertCss: func
  }

  static propTypes = {
    css: instanceOf(Map),
    children: element.isRequired
  }

  static defaultProps = {
    css: new Map()
  }

  getChildContext() {
    const { css } = this.props
    return {
      insertCss: (...styles) => {
        if (__BROWSER__) {
          const removeCss = styles.map(x => x._insertCss())
          return () => removeCss.forEach(f => f())
        }
        return styles.forEach(style => css.add(style._getCss()))
      }
    }
  }

  render() {
    return Children.only(this.props.children)
  }
}

export default InsertCSSProvider
