view Flash {
  let user = {uid: ^flash.uid}
  let userRef = ref.child('users').child(user.uid)
  
  userRef.on('value', userSnapshot => {
    Object.assign(user, userSnapshot.val())
    setTimeout(view.update)
  })
  
  <User user={user} />
  <Timestamp timestamp={new Date(^flash.timestamp)} />
  <cash>
    Amount: ${^flash.amount}
  </cash>

  $ = {
    marginBottom: 20
  }
  $cash = {
    flexFlow: 'row'
  }
}