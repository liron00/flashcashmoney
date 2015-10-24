view UserStatus {
  let count = 0
  let login = () =>
    ref.authWithOAuthPopup("facebook", (error, authData) => {
      if (error) {
        console.log("Login failed", error)
      } else {
        console.log("Hopefully the view has updated.")
      }
    })

  on('update', () => {
    console.log(Flint.getCache[view.getPath()], view.props)
  })

  <button onClick={() => count++}>up {count}</button>
  <loggedIn if={^user}>
    You are logged in as:
    <userInfo>{JSON.stringify(^user)}</userInfo>
  </loggedIn>

  <notLoggedIn if={!^user}>
    <button onClick={login}>Log in with Facebook</button>
  </notLoggedIn>

  $userInfo = {
    fontFamily: 'courier new'
  }
}
