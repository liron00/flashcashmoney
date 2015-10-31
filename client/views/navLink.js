view NavLink {
  activeStyle = {
    color: 'white',
    textDecoration: 'none'
  }
  inactiveStyle = {
    color: 'green',
  }
  
  <Link class="myLink" to={view.props.to}>
    {view.props.children}
  </Link>
  
  $ = {
    fontFamily: 'Copperplate',
    fontWeight: 'bold',
    fontSize: 18
  }
  
  $Link = Flint.router.isActive(view.props.to)? activeStyle : inactiveStyle
}
