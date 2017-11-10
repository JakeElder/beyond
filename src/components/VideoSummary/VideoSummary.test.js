import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import dateFormat from 'dateformat'
import VideoSummary from './VideoSummary'
import { videoPropsWithDefaults } from './test-helpers'

configure({ adapter: new Adapter() })

describe('VideoSummary', () => {
  test('shows the published date in the correct format', () => {
    const props = videoPropsWithDefaults({
      publishedAt: dateFormat('Jan 1 2001', 'isoUtcDateTime')
    })
    const wrapper = shallow(<VideoSummary {...props} />)
    expect(wrapper.find('.VideoSummary-published-at-date').text()).toBe('Jan 1, 2001')
  })

  it('doesn\'t show a date when null', () => {
    const props = videoPropsWithDefaults({
      publishedAt: null
    })
    const wrapper = shallow(<VideoSummary {...props} />)
    expect(wrapper.find('.VideoSummary-published-at').length).toBe(0)
  })
})
