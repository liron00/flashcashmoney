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



  const flashesRef = ref.child('flashes')
  let count = null
  let flashes = []

  flashesRef.limitToLast(10).on('value', flashesSnapshot => {
    flashes = []
    flashesSnapshot.forEach(flashSnapshot => {
      const flash = flashSnapshot.val()
      flash.id = flashSnapshot.key()
      flashes.push(flash)
    })
    flashes.sort((a, b) => b.timestamp - a.timestamp)
  })

  <UserStatus user={user} />
  <Flasher user={user} />
  <Flash repeat={flashes} flash={_} />

  $ = {
    flexWrap: 'nowrap'
  }
  
  $UserStatus = {
  }
  
  $Flasher = {
    marginTop: 40,
    marginBottom: 40
  }
}