export const util = {}

Object.assign(util, {
  getDenominationMap: (amount, denominations) => {
    denominations = denominations.slice()
    denominations.sort((a, b) => b - a)
    
    const denominationMap = {}
    for (denomination of denominations) {
      const numBills = Math.floor(amount / denomination)
      if (numBills > 0) {
        denominationMap[denomination] = numBills
        amount -= numBills * denomination
      }
    }
    return denominationMap
  },
  
  makeSlug: str => {
    // HACK: Would like to write /[^a-z]+/g but compiler screws up "^"
    return str.toLowerCase().replace(new RegExp('[\u005ea-z]+', 'g'), '-')
  }
})
