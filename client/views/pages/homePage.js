view HomePage {
  <Header authUser={view.props.authUser} />
  <Flasher authUser={view.props.authUser} />
  <TopFlashes />
  
  $Flasher = {
    marginTop: 20,
    marginBottom: 100
  }
}
