view NavBar {
  let showUserPageLink
  
  on.props(() => {
    showUserPageLink = view.props.user && !(
      view.props.authUser && view.props.authUser.uid == view.props.user.uid
    )
  })
  
  <NavLink to="/">home</NavLink>
  <NavLink to="/faq">faq</NavLink>
  <SocialButtons if={!showUserPageLink} />
  <userPageLink if={showUserPageLink}>
    <User user={view.props.user} showFbLink={true} />
  </userPageLink>
  <UserStatus authUser={view.props.authUser} />
  
  $ = {
    width: '100%',
    flexDirection: 'row'
  }
  
  $NavLink = {
    fontSize: 36,
    marginRight: 20
  }
  
  $SocialButtons = {
    marginLeft: 'auto'
  }
  
  $User = {
    marginLeft: 8
  } 
  
  $UserStatus = {
    marginLeft: 'auto'
  }
}
