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
              amount = null
              moneyKey = "" + Math.random()
              trash = ""
              setTimeout(() => {
                flashing = false
                processing = false
              }, 700)
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
        placeholder="Trash talk" />
      <cashWrapper>
        <Cash if={!!amount} amount={amount} />
      </cashWrapper>
    </rightSection>
  </topRow>
  <bottomRow>
    <flashButton-button disabled={flashing} onClick={flash}>
      {flashing? "Flashing..." : "Flash your cash"}
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
    color: '#c7c7c7',
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
    padding: 12,
    borderRadius: 8,
    background: 'linear-gradient(to bottom, rgba(76,76,76,1) 0%, rgba(89,89,89,1) 12%, rgba(102,102,102,1) 25%, rgba(71,71,71,1) 39%, rgba(44,44,44,1) 50%, rgba(0,0,0,1) 51%, rgba(17,17,17,1) 60%, rgba(43,43,43,1) 76%, rgba(28,28,28,1) 91%, rgba(19,19,19,1) 100%)',
    color: flashing? '#999' : '#c00',
    opacity: amount? 1 : 0,
    border: '2px solid white',
    borderRadius: 8,
    boxShadow: '0 0 30px white',
    transition: 'all 0.2s ease',
    marginTop: 40
  }
}
