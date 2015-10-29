import moment from 'moment'

view Flash {
  let user
  
  on('props', () => {
    if (user && user.uid == ^flash.uid) {
      return
    }
    user = {uid: ^flash.uid}
    userRef = ref.child('users').child(user.uid)
    
    userRef.on('value', userSnapshot => {
      Object.assign(user, userSnapshot.val())
    })
  })

  <leftColumn>
    <Link to={"/" + user.slug}>
      <UserCircle user={user} />
    </Link>
  </leftColumn>
  <rightColumn>
    <feedLine>
      <Link to={"/" + user.slug}>
        {user.displayName}
      </Link>
      <flashed>&nbsp;flashed</flashed>
      <amount>{"$" + ^flash.amount}</amount>
      <Timestamp timestamp={new Date(^flash.timestamp)} />
    </feedLine>
    <Cash amount={^flash.amount} />
  </rightColumn>

  $ = {
    marginBottom: 20,
    flexDirection: 'row'
  }
  
  $leftColumn = {
    marginRight: 20
  }
  
  $feedLine = {
    flexDirection: 'row'
  }
  
  $flashed = {
  }
  
  $amount = {
    marginLeft: 8,
    marginRight: 8,
    fontFamily: 'Copperplate',
    fontSize: 18
  }
}
