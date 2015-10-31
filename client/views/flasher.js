view Flasher {
  let moneyKey = ""
  let amount = null
  let trash = ""
  let flashing = false
  let processing = false
  
  const onAmountChange = (e) => {
    amount = e.amount
  }
  
  const flash = () => {
    const flashAmount = amount
    const flashTrash = trash
    
    if (!flashAmount) {
      return
    }
    
    if (!flashTrash) {
      view.refs.trash.style.border = '5px solid red'
      setTimeout(() => {
        view.refs.trash.style.border = '5px solid rgba(0, 0, 0, 0)'
      }, 1000)
      setTimeout(() => {
        view.refs.trash.focus()
      })
      return
    }
    
    if (!^authUser) {
      login(flash)
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
        closed: () => {
          if (!processing) {
            flashing = false
          }
        },
        token: (token) => {
          processing = true
          Parse.Cloud.run(
            "flash",
            {
              uid: ^authUser.uid,
              amount: flashAmount,
              stripeToken: token.id,
              trash: flashTrash
            },
            data => {
              Flint.router.go("/" + ^authUser.slug)
              
              // This is what it would take to reset
              // the state of the flasher on the home
              // page:
              // amount = null
              // moneyKey = "" + Math.random()
              // trash = ""
              // setTimeout(() => {
              //   flashing = false
              //   processing = false
              // }, 700)
            },
            err => {
              flashing = false
              processing = false
              console.error(err)
              alert(err.error)
            }
          );
        }
    })
    
    flashing = true
    stripeHandler.open({
      amount: 100 * flashAmount
    })
  }
  
  <topRow>
    <MoneyClip moneyKey={moneyKey} onChange={onAmountChange} onEnter={flash} />
    <rightSection>
      <trash-textarea
        ref="trash"
        disabled={!amount}
        maxLength={140}
        sync={trash}
        placeholder="trash talk" />
      <cashWrapper>
        <Cash if={!!amount} amount={amount} />
      </cashWrapper>
    </rightSection>
  </topRow>
  <bottomRow>
    <flashButton-button disabled={flashing} onClick={flash}>
      {flashing? "flashing..." : "flash your cash"}
    </flashButton-button>
  </bottomRow>
  
  $ = {
    marginLeft: 8
  }
  
  $topRow = {
    flexDirection: 'row'
  }
  
  $cashWrapper = {
    position: 'absolute',
    marginTop: 10
  }
  
  $MoneyClip = {
    position: 'relative',
    left: -8,
    marginRight: 20
  }
  
  $trashRow = {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    height: 50
  } 
  
  $trash = {
    width: 446,
    height: 75,
    marginTop: 8,
    marginBottom: 20,
    padding: 12,
    fontSize: 20,
    fontFamily: 'Copperplate',
    fontWeight: 'bold',
    opacity: amount? 1 : 0,
    transition: 'all 0.2s ease',
    background: 'black',
    color: 'white',
    border: '5px solid rgba(0, 0, 0, 0)',
    borderRadius: 8,
    boxShadow: '0 0 30px white',
    resize: 'none',
    overflow: 'hidden'
  }
  
  $flashButton = {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'Copperplate',
    padding: "16px 12px",
    borderRadius: 8,
    background: 'linear-gradient(to bottom, #b4ddb4 0%,#005700 25%,#005700 75%,#b4d6a0 100%)',
    color: flashing? '#999' : '#000',
    opacity: amount? 1 : 0,
    border: '2px solid green',
    borderRadius: 8,
    boxShadow: '0 0 30px green',
    transition: 'all 0.2s ease',
    marginTop: 40
  }
}
