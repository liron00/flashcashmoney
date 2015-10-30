view HomePage {
  <UserStatus if={false} authUser={^authUser} />
  <Flasher authUser={^authUser} />
  <TopFlashes />
  
  $Flasher = {
    marginTop: 20,
    marginBottom: 100
  }
}
