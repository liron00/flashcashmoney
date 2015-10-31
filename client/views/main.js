import jQ from 'jquery'
import Firebase from 'firebase'

export const jQuery = jQ

const firebaseName = 'flashcashmoney'
export const ref = new Firebase(`https://${firebaseName}.firebaseio.com/`)

const staticRoutes = [
  '/faq'
]
export const isStaticRoute = () => {
  for (let staticRoute of staticRoutes) {
    if (Flint.router.isActive(staticRoute)) {
      return true
    }
  }
  return false
}
  
export const login = (callback) => {
  ref.authWithOAuthPopup("facebook", (error, authData) => {
    if (error) {
      console.log("Login failed", error)
    } else {
      if (callback) {
        callback(authData)
      }
    }
  }, {
    scope: "public_profile,email,user_friends"
  })
}

export const logout = () => {
  ref.unauth()
}
  
view Main {
  /*
    user
      uid
      displayName
      photoUrl
  */
  let user

  ref.onAuth(authData => {
    if (authData) {  
      let userRef = ref.child('users').child(authData.uid)
      let nextUserSlugIndex = 1
      
      const newUserFields = {
        email: authData.facebook.email || null,
        displayName: authData.facebook.displayName || null,
        photoUrl: authData.facebook.profileImageURL || null,
      }
      authUser = Object.assign({uid: authData.uid}, newUserFields)
      
      doUserTransaction = (userSlugIndex) => {
        userRef.transaction(currentUserFields => {
          const userFields = Object.assign(currentUserFields || {}, newUserFields)
          if (!userFields.createdTimestamp) {
            // New user
            userFields.createdTimestamp = Firebase.ServerValue.TIMESTAMP
            userFields.slug = util.makeSlug(userFields.displayName)
            if (userSlugIndex > 1) {
              userFields.slug += `-${userSlugIndex}`
            }
          }
          userFields.seenTimestamp = Firebase.ServerValue.TIMESTAMP
          return userFields
        }, (error, committed, userSnapshot) => {
          if (error) {
            if (error.message == "permission_denied") {
              nextUserSlugIndex += 1
              doUserTransaction(nextUserSlugIndex)
            }
          } else {
            userSlugRef = ref.child('userSlugs').child(userSnapshot.val().slug)
            userSlugRef.set(authData.uid)
          }
        })
      }
      doUserTransaction(nextUserSlugIndex)
      
      userRef.on('value', data => {
        Object.assign(authUser, data.val())
      })
      
    } else {
      authUser = null
    }
  })
  
  <layout>
    <HomePage route="/" authUser={authUser} />
    <FaqPage route="/faq" authUser={authUser} />
    <UserPage route="/:userSlug" authUser={authUser} />
    <footer>
      © 2015 FlashCash.money
    </footer>
  </layout>
  
  $layout = {
    width: 860,
    padding: "20px 50px 50px 50px",
    backgroundColor: 'rgba(0, 0, 0, .8)'
  }
  
  $footer = {
    fontSize: 10,
    color: '#666',
    alignSelf: 'center'
  }
}
