import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import VideoListPage from './VideoListPage'
import Video from '../components/Video'
import { videoPropsWithDefaults } from '../components/Video/__tests__/helpers'

configure({ adapter: new Adapter() })

const createMockStore = configureStore()

describe('VideoListPage', () => {
  test('renders the videos in the current state', () => {
    const state = {
      videos: [
        videoPropsWithDefaults({ id: '1' }),
        videoPropsWithDefaults({ id: '2' }),
        videoPropsWithDefaults({ id: '3' })
      ]
    }
    const store = createMockStore(state)
    const wrapper = mount(<VideoListPage />, { context: { store } })
    expect(wrapper.find('.Video-root').length).toBe(3)
  })
})
