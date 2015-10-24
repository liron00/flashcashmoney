import Firebase from 'firebase'

const firebaseName = 'flashcashmoney'
export const ref = new Firebase(`https://${firebaseName}.firebaseio.com/`)




view Main {
  let user

  ref.onAuth(authData => {
    user = authData

    console.log("got value of user", user)
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
  <Flash repeat={flashes} flash={_} />

  $ = {
    flexDirection: "row"
  }

  $userObject = {
    fontFamily: 'courier new'
  }
}

view Flash {
  <h2>User <i>{^flash.userId}</i></h2>
  <cash>
      ${^flash.amount}
  </cash>

  $cash = {
    flexFlow: 'row'
  }
}
