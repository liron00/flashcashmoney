view Flasher {
  let amount = null
  
  const onAmountChange = (e) => {
    amount = e.amount
  }
  
  const flash = () => {
    const flashAmount = amount
    
    if (!flashAmount) {
      alert("Invalid amount")
      return
    }
    
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
              amount: flashAmount,
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
    
    stripeHandler.open({
      amount: 100 * flashAmount
    })
  }
  
  <MoneyClip onChange={onAmountChange} />
  <arrow-img src="/static/images/arrow.png"></arrow-img>
  <yesValidAmount if={!!amount}>
    <Cash amount={amount} />
    <flash-button disabled={!^authUser} onClick={flash}>Flash</flash-button>
  </yesValidAmount>
  <noValidAmount if={!amount}>
    Enter an amount of cash to flash.
  </noValidAmount>
  
  $ = {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8
  }
  
  $noValidAmount = {
    color: '#666',
    fontStyle: 'italic'
  }
  
  $arrow = {
    width: 200,
    marginLeft: 50,
    marginRight: 50,
    opacity: .7
  }
  
  $flash = {
    alignSelf: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    padding: 12
  }
}
