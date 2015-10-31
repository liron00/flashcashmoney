view MoneyClip {
  let amountStr = ""
  let amount = null
  let lastKey = ""
  
  const onChange = (e) => {
    amountStr = e.target.value
    amount = parseInt(amountStr, 10)
    if (isNaN(amount) || amount <= 0 || amount > 1000 || !(
      amount.toString() == amountStr ||
      amount.toString() + ".00" == amountStr
    )) {
      amount = null
    }
    if (view.props.onChange) {
      view.props.onChange({
        amount: amount
      })
    }
  }
  
  on('mount', () => {
    view.refs.amount.focus()
  })
  
  on('props', () => {
    // HACK: The moneyKey prop is so that
    // the flasher can reset the moneyClip's
    // value after a successful flash.
    if (view.props.moneyKey != lastKey) {
      view.refs.amount.value = ""
      lastKey = view.props.moneyKey
    }
  })
  
  <moneyClip onClick={() => view.refs.amount.focus()}>
    <underline />
    <flashSign-img if={false} src="/static/images/flash.png" />
    <cashInput>
      <dollarSign>$</dollarSign>
      <amount-input
        ref="amount"
        type="text"
        defaultValue={amountStr}
        maxLength="4"
        onChange={onChange}
        onEnter={view.props.onEnter} />
    </cashInput>
  </moneyClip>

  $ = {
    cursor: 'text'
  }
  
  $moneyClip = {
    width: 350,
    height: 265,
    backgroundImage: `url(/static/images/moneyclip.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    flexDirection: 'row',
    fontFamily: 'Copperplate'
  }
  
  $flashSign = {
    position: 'absolute',
    width: 120,
    marginTop: 40,
    marginLeft: 78
  }
  
  $underline = {
    position: 'absolute',
    marginTop: 180,
    marginLeft: 172,
    width: 120,
    borderBottom: '3px solid white'
  }
  
  $cashInput = {
    position: 'relative',
    top: 128,
    left: 130,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 0
  }
  
  $dollarSign = {
    fontSize: 48,
    color: 'white'
  }
  
  $amount = {
    width: 120,
    height: 70,
    paddingLeft: 6,
    fontSize: 48,
    fontFamily: 'Copperplate',
    background: 'none',
    border: 'none',
    color: (amount || !amountStr)? 'white' : 'red',
    textDecoration: (amount || !amountStr)? null : 'line-through'
  }
}
