import moment from 'moment'

view Timestamp {
  const handle = setInterval(view.update, 5000)
  on('unmount', () => {clearInterval(handle)})
  
  <timestamp>{moment(view.props.timestamp).fromNow()}</timestamp>
}
