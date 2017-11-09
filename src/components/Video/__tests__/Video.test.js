import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import dateFormat from 'dateformat'
import Video from '../Video'
import { videoPropsWithDefaults } from './helpers'

configure({ adapter: new Adapter() })

describe('Video', () => {
  test('shows the published date in the correct format', () => {
    const props = videoPropsWithDefaults({
      publishedAt: dateFormat('Jan 1 2001', 'isoUtcDateTime')
    })
    const wrapper = shallow(<Video {...props} />)
    expect(wrapper.find('.Video-publishedAt').text()).toBe('Jan 1, 2001')
  })
})