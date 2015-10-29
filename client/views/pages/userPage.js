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
  
  let userSlug, uid, user
  let activeUserFlashes, expiredUserFlashes
  on('props', () => {
    if (isStaticRoute() || userSlug == ^params.userSlug) {
      return
    }
    
    // TODO: Use actual user slugs
    userSlug = ^params.userSlug
    user = undefined
    periodFlash = undefined
    activeUserFlashes = undefined
    expiredUserFlashes = undefined
    
    let userSlugRef = ref.child('userSlugs') //.child(userSlug)
    console.log(1, userSlugRef.toString())
    userSlugRef.once('value', userSlugSnapshot => {
      console.log(2)
      uid = userSlugSnapshot.val()
      if (!uid) {
        user = null
        periodFlash = null
        activeUserFlashes = null
        expiredUserFlashes = null
        return
      }
      
      let userRef = ref.child('users').child(uid)
      userRef.on('value', (userSnapshot) => {
        user = userSnapshot.val()
        if (user) {
          user.uid = uid
        }
      })
      
      let flashesQuery = ref.child('flashes')
        .orderByChild("uid")
        .equalTo(uid)
      flashesQuery.on('value', (userFlashesSnapshot) => {
        const userFlashes = []
        userFlashesSnapshot.forEach(flashSnapshot => {
          const flash = flashSnapshot.val()
          flash.id = flashSnapshot.key()
          userFlashes.push(flash)
        })
        userFlashes.sort((a, b) => b.timestamp - a.timestamp)
        
        const now = new Date().getTime() 
        const periodStart = now - 1000 * CONFIG.flashPeriod
        
        activeUserFlashes = []
        expiredUserFlashes = []
        for (userFlash of userFlashes) {
          if (userFlash.timestamp > periodStart) {
            activeUserFlashes.push(userFlash)
          } else {
            expiredUserFlashes.push(userFlash)
          }
        }
        
        if (activeUserFlashes.length > 0) {
          let amount = 0
          for (activeUserFlash of activeUserFlashes) {
            amount += activeUserFlash.amount
          }
          periodFlash = {
            uid: uid,
            timestamp: activeUserFlashes[0].timestamp,
            amount: amount
          }
        } else {
          periodFlash = null
        }
      })
    })
  })
    
  
  <userPage if={!isStaticRoute()}>
    <userLoadingSection if={user === undefined}>
      Loading <b>{^params.userSlug}</b>...
    </userLoadingSection>
    <userDoesntExist if={user === null}>
      User <b>{^params.userSlug}</b> not found.
    </userDoesntExist>
    <userExists if={user}>
      <User user={user} />
      
      <loadingFlashes if={periodFlash === undefined}>
        Loading flash...
      </loadingFlashes>
      
      <flashesLoaded if={periodFlash !== undefined}>
        <noRecentFlash if={periodFlash === null}>
          Not flashing any cash.
        </noRecentFlash>
        <yesRecentFlash if={periodFlash}>
          <Flash flash={periodFlash} showUser={false} />
        </yesRecentFlash>
        
        <flashesDetail>
          <activeFlashes if={activeUserFlashes.length > 0}>
            <h1>Active flashes</h1>
            <Flash repeat={activeUserFlashes} flash={_} showUser={false} />
          </activeFlashes>
          <expiredFlashes if={expiredUserFlashes.length > 0}>
            <h1>Expired flashes</h1>
            <Flash repeat={expiredUserFlashes} flash={_} showUser={false} />
          </expiredFlashes>
        </flashesDetail>
      </flashesLoaded>
    </userExists>
  </userPage>
  
  $userLoadingSection = {
    flexDirection: 'row',
    alignItems: 'baseline'
  }
  
  $userDoesntExist = {
    flexDirection: 'row',
    alignItems: 'baseline'
  }
}
