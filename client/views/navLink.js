view NavLink {
  activeStyle = {
    color: 'white',
    fontWeight: 'bold',
    textDecoration: 'none'
  }
  inactiveStyle = {
    color: 'green',
    fontWeight: 'bold'
  }
  
  <Link to={^to}>
    {^children}
  </Link>
  
  $Link = Flint.router.isActive(^to)? activeStyle : inactiveStyle
}
