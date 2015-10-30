view UserCircle {
  $ = {
    width: ^size || 100,
    height: ^size || 100,
    borderRadius: '50%',
    backgroundImage: `url(${^user.photoUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: '50%',
    border: (^glow != false)? '2px solid white' : null,
    boxShadow: (^glow != false)? '0 0 30px white' : null
  }
}
