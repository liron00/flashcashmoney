view Flasher {
  let amountStr = "10"
  
  const flash = () => {
    let amount = parseInt(amountStr)
    
    const stripeHandler = StripeCheckout.configure({
        key: CONFIG.stripeTestPublishableKey,
        name: "YO LET'S MAKE IT RAIN!",
        description: "💸💧",
        image: 'TODO',
        locale: 'auto',
        panelLabel: "Flash {{amount}}",
        email: ^authUser.email,
        bitcoin: true,
        token: (token) => {
          Parse.Cloud.run(
            "flash",
            {
              uid: ^authUser.uid,
              amount: amount,
              stripeToken: token.id
            },
            data => {
              console.log("Flash success!", data)
            },
            err => {
              console.error(err)
              alert(err.error)
            }
          );
        }
    })
      
    if (isNaN(amount) || amount <= 0 || amount.toString() != amountStr) {
      alert("Invalid amount")
      return
    }
    
    stripeHandler.open({
      amount: 100 * amount
    })

    if (false) {
      let flashRef = ref.child('flashes').push({
        uid: ^authUser.uid,
        amount: amount,
        timestamp: Firebase.ServerValue.TIMESTAMP
      })
    }
  }
  
  <dollarSign>$</dollarSign>
  <amount-input type="text" sync={amountStr} onKeyDown={(e) => {
    if (e.keyCode == 13) {
      flash()
    }
  }} />
  <flash-button disabled={!^authUser} onClick={flash}>Flash</flash-button>
  
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
