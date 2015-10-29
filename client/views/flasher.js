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
  <rightColumn>
    <trashTalkSection>
      <trashTalkLabel>Enter a trash talk.</trashTalkLabel>
      <trashTalk-input type="text" />
    </trashTalkSection>
    <yesValidAmount if={!!amount}>
      <Cash amount={amount} />
    </yesValidAmount>
    <noValidAmount if={!amount}>
      Enter an amount of cash to flash.
    </noValidAmount>
    <flashButton-button disabled={!amount} onClick={flash}>
      Flash that cash!
    </flashButton-button>
  </rightColumn>
  
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
  
  $trashTalkSection = {
    marginBottom: 20
  }
  
  $trashTalkLabel = {
    color: '#666',
    fontStyle: 'italic'
  }
  
  $trashTalk = {
    width: 500,
    height: 40
  }
  
  $yesValidAmount = {
    marginBottom: 20
  }
  
  $flashButton = {
    alignSelf: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    padding: 12,
    borderRadius: 8,
    color: amount? null : '#999'
  }
}
