import React from 'react'
import configureStore from 'redux-mock-store'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router'
import PropTypes from 'prop-types'
import VideoListPage from './VideoListPage'
import { videoPropsWithDefaults } from '../components/VideoSummary/test-helpers'
import LoadingPage from '../components/LoadingPage'

configure({ adapter: new Adapter() })

const createMockStore = configureStore()

function mountWithStore(element, store) {
  const wrappedElement = (
    <MemoryRouter>
      {element}
    </MemoryRouter>
  )
  const options = {
    context: { store },
    childContextTypes: { store: PropTypes.object }
  }
  return mount(wrappedElement, options)
}

describe('VideoListPage', () => {
  it('renders the videos in the current state', () => {
    const state = {
      videos: [
        videoPropsWithDefaults({ id: '1' }),
        videoPropsWithDefaults({ id: '2' }),
        videoPropsWithDefaults({ id: '3' })
      ],
      listLoadPerformed: true
    }
    const store = createMockStore(state)
    const wrapper = mountWithStore(<VideoListPage />, store)
    expect(wrapper.find('.VideoSummary-root').length).toBe(3)
  })

  it('renders the loading page when list data has not been loaded', () => {
    const state = {
      videos: [],
      listLoadPerformed: false
    }
    const store = createMockStore(state)
    const wrapper = mountWithStore(<VideoListPage />, store)
    expect(wrapper.find(LoadingPage).length).toBe(1)
  })
})
