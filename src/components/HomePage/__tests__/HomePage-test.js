import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import HomePage from '../HomePage'

configure({ adapter: new Adapter() })

describe('HomePage', () => {
  test('HomePage shows the count passed', () => {
    const props = { count: 1, handleIncrementRequest: () => {} }
    const wrapper = shallow(<HomePage {...props} />)
    expect(wrapper.find('.HomePage-count').text()).toBe('Count: 1')
  })

  test('HomePage shows an error if passed', () => {
    const props = {
      count: 1,
      handleIncrementRequest: () => {},
      error: 'Something went wrong'
    }
    const wrapper = shallow(<HomePage {...props} />)
    expect(wrapper.find('.HomePage-error').text()).toBe('Something went wrong')
  })
})
