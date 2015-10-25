view User {
  <userLoaded if={^user.displayName}>
    <photo-img src={^user.photoUrl} />
    <name>{^user.displayName}</name>
  </userLoaded>
  
  <userDidntLoad if={!^user.displayName}>
    <uid>Unknown user {JSON.stringify(^user.uid)}</uid>
  </userDidntLoad>
  
  $uid = {
    fontFamily: 'courier new'
  }
}