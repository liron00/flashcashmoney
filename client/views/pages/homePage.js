view HomePage {
  <UserStatus user={^user} />
  <Flasher user={^user} />
  <Flashes />

  $UserStatus = {
  }
  
  $Flasher = {
    marginTop: 40,
    marginBottom: 40
  }
}
