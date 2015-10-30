view HomePage {
  <UserStatus authUser={^authUser} />
  <Flasher authUser={^authUser} />
  <TopFlashes />

  $UserStatus = {
  }
  
  $Flasher = {
    marginTop: 20,
    marginBottom: 100
  }
}
