import moment from 'moment'

view Flash {
  let user = {uid: ^flash.uid}
  let userRef = ref.child('users').child(user.uid)
  
  userRef.on('value', userSnapshot => {
    Object.assign(user, userSnapshot.val())
  })
  

  <userSection if={^showUser != false}>
    <Link to={"/" + user.slug}>
      <User user={user} />
    </Link>
  </userSection>
  <Timestamp timestamp={new Date(^flash.timestamp)} />
  <Cash amount={^flash.amount} />

  $ = {
    marginBottom: 20
  }
}
