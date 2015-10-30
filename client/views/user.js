view User {  
  <loaded if={^user.displayName}>
    <UserCircle size={32} user={^user} glow={false} />
    <NavLink to={"/" + ^user.slug}>{^user.displayName}</NavLink>
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
  
  $uid = {
    fontFamily: 'courier new'
  }
}
