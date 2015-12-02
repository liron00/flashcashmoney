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
    marginTop: 20,
    marginBottom: 40
  }

  $headerText = {
    textDecoration: 'none',
    color: 'yellow',
    fontFamily: 'Copperplate',
    fontSize: 125,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'baseline'
  }

  $dotMoney = {
    color: 'white',
    fontSize: 48
  }

}
