view Flash {
  let user = {uid: ^flash.uid}
  let userRef = ref.child('users').child(user.uid)
  
  userRef.on('value', data => {
    Object.assign(user, data.val())
  })
  
  <User user={user} />
  <div>Time: {^flash.timestamp}</div>
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