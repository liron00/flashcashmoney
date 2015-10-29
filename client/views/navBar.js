view NavBar {
  <navBar>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/about">About</NavLink>
    <NavLink if={^authUser} to={"/" + ^authUser.slug}>You</NavLink>
  </navBar>
  
  $navBar = {
    flexDirection: 'row'
  }
  
  $NavLink = {
    marginRight: 8
  }
}
