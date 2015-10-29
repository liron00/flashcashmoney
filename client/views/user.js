view User {  
  <loaded if={^user.displayName}>
    <photo-img src={^user.photoUrl} />
    <name>{^user.displayName}</name>
  </loaded>
  <didntLoad if={!^user.displayName}>
    <uid>Unknown user {JSON.stringify(^user.uid)}</uid>
  </didntLoad>
  
  $loaded = {
    flexFlow: 'row',
    alignItems: 'flex-start'
  }
  
  $photo = {
    maxWidth: 40,
    maxHeight: 40,
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
