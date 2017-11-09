import React from 'react'
import configureStore from 'redux-mock-store'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import VideoDetailPage from './VideoDetailPage'
import { videoPropsWithDefaults } from '../components/VideoSummary/test-helpers'

configure({ adapter: new Adapter() })

const createMockStore = configureStore()

describe('VideoListPage', () => {
  it('renders the video specified under activeVideoId in the current state', () => {
    const state = {
      videos: [
        videoPropsWithDefaults({ id: '1', title: 'Tha Video' }),
        videoPropsWithDefaults({ id: '2', title: 'This is irrelevant' })
      ],
      activeVideoId: '1'
    }
    const store = createMockStore(state)
    const wrapper = mount(<VideoDetailPage />, { context: { store } })
    expect(wrapper.find('.VideoDetailPage-heading').text()).toBe('Tha Video')
  })
})
