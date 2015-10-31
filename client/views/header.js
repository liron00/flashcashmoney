view Header {
  <NavBar authUser={view.props.authUser} user={view.props.user} />
  <h1>
    flashcash.money
  </h1>
  
  $ = {
    width: '100%'
  }
  
  $NavBar = {
    width: '100%',
    marginBottom: 20
  }
  
  $h1 = {
    color: 'silver',
    fontFamily: 'Copperplate',
    fontSize: 72,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40
  }

}
