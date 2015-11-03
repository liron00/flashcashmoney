view Link {
  const go = (e) => {
    if (e.button == 0 && !e.metaKey) {
      e.preventDefault()
      Flint.router.go(view.props.to)
    }
  }
  
  <link-a href={view.props.to} onClick={go}>{view.props.children}</link-a>
  
  $ = {
    textDecoration: 'none'
  }
}
