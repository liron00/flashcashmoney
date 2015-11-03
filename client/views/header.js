view Header {
  <NavBar authUser={view.props.authUser} user={view.props.user} />
  <Link to="/">
    flashcash.money
  </Link>
  
  $ = {
    width: '100%'
  }
  
  $NavBar = {
    width: '100%',
    marginBottom: 20
  }
  
  $Link = {
    textDecoration: 'none',
    color: 'white',
    textShadow: '3px 3px #000',
    fontFamily: 'Copperplate',
    fontSize: 80,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40
  }

}
