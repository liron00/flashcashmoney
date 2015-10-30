view NavBar {
  <NavLink to="/">home</NavLink>
  <NavLink to="/about">about</NavLink>
  <userPageLink if={^user && !(^authUser && ^authUser.uid == ^user.uid)}>
    <User user={^user} />
  </userPageLink>
  <UserStatus authUser={^authUser} />
  
  $ = {
    width: '100%',
    flexDirection: 'row'
  }
  
  $NavLink = {
    marginRight: 8
  }
  
  $User = {
    marginLeft: 8
  } 
  
  $UserStatus = {
    marginLeft: 'auto'
  }
}
