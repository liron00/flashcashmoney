view NavBar {
  <NavLink to="/">home</NavLink>
  <NavLink to="/about">about</NavLink>
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
