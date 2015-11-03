view Header {
  <NavBar authUser={view.props.authUser} user={view.props.user} />
  <Link to="/">
    <headerText>
      <flashcash>flashcash</flashcash>
      <dotMoney>.money</dotMoney>
    </headerText>
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
    color: 'yellow',
    fontFamily: 'Copperplate',
    fontSize: 80,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40
  }
  
  $headerText = {
    flexDirection: 'row'
  }
  
  $dotMoney = {
    color: 'white'
  }

}
