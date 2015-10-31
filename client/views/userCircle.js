view UserCircle {
  $ = {
    width: view.props.size || 100,
    height: view.props.size || 100,
    borderRadius: '50%',
    backgroundImage: `url(${view.props.user.photoUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: '50%',
    border: (view.props.glow != false)? '2px solid white' : null,
    boxShadow: (view.props.glow != false)? '0 0 30px white' : null
  }
}
