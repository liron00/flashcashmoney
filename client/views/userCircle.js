view UserCircle {
  $ = {
    width: ^size || 100,
    height: ^size || 100,
    borderRadius: '50%',
    backgroundImage: `url(${^user.photoUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: '50%'
  }
}
