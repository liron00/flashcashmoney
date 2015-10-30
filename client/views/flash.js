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
      <Link class="userLink" to={"/" + user.slug}>
        {user.displayName}
      </Link>
      <flashed>{^timeless? "is flashing" : "flashed"}</flashed>
      <amount>{"$" + ^flash.amount}</amount>
      <Timestamp if={!^timeless} timestamp={new Date(^flash.timestamp)} />
    </feedLine>
    <Trash if={^flash.trash} trash={^flash.trash} />
    <Cash amount={^flash.amount} />
  </rightColumn>

  $ = {
    flexDirection: 'row'
  }
  
  $leftColumn = {
    marginRight: 20,
    marginTop: 2
  }
  
  $feedLine = {
    flexDirection: 'row',
    fontSize: 14,
    fontFamily: 'Copperplate',
    marginBottom: 16
  }
  
  $userLink = {
    color: 'green',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'helvetica neue'
  }
  
  $flashed = {
    marginLeft: 8,
    color: '#666'
  }
  
  $amount = {
    marginLeft: 8,
    marginRight: 8,
    fontFamily: 'Copperplate',
    fontSize: 36
  }
  
  $Trash = {
    marginBottom: 20
  }
  
  $Timestamp = {
    color: '#666'
  }
}
