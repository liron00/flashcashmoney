view NavLink {
  activeStyle = {
    color: 'white',
    textDecoration: 'none'
  }
  inactiveStyle = {
    color: 'green',
  }
  
  <Link to={^to}>
    {^children}
  </Link>
  
  $ = {
    fontFamily: 'Copperplate',
    fontWeight: 'bold',
    fontSize: 18
  }
  
  $Link = Flint.router.isActive(^to)? activeStyle : inactiveStyle
}
