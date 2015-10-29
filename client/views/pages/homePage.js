view HomePage {
  <UserStatus authUser={^authUser} />
  <Flasher authUser={^authUser} />
  <TopFlashes />

  $UserStatus = {
  }
  
  $Flasher = {
    marginTop: 40,
    marginBottom: 40
  }
}
