import moment from 'moment'

view Timestamp {
  let timestampString
  
  const handle = setInterval(view.update, 5000)
  on('unmount', () => {clearInterval(handle)})
  
  <timestamp>{moment(^timestamp).fromNow()}</timestamp>
}
