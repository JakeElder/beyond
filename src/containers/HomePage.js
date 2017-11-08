import { connect } from 'react-redux'
import { APP_STATE_IDLE } from '../redux/constants'
import { countIncrementRequested } from '../redux/actions'
import HomePage from '../components/HomePage'

const mapStateToProps = ({
  appState,
  count,
  error
}) => ({
  allowIncrement: appState === APP_STATE_IDLE,
  count,
  error
})

const mapDispatchToProps = {
  handleIncrementRequest: countIncrementRequested
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
