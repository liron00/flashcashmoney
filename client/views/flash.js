import moment from 'moment'

view Flash {
  let user
  
  on('props', () => {
    if (user && user.uid == view.props.flash.uid) {
      return
    }
    user = {uid: view.props.flash.uid}
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
      <NavLink class="userLink" to={"/" + user.slug}>
        {user.displayName}
      </NavLink>
      <flashed>{view.props.timeless? "is flashing" : "flashed"}</flashed>
      <amount>{"$" + view.props.flash.amount}</amount>
      <Timestamp if={!view.props.timeless} timestamp={new Date(view.props.flash.timestamp)} />
    </feedLine>
    <Trash if={view.props.flash.trash} trash={view.props.flash.trash} />
    <Cash amount={view.props.flash.amount} />
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
    fontSize: 24
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
