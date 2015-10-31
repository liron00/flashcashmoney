view NavBar {
  <NavLink to="/">home</NavLink>
  <NavLink to="/faq">faq</NavLink>
  <userPageLink if={view.props.user && !(view.props.authUser && view.props.authUser.uid == view.props.user.uid)}>
    <User user={view.props.user} />
  </userPageLink>
  <UserStatus authUser={view.props.authUser} />
  
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
