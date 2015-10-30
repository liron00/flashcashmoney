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
        Object.assign(user, data.val())
      })
      
    } else {
      user = null
    }
  })
  
  <layout>
    <NavBar authUser={user} />
    <header>
      FlashCash.money
    </header>
    <HomePage route="/" authUser={user} />
    <AboutPage route="/about" authUser={user} />
    <UserPage route="/:userSlug" authUser={user} />
  </layout>
  
  $header = {
    fontFamily: 'Copperplate',
    fontSize: 72,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 50
  }

  $layout = {
    width: 860,
    padding: "20px 50px 50px 50px",
    backgroundColor: 'rgba(0, 0, 0, .8)'
  }
  
  $NavBar = {
    marginBottom: 20
  }
  
  $.userLink = {
    fontSize: 24
  }
}
