view NavLink {
  activeStyle = {
    color: 'white',
    textDecoration: 'none'
  }
  inactiveStyle = {
    color: 'green',
  }
  
  <Link class="myLink" to={view.props.to}>
    <navLinkWrapper>
      {view.props.children}
    </navLinkWrapper>
  </Link>
  
  $navLinkWrapper = [
    {
      fontFamily: 'Copperplate',
      fontWeight: 'bold',
      fontSize: 18
    },
    Flint.router.isActive(view.props.to)? activeStyle : inactiveStyle
  ]
}
