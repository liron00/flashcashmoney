view UserPage {
  let userSlug, uid, user
  let activeUserFlashes, expiredUserFlashes
  on('props', () => {
    if (isStaticRoute() || userSlug == view.props.params.userSlug) {
      return
    }
    
    userSlug = view.props.params.userSlug
    user = undefined
    periodFlash = undefined
    activeUserFlashes = undefined
    expiredUserFlashes = undefined
    
    let userSlugRef = ref.child('userSlugs').child(userSlug)
    userSlugRef.once('value', userSlugSnapshot => {
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
          let trash = null
          for (activeUserFlash of activeUserFlashes) {
            amount += activeUserFlash.amount
            if (!trash) {
              trash = activeUserFlash.trash
            }
          }
          periodFlash = {
            uid: uid,
            timestamp: activeUserFlashes[0].timestamp,
            trash: trash,
            amount: amount
          }
        } else {
          periodFlash = null
        }
      })
    })
  })
    
  <userPage if={!isStaticRoute()}>
    <Header authUser={view.props.authUser} user={user} />
    <userLoadingSection if={user === undefined}>
      Loading <b>{view.props.params.userSlug}</b>...
    </userLoadingSection>
    <userDoesntExist if={user === null}>
      User <b>{view.props.params.userSlug}</b> not found.
    </userDoesntExist>
    <userExists if={user}>
      <loadingFlashes if={periodFlash === undefined}>
        Loading flashes...
      </loadingFlashes>
      
      <flashesLoaded if={periodFlash !== undefined}>
        <noRecentFlash if={periodFlash === null}>
          Not flashing any cash.
        </noRecentFlash>
        <yesRecentFlash if={periodFlash}>
          <Flash if={false} flash={periodFlash} showUser={false} />
        </yesRecentFlash>
        
        <flashesDetail>
          <activeFlashes if={activeUserFlashes.length > 0}>
            <Flash repeat={activeUserFlashes} flash={_} showUser={false} />
          </activeFlashes>
          <separator>
            Flashes stay on the front page for 24 hours.
          </separator>
          <expiredFlashes if={expiredUserFlashes.length > 0}>
            <Flash repeat={expiredUserFlashes} flash={_} showUser={false} />
          </expiredFlashes>
        </flashesDetail>
      </flashesLoaded>
    </userExists>
  </userPage>
  
  $userPage = {
    marginBottom: 50
  }
  
  $Header = {
    marginBottom: 50
  }
  
  $userLoadingSection = {
    flexDirection: 'row',
    alignItems: 'baseline',
     color: '#ccc' 
  }
  
  $loadingFlashes = {
    color: '#ccc'
  }
  
  $userDoesntExist = {
    flexDirection: 'row',
    alignItems: 'baseline'
  }
  
  $Flash = {
    marginBottom: 100
  }
  
  $separator = {
    width: '100%',
    marginBottom: 100,
    paddingBottom: 2,
    borderBottom: '1px solid #ccc',
    color: '#ccc'
  }
}
