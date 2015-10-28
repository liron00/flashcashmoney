view NavLink {
  activeStyle = {
    color: 'black',
    fontWeight: 'bold',
    textDecoration: 'none'
  }
  inactiveStyle = {
    color: 'blue'
  }
  
  <Link to={^to}>
    {^children}
  </Link>
  
  $Link = Flint.router.isActive(^to)? activeStyle : inactiveStyle
}
