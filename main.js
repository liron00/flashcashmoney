import Firebase from 'firebase'

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



  let count = null
  let flashes$ = ref.child('flashes')
  let flashes = [];

  flashes$.on('value', data => {
    flashes = [];
    for (let key in data.val()) {
      let flash = data.val()[key];
      flash.id = key;
      flashes.push(flash);
    }
    console.log("data:", data.val())
  })

  <UserStatus user={user} />
  <Flasher user={user} />
  <Flash repeat={flashes} flash={_} />

  $ = {
    flexDirection: "row"
  }

  $userObject = {
    fontFamily: 'courier new'
  }
}