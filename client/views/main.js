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
      
      const newUserFields = {
        email: authData.facebook.email || null,
        displayName: authData.facebook.displayName || null,
        photoUrl: authData.facebook.profileImageURL || null
      }
      
      user = Object.assign({uid: authData.uid}, newUserFields)
      
      userRef.update(newUserFields)
      
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
