view Link {
  const go = (e) => {
    if (e.button == 0 && !e.metaKey) {
      e.preventDefault()
      Flint.router.go(^to)
    }
  }
  
  <link-a href={^to} onClick={go}>{^children}</link-a>
}
