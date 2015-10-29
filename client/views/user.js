view User {  
  <loaded if={^user.displayName}>
    <UserCircle size={32} user={^user} />
    <name>{^user.displayName}</name>
  </loaded>
  <didntLoad if={!^user.displayName}>
    <uid>Unknown user {JSON.stringify(^user.uid)}</uid>
  </didntLoad>
  
  $loaded = {
    flexFlow: 'row',
    alignItems: 'flex-start'
  }
  
  $UserCircle = {
    marginRight: 8
  }
  
  $name = {
    fontSize: 18,
    fontWeight: 'bold'
  }
  
  $uid = {
    fontFamily: 'courier new'
  }
}
