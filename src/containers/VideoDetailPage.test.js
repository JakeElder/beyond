import React from 'react'
import configureStore from 'redux-mock-store'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter, Route } from 'react-router'
import PropTypes from 'prop-types'
import VideoDetailPage from './VideoDetailPage'
import { videoPropsWithDefaults } from '../components/VideoSummary/test-helpers'

configure({ adapter: new Adapter() })

const createMockStore = configureStore()

describe('VideoListPage', () => {
  it('renders the video specified in the url', () => {
    const state = {
      videos: [
        videoPropsWithDefaults({ id: '1', title: 'Tha Video' }),
        videoPropsWithDefaults({ id: '2', title: 'This is irrelevant' })
      ]
    }
    const store = createMockStore(state)
    const element = (
      <MemoryRouter initialEntries={['/videos/1']}>
        <Route path="/videos/:id">
          <VideoDetailPage />
        </Route>
      </MemoryRouter>
    )
    const options = {
      context: { store },
      childContextTypes: { store: PropTypes.object }
    }
    const wrapper = mount(element, options)
    expect(wrapper.find('.VideoDetailPage-heading').text()).toBe('Tha Video')
  })
})
