import moment from 'moment'

view Flash {
  let user = {uid: ^flash.uid}
  let userRef = ref.child('users').child(user.uid)
  
  userRef.on('value', userSnapshot => {
    Object.assign(user, userSnapshot.val())
    setTimeout(view.update)
  })
  
  <User user={user} />
  <Timestamp timestamp={moment(^flash.timestamp).fromNow()} />
  <Cash amount={^flash.amount} />

  $ = {
    marginBottom: 20
  }
}