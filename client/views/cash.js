view Cash {
  const getBills = () => {
    const denomMap = util.getDenominationMap(^amount, CONFIG.denominations)
    const bills = []
    for (denom of CONFIG.denominations) {
      const numBills = denomMap[denom] || 0
      for (let i=0; i<numBills; i++) {
        bills.push({
          denomination: denom
        })
      }
    }
    return bills
  }
    
  <Bill repeat={getBills()} denomination={_.denomination} />
  
  $ = {
    flexDirection: 'row'
  }
  
  $dollar = {
    maxWidth: 120
  }
}
