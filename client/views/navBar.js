view NavBar {
  <NavLink to="/">Home</NavLink>
  <NavLink to="/about">About</NavLink>
  <UserStatus authUser={^authUser} />
  
  $ = {
    width: '100%',
    flexDirection: 'row'
  }
  
  $NavLink = {
    marginRight: 8
  }
  
  $UserStatus = {
    marginLeft: 'auto'
  }
}
