view Flasher {
  let amount = 5
  
  let flash = () => {
    let flashRef = ref.child('flashes').push({
      uid: ^user.uid,
      amount: amount,
      timestamp: Firebase.ServerValue.TIMESTAMP
    })
  }
  
  <input type="text" />
  <flash-button disabled={!^user} onClick={flash}>Flash</flash-button>
  
  $ = {
    flexDirection: 'row'
  }
}
