view UserStatus {
  const logoutMouseOver = () => {
    view.refs.logout.style.textDecoration = 'underline'
  }
  const logoutMouseOut = () => {
    view.refs.logout.style.textDecoration = 'none'
  }

  <notLoggedIn if={!^authUser}>
    <loginButton-img src="/static/images/login.png" onClick={() => login()} />
  </notLoggedIn>
  <loggedIn if={^authUser}>
    <User user={^authUser} />
    <logout-a ref="logout" href="#" onClick={logout} onMouseOver={logoutMouseOver} onMouseOut={logoutMouseOut}>
      Log out
    </logout-a>
  </loggedIn>
  
  $loginButton = {
    cursor: 'pointer',
    maxHeight: 32
  }
  
  $loggedIn = {
    flexDirection: 'row',
    alignItems: 'center'
  }
  
  $logout = {
    marginLeft: 16,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    textDecoration: 'none'
  }
}
