view HomePage {
  <UserStatus user={^user} />
  <Flasher user={^user} />
  <TopFlashes />

  $UserStatus = {
  }
  
  $Flasher = {
    marginTop: 40,
    marginBottom: 40
  }
}
