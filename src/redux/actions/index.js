import { VIDEO_DETAIL_LINK_CLICKED } from '../constants'

export function videoDetailLinkClicked(id) {
  return {
    type: VIDEO_DETAIL_LINK_CLICKED,
    id
  }
}
