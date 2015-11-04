view HomePage {
  <Header authUser={view.props.authUser} />
  <Flasher authUser={view.props.authUser} />
  <separator />
  <TopFlashes />
  
  $Flasher = {
    marginTop: 20,
    marginBottom: 60
  }
  
  $separator = {
    width: '100%',
    marginBottom: 60,
    paddingBottom: 2,
    borderBottom: '1px solid #ccc',
    color: '#ccc'
  }
}
