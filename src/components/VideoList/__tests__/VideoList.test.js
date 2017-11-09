import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import VideoList from '../VideoList'
import { videoPropsWithDefaults } from '../../Video/__tests__/helpers'

configure({ adapter: new Adapter() })

describe('VideoList', () => {
  test('renders a list item for every video passed', () => {
    const props = {
      videos: [
        videoPropsWithDefaults({ id: '1' }),
        videoPropsWithDefaults({ id: '2' }),
        videoPropsWithDefaults({ id: '3' })
      ]
    }
    const wrapper = shallow(<VideoList {...props} />)
    expect(wrapper.find('.VideoList-video').length).toBe(3)
  })
})
