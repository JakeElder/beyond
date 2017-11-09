import React from 'react'
import configureStore from 'redux-mock-store'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router'
import PropTypes from 'prop-types'
import VideoListPage from './VideoListPage'
import { videoPropsWithDefaults } from '../components/VideoSummary/test-helpers'

configure({ adapter: new Adapter() })

const createMockStore = configureStore()

describe('VideoListPage', () => {
  it('renders the videos in the current state', () => {
    const state = {
      videos: [
        videoPropsWithDefaults({ id: '1' }),
        videoPropsWithDefaults({ id: '2' }),
        videoPropsWithDefaults({ id: '3' })
      ]
    }
    const store = createMockStore(state)
    const wrapper = mount(
      <MemoryRouter>
        <VideoListPage />
      </MemoryRouter>,
      {
        context: { store },
        childContextTypes: { store: PropTypes.object }
      }
    )
    expect(wrapper.find('.VideoSummary-root').length).toBe(3)
  })
})
