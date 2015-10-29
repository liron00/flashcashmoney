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

  <loggedIn if={^authUser}>
    <User user={^authUser} />
    <logout-a href="#" onClick={logout}>Log out</logout-a>
  </loggedIn>

  <notLoggedIn if={!^authUser}>
    <button onClick={login}>Log in with Facebook</button>
  </notLoggedIn>
  
  $loggedIn = {
    flexDirection: 'row'
  }
  
  $logout = {
    marginLeft: 10
  }

  $userInfo = {
    fontWeight: 'bold'
  }
}
