view MoneyClip {
  let amountStr = ""
  let amount = null
  
  const onChange = (e) => {
    amountStr = e.target.value
    amount = parseInt(amountStr, 10)
    if (isNaN(amount) || amount <= 0 || amount > 1000 || !(
      amount.toString() == amountStr ||
      amount.toString() + ".00" == amountStr
    )) {
      amount = null
    }
    if (^onChange) {
      ^onChange({
        amount: amount
      })
    }
  }
  
  <moneyClip>
    <underline />
    <flashSign-img src="/static/images/flash.png" />
    <cashInput>
      <dollarSign>$</dollarSign>
      <amount-input
        type="text"
        defaultValue={amountStr}
        maxLength="5"
        onChange={onChange} />
    </cashInput>
  </moneyClip>

  $moneyClip = {
    width: 350,
    height: 265,
    backgroundImage: `url(/static/images/moneyclip.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 350,
    flexDirection: 'row'
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
    marginLeft: 170,
    width: 110,
    borderBottom: '3px solid white'
  }
  
  $cashInput = {
    position: 'relative',
    top: 128,
    left: 136,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 0
  }
  
  $dollarSign = {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white'
  }
  
  $amount = {
    width: 120,
    height: 70,
    paddingLeft: 10,
    fontSize: 36,
    background: 'none',
    border: 'none',
    fontWeight: (amount || !amountStr)? 'bold' : null,
    color: (amount || !amountStr)? 'white' : 'red',
    textDecoration: (amount || !amountStr)? null : 'line-through'
  }
}
