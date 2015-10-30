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
  
  <MoneyClip onChange={onAmountChange} />
  <arrow-img if={false} src="/static/images/arrow.png"></arrow-img>
  <rightColumn>
    <trashTalkSection>
      <trash-input type="text"
        maxLength={140}
        sync={trash}
        placeholder="Trash goes here." />
    </trashTalkSection>
    <yourCashHere>
      <yesValidAmount if={!!amount}>
        <Cash amount={amount} />
      </yesValidAmount>
      <noValidAmount if={!amount}>
          Cash goes here.
      </noValidAmount>
    </yourCashHere>
    <flashButton-button disabled={!amount} onClick={flash}>
      Flash that cash!
    </flashButton-button>
  </rightColumn>
  
  $ = {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8
  }
  
  $yourCashHere = {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999',
    fontStyle: 'italic',
    border: '1px dotted #ccc',
    width: 400,
    height: 300
  }
  
  $arrow = {
    width: 200,
    marginLeft: 50,
    marginRight: 50,
    opacity: .7
  }
  
  $trashSection = {
    marginBottom: 20
  }
  
  $trash = {
    width: 500,
    height: 40
  }
  
  $yesValidAmount = {
    marginBottom: 20
  }
  
  $flashButton = {
    fontSize: 36,
    fontWeight: 'bold',
    padding: 12,
    borderRadius: 8,
    color: amount? null : '#999'
  }
}
