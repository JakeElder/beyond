import { connect } from 'react-redux'
import { countIncrementRequested } from '../redux/actions'
import HomePage from '../components/HomePage'

const mapStateToProps = ({ count }) => ({ count })
const mapDispatchToProps = { handleIncrementRequest: countIncrementRequested }

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
