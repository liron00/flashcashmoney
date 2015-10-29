import jQ from 'jquery'
import Firebase from 'firebase'

export const jQuery = jQ

const firebaseName = 'flashcashmoney'
export const ref = new Firebase(`https://${firebaseName}.firebaseio.com/`)

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
      user = Object.assign({uid: authData.uid}, newUserFields)
      
      doUserTransaction = (userSlugIndex) => {
        console.log("DO transaction", userSlugIndex)
        userRef.transaction(currentUserFields => {
          console.log("Trying transaction", userSlugIndex)
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
          console.log("onComplete", error, committed, userSnapshot? userSnapshot.val() : null)
          
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
        Object.assign(user, data.val())
      })
      
    } else {
      user = null
    }
  })
  
  <NavBar authUser={user} />
  <HomePage route="/" authUser={user} />
  <AboutPage route="/about" authUser={user} />
  <UserPage route="/:userSlug" authUser={user} />
  
  $NavBar = {
    marginBottom: 20
  }
  
  $.userLink = {
    fontSize: 24
  }
}
