view UserStatus {
  let login = () =>
    ref.authWithOAuthPopup("facebook", (error, authData) => {
      if (error) {
        console.log("Login failed", error)
      }
    }, {
      scope: "public_profile,email,user_friends"
    })

  let logout = () =>
    ref.unauth()

  <notLoggedIn if={!^authUser}>
    <loginButton-img src="/static/images/login.png" onClick={login} />
  </notLoggedIn>
  <loggedIn if={^authUser}>
    <User user={^authUser} />
    <logout-a href="#" onClick={logout}>Log out</logout-a>
  </loggedIn>
  
  $loginButton = {
    cursor: 'pointer',
    maxHeight: 32
  }
  
  $loggedIn = {
    flexDirection: 'row'
  }
  
  $logout = {
    marginLeft: 10
  }
}
