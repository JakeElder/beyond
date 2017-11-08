import test from 'tape'
import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import HomePage from './HomePage'

configure({ adapter: new Adapter() })

test('HomePage shows the count passed', (t) => {
  const props = { count: 1, handleIncrementRequest: () => {} }
  const wrapper = shallow(<HomePage {...props} />)
  t.equal(wrapper.find('.HomePage-count').text(), 'Count: 1')
  t.end()
})

test('HomePage shows an error if passed', (t) => {
  const props = {
    count: 1,
    handleIncrementRequest: () => {},
    error: 'Something went wrong'
  }
  const wrapper = shallow(<HomePage {...props} />)
  t.equal(wrapper.find('.HomePage-error').text(), 'Something went wrong')
  t.end()
})
