view UserPage {
  const staticRoutes = [
    '/about'
  ]
  const isStaticRoute = () => {
    for (let staticRoute of staticRoutes) {
      if (Flint.router.isActive(staticRoute)) {
        return true
      }
    }
    return false
  }
  
  const userSlug = ^params.userSlug
  
  <userPage if={!isStaticRoute()}>
    This is the user page for {userSlug}
  </userPage>
}
