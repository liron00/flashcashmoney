view Flasher {
  let amountStr = "10"
  
  const flash = () => {
    let amount = parseInt(amountStr)
    
    if (isNaN(amount) || amount <= 0 || amount.toString() != amountStr) {
      alert("Invalid amount")
      return
    }
    
    let flashRef = ref.child('flashes').push({
      uid: ^user.uid,
      amount: amount,
      timestamp: Firebase.ServerValue.TIMESTAMP
    })
  }
  
  <dollarSign>$</dollarSign>
  <amount-input type="text" sync={amountStr} onKeyDown={(e) => {
    if (e.keyCode == 13) {
      flash()
    }
  }} />
  <flash-button disabled={!^user} onClick={flash}>Flash</flash-button>
  
  $ = {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8
  }
  
  $dollarSign = {
    fontSize: 36,
    fontWeight: 'bold'
  }
  
  $amount = {
    width: 150,
    height: 50,
    fontSize: 32,
    fontWeight: 'bold'
  }
  
  $flash = {
    alignSelf: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    padding: 12
  }
}
