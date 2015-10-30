view Flasher {
  let amount = null
  let trash = ""
  
  const onAmountChange = (e) => {
    amount = e.amount
  }
  
  const flash = () => {
    const flashAmount = amount
    const flashTrash = trash
    
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
              stripeToken: token.id,
              trash: flashTrash
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
  
  <trashRow>
    <trash-input type="text"
      disabled={!amount}
      maxLength={140}
      sync={trash}
      placeholder="Trash talk (optional)" />
    <flashButton-button disabled={!amount} onClick={flash}>
      Flash that cash!
    </flashButton-button>
  </trashRow>
  <moneyRow>
    <MoneyClip onChange={onAmountChange} />
    <cashWrapper>
      <Cash if={!!amount} amount={amount} />
    </cashWrapper>
  </moneyRow>
  
  $ = {
    marginLeft: 8
  }
  
  $moneyRow = {
    flexDirection: 'row'
  }
  
  $cashWrapper = {
    position: 'absolute',
    marginTop: 10
  }
  
  $MoneyClip = {
    marginRight: 20
  }
  
  $trashRow = {
    flexDirection: 'row',
    marginTop: 40,
    height: 50
  } 
  
  $trash = {
    width: 500,
    height: 40,
    color: 'black',
    fontFamily: 'Copperplate',
    fontWeight: 'bold',
    marginRight: 20,
    opacity: amount? 1 : 0,
    transition: 'all .2s ease'
  }
  
  $flashButton = {
    fontSize: 36,
    fontWeight: 'bold',
    padding: 12,
    borderRadius: 8,
    color: amount? null : '#999',
    opacity: amount? 1 : 0,
    transition: 'all .2s ease'
  }
}
